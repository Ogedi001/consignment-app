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
    <div className="rounded-xl border bg-card p-6 text-left transition hover:shadow-md">
      <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-destructive" />
      </div>

      <h3 className="mt-4 font-semibold text-lg">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="mt-4 pt-4 border-t text-sm font-medium text-destructive">
        {stat}
      </div>
    </div>
  );
}
