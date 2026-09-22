import type {
  BuyerInquiriesResponse,
  BuyerInquiryDetailResponse,
  BuyerInquiryReplyResponse,
  BuyerInquirySummaryResponse,
  CreateBuyerInquiryResponse,
  CreateCompanyInquiryRequest,
  CreateProductInquiryRequest,
  GetBuyerInquiriesParams,
} from "@/types/buyer-inquiry";

import { apiRequest } from "./api-client";

export function createProductInquiry(productSlug: string, payload: CreateProductInquiryRequest) {
  return apiRequest<CreateBuyerInquiryResponse>(`/products/${encodeURIComponent(productSlug)}/inquiries`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createCompanyInquiry(companySlug: string, payload: CreateCompanyInquiryRequest) {
  return apiRequest<CreateBuyerInquiryResponse>(`/companies/${encodeURIComponent(companySlug)}/inquiries`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getBuyerInquirySummary() {
  return apiRequest<BuyerInquirySummaryResponse>("/buyer/inquiries/summary");
}

export function getBuyerInquiries(params: GetBuyerInquiriesParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.date_from) {
    searchParams.set("date_from", params.date_from);
  }

  if (params.date_to) {
    searchParams.set("date_to", params.date_to);
  }

  if (params.sort_by) {
    searchParams.set("sort_by", params.sort_by);
  }

  if (params.sort_order) {
    searchParams.set("sort_order", params.sort_order);
  }

  searchParams.set("page", String(params.page ?? 1));

  searchParams.set("limit", String(params.limit ?? 10));

  return apiRequest<BuyerInquiriesResponse>(`/buyer/inquiries?${searchParams.toString()}`);
}

export function getBuyerInquiryDetail(inquiryNumber: string) {
  return apiRequest<BuyerInquiryDetailResponse>(`/buyer/inquiries/${encodeURIComponent(inquiryNumber)}`);
}

export function replyToBuyerInquiry(inquiryNumber: string, message: string) {
  return apiRequest<BuyerInquiryReplyResponse>(`/buyer/inquiries/${encodeURIComponent(inquiryNumber)}/replies`, {
    method: "POST",
    body: JSON.stringify({
      message,
    }),
  });
}
