import { type ApiResponse, apiRequest } from "@/lib/api/api-client";
import { uploadFileToStorage } from "@/lib/api/file-upload-api";

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
  years_in_business: string;
  employee_size: string;
  certifications: string[];
  brochure_url: string;
}

/*
 * What is actually sent to the API.
 * The backend rejects empty strings, so blank fields are omitted.
 */
export type CompanyPayload = Partial<CreateCompanyRequest> & {
  name: string;
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

export interface SupplierCompany extends Omit<NullableCompanyFields, "latitude" | "longitude"> {
  company_id: number;
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

export function createCompany(payload: CompanyPayload) {
  return apiRequest<CompanyResponse>("/companies/me", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateMyCompany(payload: Partial<CompanyPayload>) {
  return apiRequest<CompanyResponse>("/companies/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function submitCompanyForVerification() {
  return apiRequest<CompanyResponse>("/companies/me/submit-verification", {
    method: "PATCH",
  });
}

/* =========================================
   FILE UPLOAD (TEMPORARY)
========================================= */

export type CompanyUploadFolder = "logos" | "covers" | "documents" | "brochures";

export { getFileNameFromUrl } from "@/lib/api/file-upload-api";

export function uploadCompanyFile(file: File, folder: CompanyUploadFolder): Promise<string> {
  return uploadFileToStorage(file, `companies/${folder}`);
}
