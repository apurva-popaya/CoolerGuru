// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

// export interface SendBuyerOtpRequest {
//   phone_number: string;
//   name?: string;
// }

// export interface SendBuyerOtpResponse {
//   message: string;
//   // Returned by the backend only outside production, for testing.
//   otp?: string;
// }

// export interface VerifyBuyerOtpRequest {
//   phone_number: string;
//   otp: string;
// }

// export interface BuyerAuthUser {
//   user_id: number;
//   name: string;
//   first_name: string | null;
//   last_name: string | null;
//   email: string | null;
//   phone_number: string;
//   roles: string[];
//   active_portal: string;
// }

// export interface VerifyBuyerOtpResponse {
//   message: string;
//   is_new_user: boolean;
//   user: BuyerAuthUser;
// }

// interface ApiErrorResponse {
//   message?: string;
//   error?: string;
//   detail?: string;
// }

// async function parseApiResponse<T>(response: Response): Promise<T> {
//   const data = await response.json().catch(() => null);

//   if (!response.ok) {
//     const errorData = data as ApiErrorResponse | null;

//     throw new Error(
//       errorData?.message ?? errorData?.detail ?? errorData?.error ?? `Request failed with status ${response.status}`,
//     );
//   }

//   return data as T;
// }

// export async function sendBuyerOtp(payload: SendBuyerOtpRequest): Promise<SendBuyerOtpResponse> {
//   const response = await fetch(`${API_BASE_URL}/auth/buyer/send-otp`, {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     credentials: "include",

//     body: JSON.stringify(payload),
//   });

//   return parseApiResponse<SendBuyerOtpResponse>(response);
// }

// export async function verifyBuyerOtp(payload: VerifyBuyerOtpRequest): Promise<VerifyBuyerOtpResponse> {
//   const response = await fetch(`${API_BASE_URL}/auth/buyer/verify-otp`, {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     credentials: "include",

//     body: JSON.stringify(payload),
//   });

//   return parseApiResponse<VerifyBuyerOtpResponse>(response);
// }














import { apiRequest } from "./api-client";

/* =========================================================
   COMMON RESPONSE
========================================================= */

export interface AuthMessageResponse {
  message: string;
  success?: boolean;
  data?:{
    otp?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/* =========================================================
   BUYER REGISTRATION
========================================================= */

export interface BuyerRegistrationSendOtpRequest {
  phone_number: string;
  name: string;
}

export interface BuyerRegistrationVerifyOtpRequest {
  phone_number: string;
  otp: string;
  name: string;
}

/* =========================================================
   BUYER LOGIN
========================================================= */

export interface BuyerLoginSendOtpRequest {
  phone_number: string;
}

export interface BuyerLoginVerifyOtpRequest {
  phone_number: string;
  otp: string;
}

/* =========================================================
   BUYER REGISTRATION
========================================================= */

/**
 * Send OTP for buyer registration.
 *
 * Endpoint:
 * POST /auth/buyer/register/send-otp
 *
 * Body:
 * {
 *   phone_number: string;
 *   name: string;
 * }
 */
export function sendBuyerRegistrationOtp(
  payload: BuyerRegistrationSendOtpRequest,
) {
  return apiRequest<AuthMessageResponse>(
    "/auth/buyer/register/send-otp",
    {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuthRefresh: true,
    },
  );
}

/**
 * Verify OTP and register buyer.
 *
 * Endpoint:
 * POST /auth/buyer/register/verify-otp
 *
 * Body:
 * {
 *   phone_number: string;
 *   otp: string;
 *   name: string;
 * }
 */
export function verifyBuyerRegistrationOtp(
  payload: BuyerRegistrationVerifyOtpRequest,
) {
  return apiRequest<AuthMessageResponse>(
    "/auth/buyer/register/verify-otp",
    {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuthRefresh: true,
    },
  );
}

/* =========================================================
   BUYER LOGIN
========================================================= */

/**
 * Send OTP for buyer login.
 *
 * Endpoint:
 * POST /auth/buyer/login/send-otp
 *
 * Body:
 * {
 *   phone_number: string;
 * }
 */
export function sendBuyerLoginOtp(
  payload: BuyerLoginSendOtpRequest,
) {
  return apiRequest<AuthMessageResponse>(
    "/auth/buyer/login/send-otp",
    {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuthRefresh: true,
    },
  );
}

/**
 * Verify OTP and login as buyer.
 *
 * Endpoint:
 * POST /auth/buyer/login/verify-otp
 *
 * Body:
 * {
 *   phone_number: string;
 *   otp: string;
 * }
 */
export function verifyBuyerLoginOtp(
  payload: BuyerLoginVerifyOtpRequest,
) {
  return apiRequest<AuthMessageResponse>(
    "/auth/buyer/login/verify-otp",
    {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuthRefresh: true,
    },
  );
}

/* =========================================================
   SELLER AUTH
   Keep these if your seller authentication is still using
   the existing seller endpoints.
========================================================= */

export interface SellerSendOtpRequest {
  phone_number: string;
}

export interface SellerVerifyOtpRequest {
  phone_number: string;
  otp: string;
}

export function sendSellerOtp(
  payload: SellerSendOtpRequest,
) {
  return apiRequest<AuthMessageResponse>(
    "/auth/seller/send-otp",
    {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuthRefresh: true,
    },
  );
}

export function verifySellerOtp(
  payload: SellerVerifyOtpRequest,
) {
  return apiRequest<AuthMessageResponse>(
    "/auth/seller/verify-otp",
    {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuthRefresh: true,
    },
  );
}