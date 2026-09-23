import Link from "next/link";

import { Container } from "@/components/common/container";
import { HorizontalCarousel } from "@/components/common/horizontal-carousel";
import { SafeImage } from "@/components/common/safe-image";
import { SectionHeader } from "@/components/common/section-header";

import type { FeaturedCompany } from "@/lib/api/featured-companies-api";

interface FeaturedCompaniesProps {
  companies?: FeaturedCompany[];
}

export function FeaturedCompanies({
  companies = [],
}: FeaturedCompaniesProps) {
  if (companies.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-3 sm:py-4">
      <Container>
        <SectionHeader
          title="Featured Companies"
          description="Get your company in front of thousands of industry buyers"
          viewAllLabel="View All Companies"
          viewAllHref="/companies"
        />

        <HorizontalCarousel
          scrollAmount={280}
          className="gap-3"
        >
          {companies.map((company) => (
            <CompanyCard
              key={company.company_id}
              company={company}
            />
          ))}
        </HorizontalCarousel>
      </Container>
    </section>
  );
}

function CompanyCard({
  company,
}: {
  company: FeaturedCompany;
}) {
  const location = [
    company.city,
    company.state,
  ]
    .filter(Boolean)
    .join(", ");

  const businessTypes =
    company.business_types.map(
      formatBusinessType,
    );

  return (
    <div className="flex h-[190px] min-w-[248px] max-w-[248px] flex-col rounded-[9px] border border-[#e5e5f1] bg-white p-3">
      {/* Badge */}
      <div className="mb-2 h-[16px]">
        {company.verification_status ===
        "VERIFIED" ? (
          <span className="inline-flex rounded-[4px] bg-[#159b48] px-2 py-[2px] font-bold text-[7px] text-white">
            Verified
          </span>
        ) : null}
      </div>

      {/* Company information */}
      <div className="flex items-center gap-2.5">
        <CompanyLogo company={company} />

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-[#161396] text-[14px] leading-[1.2]">
            {company.name}
          </h3>

          <p className="mt-[3px] font-medium text-[#555b7c] text-[10px] leading-[1.25]">
            {businessTypes.length > 0
              ? businessTypes.join(" | ")
              : "-"}
          </p>
        </div>
      </div>

      {/* Location */}
      <p className="mt-2.5 font-semibold text-[#555b75] text-[9px] leading-[1.25]">
        {location || "-"}
      </p>

      {/* Description */}
      <p className="mt-2 line-clamp-2 min-h-[28px] font-semibold text-[#4f5575] text-[9px] leading-[1.45]">
        {company.description || "Cooling solutions and products."}
      </p>

      {/* Actions */}
      <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
        <Link
          href={`/companies/${company.slug}`}
          className="rounded-[4px] border border-[#d9d6ff] px-1 py-[5px] text-center font-bold text-[#2820b5] text-[8.5px] transition hover:bg-[#f5f3ff]"
        >
          View Profile
        </Link>

        <Link
          href={`/companies/${company.slug}/inquiry`}
          className="rounded-[4px] border border-[#d9d6ff] px-1 py-[5px] text-center font-bold text-[#2820b5] text-[8.5px] transition hover:bg-[#f5f3ff]"
        >
          Contact Supplier
        </Link>
      </div>
    </div>
  );
}

function CompanyLogo({
  company,
}: {
  company: FeaturedCompany;
}) {
  return (
    <div className="relative flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f0efff]">
      <SafeImage
        src={company.company_logo_url}
        alt={`${company.name} logo`}
        fill
        sizes="42px"
        className="object-contain"
      />
    </div>
  );
}

function formatBusinessType(
  type: string,
) {
  return type
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}