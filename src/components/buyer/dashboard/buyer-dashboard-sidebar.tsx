"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Building2, ClipboardList, Heart, LayoutGrid, User } from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutGrid,
  },
    {
    label: "Profile",
    href: "/dashboard/profile",
    icon: ClipboardList,
  },
  {
    label: "My Inquiries",
    href: "/dashboard/inquiries",
    icon: ClipboardList,
  },
  {
    label: "Saved Products",
    href: "/dashboard/saved-products",
    icon: Heart,
  },
  {
    label: "Saved Companies",
    href: "/dashboard/saved-companies",
    icon: Building2,
  },
];

export function BuyerDashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-[#e8e8f0] bg-white px-4 py-3 lg:w-[235px] lg:border-r lg:border-b-0 lg:px-5 lg:py-8">
      <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-[42px] shrink-0 items-center gap-2.5 rounded-[7px] px-3.5 font-bold text-[11px] transition sm:text-[12px] lg:min-h-[44px] lg:px-4 ${
                active
                  ? "!text-[#2c20c7] bg-[#f0edff]"
                  : "!text-[#202449] hover:bg-[#f8f7ff]"
              }`}
            >
              <Icon size={17} strokeWidth={2} />

              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}