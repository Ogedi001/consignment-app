"use client";

import { ComingSoonButton } from "./ComingSoonButton";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section id="cta" className="bg-surface py-24">
      <div className="container mx-auto px-6">
        <div className="border border-border bg-brand-navy p-8 text-center text-white md:p-12 dark:bg-surface-strong">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/75">
            A clearer way to trade
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
            Make your next transaction
            <span className="block">clear, protected, and accountable</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/75">
            Whether you&apos;re buying or selling, TrustFlow protects your
            payment, delivery, and next steps stay understandable from start to
            finish.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <ComingSoonButton size="lg" variant="outline" className="border-white/40 bg-white text-brand-navy hover:bg-white/90 px-8">
              Start a protected transaction
              <ArrowRight className="ml-2 h-4 w-4" />
            </ComingSoonButton>

            <span className="text-sm text-white/65">
              Review the process before you start
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/65">
            <span>Payment protection</span>
            <span>Delivery visibility</span>
            <span>Evidence-based issue resolution</span>
          </div>
        </div>
      </div>
    </section>
  );
}
