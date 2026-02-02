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
    <div className="group rounded-xl border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Icon */}
      <div className="p-3 rounded-lg bg-primary/10 w-fit group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>

      {/* Problem tag */}
      <div className="mt-2 inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-muted">
        <span className="text-muted-foreground">Solves:</span>
        <span className="font-medium">{problemSolved}</span>
      </div>

      {/* Description */}
      <p className="mt-3 text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Impact */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-sm font-medium text-primary">{impact}</div>
      </div>
    </div>
  );
}
