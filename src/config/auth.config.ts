/**
 * Backend contracts are intentionally supplied by the deployment environment.
 * No endpoint is assumed until the authentication service is integrated.
 */
export const authConfig = {
  endpoints: {
    identifier: process.env.NEXT_PUBLIC_AUTH_IDENTIFIER_ENDPOINT,
    signIn: process.env.NEXT_PUBLIC_AUTH_SIGN_IN_ENDPOINT,
    signUp: process.env.NEXT_PUBLIC_AUTH_SIGN_UP_ENDPOINT,
    social: process.env.NEXT_PUBLIC_AUTH_SOCIAL_ENDPOINT,
  },
} as const;
