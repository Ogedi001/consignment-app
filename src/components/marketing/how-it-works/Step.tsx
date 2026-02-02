import { LucideIcon } from "lucide-react";

interface StepProps {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function Step({ step, title, description, icon: Icon }: StepProps) {
  return (
    <div className="relative rounded-xl border bg-background p-6">
      {/* Step number */}
      <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
        {step}
      </div>

      <Icon className="h-6 w-6 text-primary" />

      <h3 className="mt-4 text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
