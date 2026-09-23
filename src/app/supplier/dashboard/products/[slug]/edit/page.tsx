import { SupplierProductFormPage } from "@/components/supplier/products/product-form-page";

interface EditProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { slug } = await params;

  return <SupplierProductFormPage mode="edit" slug={slug} />;
}
