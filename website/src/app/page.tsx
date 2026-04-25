import { BusinessSection } from "@/components/landing/BusinessSection";
import { DownloadCTA } from "@/components/landing/DownloadCTA";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingSection } from "@/components/landing/PricingSection";
import { TrustMetrics } from "@/components/landing/TrustMetrics";
import { UserTypesSection } from "@/components/landing/UserTypesSection";
import { WhySection } from "@/components/landing/WhySection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <Hero />
        <FeatureGrid />
        <TrustMetrics />
        <WhySection />
        <HowItWorks />
        <BusinessSection />
        <UserTypesSection />
        <PricingSection />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
