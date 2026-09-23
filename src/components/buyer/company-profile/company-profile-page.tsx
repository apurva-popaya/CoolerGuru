import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Container } from "@/components/common/container";
import type { CompanyProfile } from "@/types/company-profile";

import { CompanyBrochure } from "./company-brochure";
import { CompanyCertifications } from "./company-certifications";
import { CompanyContactInfo } from "./company-contact-info";
import { CompanyDetails } from "./company-details";
import { CompanyLocation } from "./company-location";
import { CompanyOverview } from "./company-overview";
import { CompanyProducts } from "./company-products";
import { CompanyProfileHero } from "./company-profile-hero";
import { CompanySocialLinks } from "./company-social-links";
import { SimilarCompanies } from "./similar-companies";

interface CompanyProfilePageProps {
  company: CompanyProfile;
}

export function CompanyProfilePage({
  company,
}: CompanyProfilePageProps) {
  const hasProducts = company.products?.length > 0;

  const hasCertifications =
    company.certifications?.length > 0;

  const hasSimilarCompanies =
    company.similarCompanies?.length > 0;

  const hasBrochure = Boolean(
    company.brochureUrl?.trim(),
  );

  const hasLocation =
    Boolean(company.mapAddress?.trim()) ||
    Boolean(company.location?.trim());

  return (
    <section className="bg-white py-4 sm:py-5">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-3 flex min-w-0 items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[9px] text-[#666b83] sm:text-[10px]">
          <Link
            href="/"
            className="shrink-0 hover:text-[#2118ad]"
          >
            Home
          </Link>

          <ChevronRight
            size={11}
            className="shrink-0"
          />

          <Link
            href="/companies"
            className="shrink-0 hover:text-[#2118ad]"
          >
            Companies
          </Link>

          <ChevronRight
            size={11}
            className="shrink-0"
          />

          <span className="truncate font-semibold text-[#2118ad]">
            {company.name}
          </span>
        </div>

        {/* Hero */}
        <CompanyProfileHero company={company} />

        {/* Overview */}
        <CompanyOverview company={company} />

        {/* Products */}
        {hasProducts && (
          <CompanyProducts
            products={company.products}
            companyId={company.id}
          />
        )}

        {/* Company information */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CompanyContactInfo company={company} />

          <CompanySocialLinks company={company} />

          <CompanyDetails company={company} />
        </div>

        {/* Certifications / Location / Brochure */}
        {(hasCertifications ||
          hasLocation ||
          hasBrochure) && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[0.9fr_1.1fr_0.9fr]">
            {hasCertifications && (
              <CompanyCertifications
                certifications={
                  company.certifications
                }
              />
            )}

            {hasLocation && (
              <CompanyLocation company={company} />
            )}

            {hasBrochure && (
              <CompanyBrochure company={company} />
            )}
          </div>
        )}

        {/* Similar companies */}
        {hasSimilarCompanies && (
          <SimilarCompanies
            companies={company.similarCompanies}
          />
        )}
      </Container>
    </section>
  );
}