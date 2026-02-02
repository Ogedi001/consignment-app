import Head from "next/head";
//import Navbar from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero/Hero";

import { Navbar } from "@/components/marketing/navbar/Navbar";
import { SocialProof } from "@/components/marketing/social-proof/SocialProof";
import { ProblemSection } from "@/components/marketing/problem/ProblemSection";
import { SolutionSection } from "@/components/marketing/solution/SolutionSection";
import { FeaturesSection } from "@/components/marketing/features/FeaturesSection";
import { HowItWorksSection } from "@/components/marketing/how-it-works/HowItWorksSection";
import { TrustSection } from "@/components/marketing/trust/TrustSection";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { CTASection } from "@/components/marketing/CTASection";
import { Footer } from "@/components/Footer";
//import "@/styles/global.css";

const Page = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width" />
        {/* <meta name="description" content={siteConfig.description} /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        {/* <title>{`${siteConfig.name} - ${siteConfig.title}`}</title> */}
      </Head>

      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TrustSection />
        <PricingPreview />
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export default Page;
