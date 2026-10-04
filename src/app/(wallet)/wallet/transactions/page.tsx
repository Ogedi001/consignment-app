import type { Metadata } from "next";
import { WalletTransactionsPage } from "@/features/wallet";

export const metadata: Metadata = { title: "Wallet activity", robots: { index: false, follow: false } };

export default function Page() { return <WalletTransactionsPage />; }
