import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrder, PaymentPage } from "@/features/operations";
export const metadata: Metadata = { title: "Protected payment", robots: { index: false, follow: false } };
export default async function Page({ params }: { params: Promise<{ orderId: string }> }) { const { orderId } = await params; if (!getOrder(orderId)) notFound(); return <PaymentPage orderId={orderId} />; }
