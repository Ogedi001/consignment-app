import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";
import { formatMoney, orders } from "../data";
import type { Order } from "../types";
import { Status } from "./Status";

export function OrderList({
  title = "Orders",
  description = "Your protected transactions and what needs attention.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <>
      <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <Button asChild>
          <Link href="/transactions/create/item">Create transaction</Link>
        </Button>
      </header>
      <div
        className="mb-5 flex gap-2 overflow-x-auto pb-1"
        aria-label="Order filters"
      >
        {["All", "Buying", "Selling", "Needs action", "Completed"].map(
          (filter, index) => (
            <span
              key={filter}
              className={
                index === 0
                  ? "rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground"
                  : "rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-muted-foreground"
              }
            >
              {filter}
            </span>
          ),
        )}
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <ul className="divide-y divide-border">
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </ul>
      </div>
    </>
  );
}

function OrderRow({ order }: { order: Order }) {
  return (
    <li>
      <Link
        href={`/orders/${encodeURIComponent(order.id)}`}
        className="block p-5 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-bold">{order.item}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {order.id} · {order.role} · {order.counterparty}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{formatMoney(order.total)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Updated {order.updated}
              </p>
            </div>
            <Status status={order.status} />
            <ArrowRight className="size-4 text-muted-foreground" />
          </div>
        </div>
      </Link>
    </li>
  );
}

export function OrderDetail({ order }: { order: Order }) {
  const actionHref =
    order.status === "action-required"
      ? `/transactions/confirm/${encodeURIComponent(order.id)}`
      : `/messages/${encodeURIComponent(order.id.toLowerCase())}`;
  return (
    <>
      <Link
        href="/orders"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Orders
      </Link>
      <header className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            {order.id}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {order.item}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {order.role} transaction with {order.counterparty}
          </p>
        </div>
        <Status status={order.status} />
      </header>
      <section className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-primary">
              {order.status === "action-required"
                ? "Your action is needed"
                : order.status === "in-transit"
                  ? "Your item is in transit"
                  : "This transaction is complete"}
            </p>
            <h2 className="mt-1 text-xl font-bold">{order.nextAction}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {order.status === "action-required"
                ? "Confirm delivery once the item arrives. Payment remains protected until confirmation."
                : "The transaction state is recorded here so both parties understand what happens next."}
            </p>
          </div>
          <Button asChild>
            <Link href={actionHref}>
              {order.status === "action-required"
                ? "Confirm delivery"
                : "Message counterparty"}
            </Link>
          </Button>
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Transaction progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-5 border-l border-border pl-5 text-sm">
              <li>
                <strong>Payment protected</strong>
                <p className="mt-1 text-muted-foreground">
                  {formatMoney(order.total)} is held until delivery is
                  confirmed.
                </p>
              </li>
              <li>
                <strong>
                  {order.status === "in-transit"
                    ? "Shipment in transit"
                    : "Delivery recorded"}
                </strong>
                <p className="mt-1 text-muted-foreground">
                  The latest shipment update is visible to both parties.
                </p>
              </li>
              <li>
                <strong>
                  {order.status === "completed"
                    ? "Settlement complete"
                    : "Confirmation and settlement"}
                </strong>
                <p className="mt-1 text-muted-foreground">
                  Payment is released only when the transaction conditions are
                  met.
                </p>
              </li>
            </ol>
          </CardContent>
        </Card>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Escrow and settlement</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              <p className="font-semibold text-foreground">
                {order.status === "completed"
                  ? "Funds released after settlement"
                  : "Funds held in escrow"}
              </p>
              <p className="mt-2">
                {order.status === "completed"
                  ? "This transaction's conditions were satisfied and the seller wallet was credited."
                  : `${formatMoney(order.total)} remains protected until the delivery and settlement conditions are met.`}
              </p>
              {order.status === "completed" ? (
                <Link
                  href="/wallet/WLT-1001"
                  className="mt-3 inline-block font-semibold text-primary hover:underline"
                >
                  View wallet settlement
                </Link>
              ) : null}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Protection</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              <ShieldCheck className="mb-3 size-5 text-primary" />
              Payment is protected. Any issue should be raised before
              settlement.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>People and amount</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {order.role === "Buyer" ? "Seller" : "Buyer"}
                </span>
                <span className="font-semibold">{order.counterparty}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Total protected</span>
                <span className="font-semibold">
                  {formatMoney(order.total)}
                </span>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link
                href={`/messages/${encodeURIComponent(order.id.toLowerCase())}`}
              >
                <MessageSquare />
                Message
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link
                href={`/disputes/create?order=${encodeURIComponent(order.id)}`}
              >
                Report an issue
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
