// import {
//   apiRequest,
//   type ApiResponse,
// } from "@/lib/api/api-client";

// import type {
//   AuthUser,
// } from "@/lib/auth/auth-types";

// export interface CurrentUserData {
//   user?: AuthUser;

//   user_id?: number;
//   name?: string | null;
//   first_name?: string | null;
//   last_name?: string | null;
//   email?: string | null;
//   phone_number?: string;
//   roles?: string[];
//   active_portal?: "BUYER" | "SELLER" | "ADMIN";
// }

// export type CurrentUserResponse =
//   ApiResponse<CurrentUserData>;

// export async function getCurrentUser() {
//   return apiRequest<CurrentUserResponse>(
//     "/auth/me",
//     {
//       method: "GET",
//     },
//   );
// }

// export async function logoutUser() {
//   return apiRequest<ApiResponse>(
//     "/auth/logout",
//     {
//       method: "POST",
//       skipAuthRefresh: true,
//     },
//   );
// }

import { type ApiResponse, apiRequest } from "@/lib/api/api-client";
import type { AuthUser } from "@/lib/auth/auth-types";

export interface CurrentUserResponse {
  user: AuthUser;
}

export async function getCurrentUser() {
  return apiRequest<CurrentUserResponse>("/auth/me", {
    method: "GET",
  });
}

export async function logoutUser() {
  return apiRequest<ApiResponse>("/auth/logout", {
    method: "POST",
    skipAuthRefresh: true,
  });
}
