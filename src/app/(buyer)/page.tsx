import { AdvertisementSection } from "@/components/buyer/home/advertisement-section";
import { AirCoolerCategories } from "@/components/buyer/home/air-cooler-categories";
import { CompaniesByBusinessType } from "@/components/buyer/home/companies-by-business-type";
import { CompaniesByLocation } from "@/components/buyer/home/companies-by-location";
import { FeaturedCompanies } from "@/components/buyer/home/featured-companies";
import { HeroSection } from "@/components/buyer/home/hero-section";
import { HowItWorks } from "@/components/buyer/home/how-it-works";
import { NewLaunches } from "@/components/buyer/home/new-launches";
import { OtherCategories } from "@/components/buyer/home/other-categories";
import { PremiumAdBanner } from "@/components/buyer/home/premium-ad-banner";
import { ProductsByCategory } from "@/components/buyer/home/products-by-category";
import { SupplierRegistrationBanner } from "@/components/buyer/home/supplier-registration-banner";
import { getHomepage, type HomepageData } from "@/lib/api/homepage-api";

export default async function BuyerHomePage() {
  let homepageData: HomepageData | null = null;

  try {
    const response = await getHomepage();

    homepageData = response.data ?? null;
  } catch {
    homepageData = null;
  }

  return (
    <>
      <HeroSection />

      <PremiumAdBanner />

      <AirCoolerCategories />

      <OtherCategories />

      <FeaturedCompanies companies={homepageData?.trusted_companies} />

      <CompaniesByBusinessType />

      <CompaniesByLocation />

      <ProductsByCategory products={homepageData?.featured_products} />

      <AdvertisementSection />

      <NewLaunches
        launches={homepageData?.new_launches}
        newLaunchBadgeDays={homepageData?.meta.new_launch_badge_days}
      />

      <HowItWorks />

      <SupplierRegistrationBanner />
    </>
  );
}
