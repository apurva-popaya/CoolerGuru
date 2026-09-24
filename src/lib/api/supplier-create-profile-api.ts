import { type ApiResponse, apiRequest } from "@/lib/api/api-client";

/* =========================================
   TYPES
========================================= */

export interface BusinessHoursDay {
  open: string | null;
  close: string | null;
  is_closed: boolean;
}

export interface BusinessHours {
  monday_to_friday: BusinessHoursDay;
  saturday: BusinessHoursDay;
  sunday: BusinessHoursDay;
}

export const COMPANY_BUSINESS_TYPES = ["MANUFACTURER", "SUPPLIER", "EXPORTER", "OEM", "DISTRIBUTOR"] as const;

export type CompanyBusinessType = (typeof COMPANY_BUSINESS_TYPES)[number];

export type CompanyVerificationStatus = "DRAFT" | "PENDING" | "VERIFIED" | "REJECTED";

/*
 * Shape of the company profile form.
 * Mirrors `createCompanySchema` in the backend (company.validator.ts).
 */
export interface CreateCompanyRequest {
  name: string;
  description: string;
  company_logo_url: string;
  cover_image_url: string;
  company_type: string;
  business_types: CompanyBusinessType[];
  pan_number: string;
  pan_document_url: string;
  has_gst: boolean;
  gst_number: string;
  gst_certificate_url: string;
  registration_number: string;
  incorporation_certificate_url: string;
  shop_establishment_number: string;
  shop_establishment_document_url: string;
  phone_number: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  website_url: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  linkedin_url: string;
  twitter_url: string;
  business_hours: BusinessHours;
  map_address: string;
  latitude: number;
  longitude: number;
  // Legacy free text; the UI uses `established_year` instead.
  years_in_business: string;
  // Kept as text for the input; sent as an integer.
  established_year: string;
  employee_size: string;
  certifications: string[];
  brochure_url: string;
}

type CompanyDraftValues = Omit<CreateCompanyRequest, "established_year"> & {
  established_year: number;
};

/*
 * Body of PATCH /companies/me/draft (and PATCH /companies/me once verified).
 * Only changed fields are sent; `null` clears a field. `name` cannot be cleared.
 */
export type CompanyDraftPayload = {
  [K in Exclude<keyof CompanyDraftValues, "name">]?: CompanyDraftValues[K] | null;
} & {
  name?: string;
};

export interface CompanyProfileCompletion {
  percentage: number;
  completed_required_items: number;
  total_required_items: number;
  company_details_complete: boolean;
  contact_details_complete: boolean;
  location_details_complete: boolean;
  verification_documents_complete: boolean;
  can_submit_for_verification: boolean;
  missing_fields: string[];
}

type NullableCompanyFields = {
  [K in keyof CreateCompanyRequest]: CreateCompanyRequest[K] | null;
};

export interface SupplierCompany extends Omit<NullableCompanyFields, "latitude" | "longitude" | "established_year"> {
  company_id: number;
  established_year: number | null;
  slug: string;
  // Prisma Decimal columns are serialized as strings.
  latitude: string | number | null;
  longitude: string | number | null;
  verification_status: CompanyVerificationStatus;
  verification_note: string | null;
  created_at: string;
  updated_at: string;
  profile_completion: CompanyProfileCompletion;
}

export type CompanyResponse = ApiResponse<{
  company: SupplierCompany;
}>;

/* =========================================
   COMPANY PROFILE
========================================= */

export function getMyCompany() {
  return apiRequest<CompanyResponse>("/companies/me");
}

/* Creates the company on the first call (201), updates the draft afterwards (200). */
export function saveCompanyDraft(changes: CompanyDraftPayload) {
  return apiRequest<CompanyResponse>("/companies/me/draft", {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

/* Edits after verification; the draft endpoint returns 409 for verified companies. */
export function updateMyCompany(changes: CompanyDraftPayload) {
  return apiRequest<CompanyResponse>("/companies/me", {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function submitCompanyForVerification() {
  return apiRequest<CompanyResponse>("/companies/me/submit-verification", {
    method: "PATCH",
  });
}
