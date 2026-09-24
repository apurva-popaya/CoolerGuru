"use client";

import Link from "next/link";

import {
  Boxes,
  Building2,
  ChevronDown,
  Cog,
  Factory,
  Fan,
  Package,
  Power,
  Settings,
} from "lucide-react";

import type { Category } from "@/lib/api/categories-api";

interface CategorySidebarProps {
  categories: Category[];
  activeSlug: string;
}

export function CategorySidebar({
  categories,
  activeSlug,
}: CategorySidebarProps) {
  const activeItem =
    categories.find(
      (category) => category.slug === activeSlug,
    ) ?? categories[0];

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Desktop Sidebar                                                  */}
      {/* ---------------------------------------------------------------- */}

      <aside className="hidden rounded-[10px] border border-[#e2e3ef] bg-white p-2 lg:block">
        <div className="flex flex-col gap-1">
          {categories.map((category) => {
            const active =
              category.slug === activeSlug;

            return (
              <Link
                key={category.category_id}
                href={`/category/${category.slug}`}
                className={`flex min-h-[43px] items-center gap-3 rounded-[7px] px-3 py-2 font-semibold text-[11px] leading-[1.25] transition ${
                  active
                    ? "bg-[#f0edff] text-[#251bc1]"
                    : "text-[#222660] hover:bg-[#f7f7ff]"
                }`}
              >
                <SidebarIcon
                  slug={category.slug}
                />

                <span>{category.name}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* ---------------------------------------------------------------- */}
      {/* Mobile / Tablet Category Selector                                */}
      {/* ---------------------------------------------------------------- */}

      <details className="group rounded-[9px] border border-[#e2e3ef] bg-white lg:hidden">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-2.5 font-bold text-[#2118ad] text-[11px] [&::-webkit-details-marker]:hidden">
          <div className="flex min-w-0 items-center gap-2.5">
            {activeItem ? (
              <>
                <SidebarIcon
                  slug={activeItem.slug}
                />

                <span className="truncate">
                  {activeItem.name}
                </span>
              </>
            ) : (
              <span className="truncate">
                Air Cooler Categories
              </span>
            )}
          </div>

          <ChevronDown
            size={16}
            className="shrink-0 text-[#2920c3] transition-transform group-open:rotate-180"
          />
        </summary>

        <div className="border-[#e8e8f1] border-t px-2 py-2">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {categories.map((category) => {
              const active =
                category.slug === activeSlug;

              return (
                <Link
                  key={category.category_id}
                  href={`/category/${category.slug}`}
                  className={`flex min-h-[40px] items-center gap-2.5 rounded-[6px] px-3 py-2 font-semibold text-[10px] ${
                    active
                      ? "bg-[#f0edff] text-[#251bc1]"
                      : "text-[#222660] hover:bg-[#f7f7ff]"
                  }`}
                >
                  <SidebarIcon
                    slug={category.slug}
                  />

                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </details>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar Icon                                                               */
/* -------------------------------------------------------------------------- */

function SidebarIcon({
  slug,
}: {
  slug: string;
}) {
  const className =
    "shrink-0 text-[#2d26bd]";

  switch (slug) {
    case "air-cooler-manufacturers":
      return (
        <Factory
          size={17}
          className={className}
        />
      );

    case "cooler-body-manufacturers":
      return (
        <Fan
          size={17}
          className={className}
        />
      );

    case "air-cooler-components":
      return (
        <Cog
          size={17}
          className={className}
        />
      );

    case "electrical-components":
      return (
        <Power
          size={17}
          className={className}
        />
      );

    case "production-facility-manufacturers":
      return (
        <Building2
          size={17}
          className={className}
        />
      );

    case "raw-material-suppliers":
      return (
        <Package
          size={17}
          className={className}
        />
      );

    case "machinery-suppliers":
      return (
        <Settings
          size={17}
          className={className}
        />
      );

    case "oem-contract-manufacturing":
      return (
        <Boxes
          size={17}
          className={className}
        />
      );

    default:
      return (
        <Factory
          size={17}
          className={className}
        />
      );
  }
}