"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section
      id="cta"
      className="py-28 bg-linear-to-b from-primary/5 to-background"
    >
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border bg-background p-12 text-center shadow-sm">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" />
            Protected by escrow & trust scoring
          </div>

          {/* Headline */}
          <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
            Make your next transaction
            <span className="block text-primary">
              safe, simple, and trusted
            </span>
          </h2>

          {/* Subtext */}
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground text-lg">
            Whether you&apos;re buying or selling, TrustFlow protects your
            money, your goods, and your reputation — from start to finish.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="px-8">
              Start a protected transaction
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <span className="text-sm text-muted-foreground">
              No signup fees • No subscriptions
            </span>
          </div>

          {/* Trust reassurance */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>• Funds held in escrow</span>
            <span>• Buyer & seller protection</span>
            <span>• In-region dispute resolution</span>
          </div>
        </div>
      </div>
    </section>
  );
}
