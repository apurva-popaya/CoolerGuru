// "use client";

// import Image from "next/image";
// import Link from "next/link";

// import {
//   Search,
// } from "lucide-react";

// import {
//   Button,
// } from "@/components/ui/button";

// import {
//   Input,
// } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   SidebarTrigger,
//   useSidebar,
// } from "@/components/ui/sidebar";

// import {
//   DashboardUserMenu,
//   type DashboardUser,
// } from "./dashboard-user-menu";

// interface DashboardNavbarProps {
//   user: DashboardUser;
//   homeHref: string;
//   showSearch?: boolean;
//   searchPlaceholder?: string;
// }

// export function DashboardNavbar({
//   user,
//   homeHref,
//   showSearch = true,
//   searchPlaceholder = "Search by company, product, category or user...",
// }: DashboardNavbarProps) {
//   const {
//     state,
//   } = useSidebar();

//   const expanded =
//     state === "expanded";

//   return (
//     <header className="sticky top-0 z-[100] w-full border-b border-[#e7e8f3] bg-white">
//       <div className="flex h-[64px] items-center">
//         <div className={`flex h-full shrink-0 items-center border-r border-[#e7e8f3] transition-[width] duration-200 ${expanded ? "w-[205px] px-4" : "w-[62px] px-2"}`}>
//           <Link href={homeHref} className="flex h-full w-full items-center justify-center">
//             {expanded ? (
//               <Image src="/images/logo/coolerguru-logo-image.png" alt="CoolerGuru" width={155} height={52} priority className="h-[50px] w-[145px] object-contain" />
//             ) : (
//               <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#f0efff] text-[10px] font-bold text-[#2720a8]">
//                 CG
//               </div>
//             )}
//           </Link>
//         </div>

//         <div className="flex min-w-0 flex-1 items-center justify-between gap-5 px-5">
//           <div className="flex min-w-0 flex-1 items-center gap-3">
//             <SidebarTrigger className="h-[34px] w-[34px] shrink-0 text-[#15136f] hover:bg-[#f3f2ff]" />

//             {showSearch && (
//               <div className="flex h-[36px] w-full max-w-[650px] overflow-hidden rounded-[6px] border border-[#dcddef] bg-white">
//                 <Select defaultValue="all">
//                   <SelectTrigger className="h-full w-[74px] shrink-0 rounded-none border-0 border-r border-[#dcddef] bg-[#f8f8ff] px-3 text-[10px] shadow-none focus:ring-0">
//                     <SelectValue />
//                   </SelectTrigger>

//                   <SelectContent>
//                     <SelectItem value="all">
//                       All
//                     </SelectItem>

//                     <SelectItem value="companies">
//                       Companies
//                     </SelectItem>

//                     <SelectItem value="products">
//                       Products
//                     </SelectItem>

//                     <SelectItem value="users">
//                       Users
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <Input type="search" placeholder={searchPlaceholder} className="h-full min-w-0 flex-1 rounded-none border-0 bg-white px-3 text-[10px] shadow-none focus-visible:ring-0" />

//                 <Button type="button" className="h-full min-w-[88px] rounded-none bg-[#2720a8] px-4 text-[10px] font-semibold text-white hover:bg-[#15136f]">
//                   <Search className="size-3.5" />

//                   Search
//                 </Button>
//               </div>
//             )}
//           </div>

//           <DashboardUserMenu
//             user={user}
//           />
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";

import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import { type DashboardUser, DashboardUserMenu } from "./dashboard-user-menu";

interface DashboardNavbarProps {
  user: DashboardUser;
  homeHref: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export function DashboardNavbar({
  user,
  homeHref,
  showSearch = true,
  searchPlaceholder = "Search by company, product, category or user...",
}: DashboardNavbarProps) {
  const { state } = useSidebar();

  const expanded = state === "expanded";

  return (
    <header className="sticky top-0 z-[100] w-full border-[#e7e8f3] border-b bg-white">
      <div className="flex h-[64px] items-center">
        <div
          className={`flex h-full shrink-0 items-center border-[#e7e8f3] border-r transition-[width] duration-200 ${
            expanded ? "w-[205px] px-4" : "w-[62px] px-2"
          }`}
        >
          <Link href={homeHref} className="flex h-full w-full items-center justify-center">
            {expanded ? (
              <Image
                src="/images/logo/coolerguru-logo-image.png"
                alt="CoolerGuru"
                width={155}
                height={52}
                priority
                className="h-[50px] w-[145px] object-contain"
              />
            ) : (
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#f0efff] font-bold text-[#2720a8] text-[10px]">
                CG
              </div>
            )}
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-5 px-5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <SidebarTrigger className="h-[34px] w-[34px] shrink-0 text-[#15136f] hover:bg-[#f3f2ff]" />

            {showSearch && (
              <div className="flex h-[36px] w-full max-w-[650px] overflow-hidden rounded-[6px] border border-[#dcddef] bg-white">
                <Select defaultValue="all">
                  <SelectTrigger className="h-full w-[74px] shrink-0 rounded-none border-0 border-[#dcddef] border-r bg-[#f8f8ff] px-3 text-[10px] shadow-none focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>

                    <SelectItem value="companies">Companies</SelectItem>

                    <SelectItem value="products">Products</SelectItem>

                    <SelectItem value="users">Users</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  className="h-full min-w-0 flex-1 rounded-none border-0 bg-white px-3 text-[10px] shadow-none focus-visible:ring-0"
                />

                <Button
                  type="button"
                  className="h-full min-w-[88px] rounded-none bg-[#2720a8] px-4 font-semibold text-[10px] text-white hover:bg-[#15136f]"
                >
                  <Search className="size-3.5" />
                  Search
                </Button>
              </div>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button
              asChild
              className="h-[38px] rounded-[7px] bg-[#2720a8] px-4 font-semibold text-[12px] text-white shadow-none hover:bg-[#15136f]"
            >
              <Link href="/admin/add-admin">
                <Plus className="size-4" />
                Add Admin
              </Link>
            </Button>

            <DashboardUserMenu user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
