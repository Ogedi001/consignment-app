"use client";

import { Check, ShieldCheck } from "lucide-react";

const pricingFeatures = [
  "Escrow protection included",
  "Buyer & seller coverage",
  "Dispute resolution support",
  "Local bank transfers & cards",
];

export function PricingPreview() {
  return (
    <section id="pricing" className="bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
            Pricing
          </h2>

          <p className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Simple, transparent pricing
          </p>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            You only pay when a transaction is completed successfully.
          </p>
        </div>

        <div className="mt-16 max-w-xl mx-auto">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-enterprise">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <ShieldCheck className="h-4 w-4 text-brand-accent" />
              Pay only when it works
            </div>

            <div className="mt-6">
              <span className="text-5xl font-bold text-foreground">3%</span>
              <span className="ml-2 text-muted-foreground">
                per successful transaction
              </span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              No setup fees. No subscriptions. No hidden charges.
            </p>

            <ul className="mt-8 space-y-3 text-left text-sm text-muted-foreground">
              {pricingFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-brand-accent" />
                  {feature}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted-foreground">
              Fees apply automatically when a protected transaction is created.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          Pricing may vary slightly based on transaction size and payment
          method.
        </div>
      </div>
    </section>
  );
}
