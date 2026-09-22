"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Building2, ClipboardList, Heart, LayoutGrid } from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutGrid,
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
    <aside className="w-[235px] shrink-0 border-[#e8e8f0] border-r bg-white px-5 py-8">
      <nav className="flex flex-col gap-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-[44px] items-center gap-3 rounded-[7px] px-4 font-bold text-[12px] transition ${active ? "!text-[#2c20c7] bg-[#f0edff]" : "!text-[#202449] hover:bg-[#f8f7ff]"}`}
            >
              <Icon size={18} strokeWidth={2} />

              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
