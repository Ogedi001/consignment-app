import { LucideIcon } from "lucide-react";

interface ProblemCardProps {
  title: string;
  description: string;
  stat: string;
  icon: LucideIcon;
}

export function ProblemCard({
  title,
  description,
  stat,
  icon: Icon,
}: ProblemCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-left shadow-sm transition-all hover:border-destructive/20 hover:shadow-enterprise">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
        <Icon className="h-5 w-5 text-destructive" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="mt-4 border-t border-border pt-4 text-sm font-medium text-destructive">
        {stat}
      </div>
    </div>
  );
}
