import type { Metadata } from "next";
import { Suspense } from "react";
import { VerificationExperience } from "@/features/auth";

export const metadata: Metadata = { title: "Verify account" };

export default function VerifyPage() {
  return (
    <Suspense
      fallback={<main className="min-h-dvh bg-surface" aria-busy="true" />}
    >
      <VerificationExperience />
    </Suspense>
  );
}
