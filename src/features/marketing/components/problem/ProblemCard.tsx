import { LucideIcon } from "lucide-react";

interface ProblemCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ProblemCard({
  title,
  description,
  icon: Icon,
}: ProblemCardProps) {
  return (
    <div className="border border-border bg-card p-6 text-left">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
        <Icon className="h-5 w-5 text-destructive" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

    </div>
  );
}
