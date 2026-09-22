import { notFound } from "next/navigation";

import { CompanyInquiryPage } from "@/components/buyer/company-inquiry/company-inquiry-page";
import { companyProfiles } from "@/data/company-profiles";

interface CompanyInquiryRouteProps {
  params: Promise<{
    companySlug: string;
  }>;
}

export default async function CompanyInquiryRoute({ params }: CompanyInquiryRouteProps) {
  const { companySlug } = await params;

  const company = companyProfiles.find((item) => item.id === companySlug);

  if (!company) {
    notFound();
  }

  return <CompanyInquiryPage company={company} />;
}
