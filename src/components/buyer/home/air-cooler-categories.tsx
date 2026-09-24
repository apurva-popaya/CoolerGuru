"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ChevronRight,
  Cog,
  Factory,
} from "lucide-react";

import { Container } from "@/components/common/container";
import {
  getAirCoolerCategories,
  getCategoryChildren,
  type Category,
} from "@/lib/api/categories-api";

import { airCoolerCategoryUI } from "@/data/buyer/categories";

interface CategoryGroup {
  category: Category;
  subcategories: Category[];
}

/* -------------------------------------------------------------------------- */
/* UI configuration types                                                     */
/* -------------------------------------------------------------------------- */

type CategoryUIConfig = {
  icon: "cooler" | "component" | "electrical";
  images: readonly string[];
};

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export function AirCoolerCategories() {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        setLoading(true);

        /* -------------------------------------------------------------- */
        /* Get Air Cooler parent categories                               */
        /* -------------------------------------------------------------- */

        const response = await getAirCoolerCategories();

        const parentCategories = response.data.categories
          .filter((category) => category.is_active)
          .sort((a, b) => a.sort_order - b.sort_order)
          .slice(0, 3);

        /* -------------------------------------------------------------- */
        /* Get subcategories for each parent category                    */
        /* -------------------------------------------------------------- */

        const categoryGroups = await Promise.all(
          parentCategories.map(async (category) => {
            try {
              const childrenResponse =
                await getCategoryChildren(category.slug);

              const subcategories = childrenResponse.data.categories
                .filter((subcategory) => subcategory.is_active)
                .sort(
                  (a, b) =>
                    a.sort_order - b.sort_order,
                );

              return {
                category,
                subcategories,
              };
            } catch (error) {
              console.error(
                `Failed to fetch subcategories for ${category.slug}:`,
                error,
              );

              return {
                category,
                subcategories: [],
              };
            }
          }),
        );

        if (!cancelled) {
          setGroups(categoryGroups);
        }
      } catch (error) {
        console.error(
          "Failed to fetch Air Cooler categories:",
          error,
        );

        if (!cancelled) {
          setGroups([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-white py-4 sm:py-5">
      <Container>
        <h2 className="mb-4 px-2 text-center font-bold text-[#16179c] text-[20px] leading-[1.2] sm:text-[24px]">
          Explore the Air Cooler Industry
        </h2>

        {loading ? (
          <CategorySkeleton />
        ) : groups.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
            {groups.map((group) => (
              <CategoryCard
                key={group.category.category_id}
                category={group.category}
                subcategories={group.subcategories}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[10px] border border-[#e3e4ef] bg-white p-6 text-center text-[#666b82] text-sm">
            No categories available.
          </div>
        )}
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Category Card                                                              */
/* -------------------------------------------------------------------------- */

function CategoryCard({
  category,
  subcategories,
}: {
  category: Category;
  subcategories: Category[];
}) {
  /*
   * category.slug comes from the API and is typed as string.
   * airCoolerCategoryUI only contains our 3 configured slugs.
   *
   * Casting the key here tells TypeScript that we are intentionally
   * looking up one of those configured UI entries.
   */

  const uiConfig =
    airCoolerCategoryUI[
      category.slug as keyof typeof airCoolerCategoryUI
    ] as CategoryUIConfig | undefined;

  const images: readonly string[] =
    uiConfig?.images ?? [];

  const iconType: CategoryUIConfig["icon"] =
    uiConfig?.icon ?? "component";

  return (
    <div className="min-w-0 rounded-[10px] border border-[#e3e4ef] bg-white px-3 py-4 sm:px-5">
      <div className="grid grid-cols-[82px_minmax(0,1fr)] gap-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-4 md:grid-cols-[110px_minmax(0,1fr)]">

        {/* ---------------------------------------------------------------- */}
        {/* Images                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex flex-col items-center justify-start gap-2 pt-5 sm:gap-3 sm:pt-8">
          {images.length > 0 ? (
            images.map((image: string) => (
              <CategoryImage
                key={image}
                src={image}
                alt={category.name}
                count={images.length}
              />
            ))
          ) : (
            <div className="flex h-[120px] w-[75px] items-center justify-center text-[#2420c2]">
              <Factory
                size={42}
                strokeWidth={1.5}
              />
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Content                                                          */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex min-w-0 flex-col">

          {/* Category heading */}
          <div className="mb-3 flex min-w-0 items-start gap-2">
            <CategoryIcon type={iconType} />

            <h3 className="min-w-0 font-bold text-[#2018ad] text-[13px] leading-tight sm:text-[14px]">
              {category.name}
            </h3>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Subcategories from API                                           */}
          {/* ---------------------------------------------------------------- */}

          <div className="flex flex-col gap-2">
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory.category_id}
                href={`/category/${category.slug}/${subcategory.slug}`}
                className="flex min-w-0 items-start gap-1.5 font-medium text-[#2420c2] text-[10px] leading-[1.35] transition hover:text-[#171176] sm:gap-2 sm:text-[11px]"
              >
                <ChevronRight
                  size={12}
                  strokeWidth={2.5}
                  className="mt-px shrink-0"
                />

                <span className="min-w-0">
                  {subcategory.name}
                </span>
              </Link>
            ))}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Explore All                                                      */}
          {/* ---------------------------------------------------------------- */}

          <Link
            href={`/category/${category.slug}`}
            className="mt-3 inline-flex items-center gap-1.5 font-bold text-[#2218ad] text-[10px] transition hover:text-[#3a2dd7] sm:gap-2 sm:text-[11px]"
          >
            Explore All

            <ArrowRight
              size={13}
              className="sm:h-[14px] sm:w-[14px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Category Image                                                             */
/* -------------------------------------------------------------------------- */

function CategoryImage({
  src,
  alt,
  count,
}: {
  src: string;
  alt: string;
  count: number;
}) {
  const sizeClass =
    count === 1
      ? "h-[150px] w-[72px] sm:h-[190px] sm:w-[95px] md:h-[210px] md:w-[110px]"
      : count === 2
        ? "h-[78px] w-[75px] sm:h-[95px] sm:w-[95px] md:h-[105px] md:w-[105px]"
        : "h-[65px] w-[72px] sm:h-[78px] sm:w-[90px] md:h-[85px] md:w-[100px]";

  return (
    <div className={`relative ${sizeClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="120px"
        className="object-contain"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Category Icon                                                              */
/* -------------------------------------------------------------------------- */

function CategoryIcon({
  type,
}: {
  type: "cooler" | "component" | "electrical";
}) {
  const className =
    "mt-px shrink-0 text-[#2420c2]";

  if (type === "cooler") {
    return (
      <Factory
        size={18}
        className={className}
      />
    );
  }

  if (type === "electrical") {
    return (
      <Cog
        size={18}
        className={className}
      />
    );
  }

  return (
    <Cog
      size={18}
      className={className}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Loading Skeleton                                                           */
/* -------------------------------------------------------------------------- */

function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="min-h-[280px] animate-pulse rounded-[10px] border border-[#e3e4ef] bg-white px-3 py-4 sm:px-5"
        >
          <div className="grid grid-cols-[82px_minmax(0,1fr)] gap-3 sm:grid-cols-[100px_minmax(0,1fr)]">
            <div className="h-[150px] w-[72px] rounded-lg bg-[#f0f0f5]" />

            <div>
              <div className="mb-5 h-4 w-36 rounded bg-[#f0f0f5]" />

              <div className="space-y-3">
                <div className="h-3 w-40 rounded bg-[#f0f0f5]" />
                <div className="h-3 w-32 rounded bg-[#f0f0f5]" />
                <div className="h-3 w-36 rounded bg-[#f0f0f5]" />
                <div className="h-3 w-28 rounded bg-[#f0f0f5]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}