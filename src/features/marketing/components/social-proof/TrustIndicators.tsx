import { ShieldCheck, Lock, FileText } from "lucide-react";

export function TrustIndicators() {
  return (
    <div className="mt-16 flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground md:gap-8">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-brand-accent" />
        Escrow protected
      </div>
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-brand-accent" />
        Data secured
      </div>
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-brand-accent" />
        Transparent records
      </div>
    </div>
  );
}
