export type SupplierInquiryType = "REQUEST_QUOTE" | "CONTACT_SUPPLIER";

export type SupplierInquiryStatus = "NEW" | "REPLIED" | "IN_DISCUSSION" | "CLOSED";

export interface SupplierInquiry {
  id: string;
  inquiryId: string;

  buyerName: string;
  buyerLocation: string;

  inquiryType: SupplierInquiryType;

  quantity: string;
  requirement: string;

  productName: string;
  category: string;

  date: string;
  time: string;

  status: SupplierInquiryStatus;
}
