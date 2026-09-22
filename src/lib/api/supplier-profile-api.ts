import { type ApiResponse, apiRequest } from "@/lib/api/api-client";

export interface SupplierCompanyProfile {
  company_id?: number;
  name?: string | null;
  company_name?: string | null;
  company_logo_url?: string | null;
  logo?: string | null;

  [key: string]: unknown;
}

export type SupplierCompanyProfileResponse = ApiResponse<SupplierCompanyProfile>;

export async function getSupplierCompanyProfile() {
  return apiRequest<SupplierCompanyProfileResponse>("/companies/me", {
    method: "GET",
  });
}
