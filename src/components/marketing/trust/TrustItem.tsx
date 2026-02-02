import { LucideIcon } from "lucide-react";

interface TrustItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function TrustItem({ title, description, icon: Icon }: TrustItemProps) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      <div>
        <h3 className="font-semibold text-lg">{title}</h3>

        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
