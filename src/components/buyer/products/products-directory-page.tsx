"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { ChevronDown, ChevronRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { directoryProducts } from "@/data/products-directory";

import { ProductDirectoryCard } from "./product-directory-card";
import { ProductDirectoryTabs } from "./product-directory-tabs";
import { ProductsPagination } from "./products-pagination";

interface ProductsDirectoryPageProps {
  companyId?: string;
  categorySlug?: string;
}

interface ProductTab {
  id: string;
  label: string;
}

export function ProductsDirectoryPage({ companyId, categorySlug }: ProductsDirectoryPageProps) {
  const [activeTab, setActiveTab] = useState(categorySlug || "all");
  const [sortBy, setSortBy] = useState("relevance");

  const isCompanyView = Boolean(companyId);

  const companyProducts = useMemo(() => {
    if (!companyId) {
      return directoryProducts;
    }

    return directoryProducts.filter((product) => product.companyId === companyId);
  }, [companyId]);

  const companyName = useMemo(() => {
    if (!companyId) {
      return "";
    }

    return companyProducts[0]?.company || "this Company";
  }, [companyId, companyProducts]);

  const availableTabs = useMemo<ProductTab[]>(() => {
    const uniqueCategories = Array.from(
      new Map(
        companyProducts.map((product) => [
          product.categorySlug,
          {
            id: product.categorySlug,
            label: product.category,
          },
        ]),
      ).values(),
    );

    return [
      {
        id: "all",
        label: "All Products",
      },
      ...uniqueCategories,
    ];
  }, [companyProducts]);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") {
      return companyProducts;
    }

    return companyProducts.filter((product) => product.categorySlug === activeTab);
  }, [companyProducts, activeTab]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (sortBy) {
      case "name-asc":
        return products.sort((a, b) => a.name.localeCompare(b.name));

      case "name-desc":
        return products.sort((a, b) => b.name.localeCompare(a.name));

      case "premium":
        return products.sort((a, b) => Number(Boolean(b.isPremium)) - Number(Boolean(a.isPremium)));

      case "verified":
        return products.sort((a, b) => Number(Boolean(b.isVerified)) - Number(Boolean(a.isVerified)));
      default:
        return products;
    }
  }, [filteredProducts, sortBy]);

  return (
    <section className="bg-white py-5">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-1.5 font-medium text-[#555a76] text-[10px]">
          <Link href="/" className="transition hover:text-[#2118ad]">
            Home
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          {isCompanyView ? (
            <>
              <Link href="/companies" className="transition hover:text-[#2118ad]">
                Companies
              </Link>

              <ChevronRight size={12} className="text-[#777b92]" />

              <Link href={`/companies/${companyId}`} className="transition hover:text-[#2118ad]">
                {companyName}
              </Link>

              <ChevronRight size={12} className="text-[#777b92]" />

              <span className="font-semibold text-[#2118ad]">Products</span>
            </>
          ) : (
            <span className="font-semibold text-[#2118ad]">Products</span>
          )}
        </div>

        {/* Heading */}
        <div className="flex items-end justify-between gap-5">
          <div>
            <h1 className="font-bold text-[#171570] text-[30px] leading-tight">
              {isCompanyView ? `Products from ${companyName}` : "Product Directory"}
            </h1>

            <p className="mt-1 text-[#4d526e] text-[11px]">
              {isCompanyView
                ? `Browse products offered by ${companyName}.`
                : "Browse air cooler products, components and services from verified suppliers across India."}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <p className="font-bold text-[#2118ad] text-[10px]">
              {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"} found
            </p>

            <div className="flex items-center gap-2">
              <span className="font-medium text-[#565b76] text-[9px]">Sort by:</span>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-[34px] min-w-[145px] appearance-none rounded-[5px] border border-[#dedff0] bg-white px-3 pr-8 font-semibold text-[#29248c] text-[9px] outline-none"
                >
                  <option value="relevance">Relevance</option>

                  <option value="premium">Premium First</option>

                  <option value="verified">Verified First</option>

                  <option value="name-asc">Name A - Z</option>

                  <option value="name-desc">Name Z - A</option>
                </select>

                <ChevronDown
                  size={12}
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#29248c]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ProductDirectoryTabs tabs={availableTabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="mt-3 grid grid-cols-5 gap-3">
            {sortedProducts.map((product) => (
              <ProductDirectoryCard key={product.id} product={product} companyId={companyId} />
            ))}
          </div>
        ) : (
          <div className="mt-4 flex min-h-[220px] items-center justify-center rounded-[8px] border border-[#e2e3ee] bg-[#fafaff]">
            <div className="text-center">
              <p className="font-bold text-[#171570] text-[13px]">No products found</p>

              <p className="mt-1 text-[#666b83] text-[10px]">There are no products available in this category.</p>
            </div>
          </div>
        )}

        {sortedProducts.length > 0 && <ProductsPagination />}
      </Container>
    </section>
  );
}
