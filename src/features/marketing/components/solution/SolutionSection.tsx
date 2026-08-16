"use client";

import { SolutionPoint } from "./SolutionPoint";
import { ShieldCheck, PackageSearch, Scale, TrendingUp } from "lucide-react";

const solutions = [
  {
    title: "Escrow Protection",
    description:
      "Funds are held securely until goods are delivered and confirmed. Buyers stay safe. Sellers get paid with confidence.",
    icon: ShieldCheck,
    problemSolved: "Payment Risk",
    impact: "Zero blind payments",
  },
  {
    title: "Verified Delivery Tracking",
    description:
      "Every transaction includes shipment visibility and proof of delivery so both sides know exactly what happened.",
    icon: PackageSearch,
    problemSolved: "Failed Deliveries",
    impact: "Full delivery transparency",
  },
  {
    title: "Neutral Dispute Resolution",
    description:
      "When problems arise, TrustFlow mediates using evidence and clear rules instead of personal conflict.",
    icon: Scale,
    problemSolved: "Trade Conflicts",
    impact: "Faster fair outcomes",
  },
  {
    title: "Trust & Reputation Scores",
    description:
      "Each successful transaction builds a public trust score that proves reliability and unlocks more business.",
    icon: TrendingUp,
    problemSolved: "No Trust History",
    impact: "Credibility becomes currency",
  },
];

export function SolutionSection() {
  return (
    <section id="solution" className="bg-surface py-24 md:px-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            The solution
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Trust infrastructure for
            <span className="block text-brand-gradient">every transaction</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            TrustFlow sits between buyers and sellers to secure payments,
            deliveries, and outcomes — turning risky trade into verified
            commerce.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => (
            <SolutionPoint key={solution.title} {...solution} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-lg text-lg font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          >
            See how TrustFlow works →
          </a>
        </div>
      </div>
    </section>
  );
}
