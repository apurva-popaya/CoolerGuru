export interface CompanySearchResult {
  id: string;
  companyId: number;
  title: string;
  image: string;
  location: string;
  description: string;
  businessType: string;
  experience: string;
  products: string;
  employees: string;
  established: string;
  createdAt?: string;
  type: "company";
}

export interface ProductSearchResult {
  id: string;
  productId: number;
  title: string;
  image: string;
  category: string;
  airflow: string;
  tank: string;
  power: string;
  moq: string;
  description: string;
  company: string;
  location: string;
  experience: string;
  createdAt?: string;
  type: "product";
}

export type SearchResult = ProductSearchResult | CompanySearchResult;
