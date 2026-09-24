import { apiRequest } from "@/lib/api/api-client";

/* -------------------------------------------------------------------------- */
/* Category Types                                                             */
/* -------------------------------------------------------------------------- */

export interface Category {
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

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
  };
}

/* -------------------------------------------------------------------------- */
/* Get Air Cooler Categories                                                  */
/* -------------------------------------------------------------------------- */

export async function getAirCoolerCategories(): Promise<CategoriesResponse> {
  return apiRequest<CategoriesResponse>(
    "/categories/air-coolers/children",
    {
      method: "GET",
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Get Subcategories of a Category                                            */
/* -------------------------------------------------------------------------- */

export async function getCategoryChildren(
  categorySlug: string,
): Promise<CategoriesResponse> {
  return apiRequest<CategoriesResponse>(
    `/categories/${categorySlug}/children`,
    {
      method: "GET",
    },
  );
}