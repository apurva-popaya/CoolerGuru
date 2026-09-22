import { notFound } from "next/navigation";

import { ProductInquiryPage } from "@/components/buyer/product-inquiry/product-inquiry-page";
import { productDetails } from "@/data/product-details";

interface ProductInquiryPageRouteProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductInquiryRoute({ params }: ProductInquiryPageRouteProps) {
  const { productId } = await params;

  const product = productDetails.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  return <ProductInquiryPage product={product} />;
}
