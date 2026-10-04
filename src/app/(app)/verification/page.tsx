import type { Metadata } from "next";
import { VerificationPage } from "@/features/operations";
export const metadata: Metadata = { title: "Verification", robots: { index: false, follow: false } };
export default function Page() { return <VerificationPage />; }
