"use client";

import { create } from "zustand";
import type { AuthStep, IdentifierType } from "../types";

type AuthFlowState = {
  identifier: string;
  identifierType: IdentifierType | null;
  step: AuthStep;
  setIdentifier: (identifier: string, identifierType: IdentifierType) => void;
  setStep: (step: AuthStep) => void;
  reset: () => void;
};

/** Ephemeral navigation state only. Passwords, tokens, and sessions never enter this store. */
export const useAuthFlowStore = create<AuthFlowState>((set) => ({
  identifier: "",
  identifierType: null,
  step: "identifier",
  setIdentifier: (identifier, identifierType) => set({ identifier, identifierType }),
  setStep: (step) => set({ step }),
  reset: () => set({ identifier: "", identifierType: null, step: "identifier" }),
}));
