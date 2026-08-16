import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

interface LogoLockupProps {
  className?: string;
  showComingSoon?: boolean;
}

export function LogoLockup({
  className,
  showComingSoon = true,
}: LogoLockupProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-3",
        className,
      )}
      aria-label={
        showComingSoon ? "Trustflow home, coming soon" : "Trustflow home"
      }
    >
      <Image
        src="/logo/TF_logo_lockup.png"
        alt="Trustflow"
        width={180}
        height={42}
        priority
        className="h-9 w-auto object-contain sm:h-14"
      />
      {showComingSoon ? (
        <Badge
          variant="ghost"
          className="visible inline-flex border-brand-accent/35 bg-brand-accent/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none tracking-normal text-brand-navy sm:px-2 sm:text-xs"
        >
          Coming soon
        </Badge>
      ) : null}
      {/* <Image
        src="/logo/TF_logo_lockup_dark.png"
        alt="Trustflow"
        width={180}
        height={42}
        priority
        className="hidden h-9 w-auto object-contain dark:block"
      /> */}
    </Link>
  );
}
