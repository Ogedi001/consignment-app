"use client";

import { FeatureCard } from "./FeatureCard";
import { Wallet, Link, Truck, Scale, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    title: "Smart escrow payments",
    description:
      "Funds are securely held and released only when delivery conditions are met, protecting both buyers and sellers.",
    icon: Wallet,
  },
  {
    title: "Private order links",
    description:
      "Create secure, shareable order links for each transaction — no marketplace listings, no intermediaries.",
    icon: Link,
  },
  {
    title: "Integrated shipment tracking",
    description:
      "Track goods from dispatch to delivery with shared visibility for all parties involved.",
    icon: Truck,
  },
  {
    title: "Dispute resolution system",
    description:
      "When issues arise, TrustFlow acts as a neutral mediator to review evidence and resolve fairly.",
    icon: Scale,
  },
  {
    title: "Trust & reputation scoring",
    description:
      "Every completed transaction builds credibility, helping reliable participants transact faster.",
    icon: TrendingUp,
  },
  {
    title: "Buyer protection",
    description:
      "Transactions are backed by escrow protection, delivery verification, and clear platform policies.",
    icon: Shield,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="md:px-20 py-20 ">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Core Capabilities
          </h2>

          <p className="mt-2 text-3xl md:text-4xl font-bold">
            Built as trust infrastructure
          </p>

          <p className="mt-4 text-muted-foreground">
            TrustFlow provides the essential systems required to safely exchange
            goods — without blind trust or manual coordination.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
