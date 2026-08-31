import type { Metadata } from "next";
import { AuthUnavailableJourney } from "@/features/auth";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <AuthUnavailableJourney
      title="Choose a new password"
      description="This route is reserved for a verified password-reset session. A reset-token contract has not yet been integrated."
    />
  );
}
