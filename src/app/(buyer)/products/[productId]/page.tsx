import { notFound } from "next/navigation";

import { ProductDetailPage } from "@/components/buyer/product-detail/product-detail-page";

import { getProductBySlug } from "@/lib/api/buyer-product-api";
import { mapApiProductDetailToProductDetail } from "@/lib/mappers/product-detail-mapper";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;

  searchParams: Promise<{
    company?: string;
  }>;
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { productId } = await params;
  const { company } = await searchParams;

  try {
    const response =
      await getProductBySlug(productId);

    if (
      !response.success ||
      !response.data?.product
    ) {
      notFound();
    }

    const product =
      mapApiProductDetailToProductDetail(
        response.data.product,
      );

    return (
      <ProductDetailPage
        product={product}
        companyId={company}
      />
    );
  } catch (error) {
    console.error(
      "Failed to fetch product details:",
      error,
    );

    notFound();
  }
}