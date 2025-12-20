"use client";

import { siteConfig } from "@/configs/config";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

// Analytics abstraction (A1 habit)
const track = (event: string) => {
  console.log(event);
  // later: posthog.capture(event)
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      {/* Subtle gradient background (content-first) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(900px 600px at 0% 0%, ${siteConfig.accentColor}20, transparent 60%)`,
        }}
      />

      <div className="container mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            Built for high-volume consignment operations
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
            Sell, Track, and Settle
            <span className="block text-primary">Consignments at Scale</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            A unified platform to manage consignors, inventory, sales, and
            payouts in real time — without spreadsheets or disputes.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => track("hero_get_started")}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => track("hero_view_demo")}
            >
              View Demo
            </Button>
          </div>

          {/* Trust signal */}
          <p className="mt-4 text-sm text-muted-foreground">
            Built with consignment operators • No setup fees • Secure by design
          </p>
        </motion.div>

        {/* Right: Product preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-2xl border bg-card shadow-xl p-6">
            <div className="h-64 rounded-xl bg-muted" />
            <p className="mt-4 text-sm text-muted-foreground">
              Live dashboard — inventory, sales, and payouts in one view
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
