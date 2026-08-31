import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthGateway } from "@/features/auth";

export const metadata: Metadata = { title: "Authentication" };

export default function AuthPage() {
  return (
    <Suspense fallback={<main className="min-h-dvh bg-surface" aria-busy="true" />}>
      <AuthGateway />
    </Suspense>
  );
}
