import { DisputePage } from "@/features/operations";
export default async function Page({ params }: { params: Promise<{ disputeId: string }> }) { const { disputeId } = await params; return <DisputePage disputeId={disputeId} />; }
