export interface CategorySubcategory {
  id: string;
  title: string;
  description: string;
  image: string | null;
  href: string;
}

export interface CategoryDetail {
  categoryId: number;
  slug: string;
  title: string;
  description: string;
  sidebarLabel: string;
  heroImage: string | null;
  heroDescription: string;
  subcategoryCount: number;
  subcategories: CategorySubcategory[];
}