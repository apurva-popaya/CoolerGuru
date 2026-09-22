import { apiRequest } from "./api-client";

export interface AuthMessageResponse {
  message: string;
  success?: boolean;
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

/* =========================================================
   BUYER
========================================================= */

export interface BuyerSendOtpRequest {
  phone_number: string;
  name?: string;
}

export interface BuyerVerifyOtpRequest {
  phone_number: string;
  otp: string;
  name?: string;
}

/* =========================================================
   SELLER
========================================================= */

export interface SellerSendOtpRequest {
  phone_number: string;
}

export interface SellerVerifyOtpRequest {
  phone_number: string;
  otp: string;
}

/* =========================================================
   BUYER AUTH
========================================================= */

export function sendBuyerOtp(payload: BuyerSendOtpRequest) {
  return apiRequest<AuthMessageResponse>("/auth/buyer/send-otp", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuthRefresh: true,
  });
}

export function verifyBuyerOtp(payload: BuyerVerifyOtpRequest) {
  return apiRequest<AuthMessageResponse>("/auth/buyer/verify-otp", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuthRefresh: true,
  });
}

/* =========================================================
   SELLER AUTH
========================================================= */

export function sendSellerOtp(payload: SellerSendOtpRequest) {
  return apiRequest<AuthMessageResponse>("/auth/seller/send-otp", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuthRefresh: true,
  });
}

export function verifySellerOtp(payload: SellerVerifyOtpRequest) {
  return apiRequest<AuthMessageResponse>("/auth/seller/verify-otp", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuthRefresh: true,
  });
}

/* =========================================================
   SESSION
========================================================= */

export function getCurrentUser() {
  return apiRequest<Record<string, unknown>>("/auth/me", {
    method: "GET",
  });
}

/* =========================================================
   REFRESH
========================================================= */

export function refreshSession() {
  return apiRequest<AuthMessageResponse>("/auth/refresh", {
    method: "POST",
    skipAuthRefresh: true,
  });
}

/* =========================================================
   LOGOUT
========================================================= */

export function logout() {
  return apiRequest<AuthMessageResponse>("/auth/logout", {
    method: "POST",
    skipAuthRefresh: true,
  });
}
