export type SellerInquiryStatus = "NEW" | "REPLIED" | "IN_DISCUSSION" | "CLOSED" | "SPAM";

export type SellerInquiryType = "REQUEST_QUOTE" | "CONTACT_SUPPLIER";

/* =========================================
   CATEGORY
========================================= */

export interface SellerInquiryCategory {
  category_id: number;
  name: string;
  slug: string;

  description?: string | null;
  image?: string | null;
  banner_image?: string | null;
  icon?: string | null;

  parent_id?: number | null;
  can_have_children?: boolean;

  sort_order?: number;

  is_featured?: boolean;
  is_active?: boolean;

  deleted_at?: string | null;

  created_at?: string;
  updated_at?: string;
}

/* =========================================
   PRODUCT IMAGE
========================================= */

export interface SellerInquiryProductImage {
  product_image_id?: number;
  product_id?: number;

  image_url: string;
  alt_text?: string | null;

  sort_order?: number;
  is_primary?: boolean;

  created_at?: string;
}

/* =========================================
   PRODUCT
========================================= */

export interface SellerInquiryProduct {
  product_id: number;

  name: string;
  slug: string;

  short_description?: string | null;
  description?: string | null;

  price?: string | null;
  min_price?: string | null;
  max_price?: string | null;

  currency?: string | null;
  price_unit?: string | null;

  sku?: string | null;
  model_number?: string | null;
  brand?: string | null;
  hsn_code?: string | null;

  product_type?: string | null;
  application_usage?: string | null;

  airflow?: string | null;
  tank_capacity?: string | null;
  power?: string | null;

  coverage_area?: string | null;

  cooling_capacity?: string | null;
  cooling_capacity_unit?: string | null;

  power_motor?: string | null;
  voltage_frequency?: string | null;

  material?: string | null;
  dimensions?: string | null;

  weight?: string | null;
  weight_unit?: string | null;

  color_finish?: string | null;

  moq?: number | null;
  moq_unit?: string | null;

  stock_quantity?: number | null;
  stock_unit?: string | null;

  availability_status?: string | null;

  highlights?: string[];
  available_colors?: string[];
  tags?: string[];

  specifications?: unknown[];

  video_url?: string | null;
  catalogue_url?: string | null;

  launched_at?: string | null;
  is_featured?: boolean;

  category_id?: number | null;
  company_id?: number | null;

  is_active?: boolean;
  deleted_at?: string | null;

  created_at?: string;
  updated_at?: string;

  category?: SellerInquiryCategory | null;

  images?: SellerInquiryProductImage[];
}

/* =========================================
   USER
========================================= */

export interface SellerInquiryUser {
  user_id: number;

  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
}

/* =========================================
   MESSAGE
========================================= */

export interface SellerInquiryMessage {
  inquiry_message_id: number;
  inquiry_id: number;

  sender_user_id: number;

  sender_type: "BUYER" | "SELLER";

  message: string;

  created_at: string;

  sender?: SellerInquiryUser | null;
}

/* =========================================
   EVENT
========================================= */

export interface SellerInquiryEvent {
  inquiry_event_id: number;
  inquiry_id: number;

  actor_user_id?: number | null;

  event_type: "SUBMITTED" | "VIEWED" | "SELLER_REPLIED" | "BUYER_REPLIED" | "CLOSED" | "SPAM_REPORTED" | string;

  previous_status?: SellerInquiryStatus | null;
  new_status?: SellerInquiryStatus | null;

  description?: string | null;

  created_at: string;

  actor?: SellerInquiryUser | null;
}

/* =========================================
   MAIN INQUIRY
========================================= */

export interface SellerInquiry {
  inquiry_id: number;
  inquiry_number: string;

  buyer_user_id: number;
  company_id: number;

  product_id?: number | null;

  inquiry_type: SellerInquiryType;
  status: SellerInquiryStatus;

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

  product?: SellerInquiryProduct | null;

  messages?: SellerInquiryMessage[];

  events?: SellerInquiryEvent[];
}

/* =========================================
   SUMMARY
========================================= */

export interface SellerInquirySummaryData {
  total: number;
  new: number;
  replied: number;
  in_discussion: number;
  closed: number;
  spam: number;
}

/* =========================================
   PAGINATION
========================================= */

export interface SellerInquiryPagination {
  page: number;
  limit: number;

  totalItems: number;
  totalPages: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/* =========================================
   SUMMARY RESPONSE
========================================= */

export interface SellerInquirySummaryResponse {
  success: boolean;
  message: string;

  data: {
    summary: SellerInquirySummaryData;
  };
}

/* =========================================
   LIST RESPONSE
========================================= */

export interface SellerInquiriesResponse {
  success: boolean;
  message: string;

  data: {
    inquiries: SellerInquiry[];

    pagination: SellerInquiryPagination;
  };
}

/* =========================================
   DETAIL RESPONSE
========================================= */

export interface SellerInquiryDetailResponse {
  success: boolean;
  message: string;

  data: {
    inquiry: SellerInquiry;
  };
}

/* =========================================
   CLOSE RESPONSE
========================================= */

export interface SellerInquiryCloseResponse {
  success: boolean;
  message: string;

  data?: Record<string, unknown>;
}

/* =========================================
   REPLY RESPONSE
========================================= */

export interface SellerInquiryReplyPayload {
  message: string;

  quotation_reference_number?: string;
  quotation_validity?: string;
  expected_delivery?: string;
  payment_terms?: string;

  attachment_url?: string;
  attachment_name?: string;
  attachment_mime_type?: string;
  attachment_size?: number;
}

export interface SellerInquiryReplyResponse {
  success: boolean;
  message: string;

  data?: Record<string, unknown>;
}

/* =========================================
   LIST PARAMS
========================================= */

export interface GetSellerInquiriesParams {
  search?: string;

  status?: SellerInquiryStatus;

  page?: number;
  limit?: number;
}
