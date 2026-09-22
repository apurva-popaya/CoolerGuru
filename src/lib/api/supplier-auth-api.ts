const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

interface SupplierSendOtpRequest {
  phone_number: string;
}

interface SupplierSendOtpResponse {
  message: string;
}

interface SupplierVerifyOtpRequest {
  phone_number: string;
  otp: string;
}

interface SupplierUser {
  user_id: number;
  name: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string;
  roles: string[];
  active_portal: string;
}

interface SupplierVerifyOtpResponse {
  message: string;
  user: SupplierUser;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
  detail?: string;
}

async function postRequest<TResponse>(endpoint: string, body: unknown): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;

    throw new Error(
      errorData?.detail ?? errorData?.message ?? errorData?.error ?? "Something went wrong. Please try again.",
    );
  }

  return data as TResponse;
}

export async function sendSupplierOtp(phoneNumber: string) {
  const payload: SupplierSendOtpRequest = {
    phone_number: phoneNumber,
  };

  return postRequest<SupplierSendOtpResponse>("/auth/seller/send-otp", payload);
}

export async function verifySupplierOtp(phoneNumber: string, otp: string) {
  const payload: SupplierVerifyOtpRequest = {
    phone_number: phoneNumber,

    otp,
  };

  return postRequest<SupplierVerifyOtpResponse>("/auth/seller/verify-otp", payload);
}
