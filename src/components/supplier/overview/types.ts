import type { CompanyVerificationStatus } from "@/lib/api/supplier-create-profile-api";

export type VerificationStatus = "NOT_VERIFIED" | "UNDER_VERIFICATION" | "VERIFIED" | "REJECTED";

export interface SupplierProductSummary {
  slug: string;
  title: string;
  units: string;
  image: string | null;
}

export interface VerificationProgress {
  companyDetailsComplete: boolean;
  documentsComplete: boolean;
}

/*
 * Maps the backend company status to the states the overview UI renders.
 * A missing company (404 from /companies/me) is treated as NOT_VERIFIED.
 */
export function toVerificationStatus(status: CompanyVerificationStatus | null | undefined): VerificationStatus {
  switch (status) {
    case "PENDING":
      return "UNDER_VERIFICATION";
    case "VERIFIED":
      return "VERIFIED";
    case "REJECTED":
      return "REJECTED";
    default:
      return "NOT_VERIFIED";
  }
}
