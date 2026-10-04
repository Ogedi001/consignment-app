import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "./Footer";
import { Navbar } from "./navbar/Navbar";

const principles = [
  {
    title: "Evidence-backed assurance",
    description:
      "Trust Strength summarizes eligible verified evidence about a participant. At launch, it reflects identity assurance, such as verified contact details or government ID.",
  },
  {
    title: "Context, not a verdict",
    description:
      "A lower Trust Strength can mean there is limited evidence. It does not by itself indicate misconduct or make a claim about a person’s character.",
  },
  {
    title: "Explainable when it matters",
    description:
      "When Trust Strength is shown in a profile, the supporting explanation helps users understand the available assurance without exposing sensitive personal documents.",
  },
];

export function TrustExplainerPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border bg-background pb-16 pt-32 md:pb-24 md:pt-40">
          <div className="container mx-auto max-w-3xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Trust profiles
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Understand Trust Strength
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Trust Strength gives context about the verified assurance available
              for a participant. It supports clearer trade; it is not the
              transaction itself.
            </p>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-6">
            <div className="divide-y divide-border border-y border-border">
              {principles.map((principle) => (
                <article key={principle.title} className="py-7 first:pt-0 last:pb-0">
                  <h2 className="text-xl font-semibold text-foreground">
                    {principle.title}
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface py-16 md:py-20">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What Trust Strength does not decide
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              Trust Strength is not a fraud score, a transaction approval, or a
              decision to release funds. Payment protection and release follow
              the agreed transaction conditions and the applicable workflow.
            </p>
            <Link
              href="/protection"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            >
              Learn about payment protection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
