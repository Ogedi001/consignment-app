"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AuthHeader } from "./AuthHeader";
import { AuthIdentifierForm } from "./AuthIdentifierForm";
import { AuthPasswordForm } from "./AuthPasswordForm";
import { AuthShell } from "./AuthShell";
import { AuthSignupForm } from "./AuthSignupForm";
import { AuthStatus } from "./AuthStatus";
import {
  type IdentifierFormValues,
  type SignInFormValues,
  type SignUpFormValues,
} from "../schemas/auth.schemas";
import {
  useIdentifierLookupMutation,
  useSignInMutation,
  useRegister,
} from "../hooks/use-auth-mutations";
import { getAuthErrorMessage } from "../services/auth.service";
import { getSafeAuthRedirect, withAuthRedirect } from "../utils/auth-redirect";
import { maskDeliveryTarget, saveVerificationFlowContext } from "../utils/verification-flow-context";

export type AuthJourney = "sign-in" | "sign-up";
type AuthExperienceProps = { journey: AuthJourney };

const copy = {
  "sign-in": {
    title: "Welcome back",
    description: "Sign in to continue",
    alternate: "Don't have an account?",
    alternateHref: "/auth/sign-up",
    alternateLabel: "Sign up",
  },
  "sign-up": {
    title: "Create your account",
    description: "Start trading with confidence.",
    alternate: "Already have an account?",
    alternateHref: "/auth/sign-in",
    alternateLabel: "Sign in",
  },
} as const;

export function AuthExperience({ journey }: AuthExperienceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeAuthRedirect(searchParams.get("redirect"));
  const demoState = searchParams.get("demo");
  const identifier = searchParams.get("identifier")?.trim() ?? "";
  const lookup = useIdentifierLookupMutation();
  const signIn = useSignInMutation();
  const registration = useRegister();
  const registrationKey = useRef<string | undefined>(undefined);
  const registrationSubmitLocked = useRef(false);
  const [registrationSetupError, setRegistrationSetupError] =
    useState<string | undefined>(undefined);
  const isPasswordStep = journey === "sign-in" && Boolean(identifier);
  const isSignupStep = journey === "sign-up" && Boolean(identifier);
  const journeyCopy = copy[journey];

  const complete = (response: { redirectTo?: string }) => {
    const destination = getSafeAuthRedirect(response.redirectTo) ?? redirectTo;
    if (destination) window.location.assign(destination);
  };
  const handleIdentifier = (values: IdentifierFormValues) => {
    const value = values.identifier.trim();
    lookup.mutate(value, {
      onSuccess: ({ exists }) => {
        const destination = exists ? "/auth/sign-in" : "/auth/sign-up";
        router.push(
          withAuthRedirect(
            `${destination}?identifier=${encodeURIComponent(value)}`,
            redirectTo,
          ),
        );
      },
    });
  };
  const resetRegistrationAttempt = () => {
    registrationKey.current = undefined;
    setRegistrationSetupError(undefined);
    if (!registration.isPending) registration.reset();
  };
  const returnToIdentifier = () => {
    resetRegistrationAttempt();
    router.push(
      withAuthRedirect(
        journey === "sign-in" ? "/auth/sign-in" : "/auth/sign-up",
        redirectTo,
      ),
    );
  };
  const handleSignIn = (values: SignInFormValues) =>
    signIn.mutate(
      { identifier, password: values.password },
      { onSuccess: complete },
    );
  const handleSignUp = (values: SignUpFormValues) => {
    if (registrationSubmitLocked.current || registration.isPending) return;
    if (!registrationKey.current) {
      if (typeof globalThis.crypto?.randomUUID !== "function") {
        setRegistrationSetupError(
          "Your browser cannot securely start registration. Please update it and try again.",
        );
        return;
      }
      registrationKey.current = globalThis.crypto.randomUUID();
    }
    setRegistrationSetupError(undefined);
    registrationSubmitLocked.current = true;
    registration.mutate(
      {
        identifier,
        password: values.password,
        idempotency_key: registrationKey.current,
      },
      {
        onSuccess: (result) => {
          const channel = result.contact_verification.channel;
          if (!saveVerificationFlowContext({
            identifier,
            channel,
            displayTarget: maskDeliveryTarget(result.contact_verification.delivery_target, channel),
            redirectTo,
          })) {
            setRegistrationSetupError("We could not prepare verification in this browser. Please allow session storage and try again.");
            return;
          }
          registrationKey.current = undefined;
          router.push("/auth/verify");
        },
        onSettled: () => {
          registrationSubmitLocked.current = false;
        },
      },
    );
  };
  const mutationError = lookup.error ?? signIn.error ?? registration.error;

  return (
    <AuthShell>
      <div className="w-full max-w-100">
        <AuthHeader
          back={isPasswordStep || isSignupStep ? returnToIdentifier : undefined}
        />
        {isPasswordStep || isSignupStep ? (
          <button
            type="button"
            onClick={returnToIdentifier}
            className="mb-7 hidden items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:inline-flex"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        ) : null}
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isPasswordStep ? "Enter your password" : journeyCopy.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isPasswordStep ? "for this account" : journeyCopy.description}
          </p>
        </div>
        <AuthStatus
          message={
            registrationSetupError ?? (mutationError ? getAuthErrorMessage(mutationError) : undefined)
          }
        />
        {demoState ? (
          <p
            role="status"
            className="mb-5 rounded-lg border border-success/25 bg-success/5 px-3 py-2.5 text-sm leading-5 text-success"
          >
            Development mock complete. No real account or session was created.
          </p>
        ) : null}
        {isPasswordStep || isSignupStep ? (
          <div className="mb-6 rounded-lg bg-surface px-3 py-3">
            <p className="text-xs font-semibold text-muted-foreground">
              Email or phone
            </p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <span className="min-w-0 truncate text-sm font-medium text-foreground">
                {identifier}
              </span>
              <button
                type="button"
                onClick={returnToIdentifier}
                className="shrink-0 text-sm font-semibold text-primary hover:underline"
              >
                Change
              </button>
            </div>
          </div>
        ) : null}
        {isPasswordStep ? (
          <AuthPasswordForm
            onSubmit={handleSignIn}
            isPending={signIn.isPending}
          />
        ) : null}
        {isSignupStep ? (
          <AuthSignupForm
            onSubmit={handleSignUp}
            onAttemptChanged={resetRegistrationAttempt}
            isPending={registration.isPending}
          />
        ) : null}
        {!isPasswordStep && !isSignupStep ? (
          <AuthIdentifierForm
            onSubmit={handleIdentifier}
            isPending={lookup.isPending}
          />
        ) : null}
        <p className="mt-7 text-center text-sm text-muted-foreground">
          {journeyCopy.alternate}{" "}
          <Link
            href={withAuthRedirect(journeyCopy.alternateHref, redirectTo)}
            className="font-semibold text-primary hover:underline"
          >
            {journeyCopy.alternateLabel}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
