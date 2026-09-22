import LandingPageBenefits from "./landing-page-benefits";
import LandingPageHero from "./landing-page-hero";
import LandingPageSteps from "./landing-page-steps";
import LandingPageTrustSection from "./landing-page-trust-section";

export default function SupplierLandingPage() {
  return (
    <>
      <LandingPageHero />
      <LandingPageBenefits />
      <LandingPageSteps />
      <LandingPageTrustSection />
    </>
  );
}
