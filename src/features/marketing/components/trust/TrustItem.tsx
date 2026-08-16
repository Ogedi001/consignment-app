import { LucideIcon } from "lucide-react";

interface TrustItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function TrustItem({ title, description, icon: Icon }: TrustItemProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-brand-accent" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>

        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
