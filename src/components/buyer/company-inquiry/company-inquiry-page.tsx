import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Container } from "@/components/common/container";
import type { CompanyProfile } from "@/types/company-profile";

import { CompanyInquiryForm } from "./company-inquiry-form";
import { CompanyInquirySummary } from "./company-inquiry-summary";
import { InquiryNextSteps } from "./inquiry-next-steps";

interface CompanyInquiryPageProps {
  company: CompanyProfile;
}

export function CompanyInquiryPage({
  company,
}: CompanyInquiryPageProps) {
  return (
    <section className="bg-[#fdfdff] py-5 sm:py-6">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-4 flex min-w-0 items-center gap-1.5 overflow-x-auto whitespace-nowrap font-medium text-[#555a76] text-[10px] scrollbar-hide">
          <Link
            href="/"
            className="shrink-0 transition hover:text-[#2118ad]"
          >
            Home
          </Link>

          <ChevronRight
            size={12}
            className="shrink-0 text-[#777b92]"
          />

          <Link
            href="/companies"
            className="shrink-0 transition hover:text-[#2118ad]"
          >
            Companies
          </Link>

          <ChevronRight
            size={12}
            className="shrink-0 text-[#777b92]"
          />

          <Link
            href={`/companies/${company.id}`}
            className="max-w-[160px] shrink-0 truncate transition hover:text-[#2118ad] sm:max-w-none"
          >
            {company.name}
          </Link>

          <ChevronRight
            size={12}
            className="shrink-0 text-[#777b92]"
          />

          <span className="shrink-0 font-semibold text-[#2118ad]">
            Send Inquiry
          </span>
        </div>

        {/* Heading */}
        <div>
          <h1 className="font-bold text-[#171570] text-[24px] leading-tight sm:text-[28px] lg:text-[30px]">
            Send Inquiry to {company.name}
          </h1>

          <p className="mt-1 text-[#4d526e] text-[10px] sm:text-[12px]">
            Share your requirement with the supplier and receive a response.
          </p>
        </div>

        {/* Content */}
        <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-6">
          <CompanyInquiryForm companySlug={company.id} />

          <div className="space-y-5">
            <CompanyInquirySummary company={company} />

            <InquiryNextSteps />
          </div>
        </div>
      </Container>
    </section>
  );
}