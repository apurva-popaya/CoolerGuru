export interface FeaturedCompany {
  company_id: number;
  name: string;
  slug: string;
  description: string | null;
  company_logo_url: string | null;
  cover_image_url: string | null;
  city: string | null;
  state: string | null;
  business_types: string[];
  verification_status: string;
  is_featured: boolean;
  featured_since: string | null;
  featured_priority: number | null;
}

export interface FeaturedCompaniesResponse {
  success: boolean;
  message: string;
  data: {
    companies: FeaturedCompany[];
  };
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8000/api/v1";

export async function getFeaturedCompanies(): Promise<FeaturedCompaniesResponse> {
  const response = await fetch(
    `${API_BASE_URL}/companies/featured`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const result =
    (await response.json()) as FeaturedCompaniesResponse;

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to fetch featured companies.",
    );
  }

  return result;
}