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

export function CompanyInquiryPage({ company }: CompanyInquiryPageProps) {
  return (
    <section className="bg-[#fdfdff] py-6">
      <Container>
        <div className="mb-4 flex items-center gap-1.5 font-medium text-[#555a76] text-[10px]">
          <Link href="/" className="transition hover:text-[#2118ad]">
            Home
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          <Link href="/companies" className="transition hover:text-[#2118ad]">
            Companies
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          <Link href={`/companies/${company.id}`} className="transition hover:text-[#2118ad]">
            {company.name}
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          <span className="font-semibold text-[#2118ad]">Send Inquiry</span>
        </div>

        <div>
          <h1 className="font-bold text-[#171570] text-[30px] leading-tight">Send Inquiry to {company.name}</h1>

          <p className="mt-1 text-[#4d526e] text-[12px]">
            Share your requirement with the supplier and receive a response.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_390px] items-start gap-6">
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
