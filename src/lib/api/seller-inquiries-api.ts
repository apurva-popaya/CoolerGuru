import type {
  GetSellerInquiriesParams,
  SellerInquiriesResponse,
  SellerInquiryCloseResponse,
  SellerInquiryDetailResponse,
  SellerInquiryReplyResponse,
  SellerInquirySummaryResponse,
} from "@/types/seller-inquiry-api";

import { apiRequest } from "./api-client";

/* =========================================
   SUMMARY
========================================= */

export function getSellerInquirySummary() {
  return apiRequest<SellerInquirySummaryResponse>("/seller/inquiries/summary");
}

/* =========================================
   LIST
========================================= */

export function getSellerInquiries(params: GetSellerInquiriesParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  searchParams.set("page", String(params.page ?? 1));

  searchParams.set("limit", String(params.limit ?? 10));

  return apiRequest<SellerInquiriesResponse>(`/seller/inquiries?${searchParams.toString()}`);
}

/* =========================================
   DETAIL
========================================= */

export function getSellerInquiryDetail(inquiryNumber: string) {
  return apiRequest<SellerInquiryDetailResponse>(`/seller/inquiries/${encodeURIComponent(inquiryNumber)}`);
}

/* =========================================
   CLOSE
========================================= */

export function closeSellerInquiry(inquiryNumber: string) {
  return apiRequest<SellerInquiryCloseResponse>(`/seller/inquiries/${encodeURIComponent(inquiryNumber)}/close`, {
    method: "POST",
  });
}

/* =========================================
   REPLY
========================================= */

export function replyToSellerInquiry(inquiryNumber: string, message: string) {
  return apiRequest<SellerInquiryReplyResponse>(`/seller/inquiries/${encodeURIComponent(inquiryNumber)}/replies`, {
    method: "POST",

    body: JSON.stringify({
      message,
    }),
  });
}
