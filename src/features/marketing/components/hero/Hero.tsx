"use client";

import { HeroContent } from "./HeroContent";
import { HeroPreview } from "./HeroPreview";

export function Hero() {
  return (
    <section className="border-b border-border bg-background pt-20 md:pt-24">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-6 py-16 md:px-20 md:py-24 lg:grid-cols-2 lg:gap-16">
        <HeroContent />
        <HeroPreview />
      </div>
    </section>
  );
}
