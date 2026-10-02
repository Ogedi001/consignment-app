"use client";

import { useMutation } from "@tanstack/react-query";
import { lookupIdentifier, register, resendVerification, signIn, signUp, startSocialAuth, verifyContact } from "../services/auth.service";
import type { SocialProvider } from "../types";

export const useIdentifierLookupMutation = () => useMutation({ mutationFn: lookupIdentifier });
export const useRegister = () => useMutation({ mutationFn: register });
export const useVerifyContactMutation = () => useMutation({ mutationFn: verifyContact });
export const useResendVerificationMutation = () => useMutation({ mutationFn: resendVerification });
export const useSignInMutation = () => useMutation({ mutationFn: signIn });
export const useSignUpMutation = () => useMutation({ mutationFn: signUp });
export const useSocialAuthMutation = () => useMutation({
  mutationFn: ({ provider, redirectTo }: { provider: SocialProvider; redirectTo?: string }) =>
    startSocialAuth(provider, redirectTo),
});
