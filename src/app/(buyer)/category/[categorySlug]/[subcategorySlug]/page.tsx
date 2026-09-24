import { notFound } from "next/navigation";

import { SubcategoryDetailPage } from "@/components/buyer/category/subcategory-detail-page";
import { getSubcategoryProducts } from "@/lib/api/subcategory-api";

interface SubcategoryPageProps {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
  }>;
}

export default async function SubcategoryPage({
  params,
}: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params;

  /*
   * The API expects the subcategory slug.
   *
   * Example:
   * /category/air-coolers/domestic-air-coolers
   *
   * API:
   * /products?category_slug=domestic-air-coolers
   */
  try {
    const subcategory = await getSubcategoryProducts(
      subcategorySlug,
    );

    /*
     * Make sure the API actually returned the requested
     * subcategory.
     */
    if (subcategory.categorySlug !== subcategorySlug) {
      notFound();
    }

    return (
      <SubcategoryDetailPage
        subcategory={subcategory}
        parentCategorySlug={categorySlug}
      />
    );
  } catch (error) {
    console.error(
      "Subcategory products error:",
      error,
    );

    notFound();
  }
}