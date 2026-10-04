export type OrderStatus = "action-required" | "in-transit" | "completed";

export type Order = {
  id: string;
  item: string;
  counterparty: string;
  role: "Buyer" | "Seller";
  total: number;
  status: OrderStatus;
  nextAction: string;
  updated: string;
};
