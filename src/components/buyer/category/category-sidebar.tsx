import Link from "next/link";

import { Boxes, Building2, Cog, Factory, Fan, Package, Power, Settings } from "lucide-react";

interface SidebarItem {
  slug: string;
  label: string;
  icon: "manufacturer" | "body" | "component" | "electrical" | "factory" | "material" | "machinery" | "oem";
}

const sidebarItems: SidebarItem[] = [
  {
    slug: "air-cooler-manufacturers",
    label: "Air Cooler Manufacturers",
    icon: "manufacturer",
  },
  {
    slug: "cooler-body-manufacturers",
    label: "Cooler Body Manufacturers",
    icon: "body",
  },
  {
    slug: "air-cooler-components",
    label: "Air Cooler Components",
    icon: "component",
  },
  {
    slug: "electrical-components",
    label: "Electrical Components",
    icon: "electrical",
  },
  {
    slug: "production-facility-manufacturers",
    label: "Production Facility Manufacturers",
    icon: "factory",
  },
  {
    slug: "raw-material-suppliers",
    label: "Raw Material Suppliers",
    icon: "material",
  },
  {
    slug: "machinery-suppliers",
    label: "Machinery Suppliers",
    icon: "machinery",
  },
  {
    slug: "oem-contract-manufacturing",
    label: "OEM & Contract Manufacturing",
    icon: "oem",
  },
];

interface CategorySidebarProps {
  activeSlug: string;
}

export function CategorySidebar({ activeSlug }: CategorySidebarProps) {
  return (
    <aside className="rounded-[10px] border border-[#e2e3ef] bg-white p-2">
      <div className="flex flex-col gap-1">
        {sidebarItems.map((item) => {
          const active = item.slug === activeSlug;

          return (
            <Link
              key={item.slug}
              href={`/category/${item.slug}`}
              className={`flex min-h-[43px] items-center gap-3 rounded-[7px] px-3 py-2 font-semibold text-[11px] leading-[1.25] transition ${
                active ? "bg-[#f0edff] text-[#251bc1]" : "text-[#222660] hover:bg-[#f7f7ff]"
              }`}
            >
              <SidebarIcon type={item.icon} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

function SidebarIcon({ type }: { type: SidebarItem["icon"] }) {
  const className = "shrink-0 text-[#2d26bd]";

  switch (type) {
    case "manufacturer":
      return <Factory size={17} className={className} />;

    case "body":
      return <Fan size={17} className={className} />;

    case "component":
      return <Cog size={17} className={className} />;

    case "electrical":
      return <Power size={17} className={className} />;

    case "factory":
      return <Building2 size={17} className={className} />;

    case "material":
      return <Package size={17} className={className} />;

    case "machinery":
      return <Settings size={17} className={className} />;

    case "oem":
      return <Boxes size={17} className={className} />;
  }
}
