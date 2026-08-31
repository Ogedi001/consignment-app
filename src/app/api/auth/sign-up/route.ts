import { NextResponse } from "next/server";
import { isNonEmptyString, readJson, rejectProductionMocks } from "../mock";

export async function POST(request: Request) {
  const unavailable = rejectProductionMocks();
  if (unavailable) return unavailable;

  const body = await readJson(request);
  if (!isNonEmptyString(body?.identifier) || !isNonEmptyString(body?.password)) {
    return NextResponse.json({ message: "Identifier and password are required." }, { status: 400 });
  }

  return NextResponse.json({ redirectTo: "/auth?demo=sign-up" });
}
