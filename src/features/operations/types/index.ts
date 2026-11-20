export type OrderStatus = "action-required" | "in-transit" | "completed";

export type Order = {
  id: string;
  item: string;
  itemId: string;
  catalogueVersion: number;
  itemSnapshot: {
    attributes: string;
    condition: string;
  };
  counterparty: string;
  role: "Buyer" | "Seller";
  total: number;
  status: OrderStatus;
  nextAction: string;
  updated: string;
};
