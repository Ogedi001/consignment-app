"use client";

import { Check } from "lucide-react";

const pricingFeatures = [
  "Escrow protection included",
  "Buyer & seller coverage",
  "Dispute resolution support",
  "Clear terms before confirmation",
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
            Transaction fees and payment terms are shown before you confirm a
            protected transaction.
          </p>
        </div>

        <div className="mt-16 max-w-xl mx-auto">
          <div className="border border-border bg-card p-8 text-center">
            <p className="text-lg font-semibold text-foreground">Know the cost before you proceed</p>

            <p className="mt-4 text-sm text-muted-foreground">
              The applicable fee and payment method are shown with the order
              before you confirm it.
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
              You can review the transaction terms before payment is protected.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          Exact fees may depend on the transaction and payment method.
        </div>
      </div>
    </section>
  );
}
