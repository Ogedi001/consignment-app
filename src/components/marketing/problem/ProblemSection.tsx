"use client";

import { ProblemCard } from "./ProblemCard";
import { ShieldAlert, PackageX, Gavel, UserX } from "lucide-react";

const problems = [
  {
    title: "Fear before every payment",
    description:
      "Buyers are scared to pay. Sellers are scared to ship. Every deal starts with doubt.",
    stat: "40% of sellers report payment defaults",
    icon: ShieldAlert,
  },
  {
    title: "Goods go missing",
    description:
      "Deliveries arrive late, damaged, or not at all with no proof of what really happened.",
    stat: "1 in 5 trades face delivery disputes",
    icon: PackageX,
  },
  {
    title: "Disputes turn into chaos",
    description:
      "When something goes wrong, there’s no neutral system to resolve it fairly.",
    stat: "Average dispute takes weeks",
    icon: Gavel,
  },
  {
    title: "No reputation system",
    description:
      "Strangers trade with no history, trust score, or accountability.",
    stat: "New sellers take 3× longer to close deals",
    icon: UserX,
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className=" md:px-20 py-20 bg-background">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          The problem
        </p>

        <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
          Every transaction is a
          <span className="block text-destructive">leap of faith</span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Without trust infrastructure, buyers and sellers lose money, time, and
          opportunities.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem) => (
            <ProblemCard key={problem.title} {...problem} />
          ))}
        </div>
      </div>
    </section>
  );
}
