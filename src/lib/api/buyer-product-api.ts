import {
  apiRequest,
  type ApiResponse,
} from "@/lib/api/api-client";

/* -------------------------------------------------------------------------- */
/* Product API Types                                                          */
/* -------------------------------------------------------------------------- */

export interface ApiProductCategory {
  category_id: number;
  name: string;
  slug: string;
}

export interface ApiProductSpecification {
  key: string;
  unit: string | null;
  label: string;
  value: string;
  sort_order: number;
  is_highlight: boolean;
}

export interface ApiProductImage {
  product_image_id?: number;
  product_id?: number;
  image_url: string;
  alt_text: string | null;
  sort_order?: number;
  is_primary?: boolean;
  created_at?: string;
}

export interface ApiProductCompany {
  company_id?: number;
  name: string;
  slug: string;
  company_logo_url: string | null;
  city: string | null;
  state: string | null;
  verification_status: string;
  business_types: string[];
  established_year: number | null;
}

export interface ApiProduct {
  product_id: number;
  name: string;
  slug: string;

  short_description: string | null;
  description: string | null;

  price: string | null;
  min_price: string | null;
  max_price: string | null;
  currency: string;
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

  specifications: ApiProductSpecification[];

  video_url: string | null;
  catalogue_url: string | null;

  launched_at: string | null;
  is_featured: boolean;

    is_new?: boolean;

  category_id: number | null;

  category: ApiProductCategory | null;

  company: ApiProductCompany;

  primary_image: {
    image_url: string;
    alt_text: string | null;
  } | null;
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */

export interface ProductsPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/* -------------------------------------------------------------------------- */
/* All Products Response                                                      */
/* -------------------------------------------------------------------------- */

export interface ProductsResponse {
  success: boolean;
  message: string;

  data: {
    category: ApiProductCategory | null;
    products: ApiProduct[];
    pagination: ProductsPagination;
  };
}

export interface NewLaunchesResponse {
  success: boolean;
  message: string;

  data: {
    category: ApiProductCategory | null;
    products: ApiProduct[];
    new_badge_days: number;
    pagination: ProductsPagination;
  };
}

/* -------------------------------------------------------------------------- */
/* Product Details                                                            */
/* -------------------------------------------------------------------------- */

export interface ApiProductDetailCompany {
  company_id: number;
  name: string;
  slug: string;
  description: string | null;

  company_logo_url: string | null;
  cover_image_url: string | null;

  company_type: string | null;
  business_types: string[];

  phone_number: string | null;
  email: string | null;

  address: string | null;
  city: string | null;
  state: string | null;
  pin_code: string | null;

  website_url: string | null;

  established_year: number | null;
  years_in_business: string | null;
  employee_size: string | null;

  verification_status: string;
}

export interface ApiProductDetail {
  product_id: number;
  name: string;
  slug: string;

  short_description: string | null;
  description: string | null;

  price: string | null;
  min_price: string | null;
  max_price: string | null;
  currency: string;
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

  specifications: ApiProductSpecification[];

  video_url: string | null;
  catalogue_url: string | null;

  launched_at: string | null;
  is_featured: boolean;

  approval_status?: string;
  approval_note?: string | null;
  approval_reviewed_at?: string | null;

  category_id: number | null;
  is_active?: boolean;
  deleted_at?: string | null;

  created_at?: string;
  updated_at?: string;

  company_id: number;

  category: ApiProductCategory & {
    description?: string | null;
    image?: string | null;
    banner_image?: string | null;
    icon?: string | null;
    parent_id?: number | null;
    can_have_children?: boolean;
    sort_order?: number;
    is_featured?: boolean;
    is_active?: boolean;
    deleted_at?: string | null;
    created_at?: string;
    updated_at?: string;
  };

  company: ApiProductDetailCompany;

  images: ApiProductImage[];

  related_products: ApiProduct[];
}

export interface ProductDetailResponse {
  success: boolean;
  message: string;

  data: {
    product: ApiProductDetail;
  };
}

/* -------------------------------------------------------------------------- */
/* Product Inquiry                                                            */
/* -------------------------------------------------------------------------- */

export interface ProductInquiryPayload {
  quantity: number;
  quantity_unit: string;
  buyer_name: string;
  buyer_phone_number: string;
  buyer_email: string;
  buyer_city_state: string;
  requirement_details: string;
}

export interface ProductInquiryResponse {
  success: boolean;
  message: string;
  data: {
    inquiry: Record<string, unknown>;
  };
}

/* -------------------------------------------------------------------------- */
/* API Functions                                                              */
/* -------------------------------------------------------------------------- */

export async function getProducts(
  page = 1,
  limit = 12,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  return apiRequest<ProductsResponse>(
    `/products?${params.toString()}`,
    {
      method: "GET",
    },
  );
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetailResponse> {
  return apiRequest<ProductDetailResponse>(
    `/products/${encodeURIComponent(slug)}`,
    {
      method: "GET",
    },
  );
}

export async function submitProductInquiry(
  slug: string,
  payload: ProductInquiryPayload,
): Promise<ProductInquiryResponse> {
  return apiRequest<ProductInquiryResponse>(
    `/products/${encodeURIComponent(slug)}/inquiries`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export type NewLaunchSort =
  | "latest"
  | "name-asc"
  | "name-desc";

export async function getNewLaunches(
  sort: NewLaunchSort = "latest",
  page = 1,
  limit = 12,
): Promise<NewLaunchesResponse> {
  const params = new URLSearchParams({
    sort,
    page: String(page),
    limit: String(limit),
  });

  return apiRequest<NewLaunchesResponse>(
    `/products/new-launches?${params.toString()}`,
    {
      method: "GET",
    },
  );
}