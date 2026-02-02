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
      className="max-w-xl"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
        <ShieldCheck className="h-4 w-4" />
        Trust Infrastructure for Secure Trade
      </div>

      {/* Headline */}
      <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight leading-tight">
        <span className="block">We make trade</span>
        <span className="block text-primary">trustworthy.</span>
      </h1>

      {/* Subheadline */}
      <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
        TrustFlow is the infrastructure that secures transactions between
        buyers, sellers, and logistics partners using escrow, delivery tracking,
        and dispute resolution.
      </p>

      {/* Brand Promise */}
      <div className="mt-6 text-base font-medium text-foreground">
        We don’t sell goods. We make sure buyers and sellers can trust each
        other.
      </div>

      <HeroActions />
    </motion.div>
  );
}
