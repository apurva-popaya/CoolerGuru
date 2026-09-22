import { notFound } from "next/navigation";

import { SubcategoryDetailPage } from "@/components/buyer/category/subcategory-detail-page";
import { subcategoryDetails } from "@/data/subcategory-details";

interface SubcategoryPageProps {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
  }>;
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params;

  const subcategory = subcategoryDetails.find(
    (item) => item.categorySlug === categorySlug && item.slug === subcategorySlug,
  );

  if (!subcategory) {
    notFound();
  }

  return <SubcategoryDetailPage subcategory={subcategory} />;
}
