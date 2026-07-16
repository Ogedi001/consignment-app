"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section id="cta" className="bg-surface py-24">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-brand-navy p-8 text-center text-white shadow-enterprise md:p-12 dark:bg-surface-strong">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            <ShieldCheck className="h-4 w-4 text-brand-accent-light" />
            Protected by escrow & trust scoring
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
            Make your next transaction
            <span className="block text-brand-gradient">
              safe, simple, and trusted
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/75">
            Whether you&apos;re buying or selling, TrustFlow protects your
            money, your goods, and your reputation — from start to finish.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="gradient" className="px-8">
              Start a protected transaction
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <span className="text-sm text-white/65">
              No signup fees • No subscriptions
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/65">
            <span>• Funds held in escrow</span>
            <span>• Buyer & seller protection</span>
            <span>• In-region dispute resolution</span>
          </div>
        </div>
      </div>
    </section>
  );
}
