import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-surface p-6">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-3xl font-bold">
          This page isn&apos;t available
        </h1>
        <p className="mt-3 text-muted-foreground">
          Check the link or return to Trustflow.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Go to Trustflow
        </Link>
      </section>
    </main>
  );
}
