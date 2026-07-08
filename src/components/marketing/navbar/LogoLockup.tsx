import Link from "next/link";
import Image from "next/image";

interface LogoLockupProps {
  className?: string;
}

export function LogoLockup({ className }: LogoLockupProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className ?? ""}`}>
      {/* Light Mode */}
      <Image
        src="/logo/TF_logo_lockup.png"
        alt="TrustFlow"
        width={160}
        height={40}
        priority
        className=""
      />
    </Link>
  );
}
