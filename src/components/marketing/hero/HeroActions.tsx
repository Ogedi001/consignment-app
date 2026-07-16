"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function HeroActions() {
  return (
    <div className="mt-9 flex flex-col items-start gap-5">
      <Button size="lg" variant="gradient" className="gap-2 px-8">
        <ShieldCheck className="h-5 w-5" />
        Start a Protected Trade
        <ArrowRight className="h-4 w-4" />
      </Button>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
        <span>Buyer protection</span>
        <span>Escrow-backed payments</span>
        <span>Dispute resolution</span>
      </div>
    </div>
  );
}
