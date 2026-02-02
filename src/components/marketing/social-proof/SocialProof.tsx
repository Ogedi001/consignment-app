"use client";

import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";
import { TrustIndicators } from "./TrustIndicators";

export function SocialProof() {
  return (
    <section className="border-y bg-linear-to-b from-background to-primary/5">
      <div className="container mx-auto md:px-20 py-20  text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Trusted Infrastructure
        </p>

        <h2 className="mt-3 text-3xl md:text-4xl font-bold">
          Trust powering real trade
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
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
