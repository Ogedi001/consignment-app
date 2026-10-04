import { notFound } from "next/navigation";
import { OnboardingStep } from "../OnboardingStep";

const topLevelSteps = new Set(["profile", "identity", "complete"]);

export default async function Page({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  if (!topLevelSteps.has(step)) notFound();
  return <OnboardingStep step={step as "profile" | "identity" | "complete"} />;
}
