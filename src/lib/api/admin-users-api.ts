import type { AdminUserApiResponse, CreateAdminUserRequest, UpdateAdminUserRequest } from "@/types/admin-user";

import { apiRequest } from "./api-client";

export interface GetAdminUsersParams {
  page?: number;
  limit?: number;
}

export function getAdminUsers(params: GetAdminUsersParams = {}) {
  const { page = 1, limit = 10 } = params;

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  return apiRequest<AdminUserApiResponse>(`/users?${query.toString()}`, {
    method: "GET",
  });
}

export function getAdminUserById(userId: number | string) {
  return apiRequest<AdminUserApiResponse>(`/users/${userId}`, {
    method: "GET",
  });
}

export function createAdminUser(payload: CreateAdminUserRequest) {
  return apiRequest<AdminUserApiResponse>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAdminUser(userId: number | string, payload: UpdateAdminUserRequest) {
  return apiRequest<AdminUserApiResponse>(`/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteAdminUser(userId: number | string) {
  return apiRequest<AdminUserApiResponse>(`/users/${userId}`, {
    method: "DELETE",
  });
}
