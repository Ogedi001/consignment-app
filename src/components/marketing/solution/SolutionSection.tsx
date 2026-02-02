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
    <section
      id="solution"
      className="md:px-20 py-20  bg-linear-to-b from-primary/5 to-background"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            The solution
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Trust infrastructure for
            <span className="block text-primary">every transaction</span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            TrustFlow sits between buyers and sellers to secure payments,
            deliveries, and outcomes — turning risky trade into verified
            commerce.
          </p>
        </div>

        {/* 4-card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution) => (
            <SolutionPoint key={solution.title} {...solution} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg"
          >
            See how TrustFlow works →
          </a>
        </div>
      </div>
    </section>
  );
}
