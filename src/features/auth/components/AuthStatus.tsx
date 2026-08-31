import { AlertCircle } from "lucide-react";

export function AuthStatus({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mb-5 flex gap-2 rounded-lg border border-destructive/25 bg-destructive/5 px-3 py-2.5 text-sm leading-5 text-destructive"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}
