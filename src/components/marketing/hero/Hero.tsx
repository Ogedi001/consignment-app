"use client";

import { HeroContent } from "./HeroContent";
import { HeroPreview } from "./HeroPreview";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20">
      {/* Simplified background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-background to-background" />

      {/* Subtle texture */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [bg-size:16px_16px]" />

      <div className="container mx-auto px-6 md:px-20 py-12 md:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <HeroContent />
        <HeroPreview />
      </div>
    </section>
  );
}
