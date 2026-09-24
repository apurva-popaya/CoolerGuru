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

export interface HomepageNewLaunch {
  id: string;
  name: string;
  category: string;
  specification: string;
  image: string;
  href: string;
}

interface NewLaunchApiProduct {
  product_id: number;
  name: string;
  slug: string;
  short_description: string | null;
  price: string | null;
  price_unit: string | null;

  tank_capacity: string | null;
  power: string | null;
  airflow: string | null;
  coverage_area: string | null;
  cooling_capacity: string | null;
  cooling_capacity_unit: string | null;

  product_type: string | null;

  category: {
    category_id: number;
    name: string;
    slug: string;
  } | null;

  company: {
    company_id: number;
    name: string;
    slug: string;
    company_logo_url: string | null;
    city: string | null;
    state: string | null;
    verification_status: string;
    business_types: string[];
    established_year: number | null;
  } | null;

  primary_image: {
    image_url: string;
    alt_text: string | null;
  } | null;

  is_new: boolean;
}

interface NewLaunchApiResponse {
  success: boolean;
  message: string;
  data: {
    category: unknown;
    products: NewLaunchApiProduct[];
    new_badge_days: number;
    pagination: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export async function getNewLaunches(): Promise<HomepageNewLaunch[]> {
  const response = await apiRequest<NewLaunchApiResponse>(
    "/products/new-launches?sort=latest&page=1&limit=12",
  );

  return response.data.products.map((product) => {
    const specification = buildLaunchSpecification(product);

    return {
      id: String(product.product_id),
      name: product.name,
      category:
        product.category?.name ??
        product.product_type ??
        "Air Cooler",
      specification,
      image:
        product.primary_image?.image_url ??
        "/images/home/new-launches/havai-8x-flo-pro.png",
      href: `/products/${product.slug}`,
    };
  });
}

function buildLaunchSpecification(product: NewLaunchApiProduct) {
  const specifications: string[] = [];

  if (product.tank_capacity) {
    specifications.push(`Tank ${product.tank_capacity}L`);
  }

  if (product.airflow) {
    specifications.push(`Airflow ${product.airflow} m³/hr`);
  }

  if (product.power) {
    specifications.push(`Power ${product.power}`);
  }

  if (product.coverage_area) {
    specifications.push(`Coverage ${product.coverage_area}`);
  }

  if (product.cooling_capacity) {
    specifications.push(
      `${product.cooling_capacity} ${
        product.cooling_capacity_unit ?? ""
      }`.trim(),
    );
  }

  return specifications.slice(0, 2).join(" • ") || "View product details";
}

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
