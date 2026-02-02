"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
      <Button size="lg" className="gap-2 px-8">
        <ShieldCheck className="h-5 w-5" />
        Start a Protected Trade
        <ArrowRight className="h-4 w-4" />
      </Button>

      <div className="text-sm text-muted-foreground">
        ✓ Buyer protection · ✓ Escrow-backed payments · ✓ Dispute resolution
      </div>
    </div>
  );
}
