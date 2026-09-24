import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/api/buyer-product-api";
import { mapApiProductDetailToProductDetail } from "@/lib/mappers/product-detail-mapper";

import { ProductInquiryPage } from "@/components/buyer/product-inquiry/product-inquiry-page";

interface ProductInquiryPageRouteProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductInquiryRoute({
  params,
}: ProductInquiryPageRouteProps) {
  const { productId } = await params;

  try {
    const response = await getProductBySlug(productId);

    if (!response.success || !response.data?.product) {
      notFound();
    }

    const product = mapApiProductDetailToProductDetail(
      response.data.product,
    );

    return <ProductInquiryPage product={product} />;
  } catch {
    notFound();
  }
}