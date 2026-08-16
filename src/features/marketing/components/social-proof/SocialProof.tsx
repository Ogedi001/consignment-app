"use client";

import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";
import { TrustIndicators } from "./TrustIndicators";

export function SocialProof() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container mx-auto px-6 py-24 text-center md:px-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Trusted Infrastructure
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Trust powering real trade
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          TrustFlow secures transactions between buyers, sellers, and logistics
          partners across the entire trade lifecycle.
        </p>

        <Stats />
        <Testimonials />
        <TrustIndicators />
      </div>
    </section>
  );
}
