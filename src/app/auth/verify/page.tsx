import type { Metadata } from "next";
import { VerificationExperience } from "@/features/auth";

export const metadata: Metadata = { title: "Verify account" };

export default function VerifyPage() {
  return (
    <VerificationExperience />
  );
}
