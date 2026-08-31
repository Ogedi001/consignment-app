import { NextResponse } from "next/server";

export const mockExistingIdentifiers = new Set([
  "demo@trustflow.test",
  "existing@trustflow.test",
  "+2348012345678",
]);

export const mockPassword = "Trustflow123";

export function rejectProductionMocks() {
  if (process.env.NODE_ENV !== "production") return null;

  return NextResponse.json(
    { message: "Authentication mock routes are disabled in production." },
    { status: 501 },
  );
}

export async function readJson(request: Request) {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
