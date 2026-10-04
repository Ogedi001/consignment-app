import type { Metadata } from "next";
import { TrustPage } from "@/features/operations";
export const metadata: Metadata = { title: "Trust profile", robots: { index: false, follow: false } };
export default function Page() { return <TrustPage />; }
