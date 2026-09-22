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

export function CompanyProfilePage({ company }: CompanyProfilePageProps) {
  return (
    <section className="bg-white py-5">
      <Container>
        {/* Breadcrumb */}

        <div className="mb-3 flex items-center gap-1.5 text-[#666b83] text-[10px]">
          <Link href="/" className="hover:text-[#2118ad]">
            Home
          </Link>

          <ChevronRight size={12} />

          <Link href="/companies" className="hover:text-[#2118ad]">
            Companies
          </Link>

          <ChevronRight size={12} />

          <span className="font-semibold text-[#2118ad]">{company.name}</span>
        </div>

        <CompanyProfileHero company={company} />

        <CompanyOverview company={company} />

        <CompanyProducts products={company.products} companyId={company.id} />

        <div className="mt-4 grid grid-cols-3 gap-4">
          <CompanyContactInfo company={company} />

          <CompanySocialLinks company={company} />

          <CompanyDetails company={company} />
        </div>

        <div className="mt-4 grid grid-cols-[0.9fr_1.1fr_0.9fr] gap-4">
          <CompanyCertifications certifications={company.certifications} />

          <CompanyLocation company={company} />

          <CompanyBrochure company={company} />
        </div>

        <SimilarCompanies companies={company.similarCompanies} />
      </Container>
    </section>
  );
}
