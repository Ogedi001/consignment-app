import { NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, clearSessionCookies, readRequestCookie, refreshSession, setSessionCookies } from "../../auth/session";

const baseUrl = process.env.TRUSTFLOW_API_URL ?? process.env.VITE_TRUSTFLOW_API_URL;

async function proxy(request: Request, context: { params: Promise<{ path: string[] }> }) {
  if (!baseUrl) {
    return NextResponse.json({ success: false, error: { code: "SERVICE_UNAVAILABLE", message: "Catalogue service is not configured." } }, { status: 503 });
  }

  const { path } = await context.params;
  const target = new URL(`${baseUrl.replace(/\/$/, "")}/catalog/${path.map(encodeURIComponent).join("/")}`);
  target.search = new URL(request.url).search;
  const headers = new Headers({ Accept: "application/json" });
  for (const name of ["authorization", "content-type", "idempotency-key", "if-match", "x-correlation-id"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const accessToken = readRequestCookie(request, ACCESS_TOKEN_COOKIE);
  if (!headers.has("authorization") && accessToken) headers.set("authorization", `Bearer ${accessToken}`);
  const body = ["GET", "HEAD"].includes(request.method) ? undefined : await request.text();

  try {
    let response = await fetch(target, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });
    // A 401 is the only signal that the short-lived access token needs renewal.
    // Refresh-token rotation is server-to-server and the new values stay HTTP-only.
    let rotatedSession;
    if (response.status === 401) {
      const refreshToken = readRequestCookie(request, REFRESH_TOKEN_COOKIE);
      if (refreshToken) {
        rotatedSession = await refreshSession(refreshToken);
        if (rotatedSession) {
          headers.set("authorization", `Bearer ${rotatedSession.access_token}`);
          response = await fetch(target, {
            method: request.method,
            headers,
            body,
            cache: "no-store",
          });
        }
      }
    }
    const responseHeaders = new Headers({ "Content-Type": response.headers.get("content-type") ?? "application/json" });
    for (const name of ["etag", "x-idempotency-replayed"]) {
      const value = response.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    const result = new NextResponse(await response.text(), { status: response.status, headers: responseHeaders });
    if (rotatedSession) setSessionCookies(result, rotatedSession);
    else if (response.status === 401) clearSessionCookies(result);
    return result;
  } catch {
    return NextResponse.json({ success: false, error: { code: "SERVICE_UNAVAILABLE", message: "Catalogue service is temporarily unavailable. Please try again." } }, { status: 503 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
