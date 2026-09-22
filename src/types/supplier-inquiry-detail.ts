import type { SupplierInquiryStatus, SupplierInquiryType } from "@/types/supplier-inquiry";

export interface InquiryBuyer {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  isVerified: boolean;
}

export interface InquiryAttachment {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "image";
  url: string;
}

export interface InquiryTimelineItem {
  id: string;
  type: "received" | "viewed" | "replied" | "status";

  title: string;
  date: string;
  time: string;
  description: string;
}

export interface InquiryRequirementDetail {
  label: string;
  value: string;
}

export interface SupplierInquiryDetail {
  id: string;
  inquiryNumber: string;

  inquiryType: SupplierInquiryType;
  status: SupplierInquiryStatus;

  receivedDate: string;
  receivedTime: string;

  buyer: InquiryBuyer;

  preferredResponse: string;
  paymentTerms: string;

  productRequirement: string;
  quantity: string;
  requirementSummary: string;

  purpose: string;
  expectedDelivery: string;

  message: string;

  requirementDetails: InquiryRequirementDetail[];
  attachments: InquiryAttachment[];
  timeline: InquiryTimelineItem[];
}
