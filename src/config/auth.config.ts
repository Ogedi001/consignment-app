/** The browser calls the same-origin BFF; its server-only route owns the backend base URL. */
export const authConfig = {
  endpoints: {
    identifier: "/api/auth/identifier",
    register: "/api/auth/register",
    verify: "/api/auth/verify",
    resendVerification: "/api/auth/resend-verification",
    // This BFF route owns the login/refresh cookies. An override remains
    // available for deployments that intentionally use another same-origin gateway.
    signIn: process.env.NEXT_PUBLIC_AUTH_SIGN_IN_ENDPOINT ?? "/api/auth/sign-in",
    signUp: process.env.NEXT_PUBLIC_AUTH_SIGN_UP_ENDPOINT,
    social: process.env.NEXT_PUBLIC_AUTH_SOCIAL_ENDPOINT,
  },
} as const;
