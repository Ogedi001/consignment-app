export type WalletTransactionStatus =
  | "available"
  | "pending"
  | "processing"
  | "completed";

export type WalletTransaction = {
  id: string;
  type: "Settlement" | "Cashout" | "Escrow funding";
  status: WalletTransactionStatus;
  amount: number;
  occurredAt: string;
  orderId?: string;
  reference: string;
  destination: string;
  fee: number;
  resultingBalance: number;
};

export type WalletSummary = {
  available: number;
  heldInEscrow: number;
  pendingSettlement: number;
  pendingCashout: number;
};
