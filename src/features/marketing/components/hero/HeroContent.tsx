import { HeroActions } from "./HeroActions";

export function HeroContent() {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        Trust infrastructure for trade
      </p>

      <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
        <span className="block">Trade with</span>
        <span className="block">confidence.</span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
        TrustFlow is the infrastructure that secures transactions between
        buyers, sellers, and logistics partners using escrow, delivery tracking,
        and dispute resolution.
      </p>

      <div className="mt-6 max-w-xl text-base text-foreground">
        We do not sell goods. We make the payment, delivery, and confirmation
        process clear for both parties.
      </div>

      <HeroActions />
    </div>
  );
}
