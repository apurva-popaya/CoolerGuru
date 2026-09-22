export type BuyerInquiryStatus = "NEW" | "REPLIED" | "IN_DISCUSSION" | "CLOSED" | "SPAM";

export type BuyerInquiryType = "REQUEST_QUOTE" | "CONTACT_SUPPLIER";

export interface CreateProductInquiryRequest {
  quantity: number;
  quantity_unit: string;
  buyer_name: string;
  buyer_phone_number: string;
  buyer_email: string;
  buyer_city_state: string;
  requirement_details: string;
}

export interface CreateCompanyInquiryRequest {
  product_requirement: string;
  quantity: number;
  quantity_unit: string;
  buyer_name: string;
  buyer_phone_number: string;
  buyer_email: string;
  buyer_city_state: string;
  requirement_details: string;
}

export interface BuyerInquirySummaryData {
  total: number;
  recent_30_days: number;
  new: number;
  replied: number;
  in_discussion: number;
  closed: number;
}

export interface BuyerInquiryCompany {
  company_id: number;
  name: string;
  slug: string;
  company_logo_url?: string | null;
  verification_status?: string | null;
  city?: string | null;
  state?: string | null;
  business_types?: string[];
}

export interface BuyerInquiryProductImage {
  product_image_id?: number;
  product_id?: number;
  image_url: string;
  alt_text?: string | null;
  sort_order?: number;
  is_primary?: boolean;
}

export interface BuyerInquiryCategory {
  category_id: number;
  name: string;
  slug: string;
}

export interface BuyerInquiryProduct {
  product_id: number;
  name: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  category?: BuyerInquiryCategory | null;
  images?: BuyerInquiryProductImage[];
}

export interface BuyerInquiryMessageSender {
  user_id: number;
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
}

export interface BuyerInquiryMessage {
  inquiry_message_id: number;
  inquiry_id: number;
  sender_user_id: number;
  sender_type: "BUYER" | "SELLER";
  message: string;
  created_at: string;
  sender?: BuyerInquiryMessageSender | null;
}

export interface BuyerInquiryEvent {
  inquiry_event_id: number;
  inquiry_id: number;
  actor_user_id?: number | null;
  event_type: string;
  previous_status?: BuyerInquiryStatus | null;
  new_status?: BuyerInquiryStatus | null;
  description?: string | null;
  created_at: string;
}

export interface BuyerInquiry {
  inquiry_id: number;
  inquiry_number: string;
  buyer_user_id: number;
  company_id: number;
  product_id?: number | null;
  inquiry_type: BuyerInquiryType;
  status: BuyerInquiryStatus;
  product_requirement: string;
  quantity: number;
  quantity_unit: string;
  buyer_name: string;
  buyer_phone_number: string;
  buyer_email: string;
  buyer_city_state: string;
  requirement_details: string;
  viewed_at?: string | null;
  first_replied_at?: string | null;
  closed_at?: string | null;
  spam_reported_at?: string | null;
  last_activity_at: string;
  created_at: string;
  updated_at: string;
  company?: BuyerInquiryCompany | null;
  product?: BuyerInquiryProduct | null;
  messages?: BuyerInquiryMessage[];
  events?: BuyerInquiryEvent[];
}

export interface CreateBuyerInquiryResponse {
  success: boolean;
  message: string;

  data: {
    inquiry: BuyerInquiry;
  };
}

export interface BuyerInquiryPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BuyerInquirySummaryResponse {
  success: boolean;
  message: string;
  data: {
    summary: BuyerInquirySummaryData;
  };
}

export interface BuyerInquiriesResponse {
  success: boolean;
  message: string;
  data: {
    inquiries: BuyerInquiry[];
    pagination: BuyerInquiryPagination;
  };
}

export interface BuyerInquiryDetailResponse {
  success: boolean;
  message: string;
  data: {
    inquiry: BuyerInquiry;
  };
}

export interface BuyerInquiryReplyResponse {
  success: boolean;
  message: string;
  data: Record<string, unknown>;
}

export interface GetBuyerInquiriesParams {
  search?: string;
  status?: BuyerInquiryStatus;
  date_from?: string;
  date_to?: string;
  sort_by?: "created_at" | "inquiry_number" | "company" | "product_requirement" | "quantity";
  sort_order?: "asc" | "desc";
  page?: number;
  limit?: number;
}
