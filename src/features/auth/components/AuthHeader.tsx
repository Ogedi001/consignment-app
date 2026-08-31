import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AuthHeaderProps = { back?: () => void };

export function AuthHeader({ back }: AuthHeaderProps) {
  return (
    <header className="mb-10 flex items-center justify-between lg:hidden">
      {back ? (
        <button
          type="button"
          onClick={back}
          className="-ml-2 inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Back"
        >
          <ArrowLeft className="size-5" />
        </button>
      ) : (
        <span className="size-10" />
      )}
      <Link
        href="/"
        aria-label="Trustflow home"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Image
          src="/logo/TF_logo_lockup.png"
          alt="Trustflow"
          width={140}
          height={40}
          priority
          className="h-auto w-28"
        />
      </Link>
      <span className="size-10" />
    </header>
  );
}
