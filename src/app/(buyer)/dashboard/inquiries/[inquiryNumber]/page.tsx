import { BuyerInquiryDetailPage } from "@/components/buyer/dashboard/inquiries/buyer-inquiry-detail-page";

interface PageProps {
  params: Promise<{
    inquiryNumber: string;
  }>;
}

export default async function BuyerInquiryDetailRoute({ params }: PageProps) {
  const { inquiryNumber } = await params;

  return <BuyerInquiryDetailPage inquiryNumber={inquiryNumber} />;
}
