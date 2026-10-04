import type { Metadata } from "next";
import { WalletPage } from "@/features/wallet";

export const metadata: Metadata = { title: "Wallet", robots: { index: false, follow: false } };

export default function Page() { return <WalletPage />; }
