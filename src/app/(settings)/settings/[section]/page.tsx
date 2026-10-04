import { notFound } from "next/navigation";
import { SettingsPage } from "@/features/operations";
const sections = new Set(["profile", "security", "verification", "notifications", "privacy", "payments", "sessions"]);
export default async function Page({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; if (!sections.has(section)) notFound(); return <SettingsPage section={section} />; }
