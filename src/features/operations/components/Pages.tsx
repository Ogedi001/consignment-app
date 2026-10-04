import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  MessageSquare,
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

export function HomePage() {
  const attention = orders[0];
  return (
    <>
      <header className="mb-8">
        <p className="text-sm font-semibold text-primary">Overview</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          What needs your attention
        </h1>
        <p className="mt-2 text-muted-foreground">
          Clear next steps for your protected transactions.
        </p>
      </header>
      <section className="mb-8 rounded-xl border border-warning/30 bg-warning/5 p-5">
        <p className="text-sm font-semibold text-amber-800">Action required</p>
        <h2 className="mt-1 text-xl font-bold">
          Confirm delivery for {attention.item}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {formatMoney(attention.total)} remains protected until you confirm
          delivery or report an issue.
        </p>
        <Button asChild className="mt-5">
          <Link href={`/orders/${attention.id}`}>
            Review order <ArrowRight />
          </Link>
        </Button>
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active transactions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {orders.slice(0, 2).map((order) => (
              <Link
                className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 hover:bg-surface"
                key={order.id}
                href={`/orders/${order.id}`}
              >
                <div>
                  <p className="font-semibold">{order.item}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.id} · {formatMoney(order.total)}
                  </p>
                </div>
                <Status status={order.status} />
              </Link>
            ))}
            <Link
              href="/orders"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View all orders
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <p>
              <strong>Seller shipped the order</strong>
              <br />
              <span className="text-muted-foreground">
                {attention.id} · Today
              </span>
            </p>
            <p>
              <strong>Payment protected</strong>
              <br />
              <span className="text-muted-foreground">TF-1018 · Yesterday</span>
            </p>
            <Link
              href="/activity"
              className="font-semibold text-primary hover:underline"
            >
              View activity
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export function ActivityPage() {
  const events = [
    { label: "Seller shipped the order", href: "/orders/TF-1021", context: "Order TF-1021", date: "Today" },
    { label: "Payment protected in escrow", href: "/orders/TF-1018", context: "Order TF-1018", date: "This week" },
    { label: "Wallet credited after settlement", href: "/wallet/WLT-1001", context: "Settlement for TF-1013", date: "This week" },
    { label: "Identity verification completed", href: "/verification", context: "Verification", date: "This week" },
  ];
  return (
    <PageHeading
      title="Activity"
      description="A clear record of changes to your transactions."
    >
      <div className="rounded-xl border border-border bg-background">
        <ul className="divide-y divide-border">
          {events.map((event) => (
            <li key={event.label} className="flex gap-4 p-5">
              <CheckCircle2 className="mt-0.5 size-5 text-primary" />
              <div>
                <p className="font-semibold">{event.label}</p>
                <Link
                  href={event.href}
                  className="mt-1 block text-sm text-primary hover:underline"
                >
                  {event.context}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">
                  {event.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageHeading>
  );
}

export function MessagesPage({
  conversationId,
  linkedOrder,
}: {
  conversationId?: string;
  linkedOrder?: Order;
}) {
  const conversationOrder = linkedOrder ?? orders[0];
  return (
    <PageHeading
      title={conversationId ? "Conversation" : "Messages"}
      description={
        conversationId
          ? `About ${conversationOrder.id} · ${conversationOrder.item}`
          : "Messages tied to your transactions."
      }
    >
      {conversationId ? (
        <>
          <Link
            className="mb-5 inline-block text-sm font-semibold text-primary hover:underline"
            href="/messages"
          >
            All conversations
          </Link>
          <Card>
            <CardHeader>
              <CardTitle>{conversationOrder.counterparty}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="max-w-md rounded-lg bg-surface p-3 text-sm">
                The delivery has arrived. Please confirm when you have checked
                the item.
              </p>
              <p className="ml-auto max-w-md rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                I&apos;ll review it today. Thank you.
              </p>
              <Link
                href={`/orders/${conversationOrder.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View {conversationOrder.id}
                <ChevronRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="rounded-xl border border-border bg-background">
          <Link
            href="/messages/tf-1021"
            className="flex items-center gap-4 p-5 hover:bg-surface"
          >
            <MessageSquare className="size-5 text-primary" />
            <div>
              <p className="font-semibold">{conversationOrder.counterparty}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Order {conversationOrder.id} · Delivery confirmation
              </p>
            </div>
            <ChevronRight className="ml-auto size-4 text-muted-foreground" />
          </Link>
        </div>
      )}
    </PageHeading>
  );
}

export function TrustPage() {
  return (
    <PageHeading
      title="Trust profile"
      description="Information that helps others understand how you trade."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your identity and phone number are verified.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link href="/verification">View verification</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transaction history</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12 completed</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Completed transactions and responsible participation help build a
              useful trust record.
            </p>
          </CardContent>
        </Card>
      </div>
      <section className="mt-6 rounded-xl border border-border bg-background p-6">
        <h2 className="font-bold">How trust is represented</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          TrustFlow shows verified information and transaction outcomes in
          context. It does not reduce your history to a single score.
        </p>
      </section>
    </PageHeading>
  );
}

export function VerificationPage() {
  return (
    <PageHeading
      title="Verification"
      description="Keep the details that support your transactions up to date."
    >
      <div className="rounded-xl border border-border bg-background">
        <div className="flex items-center justify-between gap-4 border-b border-border p-5">
          <div>
            <p className="font-semibold">Identity</p>
            <p className="mt-1 text-sm text-muted-foreground">Verified</p>
          </div>
          <CheckCircle2 className="size-5 text-success" />
        </div>
        <div className="flex items-center justify-between gap-4 p-5">
          <div>
            <p className="font-semibold">Phone</p>
            <p className="mt-1 text-sm text-muted-foreground">Verified</p>
          </div>
          <CheckCircle2 className="size-5 text-success" />
        </div>
      </div>
      <Button asChild variant="outline" className="mt-6">
        <Link href="/onboarding/identity">Manage identity details</Link>
      </Button>
    </PageHeading>
  );
}

export function NotificationsPage() {
  return (
    <PageHeading
      title="Notifications"
      description="Updates that lead directly to the relevant transaction."
    >
      <div className="rounded-xl border border-border bg-background">
        <Link
          href="/orders/TF-1021"
          className="flex gap-4 p-5 hover:bg-surface"
        >
          <CircleAlert className="size-5 text-warning" />
          <div>
            <p className="font-semibold">
              Confirm delivery for Vintage camera kit
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Payment remains protected until you complete this step.
            </p>
          </div>
          <ChevronRight className="ml-auto size-4 text-muted-foreground" />
        </Link>
        <Link
          href="/wallet"
          className="flex gap-4 border-t border-border p-5 hover:bg-surface"
        >
          <CheckCircle2 className="size-5 text-success" />
          <div>
            <p className="font-semibold">Funds are available to cash out</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Settlement has credited your TrustFlow wallet.
            </p>
          </div>
          <ChevronRight className="ml-auto size-4 text-muted-foreground" />
        </Link>
      </div>
    </PageHeading>
  );
}

export function PageHeading({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="mb-7">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </header>
      {children}
    </>
  );
}
