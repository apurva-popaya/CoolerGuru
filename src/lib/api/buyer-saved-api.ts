import { apiRequest } from "@/lib/api/api-client";

export interface SaveResponse {
  success: boolean;
  message: string;
  data: {
    product_id?: number;
    company_id?: number;
    is_saved: boolean;
  };
}

export interface SavedStatusRequest {
  product_ids: number[];
  company_ids: number[];
}

export interface SavedStatusResponse {
  success: boolean;
  message: string;
  data: {
    products: {
      product_id: number;
      is_saved: boolean;
    }[];
    companies: {
      company_id: number;
      is_saved: boolean;
    }[];
  };
}

/* -------------------------------------------------------------------------- */
/* Product                                                                    */
/* -------------------------------------------------------------------------- */

export async function saveProduct(
  productId: number,
): Promise<SaveResponse> {
  return apiRequest<SaveResponse>(
    `/buyer/saved-products/${productId}`,
    {
      method: "PUT",
    },
  );
}

export async function removeSavedProduct(
  productId: number,
): Promise<SaveResponse> {
  return apiRequest<SaveResponse>(
    `/buyer/saved-products/${productId}`,
    {
      method: "DELETE",
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Company                                                                    */
/* -------------------------------------------------------------------------- */

export async function saveCompany(
  companyId: number,
): Promise<SaveResponse> {
  return apiRequest<SaveResponse>(
    `/buyer/saved-companies/${companyId}`,
    {
      method: "PUT",
    },
  );
}


/* -------------------------------------------------------------------------- */
/* Saved Status                                                               */
/* -------------------------------------------------------------------------- */

export async function getSavedStatus(
  payload: SavedStatusRequest,
): Promise<SavedStatusResponse> {
  return apiRequest<SavedStatusResponse>(
    "/buyer/saved/status",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}





/* -------------------------------------------------------------------------- */
/* Save / Remove Response                                                     */
/* -------------------------------------------------------------------------- */

export interface SaveResponse {
  success: boolean;
  message: string;
  data: {
    product_id?: number;
    company_id?: number;
    is_saved: boolean;
  };
}

/* -------------------------------------------------------------------------- */
/* Saved Status                                                               */
/* -------------------------------------------------------------------------- */

export interface SavedStatusRequest {
  product_ids: number[];
  company_ids: number[];
}

export interface SavedStatusResponse {
  success: boolean;
  message: string;
  data: {
    products: {
      product_id: number;
      is_saved: boolean;
    }[];
    companies: {
      company_id: number;
      is_saved: boolean;
    }[];
  };
}

/* -------------------------------------------------------------------------- */
/* Saved Product                                                              */
/* -------------------------------------------------------------------------- */

export interface SavedProductImage {
  image_url: string;
  alt_text: string | null;
}

export interface SavedProductCategory {
  category_id: number;
  name: string;
  slug: string;
}

export interface SavedProductCompany {
  company_id: number;
  name: string;
  slug: string;
  company_logo_url: string | null;
  city: string | null;
  state: string | null;
  verification_status: string;
  business_types: string[];
  established_year: number | null;
}

export interface SavedProduct {
  product_id: number;
  name: string;
  slug: string;
  short_description: string | null;

  price: string | null;
  min_price: string | null;
  max_price: string | null;
  currency: string;
  price_unit: string;

  moq: number | null;
  moq_unit: string;

  airflow: string | null;
  tank_capacity: string | null;
  power: string | null;
  brand: string | null;

  category: SavedProductCategory | null;
  company: SavedProductCompany | null;

  images: SavedProductImage[];

  saved_at: string;
  is_saved: boolean;
}

export interface SavedProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: SavedProduct[];
    saved_count: number;
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  };
}

/* -------------------------------------------------------------------------- */
/* Saved Company                                                              */
/* -------------------------------------------------------------------------- */

export interface SavedCompany {
  company_id: number;
  name: string;
  slug: string;
  description: string | null;
  company_logo_url: string | null;
  city: string | null;
  state: string | null;
  company_type: string | null;
  verification_status: string;
  saved_at: string;
  is_saved: boolean;
}

export interface SavedCompaniesResponse {
  success: boolean;
  message: string;
  data: {
    companies: SavedCompany[];
    saved_count: number;
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  };
}





export async function removeSavedCompany(
  companyId: number,
): Promise<SaveResponse> {
  return apiRequest<SaveResponse>(
    `/buyer/saved-companies/${companyId}`,
    {
      method: "DELETE",
    },
  );
}



/* -------------------------------------------------------------------------- */
/* Get Saved Products                                                         */
/* -------------------------------------------------------------------------- */

export async function getSavedProducts(params?: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<SavedProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }

  searchParams.set("page", String(params?.page ?? 1));
  searchParams.set("limit", String(params?.limit ?? 12));

  const query = searchParams.toString();

  return apiRequest<SavedProductsResponse>(
    `/buyer/saved-products?${query}`,
    {
      method: "GET",
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Get Saved Companies                                                        */
/* -------------------------------------------------------------------------- */

export async function getSavedCompanies(params?: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<SavedCompaniesResponse> {
  const searchParams = new URLSearchParams();

  if (params?.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }

  searchParams.set("page", String(params?.page ?? 1));
  searchParams.set("limit", String(params?.limit ?? 12));

  const query = searchParams.toString();

  return apiRequest<SavedCompaniesResponse>(
    `/buyer/saved-companies?${query}`,
    {
      method: "GET",
    },
  );
}