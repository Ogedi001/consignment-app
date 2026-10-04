import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { Footer } from "./Footer";
import { Navbar } from "./navbar/Navbar";

const content = {
  "how-it-works": [
    "How Trustflow works",
    "Create a protected transaction, agree on the details, and follow a clear payment-to-delivery process.",
  ],
  "for-buyers": [
    "For buyers",
    "Pay with confidence. Your payment is protected while you receive and review the agreed item.",
  ],
  "for-sellers": [
    "For sellers",
    "Trade with clearer expectations. Know when payment is protected and what is required before settlement.",
  ],
  protection: [
    "Payment protection",
    "Trustflow keeps transaction conditions visible so payment, shipment, delivery, and settlement stay understandable.",
  ],
  pricing: [
    "Pricing",
    "Pricing will be shown with every transaction before you confirm it. There are no hidden transaction terms.",
  ],
  about: [
    "About Trustflow",
    "Trustflow is infrastructure that helps buyers and sellers trade with confidence.",
  ],
  contact: [
    "Contact",
    "Need help with a transaction or want to learn about Trustflow? Our support surface is ready to connect you to the right workflow.",
  ],
} as const;

export function MarketingInfoPage({ page }: { page: keyof typeof content }) {
  const [title, description] = content[page];
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[calc(100dvh-9rem)] max-w-4xl px-6 pb-20 pt-36 sm:px-10">
        <p className="text-sm font-semibold text-primary">Trustflow</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          {description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/register">
              Get started <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
