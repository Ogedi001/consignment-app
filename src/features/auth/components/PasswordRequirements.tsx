import { Check } from "lucide-react";

const requirements = [
  {
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  { label: "One number", test: (value: string) => /\d/.test(value) },
];

export function PasswordRequirements({ password }: { password: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-3">
      <p className="text-xs font-semibold text-foreground">
        Password requirements
      </p>
      <ul className="mt-2 space-y-1.5">
        {requirements.map((requirement) => {
          const met = requirement.test(password);
          return (
            <li
              key={requirement.label}
              className={`flex items-center gap-2 text-xs ${met ? "text-success" : "text-muted-foreground"}`}
            >
              <Check className="size-3.5" aria-hidden="true" />
              {requirement.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
