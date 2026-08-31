"use client";

import { useMutation } from "@tanstack/react-query";
import { lookupIdentifier, signIn, signUp, startSocialAuth } from "../services/auth.service";
import type { SocialProvider } from "../types";

export const useIdentifierLookupMutation = () => useMutation({ mutationFn: lookupIdentifier });
export const useSignInMutation = () => useMutation({ mutationFn: signIn });
export const useSignUpMutation = () => useMutation({ mutationFn: signUp });
export const useSocialAuthMutation = () => useMutation({
  mutationFn: ({ provider, redirectTo }: { provider: SocialProvider; redirectTo?: string }) =>
    startSocialAuth(provider, redirectTo),
});
