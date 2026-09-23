import { ProductsDirectoryPage } from "@/components/buyer/products/products-directory-page";

interface ProductsPageProps {
  searchParams: Promise<{
    company?: string;
    category?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { company, category } = await searchParams;

  return <ProductsDirectoryPage companyId={company} categorySlug={category} />;
}