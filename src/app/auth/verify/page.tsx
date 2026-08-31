import type { Metadata } from "next";
import { AuthUnavailableJourney } from "@/features/auth";

export const metadata: Metadata = { title: "Verify account" };

export default function VerifyPage() {
  return (
    <AuthUnavailableJourney
      title="Verify your account"
      description="Email, phone, and identity verification are deliberately separate from basic authentication. This route is ready for its future verification contract."
    />
  );
}
