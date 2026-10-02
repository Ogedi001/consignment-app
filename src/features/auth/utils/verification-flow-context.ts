import type { VerificationChannel, VerificationFlowContext } from "../types";

const storageKey = "trustflow.verification-flow";

function isChannel(value: unknown): value is VerificationChannel {
  return value === "EMAIL" || value === "SMS" || value === "WHATSAPP";
}

export function maskDeliveryTarget(identifier: string, channel: VerificationChannel) {
  if (channel === "EMAIL") {
    const [local, domain] = identifier.split("@");
    if (!local || !domain) return "your email address";
    return `${local.slice(0, 1)}***@${domain}`;
  }
  const digits = identifier.replace(/\D/g, "");
  if (digits.length < 4) return "your phone number";
  const prefix = identifier.startsWith("+") ? `+${digits.slice(0, Math.min(3, digits.length - 4))}` : "";
  return `${prefix} ••• ••• ${digits.slice(-4)}`;
}

export function saveVerificationFlowContext(context: VerificationFlowContext) {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(context));
    return true;
  } catch {
    return false;
  }
}

export function readVerificationFlowContext(): VerificationFlowContext | undefined {
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return undefined;
    const value: unknown = JSON.parse(raw);
    if (
      typeof value !== "object" || value === null ||
      !("identifier" in value) || typeof value.identifier !== "string" ||
      !("channel" in value) || !isChannel(value.channel) ||
      !("displayTarget" in value) || typeof value.displayTarget !== "string" ||
      ("redirectTo" in value && value.redirectTo !== undefined && typeof value.redirectTo !== "string")
    ) {
      clearVerificationFlowContext();
      return undefined;
    }
    return value as VerificationFlowContext;
  } catch {
    return undefined;
  }
}

export function clearVerificationFlowContext() {
  try { sessionStorage.removeItem(storageKey); } catch { /* unavailable storage */ }
}
