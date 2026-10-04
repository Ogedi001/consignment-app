"use client";
export default function Error({ reset }: { reset: () => void }) {
  return <main className="min-h-dvh bg-surface p-8"><section className="mx-auto max-w-lg rounded-xl border border-destructive/25 bg-background p-6"><h1 className="text-xl font-bold">We couldn&apos;t load this page</h1><p className="mt-2 text-sm text-muted-foreground">Your transaction has not changed. Please try again.</p><button className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" onClick={reset}>Try again</button></section></main>;
}
