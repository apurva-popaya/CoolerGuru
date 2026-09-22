export interface SubcategoryProduct {
  id: string;
  name: string;
  company: string;
  image: string;
  airflow: string;
  tank: string;
}

export interface SubcategoryCompany {
  id: string;
  name: string;
  logo: string;
  location: string;
  description: string;
  products: string;
  established: string;
  isVerified?: boolean;
}

export interface SubcategoryDetail {
  categorySlug: string;
  slug: string;

  title: string;
  description: string;

  productCount: string;
  companyCount: string;
  monthlySearches: string;

  products: SubcategoryProduct[];
  companies: SubcategoryCompany[];
}
