"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  LoaderCircle,
  Mail,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import { ApiError } from "@/shared/lib";
import { Button, Input } from "@/shared/components/ui";
import { AuthHeader } from "./AuthHeader";
import { AuthShell } from "./AuthShell";
import { AuthStatus } from "./AuthStatus";
import {
  useResendVerificationMutation,
  useVerifyContactMutation,
} from "../hooks/use-auth-mutations";
import type { VerificationChannel, VerificationFlowContext } from "../types";
import {
  clearVerificationFlowContext,
  readVerificationFlowContext,
} from "../utils/verification-flow-context";

const verificationCodeLength = 6;

type VerificationIssue = { message: string; retryAfter?: number };

function issueFromError(error: unknown): VerificationIssue {
  if (!(error instanceof ApiError)) {
    return {
      message:
        "We could not complete verification right now. Please try again.",
    };
  }
  const errorCode = verificationErrorCode(error.data);
  const retryAfter = retryAfterSeconds(error.data);
  if (error.status === 429)
    return {
      message: "Too many attempts. Please wait before trying again.",
      retryAfter,
    };
  if (error.status === 409)
    return {
      message: "This contact has already been verified. You can sign in now.",
    };
  if (error.status === 400 || error.status === 422) {
    return {
      message: errorCode.includes("EXPIRED")
        ? "This verification code or link has expired. Request a new one and try again."
        : "That verification code or link is invalid. Please check it and try again.",
    };
  }
  if (error.status === 401 || error.status === 403)
    return {
      message:
        "We could not verify this contact. Please request a new verification message.",
    };
  return {
    message:
      "Verification is temporarily unavailable. Please try again shortly.",
  };
}

function verificationErrorCode(data: unknown) {
  if (typeof data !== "object" || data === null || !("error" in data))
    return "";
  const error = data.error;
  if (
    typeof error !== "object" ||
    error === null ||
    !("code" in error) ||
    typeof error.code !== "string"
  )
    return "";
  return error.code.toUpperCase();
}

function retryAfterSeconds(data: unknown) {
  if (typeof data !== "object" || data === null || !("error" in data))
    return undefined;
  const error = data.error;
  if (typeof error !== "object" || error === null || !("details" in error))
    return undefined;
  const details = error.details;
  if (
    typeof details === "object" &&
    details !== null &&
    "retry_after_seconds" in details &&
    typeof details.retry_after_seconds === "number"
  )
    return details.retry_after_seconds;
  if (Array.isArray(details)) {
    const detail = details.find(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "retry_after_seconds" in item &&
        typeof item.retry_after_seconds === "number",
    );
    if (
      detail &&
      typeof detail === "object" &&
      "retry_after_seconds" in detail &&
      typeof detail.retry_after_seconds === "number"
    )
      return detail.retry_after_seconds;
  }
  return undefined;
}

function channelCopy(channel: VerificationChannel) {
  if (channel === "EMAIL")
    return {
      title: "Check your email",
      success: "Email verified",
      successDescription: "Your email has been successfully verified.",
      icon: Mail,
    };
  if (channel === "SMS")
    return {
      title: "Verify your phone",
      success: "Phone verified",
      successDescription: "Your phone number has been successfully verified.",
      icon: Smartphone,
    };
  return {
    title: "Verify your WhatsApp number",
    success: "WhatsApp number verified",
    successDescription: "Your WhatsApp number has been successfully verified.",
    icon: MessageCircle,
  };
}

function VerificationCodeInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <Input
      id="verification-code"
      value={value}
      onChange={(event) =>
        onChange(
          event.target.value
            .replace(/\D/g, "")
            .slice(0, verificationCodeLength),
        )
      }
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="[0-9]*"
      maxLength={verificationCodeLength}
      disabled={disabled}
      aria-label={`${verificationCodeLength}-digit verification code`}
      placeholder="000000"
      className="h-14 text-center font-mono text-2xl tracking-[0.5em]"
    />
  );
}

