import type { Order } from "./types";

/** Development fixture only. Replace with an orders query when the API is available. */
export const orders: Order[] = [
  {
    id: "TF-1021",
    item: "Vintage camera kit",
    itemId: "ITEM-001",
    catalogueVersion: 2,
    itemSnapshot: { attributes: "35mm body · 50mm lens · leather case", condition: "Good" },
    counterparty: "Maya Okafor",
    role: "Buyer",
    total: 480000,
    status: "action-required",
    nextAction: "Confirm delivery",
    updated: "Today",
  },
  {
    id: "TF-1018",
    item: "Studio monitor pair",
    itemId: "ITEM-002",
    catalogueVersion: 1,
    itemSnapshot: { attributes: "Pair · active monitors · black", condition: "Good" },
    counterparty: "Jordan Lee",
    role: "Seller",
    total: 315000,
    status: "in-transit",
    nextAction: "No action required",
    updated: "Yesterday",
  },
  {
    id: "TF-1013",
    item: "Mechanical keyboard",
    itemId: "ITEM-003",
    catalogueVersion: 2,
    itemSnapshot: { attributes: "Wireless · US layout · tactile switches", condition: "Excellent" },
    counterparty: "Amina Bello",
    role: "Buyer",
    total: 98000,
    status: "completed",
    nextAction: "Settled",
    updated: "28 Sep",
  },
];

export function getOrder(id: string) {
  return orders.find((order) => order.id === id);
}

/**
 * Development-only public link lookup. Keeping this separate from `getOrder`
 * mirrors the access boundary the transaction API will eventually enforce.
 */
export function getPublicOrder(token: string) {
  const publicLinks: Record<string, string> = {
    "camera-review": "TF-1021",
  };

  const orderId = publicLinks[token];
  return orderId ? getOrder(orderId) : undefined;
}

/** Conversations are scoped to an order in this development fixture. */
export function getConversationOrder(conversationId: string) {
  return getOrder(conversationId.toUpperCase());
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
