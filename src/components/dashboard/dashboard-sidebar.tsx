// "use client";

// import Link from "next/link";

// import type {
//   DashboardNavGroup,
// } from "@/navigation/dashboard/types";

// import {
//   DashboardNav,
// } from "./dashboard-nav";

// interface DashboardSidebarProps {
//   navigation: DashboardNavGroup[];
//   homeHref: string;
// }

// export function DashboardSidebar({
//   navigation,
//   homeHref,
// }: DashboardSidebarProps) {
//   return (
//     <aside className="w-[205px] shrink-0 border-r border-[#e7e8f3] bg-white">
//       <div className="sticky top-0">
//         <div className="flex h-[72px] items-center justify-center border-b border-[#e7e8f3] px-4">
//           <Link href={homeHref} prefetch={false} aria-label="CoolerGuru dashboard" className="flex w-full items-center justify-center">
//             <img src="/images/logo/coolerguru-logo-image.png" alt="CoolerGuru" className="h-auto w-[145px] object-contain" />
//           </Link>
//         </div>

//         <div className="py-4">
//           <DashboardNav
//             groups={navigation}
//           />
//         </div>
//       </div>
//     </aside>
//   );
// }

"use client";

import { useSidebar } from "@/components/ui/sidebar";
import type { DashboardNavGroup } from "@/navigation/dashboard/types";

import { DashboardNav } from "./dashboard-nav";

interface DashboardSidebarProps {
  navigation: DashboardNavGroup[];
}

export function DashboardSidebar({ navigation }: DashboardSidebarProps) {
  const { state } = useSidebar();

  const expanded = state === "expanded";

  return (
    <aside
      className={`sticky top-[64px] h-[calc(100vh-64px)] shrink-0 self-start overflow-hidden border-[#e7e8f3] border-r bg-white transition-[width] duration-200 ${expanded ? "w-[205px]" : "w-[62px]"}`}
    >
      <DashboardNav groups={navigation} />
    </aside>
  );
}
