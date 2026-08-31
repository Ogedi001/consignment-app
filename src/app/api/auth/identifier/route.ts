import { NextResponse } from "next/server";
import {
  isNonEmptyString,
  mockExistingIdentifiers,
  readJson,
  rejectProductionMocks,
} from "../mock";

export async function POST(request: Request) {
  const unavailable = rejectProductionMocks();
  if (unavailable) return unavailable;

  const body = await readJson(request);
  const identifier = body?.identifier;

  if (!isNonEmptyString(identifier)) {
    return NextResponse.json({ message: "A valid identifier is required." }, { status: 400 });
  }

  return NextResponse.json({
    nextStep: mockExistingIdentifiers.has(identifier.trim().toLowerCase())
      ? "password"
      : "signup",
  });
}
