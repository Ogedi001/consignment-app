import { ShieldCheck, Lock, FileText } from "lucide-react";

export function TrustIndicators() {
  return (
    <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-primary" />
        Escrow protected
      </div>
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-primary" />
        Data secured
      </div>
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary" />
        Transparent records
      </div>
    </div>
  );
}
