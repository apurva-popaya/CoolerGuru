export type VerificationStatus = "NOT_VERIFIED" | "UNDER_VERIFICATION" | "VERIFIED" | "REJECTED";

export interface SupplierInquiry {
  id: string;
  buyer: string;
  location: string;
  requirement: string;
  date: string;
  time: string;
  status: "New" | "Replied" | "In Discussion" | "Closed";
}

export interface SupplierProductSummary {
  id: string;
  title: string;
  units: string;
  image: string;
}

export interface SupplierOverviewData {
  id: string;
  companyName: string;
  verificationStatus: VerificationStatus;
  profileCompletion: number;
  rejectionReason?: string;

  totalProducts: number;
  newInquiries: number;
  profileViews: number;

  recentInquiries: SupplierInquiry[];
  products: SupplierProductSummary[];
}
