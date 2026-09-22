const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

interface AdminLoginRequest {
  phone_number: string;
  password: string;
}

interface AdminUser {
  user_id: number;
  name: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string;
  roles: string[];
  active_portal: string;
}

interface AdminLoginResponse {
  success: boolean;
  message: string;
  data: {
    user: AdminUser;
  };
}

interface AddAdminRequest {
  name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}

interface AddAdminResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

interface ApiErrorResponse {
  success?: boolean;
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

export async function loginAdmin(phoneNumber: string, password: string) {
  const payload: AdminLoginRequest = {
    phone_number: phoneNumber,
    password,
  };

  return postRequest<AdminLoginResponse>("/auth/admin/login", payload);
}

export async function addAdmin(name: string, phoneNumber: string, password: string, confirmPassword: string) {
  const payload: AddAdminRequest = {
    name,
    phone_number: phoneNumber,
    password,
    confirm_password: confirmPassword,
  };

  return postRequest<AddAdminResponse>("/admin/accounts", payload);
}
