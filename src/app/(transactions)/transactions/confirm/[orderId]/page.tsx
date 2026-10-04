import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/features/operations";
export default async function Page({ params }: { params: Promise<{ orderId: string }> }) { const { orderId } = await params; const order = getOrder(orderId); if (!order) notFound(); return <section className="mx-auto max-w-2xl"><h1 className="text-3xl font-bold">Confirm delivery</h1><p className="mt-3 text-muted-foreground">Review {order.item} before confirming. Delivery confirmation is not connected to the transaction service yet, so no state will change here.</p><Link href={`/orders/${encodeURIComponent(orderId)}`} className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Return to order</Link></section>; }
