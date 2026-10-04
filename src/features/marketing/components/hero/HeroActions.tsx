"use client";

import { ComingSoonButton } from "../ComingSoonButton";
import { ArrowRight } from "lucide-react";

export function HeroActions() {
  return (
    <div className="mt-9 flex flex-col items-start gap-5">
      <ComingSoonButton size="lg" className="gap-2 px-8">
        Start a Protected Trade
        <ArrowRight className="h-4 w-4" />
      </ComingSoonButton>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
        <span>Payment protection</span>
        <span>Delivery visibility</span>
        <span>Evidence-based resolution</span>
      </div>
    </div>
  );
}
