import {
  apiRequest,
  type ApiResponse,
} from "@/lib/api/api-client";

export type AdminCompanyVerificationStatus =
  | "DRAFT"
  | "PENDING"
  | "UNDER_VERIFICATION"
  | "VERIFIED"
  | "REJECTED";

export interface AdminCompanyOwner {
  user_id: number;
  name: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email: string | null;
  phone_number: string;
  phone_verified_at?: string | null;
  email_verified_at?: string | null;
}

export interface AdminCompanyBusinessHoursItem {
  open: string | null;
  close: string | null;
  is_closed: boolean;
}

export interface AdminCompanyBusinessHours {
  sunday?: AdminCompanyBusinessHoursItem;
  saturday?: AdminCompanyBusinessHoursItem;
  monday_to_friday?: AdminCompanyBusinessHoursItem;
  [key: string]: AdminCompanyBusinessHoursItem | undefined;
}

export interface AdminCompanyDetail {
  company_id: number;
  owner_user_id: number;

  name: string;
  slug: string;

  description: string | null;

  company_logo_url: string | null;
  cover_image_url: string | null;

  company_type: string | null;

  business_types: string[];

  pan_number: string | null;
  pan_document_url: string | null;

  has_gst: boolean;

  gst_number: string | null;
  gst_certificate_url: string | null;

  registration_number: string | null;
  incorporation_certificate_url: string | null;

  shop_establishment_number: string | null;
  shop_establishment_document_url: string | null;

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

  business_hours: AdminCompanyBusinessHours | null;

  map_address: string | null;

  latitude: string | null;
  longitude: string | null;

  established_year: number | null;
  years_in_business: string | null;
  employee_size: string | null;

  certifications: string[];

  brochure_url: string | null;

  verification_status: AdminCompanyVerificationStatus;
  verification_note: string | null;

  is_featured: boolean;
  featured_since: string | null;
  featured_priority: number | null;

  is_active: boolean;

  deleted_at: string | null;

  created_at: string;
  updated_at: string;

  owner: AdminCompanyOwner;

  _count: {
    products: number;
  };
}

export interface AdminCompanyDetailData {
  company: AdminCompanyDetail;
}

export type AdminCompanyDetailResponse =
  ApiResponse<AdminCompanyDetailData>;

export interface ReviewCompanyVerificationPayload {
  status:
    | "VERIFIED"
    | "REJECTED";

  note: string;
}

export type ReviewCompanyVerificationResponse =
  ApiResponse<Record<string, unknown>>;

export interface UpdateFeaturedCompanyPayload {
  is_featured: boolean;
  priority: number;
}

export interface UpdateFeaturedCompanyData {
  company: {
    company_id: number;
    name: string;
    slug: string;
    is_featured: boolean;
    featured_since: string | null;
    featured_priority: number | null;
  };
}

export type UpdateFeaturedCompanyResponse =
  ApiResponse<UpdateFeaturedCompanyData>;

export async function reviewAdminCompanyVerification(
  companyId: number | string,
  payload: ReviewCompanyVerificationPayload,
) {
  return apiRequest<ReviewCompanyVerificationResponse>(
    `/admin/companies/${encodeURIComponent(String(companyId))}/verification`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}

export async function updateAdminCompanyFeatured(
  companyId: number | string,
  payload: UpdateFeaturedCompanyPayload,
) {
  return apiRequest<UpdateFeaturedCompanyResponse>(
    `/admin/companies/${encodeURIComponent(String(companyId))}/featured`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}

export interface AdminCompaniesPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdminCompaniesData {
  companies: AdminCompanyDetail[];
  pagination: AdminCompaniesPagination;
}

export type AdminCompaniesResponse =
  ApiResponse<AdminCompaniesData>;

export interface GetAdminCompaniesParams {
  verification_status?:
    | "DRAFT"
    | "PENDING"
    | "VERIFIED"
    | "REJECTED";
  page?: number;
  limit?: number;
}

export async function getAdminCompanies(
  params: GetAdminCompaniesParams = {},
) {
  const searchParams =
    new URLSearchParams();

  if (params.verification_status) {
    searchParams.set(
      "verification_status",
      params.verification_status,
    );
  }

  if (params.page !== undefined) {
    searchParams.set(
      "page",
      String(params.page),
    );
  }

  if (params.limit !== undefined) {
    searchParams.set(
      "limit",
      String(params.limit),
    );
  }

  const queryString =
    searchParams.toString();

  return apiRequest<AdminCompaniesResponse>(
    `/admin/companies${
      queryString
        ? `?${queryString}`
        : ""
    }`,
    {
      method: "GET",
    },
  );
}