import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  clearSessionCookies,
  readRequestCookie,
  refreshSession,
  setSessionCookies,
} from "@/app/api/auth/session";

function signInResponse(request: NextRequest) {
  const url = new URL("/auth/sign-in", request.url);
  url.searchParams.set("redirect", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  const response = NextResponse.redirect(url);
  clearSessionCookies(response);
  return response;
}

export async function middleware(request: NextRequest) {
  if (readRequestCookie(request, ACCESS_TOKEN_COOKIE)) return NextResponse.next();

  const refreshToken = readRequestCookie(request, REFRESH_TOKEN_COOKIE);
  if (!refreshToken) return signInResponse(request);

  const rotatedSession = await refreshSession(refreshToken);
  if (!rotatedSession) return signInResponse(request);

  const response = NextResponse.next();
  setSessionCookies(response, rotatedSession);
  return response;
}

export const config = {
  matcher: [
    "/activity/:path*",
    "/catalogue/:path*",
    "/home/:path*",
    "/messages/:path*",
    "/notifications/:path*",
    "/onboarding/:path*",
    "/orders/:path*",
    "/settings/:path*",
    "/support/:path*",
    "/trust/:path*",
    "/transactions/:path*",
    "/verification/:path*",
    "/wallet/:path*",
  ],
};
