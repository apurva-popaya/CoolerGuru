const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

export interface SendBuyerOtpRequest {
  phone_number: string;
  name?: string;
}

export interface SendBuyerOtpResponse {
  message: string;
  // Returned by the backend only outside production, for testing.
  otp?: string;
}

export interface VerifyBuyerOtpRequest {
  phone_number: string;
  otp: string;
}

export interface BuyerAuthUser {
  user_id: number;
  name: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string;
  roles: string[];
  active_portal: string;
}

export interface VerifyBuyerOtpResponse {
  message: string;
  is_new_user: boolean;
  user: BuyerAuthUser;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
  detail?: string;
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;

    throw new Error(
      errorData?.message ?? errorData?.detail ?? errorData?.error ?? `Request failed with status ${response.status}`,
    );
  }

  return data as T;
}

export async function sendBuyerOtp(payload: SendBuyerOtpRequest): Promise<SendBuyerOtpResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/buyer/send-otp`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify(payload),
  });

  return parseApiResponse<SendBuyerOtpResponse>(response);
}

export async function verifyBuyerOtp(payload: VerifyBuyerOtpRequest): Promise<VerifyBuyerOtpResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/buyer/verify-otp`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify(payload),
  });

  return parseApiResponse<VerifyBuyerOtpResponse>(response);
}
