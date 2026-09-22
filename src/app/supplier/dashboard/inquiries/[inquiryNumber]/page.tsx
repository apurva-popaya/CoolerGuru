import { SupplierInquiryDetailPage } from "@/components/supplier/inquiries/inquiry-detail-page";

interface PageProps {
  params: Promise<{
    inquiryNumber: string;
  }>;

  searchParams: Promise<{
    reply?: string;
  }>;
}

export default async function SupplierInquiryDetailRoute({ params, searchParams }: PageProps) {
  const { inquiryNumber } = await params;

  const { reply } = await searchParams;

  return <SupplierInquiryDetailPage inquiryNumber={inquiryNumber} replyMode={reply === "true"} />;
}
