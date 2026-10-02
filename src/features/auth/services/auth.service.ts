import { ApiError, api } from "@/shared/lib";
import { authConfig } from "@/config/auth.config";
import type {
  AuthSessionResponse,
  IdentifierLookupResult,
  IdentifierLookupResponse,
  SocialProvider,
  RegisterRequest,
  RegisterResponse,
  RegisterResult,
  ResendVerificationRequest,
  ResendVerificationResponse,
  ResendVerificationResult,
  VerifyRequest,
  VerifyResponse,
  VerificationResult,
} from "../types";

type AuthEndpoints = {
  identifier?: string;
  register?: string;
  verify?: string;
  resendVerification?: string;
  signIn?: string;
  signUp?: string;
  social?: string;
};

const endpoints: AuthEndpoints = authConfig.endpoints;

export class AuthIntegrationError extends Error {
  constructor(
    message = "Authentication is not configured yet. Please try again later.",
  ) {
    super(message);
    this.name = "AuthIntegrationError";
  }
}

function endpoint(name: keyof AuthEndpoints) {
  const value = endpoints[name];
  if (!value) throw new AuthIntegrationError();
  return value;
}

export async function lookupIdentifier(identifier: string): Promise<IdentifierLookupResult> {
  const response = await api<IdentifierLookupResponse>(endpoint("identifier"), {
    method: "POST",
    body: { identifier },
  });
  return response.data;
}

export async function register(input: RegisterRequest): Promise<RegisterResult> {
  const response = await api<RegisterResponse>(endpoint("register"), {
    method: "POST",
    body: input,
  });
  return response.data;
}

export async function verifyContact(input: VerifyRequest): Promise<VerificationResult | undefined> {
  const response = await api<VerifyResponse>(endpoint("verify"), { method: "POST", body: input });
  return response.data;
}

export async function resendVerification(input: ResendVerificationRequest): Promise<ResendVerificationResult> {
  const response = await api<ResendVerificationResponse>(endpoint("resendVerification"), { method: "POST", body: input });
  return response.data;
}

export function signIn(input: { identifier: string; password: string }) {
  return api<AuthSessionResponse>(endpoint("signIn"), {
    method: "POST",
    body: input,
  });
}

export function signUp(input: { identifier: string; password: string }) {
  return api<AuthSessionResponse>(endpoint("signUp"), {
    method: "POST",
    body: input,
  });
}

export function startSocialAuth(provider: SocialProvider, redirectTo?: string) {
  return api<{ redirectUrl: string }>(endpoint("social"), {
    method: "POST",
    body: { provider, redirectTo },
  });
}

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof AuthIntegrationError) return error.message;
  if (error instanceof ApiError) {
    const fieldMessages = error.details.map(({ field, message }) => `${field}: ${message}`);
    return [error.message, ...fieldMessages].filter(Boolean).join(" ");
  }
  if (error instanceof TypeError)
    return "We couldn't connect right now. Please check your connection and try again.";
  return "Something went wrong. Please try again.";
}
