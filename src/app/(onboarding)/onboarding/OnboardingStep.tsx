import Link from "next/link";
import { Button, Card, CardContent } from "@/shared/components/ui";

const steps = ["profile", "identity", "document", "selfie", "status", "complete"] as const;

const content = {
  profile: {
    title: "Set up your profile",
    description:
      "Share the details your transaction counterparties need to recognise you.",
  },
  identity: {
    title: "Verify your identity",
    description:
      "Identity verification helps protect your transactions and is only used for TrustFlow services.",
  },
  document: {
    title: "Add an identity document",
    description: "Choose a clear, valid document for review.",
  },
  selfie: {
    title: "Confirm your identity",
    description:
      "A short selfie check helps us confirm the document belongs to you.",
  },
  status: {
    title: "Verification in review",
    description:
      "We will notify you when a decision is ready. Your intended destination remains available after completion.",
  },
  complete: {
    title: "Setup complete",
    description: "You are ready to manage protected transactions.",
  },
} as const;

const hrefs = {
  profile: "/onboarding/profile",
  identity: "/onboarding/identity",
  document: "/onboarding/identity/document",
  selfie: "/onboarding/identity/selfie",
  status: "/onboarding/identity/status",
  complete: "/onboarding/complete",
} as const;

export type OnboardingStepName = (typeof steps)[number];

export function isOnboardingStep(value: string): value is OnboardingStepName {
  return steps.includes(value as OnboardingStepName);
}

export function OnboardingStep({ step }: { step: OnboardingStepName }) {
  const index = steps.indexOf(step);
  const detail = content[step];
  const next = index === steps.length - 1 ? "/home" : hrefs[steps[index + 1]];

  return (
    <>
      <p className="text-sm font-semibold text-primary">
        Step {index + 1} of {steps.length}
      </p>
      <div className="mt-2 h-1.5 rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${((index + 1) / steps.length) * 100}%` }}
        />
      </div>
      <h1 className="mt-7 text-3xl font-bold">{detail.title}</h1>
      <p className="mt-3 text-muted-foreground">{detail.description}</p>
      <Card className="mt-7">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            This progressive onboarding boundary is ready for the verification
            API. No personal information is collected in this development route.
          </p>
          <Button asChild className="mt-6">
            <Link href={next}>
              {index === steps.length - 1 ? "Go to home" : "Continue"}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
