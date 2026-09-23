import type { ReactNode } from "react";

import { BuyerDashboardSidebar } from "@/components/buyer/dashboard/buyer-dashboard-sidebar";

export default function BuyerDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row">
        <BuyerDashboardSidebar />

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}