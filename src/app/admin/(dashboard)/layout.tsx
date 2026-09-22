// import type {
//   ReactNode,
// } from "react";

// import {
//   BuyerFooter,
// } from "@/components/buyer/layout/buyer-footer";

// import {
//   DashboardShell,
// } from "@/components/dashboard/dashboard-shell";

// import {
//   adminNavigation,
// } from "@/navigation/dashboard/admin-navigation";

// const adminUser = {
//   name: "Admin User",
//   subtitle: "Administrator",
// };

// export default function AdminDashboardLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-[#fbfbfe]">
//       <DashboardShell
//         navigation={adminNavigation}
//         homeHref="/admin"
//         user={adminUser}
//         searchPlaceholder="Search by company, product, category or user..."
//       >
//         {children}
//       </DashboardShell>

//       <BuyerFooter />
//     </div>
//   );
// }

import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { BuyerFooter } from "@/components/buyer/layout/buyer-footer";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getServerAuthUser } from "@/lib/auth/server-auth";
import { adminNavigation } from "@/navigation/dashboard/admin-navigation";

// const adminUser = {
//   name: "Admin User",
//   subtitle: "Administrator",
// };

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const user = await getServerAuthUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.active_portal !== "ADMIN") {
    if (user.active_portal === "SELLER") {
      redirect("/supplier/dashboard");
    }

    redirect("/");
  }

  const adminName = user.name?.trim() || [user.first_name, user.last_name].filter(Boolean).join(" ").trim() || "Admin";

  const adminUser = {
    name: adminName,
    subtitle: "Administrator",
  };

  return (
    <div className="min-h-screen bg-[#fbfbfe]">
      <DashboardShell
        navigation={adminNavigation}
        homeHref="/admin"
        user={adminUser}
        searchPlaceholder="Search by company, product, category or user..."
      >
        {children}
      </DashboardShell>

      <BuyerFooter />
    </div>
  );
}
