import { LucideIcon } from "lucide-react";

interface SolutionPointProps {
  title: string;
  description: string;
  icon: LucideIcon;
  problemSolved: string;
  impact: string;
}

export function SolutionPoint({
  title,
  description,
  icon: Icon,
  problemSolved,
  impact,
}: SolutionPointProps) {
  return (
    <div className="border border-border bg-card p-6">
      <div className="w-fit bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-brand-accent" />
      </div>

      <h3 className="mt-4 text-xl font-semibold text-foreground">{title}</h3>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">Solves:</span>
        <span className="font-semibold text-foreground">{problemSolved}</span>
      </div>

      <p className="mt-3 text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-sm font-medium text-primary">{impact}</div>
      </div>
    </div>
  );
}
