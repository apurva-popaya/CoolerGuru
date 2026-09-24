// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

// interface SupplierSendOtpRequest {
//   phone_number: string;
// }

// interface SupplierSendOtpResponse {
//   message: string;
//   // Returned by the backend only outside production, for testing.
//   otp?: string;
// }

// interface SupplierVerifyOtpRequest {
//   phone_number: string;
//   otp: string;
// }

// interface SupplierUser {
//   user_id: number;
//   name: string;
//   first_name: string | null;
//   last_name: string | null;
//   email: string | null;
//   phone_number: string;
//   roles: string[];
//   active_portal: string;
// }

// interface SupplierVerifyOtpResponse {
//   message: string;
//   user: SupplierUser;
// }

// interface ApiErrorResponse {
//   message?: string;
//   error?: string;
//   detail?: string;
// }

// async function postRequest<TResponse>(endpoint: string, body: unknown): Promise<TResponse> {
//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     credentials: "include",

//     body: JSON.stringify(body),
//   });

//   const data = await response.json().catch(() => null);

//   if (!response.ok) {
//     const errorData = data as ApiErrorResponse | null;

//     throw new Error(
//       errorData?.detail ?? errorData?.message ?? errorData?.error ?? "Something went wrong. Please try again.",
//     );
//   }

//   return data as TResponse;
// }

// export async function sendSupplierOtp(phoneNumber: string) {
//   const payload: SupplierSendOtpRequest = {
//     phone_number: phoneNumber,
//   };

//   return postRequest<SupplierSendOtpResponse>("/auth/seller/send-otp", payload);
// }

// export async function verifySupplierOtp(phoneNumber: string, otp: string) {
//   const payload: SupplierVerifyOtpRequest = {
//     phone_number: phoneNumber,

//     otp,
//   };

//   return postRequest<SupplierVerifyOtpResponse>("/auth/seller/verify-otp", payload);
// }








const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8000/api/v1";

/* =========================================================
   COMMON TYPES
========================================================= */

interface ApiErrorResponse {
  message?: string;
  error?: string;
  detail?: string;
}

interface SupplierOtpData {
  otp?: string;
  [key: string]: unknown;
}

interface SupplierOtpResponse {
  success?: boolean;
  message: string;
  data?: SupplierOtpData;
  [key: string]: unknown;
}

/* =========================================================
   SUPPLIER REGISTRATION
========================================================= */

export interface SupplierRegistrationSendOtpRequest {
  phone_number: string;
}

export interface SupplierRegistrationVerifyOtpRequest {
  phone_number: string;
  otp: string;
}

/* =========================================================
   SUPPLIER LOGIN
========================================================= */

export interface SupplierLoginSendOtpRequest {
  phone_number: string;
}

export interface SupplierLoginVerifyOtpRequest {
  phone_number: string;
  otp: string;
}

/* =========================================================
   SUPPLIER USER
========================================================= */

export interface SupplierUser {
  user_id: number;
  name: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string;
  roles: string[];
  active_portal: string;
}

export interface SupplierAuthResponse {
  success?: boolean;
  message: string;
  data?: {
    user?: SupplierUser;
    [key: string]: unknown;
  };
  user?: SupplierUser;
  [key: string]: unknown;
}

/* =========================================================
   COMMON POST REQUEST
========================================================= */

async function postRequest<TResponse>(
  endpoint: string,
  body: unknown,
): Promise<TResponse> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify(body),
    },
  );

  const data =
    await response
      .json()
      .catch(() => null);

  if (!response.ok) {
    const errorData =
      data as ApiErrorResponse | null;

    throw new Error(
      errorData?.message ??
        errorData?.detail ??
        errorData?.error ??
        `Request failed with status ${response.status}`,
    );
  }

  return data as TResponse;
}

/* =========================================================
   SUPPLIER REGISTRATION
========================================================= */

/**
 * Send OTP for supplier/seller registration.
 *
 * POST /auth/seller/register/send-otp
 *
 * Body:
 * {
 *   phone_number: string
 * }
 *
 * In development, the backend may return:
 *
 * {
 *   data: {
 *     otp: "123456"
 *   }
 * }
 */
export async function sendSupplierRegistrationOtp(
  phoneNumber: string,
) {
  const payload: SupplierRegistrationSendOtpRequest =
    {
      phone_number: phoneNumber,
    };

  return postRequest<SupplierOtpResponse>(
    "/auth/seller/register/send-otp",
    payload,
  );
}

/**
 * Verify OTP and register supplier/seller access.
 *
 * POST /auth/seller/register/verify-otp
 *
 * Body:
 * {
 *   phone_number: string,
 *   otp: string
 * }
 */
export async function verifySupplierRegistrationOtp(
  phoneNumber: string,
  otp: string,
) {
  const payload: SupplierRegistrationVerifyOtpRequest =
    {
      phone_number: phoneNumber,
      otp,
    };

  return postRequest<SupplierAuthResponse>(
    "/auth/seller/register/verify-otp",
    payload,
  );
}

/* =========================================================
   SUPPLIER LOGIN
========================================================= */

/**
 * Send OTP for supplier/seller login.
 *
 * POST /auth/seller/login/send-otp
 *
 * Body:
 * {
 *   phone_number: string
 * }
 */
export async function sendSupplierLoginOtp(
  phoneNumber: string,
) {
  const payload: SupplierLoginSendOtpRequest =
    {
      phone_number: phoneNumber,
    };

  return postRequest<SupplierOtpResponse>(
    "/auth/seller/login/send-otp",
    payload,
  );
}

/**
 * Verify OTP and login as supplier/seller.
 *
 * POST /auth/seller/login/verify-otp
 *
 * Body:
 * {
 *   phone_number: string,
 *   otp: string
 * }
 */
export async function verifySupplierLoginOtp(
  phoneNumber: string,
  otp: string,
) {
  const payload: SupplierLoginVerifyOtpRequest =
    {
      phone_number: phoneNumber,
      otp,
    };

  return postRequest<SupplierAuthResponse>(
    "/auth/seller/login/verify-otp",
    payload,
  );
}