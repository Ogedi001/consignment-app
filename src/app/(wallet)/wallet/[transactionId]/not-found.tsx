import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Wallet activity not found</h1>
      <p className="mt-2 text-muted-foreground">
        This financial record may be unavailable or you may not have access to it.
      </p>
      <Link
        href="/wallet/transactions"
        className="mt-5 inline-block text-sm font-semibold text-primary hover:underline"
      >
        Return to wallet activity
      </Link>
    </section>
  );
}
