"use client";

import { ShieldCheck } from "lucide-react";

export function PricingPreview() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Pricing
          </h2>

          <p className="mt-2 text-3xl md:text-4xl font-bold">
            Simple, transparent pricing
          </p>

          <p className="mt-4 text-muted-foreground">
            You only pay when a transaction is completed successfully.
          </p>
        </div>

        {/* Pricing card */}
        <div className="mt-16 max-w-xl mx-auto">
          <div className="rounded-2xl border bg-background p-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              Pay only when it works
            </div>

            <div className="mt-6">
              <span className="text-5xl font-bold">3%</span>
              <span className="ml-2 text-muted-foreground">
                per successful transaction
              </span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              No setup fees. No subscriptions. No hidden charges.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li>• Escrow protection included</li>
              <li>• Buyer & seller coverage</li>
              <li>• Dispute resolution support</li>
              <li>• Local bank transfers & cards</li>
            </ul>

            <p className="mt-6 text-sm text-muted-foreground">
              Fees apply automatically when a protected transaction is created.
            </p>
          </div>
        </div>

        {/* Reassurance */}
        <div className="mt-10 text-center text-sm text-muted-foreground">
          Pricing may vary slightly based on transaction size and payment
          method.
        </div>
      </div>
    </section>
  );
}
