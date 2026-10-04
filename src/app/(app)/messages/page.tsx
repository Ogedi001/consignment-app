import type { Metadata } from "next";
import { MessagesPage } from "@/features/operations";
export const metadata: Metadata = { title: "Messages", robots: { index: false, follow: false } };
export default function Page() { return <MessagesPage />; }
