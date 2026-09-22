import { notFound } from "next/navigation";

import { InquiryDetail } from "@/components/admin/inquiry-detail/inquiry-detail";
import { getInquiryDetail } from "@/components/admin/inquiry-detail/inquiry-detail-data";

interface AdminInquiryDetailPageProps {
  params: Promise<{
    inquiryId: string;
  }>;
}

export default async function AdminInquiryDetailPage({ params }: AdminInquiryDetailPageProps) {
  const { inquiryId } = await params;

  const inquiry = getInquiryDetail(inquiryId);

  if (!inquiry) {
    notFound();
  }

  return <InquiryDetail inquiry={inquiry} />;
}
