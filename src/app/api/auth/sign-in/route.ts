import { NextResponse } from "next/server";
import {
  isNonEmptyString,
  mockExistingIdentifiers,
  mockPassword,
  readJson,
  rejectProductionMocks,
} from "../mock";

export async function POST(request: Request) {
  const unavailable = rejectProductionMocks();
  if (unavailable) return unavailable;

  const body = await readJson(request);
  const identifier = body?.identifier;
  const password = body?.password;

  if (
    !isNonEmptyString(identifier) ||
    !isNonEmptyString(password) ||
    !mockExistingIdentifiers.has(identifier.trim().toLowerCase()) ||
    password !== mockPassword
  ) {
    return NextResponse.json({ message: "Incorrect password. Try again." }, { status: 401 });
  }

  return NextResponse.json({ redirectTo: "/auth?demo=sign-in" });
}
