import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getConversationOrder, MessagesPage } from "@/features/operations";
export const metadata: Metadata = { title: "Conversation", robots: { index: false, follow: false } };
export default async function Page({ params }: { params: Promise<{ conversationId: string }> }) { const { conversationId } = await params; const order = getConversationOrder(conversationId); if (!order) notFound(); return <MessagesPage conversationId={conversationId} linkedOrder={order} />; }
