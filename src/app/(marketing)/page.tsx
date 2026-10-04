import {
  CTASection,
  FeaturesSection,
  Footer,
  Hero,
  HowItWorksSection,
  Navbar,
  PricingPreview,
  ProblemSection,
  SolutionSection,
  TrustSection,
} from "@/features/marketing";

const Page = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
