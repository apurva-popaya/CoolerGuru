// import type {
//   ReactNode,
// } from "react";

// import {
//   BuyerFooter,
// } from "@/components/buyer/layout/buyer-footer";

// import {
//   SupplierDashboardShell,
// } from "@/components/supplier/dashboard/dashboard-shell";

// export default function SupplierDashboardLayout({
//   children,
// }: Readonly<{
//   children: ReactNode;
// }>) {
//   return (
//     <div className="min-h-screen bg-[#f8f8fd]">
//       <SupplierDashboardShell>
//         {children}
//       </SupplierDashboardShell>

//       <BuyerFooter />
//     </div>
//   );
// }

import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { BuyerFooter } from "@/components/buyer/layout/buyer-footer";
import { SupplierDashboardShell } from "@/components/supplier/dashboard/dashboard-shell";
import { getServerAuthUser } from "@/lib/auth/server-auth";

export default async function SupplierDashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  console.log("user--->");
  const user = await getServerAuthUser();

  if (!user) {
    console.log("user--->");
    redirect("/supplier/login");
  }

  if (user.active_portal === "ADMIN") {
    redirect("/admin");
  }

  if (user.active_portal === "BUYER") {
    redirect("/");
  }

  if (user.active_portal !== "SELLER") {
    redirect("/supplier/login");
  }

  return (
    <div className="min-h-screen bg-[#f8f8fd]">
      <SupplierDashboardShell>{children}</SupplierDashboardShell>

      <BuyerFooter />
    </div>
  );
}
