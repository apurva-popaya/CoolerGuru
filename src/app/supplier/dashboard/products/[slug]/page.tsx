import { SupplierProductDetailPage } from "@/components/supplier/products/product-detail-page";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  return <SupplierProductDetailPage slug={slug} />;
}
