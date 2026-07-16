import Link from "next/link";
import Image from "next/image";

interface LogoLockupProps {
  className?: string;
}

export function LogoLockup({ className }: LogoLockupProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className ?? ""}`}
      aria-label="Trustflow home"
    >
      <Image
        src="/logo/TF_logo_lockup.png"
        alt="Trustflow"
        width={180}
        height={42}
        priority
        className="h-14 w-auto object-contain dark:hidden"
      />
      <Image
        src="/logo/TF_logo_lockup_dark.png"
        alt="Trustflow"
        width={180}
        height={42}
        priority
        className="hidden h-9 w-auto object-contain dark:block"
      />
    </Link>
  );
}
