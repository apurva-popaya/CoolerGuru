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

export function SubcategoryDetailPage({ subcategory }: SubcategoryDetailPageProps) {
  const [activeTab, setActiveTab] = useState<"products" | "companies">("products");

  const parentCategory = categoryDetails.find((category) => category.slug === subcategory.categorySlug);

  return (
    <section className="bg-white py-6">
      <Container>
        {/* Breadcrumb */}

        <div className="mb-3 flex items-center gap-1.5 font-medium text-[#555a76] text-[10px]">
          <Link href="/" className="transition hover:text-[#2118ad]">
            Home
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          <Link href={`/category/${subcategory.categorySlug}`} className="transition hover:text-[#2118ad]">
            {parentCategory?.title ?? "Category"}
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          <span className="font-semibold text-[#2118ad]">{subcategory.title}</span>
        </div>

        {/* Header */}

        <div className="flex items-start justify-between gap-5">
          <div>
            <h1 className="mt-1 font-bold text-[#171570] text-[30px] leading-tight">{subcategory.title}</h1>

            <p className="mt-1.5 text-[#4d526e] text-[11px]">{subcategory.description}</p>
          </div>

          <button
            type="button"
            className="mt-5 flex h-[38px] items-center gap-2 rounded-[5px] border border-[#dedff0] bg-white px-4 font-bold text-[#2519c9] text-[10px] transition hover:bg-[#f7f6ff]"
          >
            <Share2 size={14} />
            Share Category
          </button>
        </div>

        <SubcategoryStats
          productCount={subcategory.productCount}
          companyCount={subcategory.companyCount}
          monthlySearches={subcategory.monthlySearches}
        />

        <div className="mt-5">
          <SubcategoryTabs
            productCount={subcategory.productCount}
            companyCount={subcategory.companyCount}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "products" && (
            <>
              <div className="rounded-b-[8px] border border-[#e2e3ee] bg-[#fdfdff] px-4 pt-4 pb-5">
                <ResultsToolbar
                  text={`Showing 1–${subcategory.products.length} of ${subcategory.productCount.replace("+", "")} products`}
                />

                <div className="grid grid-cols-4 gap-4">
                  {subcategory.products.map((product) => (
                    <SubcategoryProductCard key={product.id} product={product} />
                  ))}
                </div>

                <div className="mt-5 flex justify-center">
                  <Link
                    href={`/search?category=${subcategory.slug}`}
                    className="flex h-[36px] min-w-[280px] items-center justify-center rounded-[5px] border border-[#3828dc] px-5 font-bold text-[#251bb4] text-[10px] transition hover:bg-[#f5f4ff]"
                  >
                    View All Products ({subcategory.productCount.replace("+", "")})
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="font-bold text-[#171570] text-[18px]">Top Companies in {subcategory.title}</h2>

                <p className="mt-1 text-[#555a77] text-[9px]">
                  Showing 1–
                  {subcategory.companies.length} of {subcategory.companyCount.replace("+", "")} companies
                </p>

                <div className="mt-3 grid grid-cols-4 gap-4">
                  {subcategory.companies.map((company) => (
                    <SubcategoryCompanyCard key={company.id} company={company} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "companies" && (
            <div className="rounded-b-[8px] border border-[#e2e3ee] bg-[#fdfdff] px-4 pt-4 pb-5">
              <ResultsToolbar
                text={`Showing 1–${subcategory.companies.length} of ${subcategory.companyCount.replace("+", "")} companies`}
              />

              <div className="grid grid-cols-4 gap-4">
                {subcategory.companies.map((company) => (
                  <SubcategoryCompanyCard key={company.id} company={company} />
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
    <div className="mb-4 flex items-center justify-between">
      <p className="text-[#434866] text-[10px]">{text}</p>

      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#424765] text-[10px]">Sort by:</span>

        <button
          type="button"
          className="flex h-[34px] min-w-[112px] items-center justify-between gap-3 rounded-[5px] border border-[#dedff0] bg-white px-3 font-semibold text-[#29248c] text-[9px]"
        >
          Relevance
          <ChevronDown size={12} />
        </button>
      </div>
    </div>
  );
}
