export interface CategorySubcategory {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface CategoryDetail {
  slug: string;

  title: string;
  description: string;

  sidebarLabel: string;

  heroImage: string;
  heroDescription: string;

  subcategoryCount: number;

  subcategories: CategorySubcategory[];
}
