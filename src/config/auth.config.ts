/** The browser calls the same-origin BFF; its server-only route owns the backend base URL. */
export const authConfig = {
  endpoints: {
    identifier: "/api/auth/identifier",
    register: "/api/auth/register",
    verify: "/api/auth/verify",
    resendVerification: "/api/auth/resend-verification",
    signIn: process.env.NEXT_PUBLIC_AUTH_SIGN_IN_ENDPOINT,
    signUp: process.env.NEXT_PUBLIC_AUTH_SIGN_UP_ENDPOINT,
    social: process.env.NEXT_PUBLIC_AUTH_SOCIAL_ENDPOINT,
  },
} as const;
