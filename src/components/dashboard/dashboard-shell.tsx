// import type {
//   ReactNode,
// } from "react";

// import {
//   SidebarProvider,
// } from "@/components/ui/sidebar";

// import type {
//   DashboardNavGroup,
// } from "@/navigation/dashboard/types";

// import {
//   DashboardNavbar,
// } from "./dashboard-navbar";

// import {
//   DashboardSidebar,
// } from "./dashboard-sidebar";

// import type {
//   DashboardUser,
// } from "./dashboard-user-menu";

// interface DashboardShellProps {
//   children: ReactNode;
//   navigation: DashboardNavGroup[];
//   homeHref: string;
//   user: DashboardUser;
//   showSearch?: boolean;
//   searchPlaceholder?: string;
// }

// export function DashboardShell({
//   children,
//   navigation,
//   homeHref,
//   user,
//   showSearch = true,
//   searchPlaceholder,
// }: DashboardShellProps) {
//   return (
//     <SidebarProvider
//       defaultOpen
//       style={
//         {
//           "--sidebar-width": "205px",
//           "--sidebar-width-icon": "62px",
//         } as React.CSSProperties
//       }
//     >
//       <div className="min-h-screen w-full bg-[#fbfbfe]">
//         <DashboardNavbar
//           user={user}
//           homeHref={homeHref}
//           showSearch={showSearch}
//           searchPlaceholder={searchPlaceholder}
//         />

//         <div className="flex min-h-[calc(100vh-64px)]">
//           <DashboardSidebar
//             navigation={navigation}
//           />

//           <main className="min-w-0 flex-1 px-[20px] py-[18px]">
//             {children}
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }

import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import type { DashboardNavGroup } from "@/navigation/dashboard/types";

import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import type { DashboardUser } from "./dashboard-user-menu";

interface DashboardShellProps {
  children: ReactNode;
  navigation: DashboardNavGroup[];
  homeHref: string;
  user: DashboardUser;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export function DashboardShell({
  children,
  navigation,
  homeHref,
  user,
  showSearch = true,
  searchPlaceholder,
}: DashboardShellProps) {
  return (
    <SidebarProvider
      defaultOpen
      style={
        {
          "--sidebar-width": "205px",
          "--sidebar-width-icon": "62px",
        } as React.CSSProperties
      }
    >
      <div className="min-h-screen w-full bg-[#fbfbfe]">
        <DashboardNavbar
          user={user}
          homeHref={homeHref}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
        />

        <div className="flex min-h-[calc(100vh-64px)]">
          <DashboardSidebar navigation={navigation} />

          <main className="min-w-0 flex-1 px-[20px] py-[18px]">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
