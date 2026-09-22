import { type ApiResponse, apiRequest } from "@/lib/api/api-client";

export interface HomepageCategory {
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  banner_image: string | null;
  icon: string | null;
  is_featured: boolean;
}

/*
 * Temporary until we receive a homepage
 * response containing actual product items.
 */
export type HomepageFeaturedProduct = Record<string, unknown>;

/*
 * Temporary until we receive a homepage
 * response containing actual new-launch items.
 */
export type HomepageNewLaunch = Record<string, unknown>;

/*
 * Temporary until we receive a homepage
 * response containing actual company items.
 */
export type HomepageTrustedCompany = Record<string, unknown>;

export interface HomepageMeta {
  new_launch_badge_days: number;
}

export interface HomepageData {
  categories: HomepageCategory[];
  featured_products: HomepageFeaturedProduct[];
  new_launches: HomepageNewLaunch[];
  trusted_companies: HomepageTrustedCompany[];
  meta: HomepageMeta;
}

export type HomepageResponse = ApiResponse<HomepageData>;

export async function getHomepage() {
  return apiRequest<HomepageResponse>("/homepage", {
    method: "GET",
  });
}
