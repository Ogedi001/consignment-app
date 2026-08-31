import type { Metadata } from "next";
import { AuthUnavailableJourney } from "@/features/auth";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <AuthUnavailableJourney
      title="Reset your password"
      description="Password recovery will be available here once the Trustflow authentication service provides its recovery contract."
    />
  );
}
