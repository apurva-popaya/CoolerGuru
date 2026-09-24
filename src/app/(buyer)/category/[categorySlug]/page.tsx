import { CategoryDetailPage } from "@/components/buyer/category/category-detail-page";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { categorySlug } = await params;

  return (
    <CategoryDetailPage
      categorySlug={categorySlug}
    />
  );
}