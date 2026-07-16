"use client";

import { HeroContent } from "./HeroContent";
import { HeroPreview } from "./HeroPreview";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-18 md:pt-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-brand-gradient" />
      <div className="absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [bg-size:24px_24px]" />

      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-6 py-16 md:px-20 md:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <HeroContent />
        <HeroPreview />
      </div>
    </section>
  );
}
