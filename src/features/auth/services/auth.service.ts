import { ApiError, api } from "@/shared/lib";
import { authConfig } from "@/config/auth.config";
import type {
  AuthSessionResponse,
  IdentifierLookupResponse,
  SocialProvider,
} from "../types";

type AuthEndpoints = {
  identifier?: string;
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

export function lookupIdentifier(identifier: string) {
  return api<IdentifierLookupResponse>(endpoint("identifier"), {
    method: "POST",
    body: { identifier },
  });
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
    if (error.status === 401) return "Incorrect password. Try again.";
    if (error.status === 429)
      return "Too many attempts. Please wait a moment before trying again.";
    if (error.status >= 500) return "Something went wrong. Please try again.";
  }
  if (error instanceof TypeError)
    return "We couldn't connect right now. Please check your connection and try again.";
  return "Something went wrong. Please try again.";
}
