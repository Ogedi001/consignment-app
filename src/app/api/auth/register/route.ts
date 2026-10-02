import { NextResponse } from "next/server";

const trustflowApiUrl =
  process.env.TRUSTFLOW_API_URL ?? process.env.VITE_TRUSTFLOW_API_URL;

export async function POST(request: Request) {
  if (!trustflowApiUrl) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "Identity service is not configured.",
        },
      },
      { status: 503 },
    );
  }

  try {
    const backendResponse = await fetch(
      `${trustflowApiUrl}/identity/auth/register`,
      {
        method: "POST",
        body: await request.text(),
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": request.headers.get("content-type") ?? "application/json",
        },
      },
    );

    return new NextResponse(await backendResponse.text(), {
      status: backendResponse.status,
      headers: {
        "Content-Type": backendResponse.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "Identity service is temporarily unavailable. Please try again.",
        },
      },
      { status: 503 },
    );
  }
}
