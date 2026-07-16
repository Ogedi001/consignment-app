"use client";

import { Step } from "./Step";
import { Link, Wallet, Truck, CheckCircle, Scale } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Create a secure order",
    description:
      "The seller creates a private order with price, delivery terms, and release conditions.",
    icon: Link,
  },
  {
    step: "02",
    title: "Buyer pays safely",
    description:
      "The buyer completes payment. Funds are held securely and not released upfront.",
    icon: Wallet,
  },
  {
    step: "03",
    title: "Goods are shipped",
    description:
      "The seller ships the goods. Both parties can track delivery progress.",
    icon: Truck,
  },
  {
    step: "04",
    title: "Delivery is confirmed",
    description:
      "The buyer confirms receipt and satisfaction within the inspection window.",
    icon: CheckCircle,
  },
  {
    step: "05",
    title: "Funds are released",
    description:
      "Once conditions are met, payment is released automatically to the seller.",
    icon: Wallet,
  },
  {
    step: "06",
    title: "Disputes, if needed",
    description:
      "If issues arise, TrustFlow steps in as a neutral mediator to resolve fairly.",
    icon: Scale,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-background py-24 md:px-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
            How It Works
          </h2>

          <p className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            A simple flow built for trust
          </p>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            TrustFlow coordinates payment, delivery, and confirmation — so both
            buyers and sellers stay protected.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <Step key={step.step} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
