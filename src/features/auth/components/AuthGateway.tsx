"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/ui";
import { AuthDivider } from "./AuthDivider";
import { AuthHeader } from "./AuthHeader";
import { AuthShell } from "./AuthShell";
import { AuthStatus } from "./AuthStatus";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { useSocialAuthMutation } from "../hooks/use-auth-mutations";
import { getAuthErrorMessage } from "../services/auth.service";
import type { SocialProvider } from "../types";
import { getSafeAuthRedirect, withAuthRedirect } from "../utils/auth-redirect";

export function AuthGateway() {
  const searchParams = useSearchParams();
  const social = useSocialAuthMutation();
  const redirectTo = getSafeAuthRedirect(searchParams.get("redirect"));
  const demoComplete = ["sign-in", "sign-up"].includes(
    searchParams.get("demo") ?? "",
  );
  const handleSocial = (provider: SocialProvider) =>
    social.mutate(
      { provider, redirectTo },
      { onSuccess: ({ redirectUrl }) => window.location.assign(redirectUrl) },
    );
  return (
    <AuthShell>
      <div className="w-full max-w-100">
        <AuthHeader />
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to Trustflow
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Secure access for confident digital trade.
          </p>
        </div>
        <AuthStatus
          message={social.error ? getAuthErrorMessage(social.error) : undefined}
        />
        {demoComplete ? (
          <p
            role="status"
            className="mb-5 rounded-lg border border-success/25 bg-success/5 px-3 py-2.5 text-sm leading-5 text-success"
          >
            Development mock complete. No real account or session was created.
          </p>
        ) : null}
        <Button asChild variant="gradient" size="lg" className="w-full">
          <Link href={withAuthRedirect("/auth/sign-in", redirectTo)}>
            Continue with email or phone
          </Link>
        </Button>
        <AuthDivider />
        <SocialAuthButtons
          disabled={social.isPending}
          pendingProvider={
            social.isPending ? social.variables?.provider : undefined
          }
          onSelect={handleSocial}
        />
        <div className="mt-7 grid gap-2 text-center text-sm text-muted-foreground">
          <p>
            Already have an account?{" "}
            <Link
              href={withAuthRedirect("/auth/sign-in", redirectTo)}
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
          <p>
            New to Trustflow?{" "}
            <Link
              href={withAuthRedirect("/auth/sign-up", redirectTo)}
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
