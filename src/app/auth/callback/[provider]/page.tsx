import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthUnavailableJourney } from "@/features/auth";

const supportedProviders = ["google", "apple"] as const;
type SupportedProvider = (typeof supportedProviders)[number];

function isSupportedProvider(provider: string): provider is SupportedProvider {
  return supportedProviders.includes(provider as SupportedProvider);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provider: string }>;
}): Promise<Metadata> {
  const { provider } = await params;
  return {
    title: isSupportedProvider(provider)
      ? `Continue with ${provider === "google" ? "Google" : "Apple"}`
      : "Authentication",
  };
}

export default async function AuthCallbackPage({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider } = await params;
  if (!isSupportedProvider(provider)) notFound();
  const providerName = provider === "google" ? "Google" : "Apple";
  return (
    <AuthUnavailableJourney
      title={`Continue with ${providerName}`}
      description={`${providerName} returned to Trustflow. Complete the provider callback with the server-side OAuth contract to establish a real session.`}
    />
  );
}
