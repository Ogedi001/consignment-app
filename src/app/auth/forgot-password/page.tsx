import type { Metadata } from "next";
import { AuthUnavailableJourney } from "@/features/auth";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <AuthUnavailableJourney
      title="Reset your password"
      description="Password recovery is not available yet. Return to sign in to access an existing account."
    />
  );
}
