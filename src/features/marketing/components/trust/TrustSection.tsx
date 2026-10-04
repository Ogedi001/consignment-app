"use client";

import { TrustItem } from "./TrustItem";
import Link from "next/link";
import { ShieldCheck, Scale, FileCheck, UserRoundCheck } from "lucide-react";

const trustItems = [
  {
    title: "Neutral by design",
    description:
      "TrustFlow does not buy, sell, or broker goods. We operate as a neutral layer that protects both buyers and sellers equally.",
    icon: Scale,
  },
  {
    title: "Clear release conditions",
    description:
      "Funds are held securely and released only when agreed conditions are met — no blind payments or upfront risk.",
    icon: ShieldCheck,
  },
  {
    title: "Evidence-backed trust profiles",
    description:
      "Trust Strength provides context about a participant’s verified assurance. It does not decide the outcome of a transaction.",
    icon: UserRoundCheck,
  },
  {
    title: "Evidence when it is needed",
    description:
      "When a material decision needs support, the relevant transaction details and evidence can be reviewed.",
    icon: FileCheck,
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="border-y border-border bg-surface py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
            Trust & Security
          </h2>

          <p className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Built for confidence
          </p>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            TrustFlow makes each party’s responsibility, protection status, and
            next step understandable throughout the transaction.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {trustItems.map((item) => (
            <TrustItem key={item.title} {...item} />
          ))}
        </div>

        <div className="mt-16 text-center text-sm font-medium text-muted-foreground">
          TrustFlow never takes custody of goods and never favors buyers or
          sellers.
          <Link
            href="/trust-strength"
            className="ml-2 inline-flex text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          >
            How Trust Strength works
          </Link>
        </div>
      </div>
    </section>
  );
}
