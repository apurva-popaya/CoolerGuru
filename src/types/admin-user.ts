export type AdminUserRole = "BUYER" | "SELLER";

export interface AdminUserApiItem {
  user_id?: number;
  id?: number | string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string | null;
  phone_number?: string;
  roles?: string[];
  role?: string;
  is_active?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
  last_activity?: string | null;
}

export interface AdminUserApiResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
  [key: string]: unknown;
}

export interface CreateAdminUserRequest {
  name: string;
  phone_number: string;
  roles: AdminUserRole[];
}

export interface UpdateAdminUserRequest {
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  roles?: string[];
}
