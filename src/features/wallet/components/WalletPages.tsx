import Link from "next/link";
import { ArrowLeft, ArrowRight, Landmark, ShieldCheck } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@/shared/components/ui";
import { formatMoney } from "@/features/operations/data";
import { walletSummary, walletTransactions } from "../data";
import type { WalletTransaction, WalletTransactionStatus } from "../types";

const statusCopy: Record<WalletTransactionStatus, string> = {
  available: "Available",
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
};

function TransactionStatus({ status }: { status: WalletTransactionStatus }) {
  return <span className="text-xs font-semibold text-muted-foreground">{statusCopy[status]}</span>;
}

function TransactionRow({ transaction }: { transaction: WalletTransaction }) {
  return (
    <li>
      <Link
        href={`/wallet/${encodeURIComponent(transaction.id)}`}
        className="flex items-center justify-between gap-4 p-5 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div>
          <p className="font-semibold">{transaction.type}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {transaction.orderId ? `Order ${transaction.orderId} · ` : ""}{transaction.occurredAt}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{formatMoney(Math.abs(transaction.amount))}</p>
          <TransactionStatus status={transaction.status} />
        </div>
      </Link>
    </li>
  );
}

export function WalletPage() {
  const balances = [
    ["Available to cash out", walletSummary.available, "Funds already released to your wallet."],
    ["Held in transactions", walletSummary.heldInEscrow, "Protected funds that cannot be cashed out yet."],
    ["Pending settlement", walletSummary.pendingSettlement, "Awaiting the transaction's settlement conditions."],
  ] as const;
  return (
    <>
      <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Escrow wallet</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Funds connected to your transactions</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Escrow stays with its order until settlement. Only released funds become available to cash out.</p>
        </div>
        <Button asChild disabled={walletSummary.available === 0}>
          <Link href="/wallet/cashout">Cash out</Link>
        </Button>
      </header>
      <section className="grid gap-4 md:grid-cols-3" aria-label="Wallet balances">
        {balances.map(([label, amount, description]) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <p className="text-sm font-semibold text-muted-foreground">{label}</p>
              <p className="mt-3 text-2xl font-bold tracking-tight">{formatMoney(amount)}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      {walletSummary.pendingCashout > 0 ? <p className="mt-5 text-sm text-muted-foreground">{formatMoney(walletSummary.pendingCashout)} is currently processing for cashout.</p> : null}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-lg font-bold">Recent wallet activity</h2><Link href="/wallet/transactions" className="text-sm font-semibold text-primary hover:underline">View all activity</Link></div>
        <div className="overflow-hidden rounded-xl border border-border bg-background"><ul className="divide-y divide-border">{walletTransactions.slice(0, 3).map((transaction) => <TransactionRow key={transaction.id} transaction={transaction} />)}</ul></div>
      </section>
    </>
  );
}

export function WalletTransactionsPage() {
  return <><header className="mb-7"><h1 className="text-3xl font-bold tracking-tight">Wallet activity</h1><p className="mt-2 text-muted-foreground">Settlement, escrow, and cashout activity related to your TrustFlow transactions.</p></header><div className="overflow-hidden rounded-xl border border-border bg-background"><ul className="divide-y divide-border">{walletTransactions.map((transaction) => <TransactionRow key={transaction.id} transaction={transaction} />)}</ul></div></>;
}

export function WalletTransactionPage({ transaction }: { transaction: WalletTransaction }) {
  return <div className="mx-auto max-w-2xl"><Link href="/wallet/transactions" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="size-4" />Wallet activity</Link><header className="mb-7"><p className="text-sm font-semibold text-muted-foreground">{transaction.id}</p><h1 className="mt-1 text-3xl font-bold tracking-tight">{transaction.type}</h1><p className="mt-2 text-muted-foreground">{transaction.occurredAt} · <TransactionStatus status={transaction.status} /></p></header><Card><CardContent className="space-y-4 pt-6 text-sm"><div className="flex justify-between gap-4"><span className="text-muted-foreground">Amount</span><strong>{formatMoney(Math.abs(transaction.amount))}</strong></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Destination</span><strong>{transaction.destination}</strong></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Fee</span><strong>{formatMoney(transaction.fee)}</strong></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Reference</span><strong>{transaction.reference}</strong></div><div className="flex justify-between gap-4 border-t border-border pt-4"><span className="text-muted-foreground">Balance after movement</span><strong>{formatMoney(transaction.resultingBalance)}</strong></div>{transaction.orderId ? <Button asChild variant="outline" className="mt-2 w-full"><Link href={`/orders/${encodeURIComponent(transaction.orderId)}`}>View order {transaction.orderId}<ArrowRight /></Link></Button> : null}</CardContent></Card></div>;
}

export function CashoutPage() {
  return <div className="mx-auto max-w-2xl"><Link href="/wallet" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="size-4" />Wallet</Link><header className="mb-7"><h1 className="text-3xl font-bold tracking-tight">Cash out available funds</h1><p className="mt-2 text-muted-foreground">Only funds released after settlement can be sent to your payout account.</p></header><Card><CardHeader><CardTitle>Available to cash out: {formatMoney(walletSummary.available)}</CardTitle></CardHeader><CardContent className="space-y-5"><label className="grid gap-2 text-sm font-semibold">Payout destination<span className="rounded-lg border border-border bg-surface p-3 font-normal text-muted-foreground">Verified payout account</span></label><label className="grid gap-2 text-sm font-semibold">Amount<Input inputMode="numeric" placeholder="Enter an amount" aria-describedby="cashout-help" /></label><p id="cashout-help" className="text-sm leading-6 text-muted-foreground">Your payout provider confirms the cashout after you review it. Funds remain in your wallet until that confirmation.</p><Button asChild className="w-full"><Link href="/wallet/cashout/review">Review cashout</Link></Button></CardContent></Card></div>;
}

export function CashoutReviewPage() {
  return <div className="mx-auto max-w-2xl"><Link href="/wallet/cashout" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="size-4" />Edit cashout</Link><header className="mb-7"><h1 className="text-3xl font-bold tracking-tight">Review cashout</h1><p className="mt-2 text-muted-foreground">Confirm the payout details before TrustFlow sends this request to the payout provider.</p></header><Card><CardContent className="space-y-4 pt-6 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Amount</span><strong>Enter an amount to continue</strong></div><div className="flex justify-between"><span className="text-muted-foreground">Destination</span><strong>Verified payout account</strong></div><div className="rounded-lg bg-surface p-4 leading-6 text-muted-foreground"><ShieldCheck className="mb-2 size-5 text-primary" />Cashout confirmation is unavailable until the wallet payout API is connected. No funds will move from this development surface.</div><Button disabled className="w-full">Confirm cashout</Button></CardContent></Card></div>;
}

export function CashoutSuccessPage() {
  return <div className="mx-auto max-w-2xl"><header className="mb-7"><p className="text-sm font-semibold text-primary">Cashout status</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Cashout completed</h1><p className="mt-2 text-muted-foreground">A completed payout will appear here only after the payout provider confirms it.</p></header><Card><CardContent className="pt-6"><Landmark className="size-6 text-success" /><p className="mt-4 text-sm leading-6 text-muted-foreground">This route is reserved for a confirmed cashout. Review wallet activity for confirmed transactions.</p><Button asChild className="mt-6"><Link href="/wallet/transactions">View wallet activity</Link></Button></CardContent></Card></div>;
}
