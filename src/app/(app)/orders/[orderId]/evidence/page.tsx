import { notFound } from "next/navigation";
import { getOrder, OrderEvidencePage } from "@/features/operations";
export default async function Page({ params }: { params: Promise<{ orderId: string }> }) { const { orderId } = await params; const order = getOrder(orderId); if (!order) notFound(); return <OrderEvidencePage order={order} />; }
