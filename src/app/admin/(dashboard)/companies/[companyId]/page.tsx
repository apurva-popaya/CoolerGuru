import { notFound } from "next/navigation";

import { CompanyDetail } from "@/components/admin/company-detail/company-detail";
import { getCompanyDetail } from "@/components/admin/company-detail/company-detail-data";

interface AdminCompanyDetailPageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function AdminCompanyDetailPage({ params }: AdminCompanyDetailPageProps) {
  const { companyId } = await params;

  const company = getCompanyDetail(companyId);

  if (!company) {
    notFound();
  }

  return <CompanyDetail company={company} />;
}
