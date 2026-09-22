import type {
  GlobalSearchParams,
  GlobalSearchResponse,
  SearchSuggestionsParams,
  SearchSuggestionsResponse,
} from "@/types/search-api";

import { apiRequest } from "./api-client";

function createSearchParams(values: Record<string, string | number | boolean | undefined>) {
  const params = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });

  return params;
}

export function searchGlobal(params: GlobalSearchParams) {
  const query = createSearchParams({
    q: params.q,

    type: params.type ?? "all",

    business_type: params.business_types?.length ? params.business_types.join(",") : undefined,

    category_slug: params.category_slugs?.length ? params.category_slugs.join(",") : undefined,

    verified_only: params.verified_only ? true : undefined,

    premium_only: params.premium_only ? true : undefined,

    state: params.state,

    city: params.city,

    sort: params.sort ?? "relevance",

    page: params.page ?? 1,

    limit: params.limit ?? 12,
  });

  return apiRequest<GlobalSearchResponse>(`/search?${query.toString()}`, {
    method: "GET",
  });
}

export function getSearchSuggestions(params: SearchSuggestionsParams) {
  const query = createSearchParams({
    q: params.q,

    scope: params.scope ?? "all",

    limit: params.limit ?? 5,
  });

  return apiRequest<SearchSuggestionsResponse>(`/search/suggestions?${query.toString()}`, {
    method: "GET",
  });
}

export interface BackendProductSpecification {
  key: string;
  unit?: string | null;
  label?: string | null;
  value?: string | null;
  sort_order?: number;
  is_highlight?: boolean;
}

export interface BackendSearchProduct {
  product_id: number;
  name: string;
  slug: string;

  short_description?: string | null;

  min_price?: string | null;
  max_price?: string | null;
  currency?: string | null;
  price_unit?: string | null;

  model_number?: string | null;
  brand?: string | null;

  airflow?: string | null;
  tank_capacity?: string | null;
  power?: string | null;

  moq?: number | string | null;
  moq_unit?: string | null;

  specifications?: BackendProductSpecification[];

  launched_at?: string | null;
  is_featured?: boolean;

  category?: {
    category_id: number;
    name: string;
    slug: string;
  } | null;

  company?: {
    company_id: number;
    name: string;
    slug: string;
    company_logo_url?: string | null;
    city?: string | null;
    state?: string | null;
    verification_status?: string;
    business_types?: string[];
    established_year?: number | null;
    years_in_business?: string | null;
  } | null;

  primary_image?: {
    image_url?: string | null;
    alt_text?: string | null;
  } | null;
}
