import { NextResponse } from "next/server";

export const ACCESS_TOKEN_COOKIE = "trustflow_access_token";
export const REFRESH_TOKEN_COOKIE = "trustflow_refresh_token";
export const DEVICE_KEY_COOKIE = "trustflow_device_key";

const refreshMaxAge = Number.parseInt(
  process.env.TRUSTFLOW_REFRESH_TOKEN_MAX_AGE_SECONDS ?? "604800",
  10,
);

type TokenPayload = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
};

export function readRequestCookie(request: Request, name: string) {
  const value = request.headers.get("cookie")
    ?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))?.[1];
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return undefined;
  }
}

export function identityApiUrl(path: string) {
  const baseUrl = process.env.TRUSTFLOW_API_URL ?? process.env.VITE_TRUSTFLOW_API_URL;
  return baseUrl ? `${baseUrl.replace(/\/$/, "")}/identity${path}` : undefined;
}

export function isTokenPayload(value: unknown): value is TokenPayload {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Record<string, unknown>;
  return typeof data.access_token === "string" && typeof data.refresh_token === "string" &&
    typeof data.expires_in === "number" && data.expires_in > 0 &&
    typeof data.token_type === "string";
}

/** Stores tokens only in HTTP-only cookies; they never enter browser storage. */
export function setSessionCookies(response: NextResponse, tokens: TokenPayload) {
  const secure = process.env.NODE_ENV === "production";
  const common = { httpOnly: true, secure, sameSite: "lax" as const, path: "/" };
  response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.access_token, {
    ...common,
    maxAge: Math.floor(tokens.expires_in),
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
    ...common,
    maxAge: Number.isFinite(refreshMaxAge) && refreshMaxAge > 0 ? refreshMaxAge : 604800,
  });
}

export function clearSessionCookies(response: NextResponse) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

/** Refreshes server-held credentials and returns the rotated token pair. */
export async function refreshSession(refreshToken: string): Promise<TokenPayload | undefined> {
  const refreshUrl = identityApiUrl("/auth/refresh");
  if (!refreshUrl) return undefined;
  try {
    const response = await fetch(refreshUrl, {
      method: "POST",
      cache: "no-store",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    const payload: unknown = await response.json().catch(() => null);
    const data = typeof payload === "object" && payload !== null && "data" in payload
      ? (payload as { data: unknown }).data
      : undefined;
    return response.ok && isTokenPayload(data) ? data : undefined;
  } catch {
    return undefined;
  }
}
