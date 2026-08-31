import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthExperience } from "@/features/auth";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <Suspense
      fallback={<main className="min-h-dvh bg-surface" aria-busy="true" />}
    >
      <AuthExperience journey="sign-in" />
    </Suspense>
  );
}
