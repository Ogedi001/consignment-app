import { NextResponse } from "next/server";
import {
  DEVICE_KEY_COOKIE,
  identityApiUrl,
  isTokenPayload,
  readRequestCookie,
  setSessionCookies,
} from "../session";

export async function POST(request: Request) {
  const loginUrl = identityApiUrl("/auth/login");
  if (!loginUrl) {
    return NextResponse.json(
      { message: "Identity service is not configured." },
      { status: 503 },
    );
  }

  let body: { identifier?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "A valid sign-in request is required." },
      { status: 400 },
    );
  }
  if (
    typeof body.identifier !== "string" ||
    !body.identifier.trim() ||
    typeof body.password !== "string" ||
    !body.password
  ) {
    return NextResponse.json(
      { message: "Email or phone and password are required." },
      { status: 400 },
    );
  }

  const deviceKey =
    readRequestCookie(request, DEVICE_KEY_COOKIE) ?? crypto.randomUUID();
  const deviceName =
    request.headers.get("user-agent")?.slice(0, 255) || "Web browser";

  console.log({ deviceKey, deviceName, identifier: body.identifier.trim() });
  try {
    const backendResponse = await fetch(loginUrl, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: body.identifier.trim(),
        password: body.password,
        device_key: deviceKey,
        device_name: deviceName,
      }),
    });
    const payload: unknown = await backendResponse.json().catch(() => null);
    if (!backendResponse.ok)
      return NextResponse.json(payload ?? { message: "Sign in failed." }, {
        status: backendResponse.status,
      });

    const data =
      typeof payload === "object" && payload !== null && "data" in payload
        ? (payload as { data: unknown }).data
        : undefined;
    if (!isTokenPayload(data)) {
      return NextResponse.json(
        { message: "The identity service returned an invalid session." },
        { status: 502 },
      );
    }

    const response = NextResponse.json({ redirectTo: "/home" });
    setSessionCookies(response, data);
    response.cookies.set(DEVICE_KEY_COOKIE, deviceKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  } catch {
    return NextResponse.json(
      {
        message:
          "Identity service is temporarily unavailable. Please try again.",
      },
      { status: 503 },
    );
  }
}
