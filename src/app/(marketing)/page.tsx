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
