import type { Metadata } from "next";
import { NotificationsPage } from "@/features/operations";
export const metadata: Metadata = { title: "Notifications", robots: { index: false, follow: false } };
export default function Page() { return <NotificationsPage />; }
