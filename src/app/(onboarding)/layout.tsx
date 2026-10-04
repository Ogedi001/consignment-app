import Link from "next/link";
export default function OnboardingLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <main className="min-h-dvh bg-surface px-4 py-6 sm:px-6"><div className="mx-auto max-w-2xl"><Link href="/" className="text-lg font-bold text-brand-navy">Trustflow</Link><div className="mt-8">{children}</div></div></main>; }
