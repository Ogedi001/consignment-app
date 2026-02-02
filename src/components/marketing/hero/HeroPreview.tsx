"use client";

import { motion } from "framer-motion";
import { Package, CreditCard, Truck, CheckCircle } from "lucide-react";

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
      <div className="rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xl p-8">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            How it works
          </p>
          <h3 className="text-lg font-semibold text-foreground">
            One trusted flow for every transaction
          </h3>
        </div>

        {/* Flow */}
        <div className="relative">
          {/* Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2" />

          {/* Steps */}
          <div className="relative grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative">
                  <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>

                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute top-1/2 -right-5 h-4 w-4 text-primary/40 -translate-y-1/2" />
                  )}
                </div>

                <span className="text-sm font-medium text-foreground">
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          Protected by escrow, delivery tracking, and dispute resolution
        </div>
      </div>
    </motion.div>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
