import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from "@/shared/components/ui";
import { formatMoney, getOrder, getPublicOrder } from "../data";
import { PageHeading } from "./Pages";

const steps = ["item", "buyer", "protection", "review", "complete"];
const copy: Record<string, [string, string]> = {
  item: ["What is being protected?", "Describe the item and its agreed value."],
  buyer: [
    "Who is the other party?",
    "Add the buyer so they can review the transaction.",
  ],
  protection: [
    "Set protection terms",
    "Make delivery and confirmation conditions clear.",
  ],
  review: [
    "Review transaction",
    "Confirm the details before inviting the buyer.",
  ],
  complete: [
    "Transaction created",
    "The buyer can now review and pay through the protected flow.",
  ],
};
export function CreateTransaction({ step }: { step: string }) {
  const index = Math.max(0, steps.indexOf(step));
  const [title, description] = copy[step] ?? copy.item;
  const previous = index
    ? `/transactions/create/${steps[index - 1]}`
    : "/orders";
  const next =
    index === steps.length - 1
      ? "/orders/TF-1021"
      : `/transactions/create/${steps[index + 1]}`;
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={previous}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <p className="text-sm font-semibold text-primary">
        Step {index + 1} of {steps.length}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-primary"
          style={{ width: `${((index + 1) / steps.length) * 100}%` }}
        />
      </div>
      <PageHeading title={title} description={description}>
        <Card>
          <CardContent className="pt-6">
            {step === "complete" ? (
              <div>
                <CheckCircle2 className="size-8 text-success" />
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  The transaction is ready for the buyer&apos;s next step. You
                  can follow its progress from the order page.
                </p>
              </div>
            ) : step === "review" ? (
              <div className="space-y-3 text-sm">
                <p className="font-semibold">Vintage camera kit</p>
                <p className="text-muted-foreground">Buyer: Maya Okafor</p>
                <p className="text-muted-foreground">
                  Protected total: ₦480,000
                </p>
              </div>
            ) : (
              <label className="grid gap-2 text-sm font-semibold">
                {step === "item"
                  ? "Item details"
                  : step === "buyer"
                    ? "Buyer email or phone"
                    : "Delivery confirmation condition"}
                <Input
                  placeholder={
                    step === "item"
                      ? "e.g. Vintage camera kit"
                      : step === "buyer"
                        ? "buyer@example.com"
                        : "Buyer confirms delivery"
                  }
                />
              </label>
            )}
            <div className="mt-7 flex justify-between gap-3">
              <Button asChild variant="outline">
                <Link href={previous}>Back</Link>
              </Button>
              <Button asChild>
                <Link href={next}>
                  {step === "complete" ? "View order" : "Continue"}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </PageHeading>
    </div>
  );
}

export function PaymentPage({ orderId }: { orderId: string }) {
  const order = getOrder(orderId);
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/orders/${encodeURIComponent(orderId)}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to order
      </Link>
      <PageHeading
        title="Pay into TrustFlow Escrow"
        description="Your payment is not complete until your payment provider confirms it."
      >
        {order ? (
          <Card>
            <CardHeader>
              <CardTitle>{order.item}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Seller</span>
                <span className="font-semibold">{order.counterparty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item total</span>
                <span className="font-semibold">
                  {formatMoney(order.total)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-4">
                <span className="font-semibold">Total entering escrow</span>
                <span className="font-bold">{formatMoney(order.total)}</span>
              </div>
              <div className="rounded-lg bg-surface p-3 leading-6 text-muted-foreground">
                <ShieldCheck className="mb-2 size-5 text-primary" />
                The seller does not receive these funds immediately. Once
                confirmed, payment stays in escrow until delivery conditions are met.
              </div>
              <Button disabled className="w-full">
                Pay into escrow — provider not connected
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                No payment has been initiated in this development surface.
              </p>
            </CardContent>
          </Card>
        ) : (
          <p>We could not find that order.</p>
        )}
      </PageHeading>
    </div>
  );
}

export function PublicOrder({ token, order }: { token: string; order: NonNullable<ReturnType<typeof getPublicOrder>> }) {
  return (
    <main className="min-h-dvh bg-surface px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="text-lg font-bold text-brand-navy">
          Trustflow
        </Link>
        <section className="mt-8 rounded-xl border border-border bg-background p-5 sm:p-7">
          <p className="text-sm font-semibold text-primary">
            Protected transaction
          </p>
          <h1 className="mt-2 text-2xl font-bold">{order.item}</h1>
          <p className="mt-2 text-muted-foreground">
            A private transaction shared with you.
          </p>
          <dl className="mt-7 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Seller</dt>
              <dd className="font-semibold">{order.counterparty} · Verified</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Total</dt>
              <dd className="font-semibold">{formatMoney(order.total)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Protection</dt>
              <dd className="font-semibold">
                Payment protected after confirmation
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Next step</dt>
              <dd className="font-semibold">Review and pay</dd>
            </div>
          </dl>
          <Button asChild className="mt-8 w-full">
            <Link
              href={`/login?redirect=${encodeURIComponent(`/order/${token}`)}`}
            >
              Sign in to continue
            </Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            You will return to this transaction after signing in.
          </p>
        </section>
      </div>
    </main>
  );
}
