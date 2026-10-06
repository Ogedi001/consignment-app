import type { Metadata } from "next";
import { AuthUnavailableJourney } from "@/features/auth";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <AuthUnavailableJourney
      title="Choose a new password"
      description="Password reset is not available yet. Return to sign in to access an existing account."
    />
  );
}
