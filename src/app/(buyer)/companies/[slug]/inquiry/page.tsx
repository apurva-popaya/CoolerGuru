import { CompanyInquiryPage } from "@/components/buyer/company-inquiry/company-inquiry-page";
import { getCompanyProfile } from "@/lib/api/companies-api";
import { mapCompanyProfile } from "@/lib/mappers/company-profile-mapper";

interface CompanyInquiryRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CompanyInquiryRoute({
  params,
}: CompanyInquiryRouteProps) {
  const { slug } = await params;

  const response = await getCompanyProfile(slug);

  const company = mapCompanyProfile(response.data.company);

  return <CompanyInquiryPage company={company} />;
}