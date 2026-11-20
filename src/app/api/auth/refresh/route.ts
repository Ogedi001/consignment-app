import { NextResponse } from "next/server";
import { REFRESH_TOKEN_COOKIE, clearSessionCookies, readRequestCookie, refreshSession, setSessionCookies } from "../session";

export async function POST(request: Request) {
  const refreshToken = readRequestCookie(request, REFRESH_TOKEN_COOKIE);
  if (!refreshToken) {
    const response = NextResponse.json({ message: "Your session has expired. Please sign in again." }, { status: 401 });
    clearSessionCookies(response);
    return response;
  }
  try {
    const data = await refreshSession(refreshToken);
    if (!data) {
      const response = NextResponse.json({ message: "Your session has expired. Please sign in again." }, { status: 401 });
      clearSessionCookies(response);
      return response;
    }
    const response = NextResponse.json({ refreshed: true });
    setSessionCookies(response, data);
    return response;
  } catch {
    return NextResponse.json({ message: "Identity service is temporarily unavailable. Please try again." }, { status: 503 });
  }
}
