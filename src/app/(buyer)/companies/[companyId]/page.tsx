import { notFound } from "next/navigation";

import { CompanyProfilePage } from "@/components/buyer/company-profile/company-profile-page";
import { companyProfiles } from "@/data/company-profiles";

interface CompanyProfileRouteProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function CompanyProfileRoute({ params }: CompanyProfileRouteProps) {
  const { companyId } = await params;

  const company = companyProfiles.find((item) => item.id === companyId);

  if (!company) {
    notFound();
  }

  return <CompanyProfilePage company={company} />;
}
