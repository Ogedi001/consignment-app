import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-surface p-3 sm:p-6 lg:grid lg:grid-cols-[minmax(360px,0.9fr)_minmax(520px,1.1fr)] lg:gap-6 lg:p-6">
      <aside className="hidden rounded-3xl bg-brand-navy px-10 py-10 text-white lg:flex lg:min-h-[calc(100dvh-3rem)] lg:flex-col xl:px-14">
        <Link
          href="/"
          className="w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
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
        <div className="my-auto max-w-sm">
          <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Clear access to your trade account
          </h1>
          <p className="mt-5 text-base leading-7 text-white/72">
            Sign in, create an account, or complete verification to continue
            with TrustFlow.
          </p>
        </div>
      </aside>
      <section className="flex min-h-[calc(100dvh-1.5rem)] items-center justify-center rounded-3xl bg-background px-5 py-10 sm:px-10 lg:min-h-[calc(100dvh-3rem)]">
        {children}
      </section>
    </main>
  );
}
