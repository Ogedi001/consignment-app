export type AuthStep = "identifier" | "password" | "signup";
export type IdentifierType = "email" | "phone";
export type SocialProvider = "google" | "apple";

export type IdentifierLookupResponse = {
  nextStep: Extract<AuthStep, "password" | "signup">;
};

export type AuthSessionResponse = {
  redirectTo?: string;
};
