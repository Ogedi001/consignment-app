import {
  CTASection,
  FeaturesSection,
  Footer,
  Hero,
  HowItWorksSection,
  Navbar,
  PricingPreview,
  ProblemSection,
  SocialProof,
  SolutionSection,
  TrustSection,
} from "@/features/marketing";

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
