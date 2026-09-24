// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // 1. Grab cookies directly from the incoming request
//   const cookieHeader = request.headers.get("cookie") || "";

//   const redirectTo = (path: string) => {
//     return NextResponse.redirect(new URL(path, request.url));
//   };

//   // 2. Fetch /auth/me from your backend using request cookies
//   let user = null;
//   try {
//     const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";
//     const response = await fetch(`${apiBaseUrl}/auth/me`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Cookie: cookieHeader,
//       },
//       cache: "no-store",
//     });

//     if (response.ok) {
//       const result = await response.json();
//       user = result.user || result.data?.user || null;
//     }
//   } catch (error) {
//     console.error("Middleware auth check failed:", error);
//   }

//   const activePortal = user?.active_portal; // "SELLER", "ADMIN", "BUYER"

//   // ==========================================
//   // PORTAL & ROUTE ENFORCEMENT RULES
//   // ==========================================

//   // A. Protect /admin routes (Admin Only)
//   if (pathname.startsWith("/admin")) {
//     if (!user) return redirectTo("/supplier/login");
//     if (activePortal !== "ADMIN") {
//       if (activePortal === "SELLER") return redirectTo("/supplier/dashboard");
//       return redirectTo("/dashboard"); // or root "/"
//     }
//   }

//   // B. Protect /supplier/dashboard routes (Supplier Only)
//   if (pathname.startsWith("/supplier/dashboard")) {
//     if (!user) return redirectTo("/supplier/login");
//     if (activePortal !== "SELLER") {
//       if (activePortal === "ADMIN") return redirectTo("/admin");
//       return redirectTo("/dashboard");
//     }
//   }

//   // C. Protect Buyer Dashboard / Private Pages (Buyer Only)
//   if (pathname.startsWith("/dashboard")) {
//     if (!user) return redirectTo("/login"); // Buyer login page
//     if (activePortal !== "BUYER") {
//       if (activePortal === "SELLER") return redirectTo("/supplier/dashboard");
//       if (activePortal === "ADMIN") return redirectTo("/admin");
//     }
//   }

//   // D. Prevent Logged-In Users from seeing Auth/Login/Register pages
//   if (pathname === "/login" || pathname === "/register" || pathname.startsWith("/supplier/login")) {
//     if (user) {
//       if (activePortal === "SELLER") return redirectTo("/supplier/dashboard");
//       if (activePortal === "ADMIN") return redirectTo("/admin");
//       if (activePortal === "BUYER") return redirectTo("/dashboard");
//     }
//   }

//   return NextResponse.next();
// }

// // Specify all routes the middleware should monitor
// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/supplier/:path*",
//     "/dashboard/:path*",
//     "/login",
//     "/register",
//   ],
// };

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/*
 * Reads the "name=value" pair from a Set-Cookie header.
 * An empty value means the backend cleared that cookie.
 */
function parseSetCookie(setCookie: string) {
  const [pair] = setCookie.split(";");
  const separatorIndex = pair.indexOf("=");

  return {
    name: pair.slice(0, separatorIndex).trim(),
    value: pair.slice(separatorIndex + 1).trim(),
  };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieHeader = request.headers.get("cookie") || "";

  /*
   * When the access_token cookie has expired, the backend's /auth/me
   * renews the session using the refresh_token cookie. It rotates the
   * refresh token and sends the new tokens back as Set-Cookie headers.
   *
   * This fetch runs on the Next.js server, so the browser never sees
   * those headers. Forward them in every response. If we drop them,
   * the browser keeps the old refresh token, which the backend has
   * already revoked, and the user gets logged out.
   */
  let setCookieHeaders: string[] = [];

  const withRenewedCookies = (response: NextResponse) => {
    for (const setCookie of setCookieHeaders) {
      response.headers.append("Set-Cookie", setCookie);
    }

    return response;
  };

  const redirectTo = (path: string) => {
    return withRenewedCookies(NextResponse.redirect(new URL(path, request.url)));
  };

  /*
   * Also give the new tokens to Server Components rendering this
   * request, so their calls to cookies() use the fresh access token.
   */
  const continueRequest = () => {
    if (setCookieHeaders.length === 0) {
      return NextResponse.next();
    }

    for (const setCookie of setCookieHeaders) {
      const { name, value } = parseSetCookie(setCookie);

      if (value) {
        request.cookies.set(name, value);
      } else {
        request.cookies.delete(name);
      }
    }

    return withRenewedCookies(
      NextResponse.next({
        request: {
          headers: request.headers,
        },
      }),
    );
  };

  let user = null;

  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      method: "GET",

      headers: {
        Accept: "application/json",

        Cookie: cookieHeader,
      },

      cache: "no-store",
    });

    setCookieHeaders = response.headers.getSetCookie();

    if (response.ok) {
      const result = await response.json();

      user = result.user ?? result.data?.user ?? null;
    }
  } catch (error) {
    console.error("Middleware auth check failed:", error);
  }

  const activePortal = user?.active_portal;

  /*
   * =========================================
   * AUTH PAGES
   * =========================================
   */

  const isBuyerAuthPage = pathname === "/login" || pathname === "/register";

  const isSupplierAuthPage = pathname === "/supplier/login" || pathname === "/supplier/register";

  const isAdminAuthPage = pathname === "/admin/login";

  /*
   * Logged-out users are allowed
   * to access auth pages.
   */
  if (isBuyerAuthPage || isSupplierAuthPage || isAdminAuthPage) {
    if (!user) {
      return continueRequest();
    }

    /*
     * Logged-in users should not
     * see login/register pages.
     */
    if (activePortal === "ADMIN") {
      return redirectTo("/admin");
    }

    if (activePortal === "SELLER") {
      return redirectTo("/supplier/dashboard");
    }

    if (activePortal === "BUYER") {
      return redirectTo("/");
    }

    return continueRequest();
  }

  /*
   * =========================================
   * ADMIN PORTAL
   * =========================================
   */

  if (pathname.startsWith("/admin")) {
    if (!user) {
      return redirectTo("/admin/login");
    }

    if (activePortal !== "ADMIN") {
      if (activePortal === "SELLER") {
        return redirectTo("/supplier/dashboard");
      }

      if (activePortal === "BUYER") {
        return redirectTo("/");
      }

      return redirectTo("/admin/login");
    }

    return continueRequest();
  }

  /*
   * =========================================
   * SUPPLIER DASHBOARD
   * =========================================
   */

  if (pathname.startsWith("/supplier/dashboard")) {
    if (!user) {
      return redirectTo("/supplier/login");
    }

    if (activePortal !== "SELLER") {
      if (activePortal === "ADMIN") {
        return redirectTo("/admin");
      }

      if (activePortal === "BUYER") {
        return redirectTo("/");
      }

      return redirectTo("/supplier/login");
    }

    return continueRequest();
  }

  /*
   * =========================================
   * BUYER DASHBOARD
   * =========================================
   */

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return redirectTo("/login");
    }

    if (activePortal !== "BUYER") {
      if (activePortal === "SELLER") {
        return redirectTo("/supplier/dashboard");
      }

      if (activePortal === "ADMIN") {
        return redirectTo("/admin");
      }

      return redirectTo("/login");
    }

    return continueRequest();
  }

  return continueRequest();
}

export const config = {
  matcher: ["/admin/:path*", "/supplier/:path*", "/dashboard/:path*", "/login", "/register"],
};
