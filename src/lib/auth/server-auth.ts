import { cookies } from "next/headers";

import type { ActivePortal, AuthUser } from "@/lib/auth/auth-types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

interface AuthMeResponse {
  success: boolean;

  data?: {
    user?: AuthUser;

    user_id?: number;
    name?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    phone_number?: string;
    roles?: string[];
    active_portal?: ActivePortal;
  };
}

// export async function getServerAuthUser(): Promise<AuthUser | null> {
//   const cookieStore =
//     await cookies();

//   const cookieHeader =
//     cookieStore
//       .getAll()
//       .map(
//         (cookie) =>
//           `${cookie.name}=${cookie.value}`,
//       )
//       .join("; ");

//   if (!cookieHeader) {
//     return null;
//   }

//   try {
//     //   console.log("cookieHeader----->", cookieHeader);
//     const response =
//       await fetch(
//         `${API_BASE_URL}/auth/me`,
//         {
//           method: "GET",

//           headers: {
//             Accept:
//               "application/json",

//             Cookie:
//               cookieHeader,
//           },

//           cache: "no-store",
//         },
//       );

//     if (!response.ok) {
//       return null;
//     }

//     const result =
//       (await response.json()) as AuthMeResponse;

//     if (!result.success || !result.data) {
//       return null;
//     }

//     if (result.data.user) {
//       return result.data.user;
//     }

//     if (
//       typeof result.data.user_id === "number" &&
//       typeof result.data.phone_number === "string" &&
//       Array.isArray(result.data.roles) &&
//       result.data.active_portal
//     ) {
//       return {
//         user_id:
//           result.data.user_id,

//         name:
//           result.data.name ??
//           null,

//         first_name:
//           result.data.first_name ??
//           null,

//         last_name:
//           result.data.last_name ??
//           null,

//         email:
//           result.data.email ??
//           null,

//         phone_number:
//           result.data.phone_number,

//         roles:
//           result.data.roles,

//         active_portal:
//           result.data.active_portal,
//       };
//     }

//     return null;
//   } catch {
//     return null;
//   }
// }

export async function getServerAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  if (!cookieHeader) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    console.log("✅ [Auth Debug] API Response result:", result);

    // Handle different backend response shapes safely:
    // 1. Direct user object at root: { user: { ... } }
    if (result.user) {
      return result.user;
    }

    // 2. Wrapped in data/success format: { success: true, data: { user: { ... } } }
    if (result.data?.user) {
      return result.data.user;
    }

    // 3. Fallback flat properties if sent directly
    if (typeof result.user_id === "number" && result.active_portal) {
      return result as AuthUser;
    }

    return null;
  } catch {
    return null;
  }
}
