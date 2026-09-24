import {
  apiRequest,
  type ApiResponse,
} from "@/lib/api/api-client";

export interface ApiCompanyCategory {
  category_id: number;
  name: string;
  slug: string;
}

export interface ApiCompany {
  company_id: number;
  name: string;
  slug: string;
  description: string | null;
  company_logo_url: string | null;
  cover_image_url: string | null;
  company_type: string | null;
  business_types: string[];
  city: string | null;
  state: string | null;
  established_year: number | null;
  years_in_business: string | null;
  employee_size: string | null;
  verification_status: string;
  active_product_count: number;
  main_categories: ApiCompanyCategory[];
}

export interface CompaniesPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CompaniesResponse {
  success: boolean;
  message: string;
  data: {
    category: string | null;
    companies: ApiCompany[];
    pagination: CompaniesPagination;
  };
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8000/api/v1";

export interface GetCompaniesFilters {
  city?: string;
  state?: string;
  business_type?: string;
}

export async function getCompanies(
  page = 1,
  limit = 12,
  filters?: GetCompaniesFilters,
): Promise<CompaniesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters?.city) {
    params.set("city", filters.city);
  }

  if (filters?.state) {
    params.set("state", filters.state);
  }

  if(filters?.business_type){
    params.set("business_type", filters.business_type);
  }

  const response = await fetch(
    `${API_BASE_URL}/companies?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch companies: ${response.status}`,
    );
  }

  return response.json();
}







export interface ApiCompanyBusinessHours {
  open: string | null;
  close: string | null;
  is_closed: boolean;
}

export interface ApiCompanySpecification {
  key: string;
  unit: string | null;
  label: string;
  value: string;
  sort_order: number;
  is_highlight: boolean;
}

export interface ApiCompanyProductCategory {
  category_id: number;
  name: string;
  slug: string;
}

export interface ApiCompanyProduct {
  product_id: number;
  name: string;
  slug: string;
  short_description: string | null;
  price: string | null;
  min_price: string | null;
  max_price: string | null;
  currency: string;
  price_unit: string | null;
  model_number: string | null;
  brand: string | null;
  moq: number | null;
  moq_unit: string | null;
  specifications: ApiCompanySpecification[];
  category: ApiCompanyProductCategory | null;
  primary_image: string | null;
}

export interface ApiCompanyProductCategorySummary {
  category_id: number;
  name: string;
  slug: string;
  product_count: number;
}

export interface ApiSimilarCompany {
  company_id: number;
  name: string;
  slug: string;
  company_logo_url: string | null;
  city: string | null;
  state: string | null;
  description: string | null;
  business_types: string[];
  verification_status: string;
}

export interface ApiCompanyProfile {
  company_id: number;
  name: string;
  slug: string;
  description: string | null;

  company_logo_url: string | null;
  cover_image_url: string | null;

  company_type: string | null;
  business_types: string[];

  has_gst: boolean;
  gst_number: string | null;

  phone_number: string | null;
  email: string | null;

  address: string | null;
  city: string | null;
  state: string | null;
  pin_code: string | null;

  website_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;

  business_hours: {
    sunday: ApiCompanyBusinessHours;
    saturday: ApiCompanyBusinessHours;
    monday_to_friday: ApiCompanyBusinessHours;
  };

  map_address: string | null;
  latitude: string | null;
  longitude: string | null;

  established_year: number | null;
  years_in_business: string | null;
  employee_size: string | null;

  certifications: string[];

  brochure_url: string | null;

  verification_status: string;

  products: ApiCompanyProduct[];

  active_product_count: number;

  product_categories: ApiCompanyProductCategorySummary[];

  similar_companies: ApiSimilarCompany[];
}

export interface CompanyProfileResponse {
  success: boolean;
  message: string;
  data: {
    company: ApiCompanyProfile;
  };
}











/* -------------------------------------------------------------------------- */
/* Company list types                                                         */
/* -------------------------------------------------------------------------- */

export interface ApiCompanyCategory {
  category_id: number;
  name: string;
  slug: string;
}

export interface ApiCompany {
  company_id: number;
  name: string;
  slug: string;
  description: string | null;
  company_logo_url: string | null;
  cover_image_url: string | null;
  company_type: string | null;
  business_types: string[];
  city: string | null;
  state: string | null;
  established_year: number | null;
  years_in_business: string | null;
  employee_size: string | null;
  verification_status: string;
  active_product_count: number;
  main_categories: ApiCompanyCategory[];
}

export interface CompaniesPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CompaniesResponse {
  success: boolean;
  message: string;
  data: {
    category: string | null;
    companies: ApiCompany[];
    pagination: CompaniesPagination;
  };
}

/* -------------------------------------------------------------------------- */
/* Company profile types                                                      */
/* -------------------------------------------------------------------------- */

export interface ApiCompanyBusinessHours {
  open: string | null;
  close: string | null;
  is_closed: boolean;
}

export interface ApiCompanySpecification {
  key: string;
  unit: string | null;
  label: string;
  value: string;
  sort_order: number;
  is_highlight: boolean;
}

export interface ApiCompanyProductCategory {
  category_id: number;
  name: string;
  slug: string;
}

export interface ApiCompanyProduct {
  product_id: number;
  name: string;
  slug: string;
  short_description: string | null;

  price: string | null;
  min_price: string | null;
  max_price: string | null;
  currency: string;
  price_unit: string | null;

  model_number: string | null;
  brand: string | null;

  moq: number | null;
  moq_unit: string | null;

  specifications: ApiCompanySpecification[];

  category: ApiCompanyProductCategory | null;

  primary_image: string | null;
}

export interface ApiCompanyProductCategorySummary {
  category_id: number;
  name: string;
  slug: string;
  product_count: number;
}

export interface ApiSimilarCompany {
  company_id: number;
  name: string;
  slug: string;

  company_logo_url: string | null;

  city: string | null;
  state: string | null;

  description: string | null;

  business_types: string[];

  verification_status: string;
}

export interface ApiCompanyProfile {
  company_id: number;
  name: string;
  slug: string;

  description: string | null;

  company_logo_url: string | null;
  cover_image_url: string | null;

  company_type: string | null;

  business_types: string[];

  has_gst: boolean;
  gst_number: string | null;

  phone_number: string | null;
  email: string | null;

  address: string | null;
  city: string | null;
  state: string | null;
  pin_code: string | null;

  website_url: string | null;

  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;

  business_hours: {
    sunday: ApiCompanyBusinessHours;
    saturday: ApiCompanyBusinessHours;
    monday_to_friday: ApiCompanyBusinessHours;
  };

  map_address: string | null;

  latitude: string | null;
  longitude: string | null;

  established_year: number | null;
  years_in_business: string | null;
  employee_size: string | null;

  certifications: string[];

  brochure_url: string | null;

  verification_status: string;

  products: ApiCompanyProduct[];

  active_product_count: number;

  product_categories: ApiCompanyProductCategorySummary[];

  similar_companies: ApiSimilarCompany[];
}

export interface CompanyProfileResponse {
  success: boolean;
  message: string;
  data: {
    company: ApiCompanyProfile;
  };
}

/* -------------------------------------------------------------------------- */
/* API functions                                                              */
/* -------------------------------------------------------------------------- */


export async function getCompanyProfile(
  slug: string,
): Promise<CompanyProfileResponse> {
  return apiRequest<CompanyProfileResponse>(
    `/companies/${encodeURIComponent(slug)}`,
    {
      method: "GET",
    },
  );
}