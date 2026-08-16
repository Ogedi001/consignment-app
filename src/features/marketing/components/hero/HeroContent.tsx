"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { HeroActions } from "./HeroActions";

export function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-primary/25">
        <ShieldCheck className="h-4 w-4 text-brand-accent" />
        Trust Infrastructure for Secure Trade
      </div>

      <h1 className="mt-7 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
        <span className="block">Trade with</span>
        <span className="block text-brand-gradient">Confidence.</span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
        TrustFlow is the infrastructure that secures transactions between
        buyers, sellers, and logistics partners using escrow, delivery tracking,
        and dispute resolution.
      </p>

      <div className="mt-6 max-w-xl text-base font-semibold text-foreground">
        We don’t sell goods. We make sure buyers and sellers can trust each
        other.
      </div>

      <HeroActions />
    </motion.div>
  );
}
