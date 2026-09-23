import { notFound } from "next/navigation";

import { CompanyProfilePage } from "@/components/buyer/company-profile/company-profile-page";
import { getCompanyProfile } from "@/lib/api/companies-api";
import { mapCompanyProfile } from "@/lib/mappers/company-profile-mapper";

interface CompanyProfileRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CompanyProfileRoute({
  params,
}: CompanyProfileRouteProps) {
  const { slug } = await params;

  try {
    const response = await getCompanyProfile(slug);

    if (!response.success || !response.data?.company) {
      notFound();
    }

    const company = mapCompanyProfile(response.data.company);

    return <CompanyProfilePage company={company} />;
  } catch (error) {
    console.error("Failed to fetch company profile:", error);
    notFound();
  }
}