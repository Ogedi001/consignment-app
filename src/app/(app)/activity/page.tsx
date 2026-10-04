import type { Metadata } from "next";
import { ActivityPage } from "@/features/operations";
export const metadata: Metadata = { title: "Activity", robots: { index: false, follow: false } };
export default function Page() { return <ActivityPage />; }
