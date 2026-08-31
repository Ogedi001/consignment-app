"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AuthHeader } from "./AuthHeader";
import { AuthIdentifierForm } from "./AuthIdentifierForm";
import { AuthPasswordForm } from "./AuthPasswordForm";
import { AuthShell } from "./AuthShell";
import { AuthSignupForm } from "./AuthSignupForm";
import { AuthStatus } from "./AuthStatus";
import { getIdentifierType, type IdentifierFormValues, type SignInFormValues, type SignUpFormValues } from "../schemas/auth.schemas";
import { useIdentifierLookupMutation, useSignInMutation, useSignUpMutation } from "../hooks/use-auth-mutations";
import { getAuthErrorMessage } from "../services/auth.service";
import { useAuthFlowStore } from "../stores/auth-flow.store";
import { getSafeAuthRedirect, withAuthRedirect } from "../utils/auth-redirect";

export type AuthJourney = "sign-in" | "sign-up";
type AuthExperienceProps = { journey: AuthJourney };

const copy = {
  "sign-in": { title: "Welcome back", description: "Sign in to continue", alternate: "Don't have an account?", alternateHref: "/auth/sign-up", alternateLabel: "Sign up" },
  "sign-up": { title: "Create your account", description: "Start trading with confidence.", alternate: "Already have an account?", alternateHref: "/auth/sign-in", alternateLabel: "Sign in" },
} as const;

export function AuthExperience({ journey }: AuthExperienceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeAuthRedirect(searchParams.get("redirect"));
  const demoState = searchParams.get("demo");
  const { identifier, step, setIdentifier, setStep, reset } = useAuthFlowStore();
  const lookup = useIdentifierLookupMutation();
  const signIn = useSignInMutation();
  const signUp = useSignUpMutation();
  const isPasswordStep = journey === "sign-in" && step === "password";
  const isSignupStep = journey === "sign-up" && step === "signup";
  const journeyCopy = copy[journey];

  const complete = (response: { redirectTo?: string }) => {
    const destination = getSafeAuthRedirect(response.redirectTo) ?? redirectTo;
    reset();
    if (destination) window.location.assign(destination);
  };
  const handleIdentifier = (values: IdentifierFormValues) => {
    const value = values.identifier.trim();
    lookup.mutate(value, { onSuccess: ({ nextStep }) => {
      setIdentifier(value, getIdentifierType(value));
      if (nextStep === "password") {
        if (journey === "sign-up") {
          setStep("password");
          router.push(withAuthRedirect("/auth/sign-in", redirectTo));
        }
        else setStep("password");
        return;
      }
      if (journey === "sign-in") {
        setStep("signup");
        router.push(withAuthRedirect("/auth/sign-up", redirectTo));
      }
      else setStep("signup");
    }});
  };
  const handleSignIn = (values: SignInFormValues) => signIn.mutate({ identifier, password: values.password }, { onSuccess: complete });
  const handleSignUp = (values: SignUpFormValues) => signUp.mutate({ identifier, password: values.password }, { onSuccess: complete });
  const mutationError = lookup.error ?? signIn.error ?? signUp.error;

  return <AuthShell><div className="w-full max-w-[25rem]"><AuthHeader back={isPasswordStep || isSignupStep ? () => setStep("identifier") : undefined} />{isPasswordStep || isSignupStep ? <button type="button" onClick={() => setStep("identifier")} className="mb-7 hidden items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:inline-flex"><ArrowLeft className="size-4" />Back</button> : null}<div className="mb-7"><h1 className="text-3xl font-bold tracking-tight text-foreground">{isPasswordStep ? "Enter your password" : journeyCopy.title}</h1><p className="mt-2 text-sm text-muted-foreground">{isPasswordStep ? "for this account" : journeyCopy.description}</p></div><AuthStatus message={mutationError ? getAuthErrorMessage(mutationError) : undefined} />{demoState ? <p role="status" className="mb-5 rounded-lg border border-success/25 bg-success/5 px-3 py-2.5 text-sm leading-5 text-success">Development mock complete. No real account or session was created.</p> : null}{isPasswordStep || isSignupStep ? <div className="mb-6 rounded-lg bg-surface px-3 py-3"><p className="text-xs font-semibold text-muted-foreground">Email or phone</p><div className="mt-1 flex items-center justify-between gap-3"><span className="min-w-0 truncate text-sm font-medium text-foreground">{identifier}</span><button type="button" onClick={() => setStep("identifier")} className="shrink-0 text-sm font-semibold text-primary hover:underline">Change</button></div></div> : null}{isPasswordStep ? <AuthPasswordForm onSubmit={handleSignIn} isPending={signIn.isPending} /> : null}{isSignupStep ? <AuthSignupForm onSubmit={handleSignUp} isPending={signUp.isPending} /> : null}{!isPasswordStep && !isSignupStep ? <AuthIdentifierForm onSubmit={handleIdentifier} isPending={lookup.isPending} /> : null}<p className="mt-7 text-center text-sm text-muted-foreground">{journeyCopy.alternate}{" "}<Link href={withAuthRedirect(journeyCopy.alternateHref, redirectTo)} className="font-semibold text-primary hover:underline">{journeyCopy.alternateLabel}</Link></p></div></AuthShell>;
}
