import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 hover:shadow-md transition">
      <Icon className="h-6 w-6 text-primary" />

      <h3 className="mt-4 text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
