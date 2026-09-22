import { notFound } from "next/navigation";

import { SupplierProductFormPage } from "@/components/supplier/products/product-form-page";
import { supplierProducts } from "@/data/supplier-products";

interface EditProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { productId } = await params;

  const product = supplierProducts.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  return <SupplierProductFormPage mode="edit" product={product} />;
}
