"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

export function HeroPreview() {
  const steps = [
    { icon: Package, label: "Create Trade" },
    { icon: CreditCard, label: "Escrow Payment" },
    { icon: Truck, label: "Delivery" },
    { icon: CheckCircle, label: "Release Funds" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative"
    >
      <div className="rounded-2xl border border-border bg-card p-6 shadow-enterprise md:p-8">
        <div className="mb-7 flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Protected transaction
            </p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">
              Escrow release pending delivery
            </h3>
          </div>

          <div className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Verified
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Trust Score</p>
              <p className="mt-1 text-3xl font-bold text-foreground">92%</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient">
              <ShieldCheck className="h-6 w-6 text-white dark:text-brand-navy" />
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-brand-gradient" style={{ width: "92%" }} />
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              Transaction flow
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              Live verification
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                className="relative rounded-xl border border-border bg-background p-4 text-center"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>

                <span className="text-xs font-semibold text-foreground sm:text-sm">
                  {step.label}
                </span>

                {index < steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-primary/45 sm:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-brand-subtle bg-primary/5 px-4 py-3 text-center text-xs font-medium text-muted-foreground">
          Protected by escrow, delivery tracking, and dispute resolution.
        </div>
      </div>
    </motion.div>
  );
}
