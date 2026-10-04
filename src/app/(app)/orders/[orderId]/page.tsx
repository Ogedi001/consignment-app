import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrder, OrderDetail } from "@/features/operations";
export const metadata: Metadata = { title: "Order", robots: { index: false, follow: false } };
export default async function Page({ params }: { params: Promise<{ orderId: string }> }) { const { orderId } = await params; const order = getOrder(orderId); if (!order) notFound(); return <OrderDetail order={order} />; }
