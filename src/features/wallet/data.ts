import type { WalletSummary, WalletTransaction } from "./types";

/** Development fixtures only. Financial balances must come from the wallet API. */
export const walletSummary: WalletSummary = {
  available: 245000,
  heldInEscrow: 315000,
  pendingSettlement: 120000,
  pendingCashout: 0,
};

export const walletTransactions: WalletTransaction[] = [
  {
    id: "WLT-1003",
    type: "Escrow funding",
    status: "pending",
    amount: 315000,
    occurredAt: "1 Oct 2026, 14:20",
    orderId: "TF-1018",
    reference: "ESC-TF-1018",
    destination: "Held for settlement",
    fee: 0,
    resultingBalance: 245000,
  },
  {
    id: "WLT-1001",
    type: "Settlement",
    status: "completed",
    amount: 98000,
    occurredAt: "28 Sep 2026, 10:05",
    orderId: "TF-1013",
    reference: "SET-TF-1013",
    destination: "TrustFlow wallet",
    fee: 0,
    resultingBalance: 295000,
  },
  {
    id: "WLT-1002",
    type: "Cashout",
    status: "completed",
    amount: -50000,
    occurredAt: "29 Sep 2026, 09:40",
    reference: "CASH-1002",
    destination: "Verified payout account",
    fee: 0,
    resultingBalance: 245000,
  },
];

export function getWalletTransaction(id: string) {
  return walletTransactions.find((transaction) => transaction.id === id);
}
