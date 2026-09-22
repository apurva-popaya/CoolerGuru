// "use client";

// import Link from "next/link";

// import {
//   usePathname,
// } from "next/navigation";

// import {
//   Activity,
//   Building2,
//   ChartNoAxesCombined,
//   ClipboardCheck,
//   Heart,
//   LayoutDashboard,
//   Layers3,
//   MessagesSquare,
//   Package,
//   PackageCheck,
//   Star,
//   Users,
// } from "lucide-react";

// import {
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// import type {
//   DashboardIconName,
//   DashboardNavGroup,
// } from "@/navigation/dashboard/types";

// interface DashboardNavProps {
//   groups: DashboardNavGroup[];
// }

// function getIcon(
//   iconName: DashboardIconName,
// ) {
//   switch (iconName) {
//     case "overview":
//       return LayoutDashboard;

//     case "company-approvals":
//       return ClipboardCheck;

//     case "product-approvals":
//       return PackageCheck;

//     case "companies":
//     case "company-profile":
//       return Building2;

//     case "products":
//       return Package;

//     case "inquiries":
//       return MessagesSquare;

//     case "categories":
//       return Layers3;

//     case "users":
//       return Users;

//     case "featured-companies":
//       return Star;

//     case "activity":
//       return Activity;

//     case "analytics":
//       return ChartNoAxesCombined;

//     case "saved-products":
//       return Heart;

//     case "saved-companies":
//       return Building2;

//     default:
//       return LayoutDashboard;
//   }
// }

// export function DashboardNav({
//   groups,
// }: DashboardNavProps) {
//   const pathname =
//     usePathname();

//   const isActive = (
//     href: string,
//   ) => {
//     if (
//       href === "/admin" ||
//       href === "/dashboard" ||
//       href === "/supplier/dashboard"
//     ) {
//       return (
//         pathname === href
//       );
//     }

//     return pathname.startsWith(
//       href,
//     );
//   };

//   return (
//     <>
//       {groups.map(
//         (group) => (
//           <SidebarGroup key={group.id} className="px-[12px] py-0">
//             {group.label && (
//               <SidebarGroupLabel className="mb-2 h-auto px-[10px] pt-5 text-[10px] font-bold tracking-normal text-[#15136f]">
//                 {group.label}
//               </SidebarGroupLabel>
//             )}

//             <SidebarGroupContent>
//               <SidebarMenu className="gap-[2px]">
//                 {group.items.map(
//                   (item) => {
//                     const Icon =
//                       getIcon(
//                         item.icon,
//                       );

//                     const active =
//                       isActive(
//                         item.href,
//                       );

//                     return (
//                       <SidebarMenuItem key={item.id}>
//                         <SidebarMenuButton asChild tooltip={item.title} isActive={active} className="h-[38px] rounded-[6px] px-[10px] text-[11px] font-medium text-[#11163d] hover:bg-[#f3f2ff] hover:text-[#2720a8] data-active:bg-[#f0efff] data-active:font-semibold data-active:text-[#2720a8] [&_svg]:size-[15px]">
//                           <Link href={item.href} prefetch={false} aria-disabled={item.disabled}>
//                             <Icon />

//                             <span>
//                               {item.title}
//                             </span>
//                           </Link>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>
//                     );
//                   },
//                 )}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ),
//       )}
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Activity,
  Building2,
  ChartNoAxesCombined,
  ClipboardCheck,
  Heart,
  Layers3,
  LayoutDashboard,
  MessagesSquare,
  Package,
  PackageCheck,
  Star,
  Users,
} from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import type { DashboardIconName, DashboardNavGroup } from "@/navigation/dashboard/types";

interface DashboardNavProps {
  groups: DashboardNavGroup[];
}

function getIcon(iconName: DashboardIconName) {
  switch (iconName) {
    case "overview":
      return LayoutDashboard;

    case "company-approvals":
      return ClipboardCheck;

    case "product-approvals":
      return PackageCheck;

    case "companies":
    case "company-profile":
      return Building2;

    case "products":
      return Package;

    case "inquiries":
      return MessagesSquare;

    case "categories":
      return Layers3;

    case "users":
      return Users;

    case "featured-companies":
      return Star;

    case "activity":
      return Activity;

    case "analytics":
      return ChartNoAxesCombined;

    case "saved-products":
      return Heart;

    case "saved-companies":
      return Building2;

    default:
      return LayoutDashboard;
  }
}

export function DashboardNav({ groups }: DashboardNavProps) {
  const pathname = usePathname();

  const { state } = useSidebar();

  const expanded = state === "expanded";

  const isActive = (href: string) => {
    if (href === "/admin" || href === "/dashboard" || href === "/supplier/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <div className="py-5">
      {groups.map((group) => (
        <div key={group.id} className={expanded ? "px-3" : "px-2"}>
          {group.label && expanded ? (
            <p className="mb-3 px-2 font-bold text-[#15136f] text-[10px] uppercase tracking-[0.03em]">{group.label}</p>
          ) : null}

          <nav className="flex flex-col gap-[2px]">
            {group.items.map((item) => {
              const Icon = getIcon(item.icon);

              const active = isActive(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  prefetch={false}
                  title={!expanded ? item.title : undefined}
                  className={`flex h-[38px] items-center rounded-[6px] font-semibold text-[10px] transition ${expanded ? "gap-3 px-3" : "justify-center px-0"} ${active ? "!text-[#2720a8] bg-[#f0efff]" : "!text-[#292e55] hover:!text-[#2720a8] hover:bg-[#f7f6ff]"}`}
                >
                  <Icon size={16} className="shrink-0" />

                  {expanded ? <span className="whitespace-nowrap">{item.title}</span> : null}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
}
