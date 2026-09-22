import { notFound } from "next/navigation";

import { CategoryDetailPage } from "@/components/buyer/category/category-detail-page";
import { categoryDetails } from "@/data/category-details";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;

  const category = categoryDetails.find((item) => item.slug === categorySlug);

  if (!category) {
    notFound();
  }

  return <CategoryDetailPage category={category} />;
}
