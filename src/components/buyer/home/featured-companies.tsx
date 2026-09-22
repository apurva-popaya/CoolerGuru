import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { HorizontalCarousel } from "@/components/common/horizontal-carousel";
import { SectionHeader } from "@/components/common/section-header";
import { featuredCompanies } from "@/data/buyer/companies";
import type { HomepageTrustedCompany } from "@/lib/api/homepage-api";
import type { Company } from "@/types/company";

interface FeaturedCompaniesProps {
  companies?: HomepageTrustedCompany[];
}

export function FeaturedCompanies({ companies: _companies }: FeaturedCompaniesProps) {
  return (
    <section className="bg-white py-4">
      <Container>
        <SectionHeader
          title="Featured Companies"
          description="Get your company in front of thousands of industry buyers"
          viewAllLabel="View All Companies"
          viewAllHref="/companies"
        />

        <HorizontalCarousel scrollAmount={280} className="gap-3">
          {featuredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </HorizontalCarousel>
      </Container>
    </section>
  );
}

function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="flex h-[190px] min-w-[248px] max-w-[248px] flex-col rounded-[9px] border border-[#e5e5f1] bg-white p-3">
      <div className="mb-2 h-[16px]">
        {company.isPremium ? (
          <span className="inline-flex rounded-[4px] bg-[#ff8a00] px-2 py-[2px] font-bold text-[7px] text-white">
            Premium
          </span>
        ) : company.isVerified ? (
          <span className="inline-flex rounded-[4px] bg-[#159b48] px-2 py-[2px] font-bold text-[7px] text-white">
            Verified
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-2.5">
        <CompanyLogo company={company} />

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-[#161396] text-[14px] leading-[1.2]">{company.name}</h3>

          <p className="mt-[3px] font-medium text-[#555b7c] text-[10px] leading-[1.25]">
            {company.businessTypes.join(" | ")}
          </p>
        </div>
      </div>

      <p className="mt-2.5 font-semibold text-[#555b75] text-[9px] leading-[1.25]">{company.location}</p>

      <p className="mt-2 line-clamp-2 min-h-[28px] font-semibold text-[#4f5575] text-[9px] leading-[1.45]">
        {company.categories.join(", ")}
      </p>

      <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
        <Link
          href={`/companies/${company.id}`}
          className="rounded-[4px] border border-[#d9d6ff] px-1 py-[5px] text-center font-bold text-[#2820b5] text-[8.5px] transition hover:bg-[#f5f3ff]"
        >
          View Profile
        </Link>

        <Link
          href={`/companies/${company.id}/inquiry`}
          className="rounded-[4px] border border-[#d9d6ff] px-1 py-[5px] text-center font-bold text-[#2820b5] text-[8.5px] transition hover:bg-[#f5f3ff]"
        >
          Contact Supplier
        </Link>
      </div>
    </div>
  );
}

function CompanyLogo({ company }: { company: Company }) {
  if (!company.logo) {
    return (
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#f0efff] font-bold text-[#271fb7] text-[11px]">
        {getInitials(company.name)}
      </div>
    );
  }

  return (
    <div className="relative h-[42px] w-[42px] shrink-0 overflow-hidden rounded-full bg-white">
      <Image src={company.logo} alt={`${company.name} logo`} fill sizes="42px" className="object-contain" />
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}
