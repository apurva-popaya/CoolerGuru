export interface SubcategoryApiCategory {
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  banner_image: string | null;
  icon: string | null;
  parent_id: number | null;
  can_have_children: boolean;
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubcategoryApiCompany {
  company_id: number;
  name: string;
  slug: string;
  company_logo_url: string | null;
  city: string | null;
  state: string | null;
  verification_status: string | null;
  business_types: string[];
  established_year: number | null;
}

export interface SubcategoryProductSpecification {
  key: string;
  unit: string | null;
  label: string;
  value: string;
  sort_order: number;
  is_highlight: boolean;
}

export interface SubcategoryApiProduct {
  product_id: number;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;

  price: string | null;
  min_price: string | null;
  max_price: string | null;
  currency: string | null;
  price_unit: string | null;

  sku: string | null;
  model_number: string | null;
  brand: string | null;
  hsn_code: string | null;

  product_type: string | null;
  application_usage: string | null;

  airflow: string | null;
  tank_capacity: string | null;
  power: string | null;
  coverage_area: string | null;
  cooling_capacity: string | null;
  cooling_capacity_unit: string | null;
  power_motor: string | null;
  voltage_frequency: string | null;
  material: string | null;
  dimensions: string | null;
  weight: string | null;
  weight_unit: string | null;
  color_finish: string | null;

  moq: number | null;
  moq_unit: string | null;
  stock_quantity: number | null;
  stock_unit: string | null;
  availability_status: string | null;

  highlights: string[];
  available_colors: string[];
  tags: string[];

  specifications: SubcategoryProductSpecification[];

  video_url: string | null;
  catalogue_url: string | null;

  launched_at: string | null;
  is_featured: boolean;

  category_id: number;

  category: {
    category_id: number;
    name: string;
    slug: string;
  };

  company: SubcategoryApiCompany | null;

  primary_image: {
    image_url: string | null;
    alt_text: string | null;
  } | null;
}

export interface SubcategoryPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SubcategoryProductsResponse {
  success: boolean;
  message: string;
  data: {
    category: SubcategoryApiCategory;
    products: SubcategoryApiProduct[];
    pagination: SubcategoryPagination;
  };
}

/*
 * UI types
 */

export interface SubcategoryProduct {
  productId: number;
  id: string;
  name: string;
  slug: string;
  image: string;
  company: string;
  companySlug?: string;
  airflow: string;
  tank: string;
}

export interface SubcategoryCompany {
  id: string;
  name: string;
  slug: string;
  logo: string;
  location: string;
  description: string;
  products: string;
  established: string;
  isVerified: boolean;
}

export interface SubcategoryDetail {
  categorySlug: string;
  title: string;
  description: string;
  productCount: string;
  companyCount: string;
  monthlySearches: string;
  products: SubcategoryProduct[];
  companies: SubcategoryCompany[];
}