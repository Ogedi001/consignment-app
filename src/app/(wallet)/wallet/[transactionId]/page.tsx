import { notFound } from "next/navigation";
import { getWalletTransaction, WalletTransactionPage } from "@/features/wallet";

export default async function Page({ params }: { params: Promise<{ transactionId: string }> }) { const { transactionId } = await params; const transaction = getWalletTransaction(transactionId); if (!transaction) notFound(); return <WalletTransactionPage transaction={transaction} />; }
