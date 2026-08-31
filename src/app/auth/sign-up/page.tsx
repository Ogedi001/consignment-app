import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthExperience } from "@/features/auth";

export const metadata: Metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <Suspense
      fallback={<main className="min-h-dvh bg-surface" aria-busy="true" />}
    >
      <AuthExperience journey="sign-up" />
    </Suspense>
  );
}
