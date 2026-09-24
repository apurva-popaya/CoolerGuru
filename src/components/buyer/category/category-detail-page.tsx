"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Container } from "@/components/common/container";

import {
  getAirCoolerCategories,
  getCategoryChildren,
  type Category,
} from "@/lib/api/categories-api";

import {
  airCoolerCategoryUI,
} from "@/data/buyer/categories";

import { CategoryHero } from "./category-hero";
import { CategorySidebar } from "./category-sidebar";
import { SubcategoryCard } from "./subcategory-card";

import type {
  CategoryDetail,
  CategorySubcategory,
} from "@/types/category-detail";

interface CategoryDetailPageProps {
  categorySlug: string;
}

export function CategoryDetailPage({
  categorySlug,
}: CategoryDetailPageProps) {
  const [category, setCategory] =
    useState<CategoryDetail | null>(null);

  const [sidebarCategories, setSidebarCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCategoryPage() {
      try {
        setLoading(true);
        setError(null);

        /* -------------------------------------------------------------- */
        /* Get ALL Air Cooler categories for sidebar                       */
        /* -------------------------------------------------------------- */

        const categoriesResponse =
          await getAirCoolerCategories();

        const allCategories =
          categoriesResponse.data.categories
            .filter(
              (item) => item.is_active,
            )
            .sort(
              (a, b) =>
                a.sort_order - b.sort_order,
            );

        /* -------------------------------------------------------------- */
        /* Find current category                                          */
        /* -------------------------------------------------------------- */

        const currentCategory =
          allCategories.find(
            (item) =>
              item.slug === categorySlug,
          );

        if (!currentCategory) {
          throw new Error(
            "Category not found.",
          );
        }

        /* -------------------------------------------------------------- */
        /* Get current category's subcategories                           */
        /* -------------------------------------------------------------- */

        const childrenResponse =
          await getCategoryChildren(
            categorySlug,
          );

        const subcategories =
          childrenResponse.data.categories
            .filter(
              (item) => item.is_active,
            )
            .sort(
              (a, b) =>
                a.sort_order - b.sort_order,
            );

        /* -------------------------------------------------------------- */
        /* Get UI configuration                                           */
        /* -------------------------------------------------------------- */

        const uiConfig =
          airCoolerCategoryUI[
            categorySlug as keyof typeof airCoolerCategoryUI
          ];

        const heroImage =
          uiConfig?.images?.[0] ?? null;

        /* -------------------------------------------------------------- */
        /* Convert API subcategories into UI format                       */
        /* -------------------------------------------------------------- */

        const formattedSubcategories: CategorySubcategory[] =
          subcategories.map(
            (subcategory) => ({
              id: String(
                subcategory.category_id,
              ),

              title: subcategory.name,

              description:
                subcategory.description ??
                "",

              image:
                subcategory.image,

              href: `/category/${categorySlug}/${subcategory.slug}`,
            }),
          );

        /* -------------------------------------------------------------- */
        /* Create category detail                                         */
        /* -------------------------------------------------------------- */

        const categoryDetail: CategoryDetail = {
          categoryId:
            currentCategory.category_id,

          slug: currentCategory.slug,

          title: currentCategory.name,

          description:
            currentCategory.description ??
            "",

          sidebarLabel:
            currentCategory.name,

          heroImage,

          heroDescription:
            currentCategory.description ??
            "",

          subcategoryCount:
            formattedSubcategories.length,

          subcategories:
            formattedSubcategories,
        };

        if (!cancelled) {
          setSidebarCategories(
            allCategories,
          );

          setCategory(
            categoryDetail,
          );
        }
      } catch (error) {
        console.error(
          "Failed to load category page:",
          error,
        );

        if (!cancelled) {
          setCategory(null);

          setSidebarCategories([]);

          setError(
            error instanceof Error
              ? error.message
              : "Failed to load category.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCategoryPage();

    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  /* -------------------------------------------------------------------- */
  /* Loading                                                              */
  /* -------------------------------------------------------------------- */

  if (loading) {
    return (
      <section className="bg-white py-4 sm:py-5">
        <Container>
          <CategoryPageSkeleton />
        </Container>
      </section>
    );
  }

  /* -------------------------------------------------------------------- */
  /* Error                                                                */
  /* -------------------------------------------------------------------- */

  if (error || !category) {
    return (
      <section className="bg-white py-4 sm:py-5">
        <Container>
          <div className="rounded-[10px] border border-[#e3e4ef] bg-white p-8 text-center">
            <h1 className="font-bold text-[#171570] text-lg">
              Category not found
            </h1>

            <p className="mt-2 text-[#666b82] text-sm">
              {error ??
                "The requested category could not be found."}
            </p>

            <Link
              href="/"
              className="mt-4 inline-flex rounded-md bg-[#251bc1] px-4 py-2 font-semibold text-white text-sm"
            >
              Back to Home
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  /* -------------------------------------------------------------------- */
  /* Page                                                                  */
  /* -------------------------------------------------------------------- */

  return (
    <section className="bg-white py-4 sm:py-5">
      <Container>
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[220px_1fr] lg:gap-8">

          {/* ------------------------------------------------------------ */}
          {/* Sidebar                                                       */}
          {/* ------------------------------------------------------------ */}

          <CategorySidebar
            categories={sidebarCategories}
            activeSlug={category.slug}
          />

          {/* ------------------------------------------------------------ */}
          {/* Main Content                                                   */}
          {/* ------------------------------------------------------------ */}

          <div className="min-w-0">

            {/* Breadcrumb */}
            <div className="mb-2 flex min-w-0 items-center gap-1.5 overflow-hidden font-medium text-[#555a76] text-[10px]">
              <Link
                href="/"
                className="shrink-0 transition hover:text-[#2118ad]"
              >
                Home
              </Link>

              <ChevronRight
                size={12}
                className="shrink-0 text-[#777b92]"
              />

              <span className="truncate font-semibold text-[#2118ad]">
                {category.title}
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-bold text-[#171570] text-[25px] leading-tight sm:text-[28px] md:text-[32px]">
              {category.title}
            </h1>

            {/* Description */}
            {category.description && (
              <p className="mt-1 text-[#4d526e] text-[11px] leading-relaxed sm:text-[12px]">
                {category.description}
              </p>
            )}

            {/* Hero */}
            <CategoryHero
              title={category.title}
              image={category.heroImage}
              description={
                category.heroDescription
              }
              count={
                category.subcategoryCount
              }
            />

            {/* ---------------------------------------------------------- */}
            {/* Subcategories                                                */}
            {/* ---------------------------------------------------------- */}

            {category.subcategories.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4">
                {category.subcategories.map(
                  (subcategory) => (
                    <SubcategoryCard
                      key={subcategory.id}
                      subcategory={
                        subcategory
                      }
                    />
                  ),
                )}
              </div>
            ) : (
              <div className="mt-4 rounded-[10px] border border-[#e3e4ef] bg-white p-8 text-center text-[#666b82] text-sm">
                No subcategories available.
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Loading Skeleton                                                           */
/* -------------------------------------------------------------------------- */

function CategoryPageSkeleton() {
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[220px_1fr] lg:gap-8">

      {/* Sidebar */}
      <div className="hidden rounded-[10px] border border-[#e2e3ef] bg-white p-2 lg:block">
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(
            (item) => (
              <div
                key={item}
                className="h-[43px] animate-pulse rounded-[7px] bg-[#f0f0f5]"
              />
            ),
          )}
        </div>
      </div>

      {/* Main */}
      <div className="min-w-0">

        {/* Breadcrumb */}
        <div className="h-3 w-32 animate-pulse rounded bg-[#f0f0f5]" />

        {/* Heading */}
        <div className="mt-4 h-8 w-64 animate-pulse rounded bg-[#f0f0f5]" />

        {/* Description */}
        <div className="mt-2 h-4 w-96 max-w-full animate-pulse rounded bg-[#f0f0f5]" />

        {/* Hero */}
        <div className="mt-4 h-[150px] animate-pulse rounded-[10px] bg-[#f0f0f5]" />

        {/* Cards */}
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map(
            (item) => (
              <div
                key={item}
                className="h-[220px] animate-pulse rounded-[8px] bg-[#f0f0f5]"
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}