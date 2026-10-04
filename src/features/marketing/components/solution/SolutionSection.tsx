"use client";

import { SolutionPoint } from "./SolutionPoint";
import { ShieldCheck, PackageSearch, Scale, FileCheck } from "lucide-react";

const solutions = [
  {
    title: "Payment protection",
    description:
      "Funds are held securely until goods are delivered and confirmed. Buyers stay safe. Sellers get paid with confidence.",
    icon: ShieldCheck,
    problemSolved: "Unprotected payment",
    impact: "Clear release conditions",
  },
  {
    title: "Delivery visibility",
    description:
      "Every transaction includes shipment visibility and proof of delivery so both sides know exactly what happened.",
    icon: PackageSearch,
    problemSolved: "Unclear delivery status",
    impact: "Shared delivery updates",
  },
  {
    title: "Evidence-based resolution",
    description:
      "When problems arise, TrustFlow mediates using evidence and clear rules instead of personal conflict.",
    icon: Scale,
    problemSolved: "Unresolved issues",
    impact: "A clear path when something goes wrong",
  },
  {
    title: "Shared transaction record",
    description:
      "The agreed terms, delivery updates, and relevant evidence stay connected to the transaction.",
    icon: FileCheck,
    problemSolved: "Missing transaction context",
    impact: "Details available when they matter",
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
            <span className="block">every transaction</span>
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
