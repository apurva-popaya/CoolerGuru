import { notFound } from "next/navigation";

import { ProductDetailPage } from "@/components/buyer/product-detail/product-detail-page";
import { productDetails } from "@/data/product-details";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;

  searchParams: Promise<{
    company?: string;
  }>;
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { productId } = await params;
  const { company } = await searchParams;

  const product = productDetails.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} companyId={company} />;
}