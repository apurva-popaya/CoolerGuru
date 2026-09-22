import type { ReactNode } from "react";

import { SupplierDashboardNavbar } from "./dashboard-navbar";
import { SupplierDashboardSidebar } from "./dashboard-sidebar";

interface SupplierDashboardShellProps {
  children: ReactNode;
}

export function SupplierDashboardShell({ children }: SupplierDashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8fd]">
      <SupplierDashboardNavbar />

      <div className="flex flex-1">
        <SupplierDashboardSidebar />

        <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
