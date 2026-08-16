# Frontend integration guide

Use this workflow when adding a product capability. `orders` below is an
example feature name.

## 1. Create the feature

```text
src/features/orders/
├── components/
├── services/
├── types/
└── index.ts
```

Add `hooks/`, `stores/`, and `utils/` only when required. Define domain types
inside the feature:

```ts
export type Order = { id: string; status: "draft" | "funded" | "complete" };
export type CreateOrderInput = { reference: string };
```

## 2. Connect the backend

Place HTTP entry points in `src/app/api`. A handler validates input, calls its
server-side service, and returns a stable JSON shape. Keep UI logic out of the
handler; enforce authentication and authorization at this boundary or deeper in
the server-side service.

```ts
// app/api/orders/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([]); // Replace with the server-side service call.
}
```

## 3. Add the React Query hook

Feature services own query keys and API access. Do not call `fetch` directly in
components.

```ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib";
import type { Order } from "../types";

export const orderKeys = {
  all: ["orders"] as const,
  list: () => [...orderKeys.all, "list"] as const,
};

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.list(),
    queryFn: () => api<Order[]>("/api/orders"),
  });
}
```

For mutations, use `useMutation` and invalidate the relevant feature key after
success. Add optimistic updates only if the rollback behavior is defined.

## 4. Build and export UI

Query-using components are Client Components and must handle every request
state. Keep business-specific composition in the feature and reuse primitives
from `shared/components/ui`.

```tsx
"use client";

import { useOrders } from "../services/order.queries";

export function OrderList() {
  const { data, error, isPending } = useOrders();
  if (isPending) return <p>Loading orders…</p>;
  if (error) return <p role="alert">Unable to load orders.</p>;
  return <ul>{data.map((order) => <li key={order.id}>{order.status}</li>)}</ul>;
}
```

Export the intended public API only:

```ts
// features/orders/index.ts
export * from "./components/OrderList";
export * from "./services/order.queries";
export * from "./types";
```

Routes then use `import { OrderList } from "@/features/orders"`.

## 5. Use Zustand only when justified

Use local state first. Use `features/orders/stores` for shared feature UI state,
or `shared/stores/app.store.ts` for truly app-wide UI state. Do not store API
entities, API loading flags, or mutation results in Zustand.

## 6. Final verification

```bash
pnpm lint
pnpm build
```

Also manually verify loading, error, empty, and mutation-success paths.
