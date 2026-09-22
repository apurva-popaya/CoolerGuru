// import type { ReactNode } from "react";

// import SupplierNavbar from "@/components/supplier/layout/SupplierNavbar";
// import { BuyerFooter } from "@/components/buyer/layout/buyer-footer";

// export default function SupplierPublicLayout({
//   children,
// }: Readonly<{
//   children: ReactNode;
// }>) {
//   return (
//     <div className="flex min-h-screen flex-col bg-white">
//       <SupplierNavbar />

//       <main className="flex-1">{children}</main>

//       <BuyerFooter />
//     </div>
//   );
// }

import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { BuyerFooter } from "@/components/buyer/layout/buyer-footer";
import SupplierNavbar from "@/components/supplier/layout/SupplierNavbar";
import { getServerAuthUser } from "@/lib/auth/server-auth";

export default async function SupplierPublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getServerAuthUser();

  if (user) {
    if (user.active_portal === "SELLER") {
      redirect("/supplier/dashboard");
    }

    if (user.active_portal === "ADMIN") {
      redirect("/admin");
    }

    if (user.active_portal === "BUYER") {
      redirect("/");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SupplierNavbar />

      <main className="flex-1">{children}</main>

      <BuyerFooter />
    </div>
  );
}
