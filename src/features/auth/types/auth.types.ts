export type AuthStep = "identifier" | "password" | "signup";
export type IdentifierType = "EMAIL" | "PHONE";
export type SocialProvider = "google" | "apple";

export type IdentifierLookupResult = {
  exists: boolean;
  identifier_type: IdentifierType;
};

export type IdentifierLookupResponse = {
  success: true;
  data: IdentifierLookupResult;
};

export type RegisterRequest = {
  identifier: string;
  password: string;
  idempotency_key: string;
};

export type RegisterResult = {
  user_id: string;
  status: "PENDING_VERIFICATION";
  verification_level: "LEVEL0";
  contact_verification: {
    channel: VerificationChannel;
    delivery_target: string;
    expires_at: string;
    max_attempts: number;
  };
  next_steps: string[];
};

export type VerificationChannel = "EMAIL" | "SMS" | "WHATSAPP";
export type VerificationCredentialKind = "EMAIL_LINK" | "EMAIL_CODE" | "WHATSAPP_CODE";

export type VerifyEmailLinkRequest = { credential_kind: "EMAIL_LINK"; credential: string };
export type VerifyCodeRequest = { credential_kind: "EMAIL_CODE" | "WHATSAPP_CODE"; identifier: string; credential: string };
export type VerifyRequest = VerifyEmailLinkRequest | VerifyCodeRequest;
export type VerificationResult = { status?: string; next_steps?: string[] };
export type VerifyResponse = { success: true; message?: string; data?: VerificationResult };
export type ResendVerificationRequest = { identifier: string; channel?: "EMAIL" | "WHATSAPP" };
export type ResendVerificationResult = { cooldown_applied: boolean; cooldown_seconds: number };
export type ResendVerificationResponse = { success: true; message?: string; data: ResendVerificationResult };

/** Per-tab UI context only; no verification credential is kept here. */
export type VerificationFlowContext = {
  identifier: string;
  channel: VerificationChannel;
  displayTarget: string;
  redirectTo?: string;
};

export type RegisterResponse = {
  success: true;
  data: RegisterResult;
};

export type AuthSessionResponse = {
  redirectTo?: string;
};
