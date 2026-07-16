"use client";

import { TrustItem } from "./TrustItem";
import { ShieldCheck, Scale, Lock, FileCheck } from "lucide-react";

const trustItems = [
  {
    title: "Neutral by design",
    description:
      "TrustFlow does not buy, sell, or broker goods. We operate as a neutral layer that protects both buyers and sellers equally.",
    icon: Scale,
  },
  {
    title: "Escrow-backed protection",
    description:
      "Funds are held securely and released only when agreed conditions are met — no blind payments or upfront risk.",
    icon: ShieldCheck,
  },
  {
    title: "Secure by default",
    description:
      "Transactions and data are protected with modern encryption, access controls, and continuous monitoring.",
    icon: Lock,
  },
  {
    title: "Compliance-aware",
    description:
      "Regulatory alignment and consumer protection are built into the system by default.",
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
            TrustFlow is designed to remove fear from transactions — with
            safeguards that protect both sides, every step of the way.
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
        </div>
      </div>
    </section>
  );
}
