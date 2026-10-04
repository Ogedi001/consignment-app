import type { Metadata } from "next";
import { HomePage } from "@/features/operations";
export const metadata: Metadata = { title: "Home", robots: { index: false, follow: false } };
export default function Page() { return <HomePage />; }
