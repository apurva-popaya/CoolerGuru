"use client";

import { useState } from "react";

import Link from "next/link";

import { ChevronDown, ChevronRight, Share2 } from "lucide-react";

import { Container } from "@/components/common/container";
import { categoryDetails } from "@/data/category-details";
import type { SubcategoryDetail } from "@/types/subcategory-detail";

import { SubcategoryCompanyCard } from "./subcategory-company-card";
import { SubcategoryProductCard } from "./subcategory-product-card";
import { SubcategoryStats } from "./subcategory-stats";
import { SubcategoryTabs } from "./subcategory-tabs";

interface SubcategoryDetailPageProps {
  subcategory: SubcategoryDetail;
}

export function SubcategoryDetailPage({
  subcategory,
}: SubcategoryDetailPageProps) {
  const [activeTab, setActiveTab] = useState<"products" | "companies">(
    "products",
  );

  const parentCategory = categoryDetails.find(
    (category) => category.slug === subcategory.categorySlug,
  );

  return (
    <section className="bg-white py-4 sm:py-6">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-3 flex min-w-0 items-center gap-1.5 overflow-hidden font-medium text-[#555a76] text-[9px] sm:text-[10px]">
          <Link
            href="/"
            className="shrink-0 transition hover:text-[#2118ad]"
          >
            Home
          </Link>

          <ChevronRight size={12} className="shrink-0 text-[#777b92]" />

          <Link
            href={`/category/${subcategory.categorySlug}`}
            className="min-w-0 max-w-[35%] truncate transition hover:text-[#2118ad] sm:max-w-none"
          >
            {parentCategory?.title ?? "Category"}
          </Link>

          <ChevronRight size={12} className="shrink-0 text-[#777b92]" />

          <span className="min-w-0 truncate font-semibold text-[#2118ad]">
            {subcategory.title}
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
          <div className="min-w-0">
            <h1 className="font-bold text-[#171570] text-[24px] leading-tight sm:text-[28px] lg:text-[30px]">
              {subcategory.title}
            </h1>

            <p className="mt-1.5 max-w-[850px] text-[#4d526e] text-[10px] leading-relaxed sm:text-[11px]">
              {subcategory.description}
            </p>
          </div>

          <button
            type="button"
            className="flex h-[36px] w-full shrink-0 items-center justify-center gap-2 rounded-[5px] border border-[#dedff0] bg-white px-4 font-bold text-[#2519c9] text-[10px] transition hover:bg-[#f7f6ff] sm:mt-1 sm:w-auto"
          >
            <Share2 size={14} />
            Share Category
          </button>
        </div>

        {/* Stats */}
        <SubcategoryStats
          productCount={subcategory.productCount}
          companyCount={subcategory.companyCount}
          monthlySearches={subcategory.monthlySearches}
        />

        {/* Tabs + Results */}
        <div className="mt-5">
          <SubcategoryTabs
            productCount={subcategory.productCount}
            companyCount={subcategory.companyCount}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "products" && (
            <>
              <div className="rounded-b-[8px] border border-[#e2e3ee] bg-[#fdfdff] px-3 pt-3 pb-4 sm:px-4 sm:pt-4 sm:pb-5">
                <ResultsToolbar
                  text={`Showing 1–${subcategory.products.length} of ${subcategory.productCount.replace("+", "")} products`}
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
                  {subcategory.products.map((product) => (
                    <SubcategoryProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

                <div className="mt-5 flex justify-center">
                  <Link
                    href={`/search?category=${subcategory.slug}`}
                    className="flex h-[36px] w-full max-w-[320px] items-center justify-center rounded-[5px] border border-[#3828dc] px-4 font-bold text-[#251bb4] text-[9px] transition hover:bg-[#f5f4ff] sm:text-[10px]"
                  >
                    View All Products (
                    {subcategory.productCount.replace("+", "")})
                  </Link>
                </div>
              </div>

              {/* Companies */}
              <div className="mt-6">
                <h2 className="font-bold text-[#171570] text-[17px] sm:text-[18px]">
                  Top Companies in {subcategory.title}
                </h2>

                <p className="mt-1 text-[#555a77] text-[9px]">
                  Showing 1–{subcategory.companies.length} of{" "}
                  {subcategory.companyCount.replace("+", "")} companies
                </p>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
                  {subcategory.companies.map((company) => (
                    <SubcategoryCompanyCard
                      key={company.id}
                      company={company}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "companies" && (
            <div className="rounded-b-[8px] border border-[#e2e3ee] bg-[#fdfdff] px-3 pt-3 pb-4 sm:px-4 sm:pt-4 sm:pb-5">
              <ResultsToolbar
                text={`Showing 1–${subcategory.companies.length} of ${subcategory.companyCount.replace("+", "")} companies`}
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
                {subcategory.companies.map((company) => (
                  <SubcategoryCompanyCard
                    key={company.id}
                    company={company}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function ResultsToolbar({ text }: { text: string }) {
  return (
    <div className="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[#434866] text-[9px] sm:text-[10px]">
        {text}
      </p>

      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#424765] text-[9px] sm:text-[10px]">
          Sort by:
        </span>

        <button
          type="button"
          className="flex h-[32px] min-w-[105px] items-center justify-between gap-3 rounded-[5px] border border-[#dedff0] bg-white px-3 font-semibold text-[#29248c] text-[9px]"
        >
          Relevance
          <ChevronDown size={12} />
        </button>
      </div>
    </div>
  );
}