export function VerificationExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const linkToken = searchParams.get("token");
  const verify = useVerifyContactMutation();
  const resend = useResendVerificationMutation();
  const [context, setContext] = useState<VerificationFlowContext>();
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState("");
  const [issue, setIssue] = useState<VerificationIssue>();
  const [resendMessage, setResendMessage] = useState<string>();
  const [cooldown, setCooldown] = useState(0);
  const [verified, setVerified] = useState(false);
  console.log({ linkToken });
  useEffect(() => {
    setContext(readVerificationFlowContext());
    setReady(true);
  }, []);
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(
      () => setCooldown((seconds) => Math.max(0, seconds - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [cooldown]);
  useEffect(() => {
    if (!verified) return;
    const timer = window.setTimeout(
      () => router.push(context?.redirectTo ?? "/auth/sign-in"),
      1800,
    );
    return () => window.clearTimeout(timer);
  }, [context?.redirectTo, router, verified]);

  const completeVerification = () => {
    clearVerificationFlowContext();
    setCode("");
    setIssue(undefined);
    if (linkToken) router.replace("/auth/verify");
    setVerified(true);
  };
  const submitLink = () => {
    if (!linkToken || verify.isPending) return;
    setIssue(undefined);
    verify.mutate(
      { credential_kind: "EMAIL_LINK", credential: linkToken },
      {
        onSuccess: completeVerification,
        onError: (error) => setIssue(issueFromError(error)),
      },
    );
  };
  const submitCode = () => {
    if (!context || code.length !== verificationCodeLength || verify.isPending)
      return;
    setIssue(undefined);
    verify.mutate(
      {
        credential_kind:
          context.channel === "EMAIL" ? "EMAIL_CODE" : "WHATSAPP_CODE",
        identifier: context.identifier,
        credential: code,
      },
      {
        onSuccess: completeVerification,
        onError: (error) => setIssue(issueFromError(error)),
      },
    );
  };
  const requestResend = () => {
    if (!context || cooldown > 0 || resend.isPending) return;
    setIssue(undefined);
    setResendMessage(undefined);
    resend.mutate(
      {
        identifier: context.identifier,
        ...(context.channel === "EMAIL" ? {} : { channel: "WHATSAPP" }),
      },
      {
        onSuccess: (result) => {
          setCooldown(
            result.cooldown_applied ? Math.max(0, result.cooldown_seconds) : 0,
          );
          setResendMessage("A new verification message has been sent.");
        },
        onError: (error) => {
          const nextIssue = issueFromError(error);
          if (nextIssue.retryAfter) setCooldown(nextIssue.retryAfter);
          setIssue(nextIssue);
        },
      },
    );
  };

  if (!ready)
    return (
      <AuthShell>
        <div className="w-full max-w-100">
          <AuthHeader />
          <p role="status" className="text-sm text-muted-foreground">
            Preparing verification…
          </p>
        </div>
      </AuthShell>
    );
  if (verified) {
    const copy = channelCopy(
      linkToken ? "EMAIL" : (context?.channel ?? "EMAIL"),
    );
    return (
      <AuthShell>
        <div className="w-full max-w-100 text-center">
          <AuthHeader />
          <CheckCircle2
            className="mx-auto size-12 text-success"
            aria-hidden="true"
          />
          <h1 className="mt-5 text-3xl font-bold tracking-tight">
            {copy.success}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {copy.successDescription}
          </p>
          <p role="status" className="mt-5 text-sm text-muted-foreground">
            Continuing to sign in…
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href={context?.redirectTo ?? "/auth/sign-in"}>
              Continue to sign in
            </Link>
          </Button>
        </div>
      </AuthShell>
    );
  }
  if (linkToken) {
    return (
      <AuthShell>
        <div className="w-full max-w-100">
          <AuthHeader />
          <Mail className="size-10 text-primary" aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-bold tracking-tight">
            Verify your email
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Confirm that you want to verify this email address. For your
            security, the link is only used when you continue.
          </p>
          <AuthStatus message={issue?.message} />
          <Button
            type="button"
            variant="gradient"
            size="lg"
            className="mt-7 w-full"
            onClick={submitLink}
            disabled={verify.isPending}
          >
            {verify.isPending ? (
              <>
                <LoaderCircle className="animate-spin" aria-hidden="true" />
                Verifying…
              </>
            ) : (
              "Verify email"
            )}
          </Button>
        </div>
      </AuthShell>
    );
  }
  if (!context)
    return (
      <AuthShell>
        <div className="w-full max-w-100">
          <AuthHeader />
          <h1 className="text-3xl font-bold tracking-tight">
            Verification details unavailable
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Start registration again, or sign in if you have already verified
            your account.
          </p>
          <div className="mt-7 grid gap-3">
            <Button asChild variant="gradient" size="lg">
              <Link href="/auth">Start registration</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          </div>
        </div>
      </AuthShell>
    );

  const copy = channelCopy(context.channel);
  const Icon = copy.icon;
  const isEmail = context.channel === "EMAIL";
  return (
    <AuthShell>
      <div className="w-full max-w-100">
        <AuthHeader />
        <Icon className="size-10 text-primary" aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-bold tracking-tight">{copy.title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {isEmail
            ? "We sent a verification link and a 6-digit verification code to"
            : "We sent a verification code to"}
        </p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          {context.displayTarget}.
        </p>
        <form
          className="mt-7 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            submitCode();
          }}
          noValidate
        >
          <VerificationCodeInput
            value={code}
            onChange={(value) => {
              setCode(value);
              setIssue(undefined);
            }}
            disabled={verify.isPending}
          />
          <AuthStatus message={issue?.message} />
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={
              code.length !== verificationCodeLength || verify.isPending
            }
          >
            {verify.isPending ? (
              <>
                <LoaderCircle className="animate-spin" aria-hidden="true" />
                Verifying…
              </>
            ) : isEmail ? (
              "Verify email"
            ) : (
              "Verify phone"
            )}
          </Button>
        </form>
        {isEmail ? (
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            You can also click the verification link in the email.
          </p>
        ) : null}
        <div className="mt-7 border-t border-border pt-5">
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive the {isEmail ? "email" : "code"}?
          </p>
          {resendMessage ? (
            <p role="status" className="mt-2 text-sm text-success">
              {resendMessage}
            </p>
          ) : null}
          <Button
            type="button"
            variant="link"
            className="mt-1 h-auto px-0"
            onClick={requestResend}
            disabled={cooldown > 0 || resend.isPending}
          >
            {resend.isPending
              ? "Sending…"
              : cooldown > 0
                ? `Resend available in ${cooldown}s`
                : "Resend"}
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}
