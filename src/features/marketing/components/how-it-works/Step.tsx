import { LucideIcon } from "lucide-react";

interface StepProps {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function Step({ step, title, description, icon: Icon }: StepProps) {
  return (
    <div className="relative rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
        {step}
      </div>

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-brand-accent" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
