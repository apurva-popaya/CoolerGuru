export type GlobalSearchType = "all" | "products" | "companies";

export type SearchSort = "relevance" | "newest" | "oldest" | "name_asc" | "name_desc";

export type SearchBusinessType = "MANUFACTURER" | "SUPPLIER" | "EXPORTER" | "OEM" | "DISTRIBUTOR";

export type SearchSuggestionScope = "all" | "products" | "companies" | "brands" | "categories" | "cities" | "states";

export interface GlobalSearchParams {
  q: string;
  type?: GlobalSearchType;

  business_types?: SearchBusinessType[];
  category_slugs?: string[];

  verified_only?: boolean;
  premium_only?: boolean;

  state?: string;
  city?: string;

  sort?: SearchSort;

  page?: number;
  limit?: number;
}

export interface SearchSuggestionsParams {
  q: string;
  scope?: SearchSuggestionScope;
  limit?: number;
}

/* =========================================================
   BACKEND COMPANY
========================================================= */

export interface BackendSearchCompany {
  company_id: number;
  name: string;
  slug: string;
  description?: string | null;
  company_logo_url?: string | null;
  business_types?: string[];
  city?: string | null;
  state?: string | null;
  established_year?: number | null;
  years_in_business?: string | null;
  employee_size?: string | null;
  verification_status?: string;
  active_product_count?: number;
}

/* =========================================================
   BACKEND PRODUCT

   Some fields still need backend confirmation.
========================================================= */

export interface BackendProductSpecification {
  key: string;
  value: string | number | null;
  unit?: string | null;
}

export interface BackendSearchProduct {
  product_id: number;

  name: string;

  slug: string;

  short_description?: string | null;

  description?: string | null;

  model_number?: string | null;

  category?: {
    category_id?: number;
    name?: string;
    slug?: string;
  } | null;

  primary_image?: {
    image_url?: string | null;
    alt_text?: string | null;
  } | null;

  specifications?: BackendProductSpecification[];

  airflow?: string | null;

  tank_capacity?: string | null;

  power?: string | null;

  moq?: string | number | null;

  moq_unit?: string | null;

  company?: {
    company_id?: number;
    name?: string;
    slug?: string;
    city?: string | null;
    state?: string | null;
    verification_status?: string;
    years_in_business?: string | null;
  } | null;
}

/* =========================================================
   RESULTS
========================================================= */

export interface BackendMixedSearchResult {
  type: "product" | "company";
  product?: BackendSearchProduct;
  company?: BackendSearchCompany;
}

export interface SearchCounts {
  all: number;
  products: number;
  companies: number;
}

export interface SearchPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/* =========================================================
   FILTER FACETS

   Backend needs to add these.
========================================================= */

export interface SearchFacetOption {
  value: string;
  label: string;
  count: number;
}

export interface SearchCategoryFacet {
  slug: string;
  name: string;
  count: number;
}

export interface SearchFacets {
  business_types?: SearchFacetOption[];
  categories?: SearchCategoryFacet[];
  states?: string[];
  cities?: string[];
  verified_count?: number;
  premium_count?: number;
}

/* =========================================================
   SEARCH RESPONSE
========================================================= */

export interface GlobalSearchData {
  query: string;
  selected_type: GlobalSearchType;
  category?: unknown;

  counts: SearchCounts;

  results: BackendMixedSearchResult[];

  products: BackendSearchProduct[];

  companies: BackendSearchCompany[];

  pagination: SearchPagination;

  facets?: SearchFacets;
}

export interface GlobalSearchResponse {
  success: boolean;
  message: string;
  data: GlobalSearchData;
}

/* =========================================================
   SUGGESTIONS
========================================================= */

export interface ProductSuggestion {
  product_id: number;
  name: string;
  slug: string;
  model_number?: string | null;

  company?: {
    company_id: number;
    name: string;
    slug: string;
  };

  primary_image?: {
    image_url?: string | null;
    alt_text?: string | null;
  } | null;
}

export interface CompanySuggestion {
  company_id: number;
  name: string;
  slug: string;
  company_logo_url?: string | null;
  city?: string | null;
  state?: string | null;
}

export interface CategorySuggestion {
  category_id: number;
  name: string;
  slug: string;
}

export interface SearchSuggestionData {
  query: string;
  scope: SearchSuggestionScope;

  suggestions: {
    products: ProductSuggestion[];
    companies: CompanySuggestion[];
    brands: string[];
    categories: CategorySuggestion[];
    cities: string[];
    states: string[];
  };
}

export interface SearchSuggestionsResponse {
  success: boolean;
  message: string;
  data: SearchSuggestionData;
}
