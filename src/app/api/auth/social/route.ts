import { NextResponse } from "next/server";
import { readJson, rejectProductionMocks } from "../mock";

export async function POST(request: Request) {
  const unavailable = rejectProductionMocks();
  if (unavailable) return unavailable;

  const body = await readJson(request);
  const provider = body?.provider;
  if (provider !== "google" && provider !== "apple") {
    return NextResponse.json({ message: "A supported provider is required." }, { status: 400 });
  }

  return NextResponse.json({ redirectUrl: `/auth/callback/${provider}?demo=1` });
}
