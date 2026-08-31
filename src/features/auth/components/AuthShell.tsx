import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-surface p-3 sm:p-6 lg:grid lg:grid-cols-[minmax(360px,0.9fr)_minmax(520px,1.1fr)] lg:gap-6 lg:p-6">
      <aside className="relative hidden overflow-hidden rounded-3xl bg-brand-navy px-10 py-10 text-white lg:flex lg:min-h-[calc(100dvh-3rem)] lg:flex-col xl:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(16,200,212,0.2),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(11,46,130,0.9),transparent_40%)]" />
        <Link
          href="/"
          className="relative z-10 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          <Image
            src="/logo/TF_logo_lockup_dark.png"
            alt="Trustflow"
            width={260}
            height={130}
            priority
            className="h-auto w-44"
          />
        </Link>
        <div className="relative z-10 my-auto max-w-sm">
          <div className="mb-8 flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
            <ShieldCheck
              className="size-7 text-brand-accent"
              aria-hidden="true"
            />
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Trade with confidence
          </h1>
          <p className="mt-5 text-base leading-7 text-white/72">
            Trustflow provides calm, dependable infrastructure for secure
            digital commerce.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-6 text-xs text-white/65">
          <span className="inline-flex items-center gap-2">
            <LockKeyhole
              className="size-3.5 text-brand-accent"
              aria-hidden="true"
            />
            Secure
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck
              className="size-3.5 text-brand-accent"
              aria-hidden="true"
            />
            Reliable
          </span>
        </div>
      </aside>
      <section className="flex min-h-[calc(100dvh-1.5rem)] items-center justify-center rounded-3xl bg-background px-5 py-10 sm:px-10 lg:min-h-[calc(100dvh-3rem)]">
        {children}
      </section>
    </main>
  );
}
