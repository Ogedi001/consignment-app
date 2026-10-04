import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicOrder, PublicOrder } from "@/features/operations";
export const metadata: Metadata = { title: "Protected transaction", robots: { index: false, follow: false } };
export default async function Page({ params }: { params: Promise<{ publicOrderToken: string }> }) { const { publicOrderToken } = await params; const order = getPublicOrder(publicOrderToken); if (!order) notFound(); return <PublicOrder token={publicOrderToken} order={order} />; }
