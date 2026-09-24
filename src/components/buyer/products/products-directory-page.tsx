"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Link from "next/link";

import {
  ChevronDown,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { Container } from "@/components/common/container";

import {
  getProducts,
  type ProductsPagination as ProductsPaginationData,
} from "@/lib/api/buyer-product-api";

import { mapApiProductToDirectoryProduct } from "@/lib/mappers/product-mapper";

import type { DirectoryProduct } from "@/types/product-directory";

import { ProductDirectoryCard } from "./product-directory-card";
import { ProductDirectoryTabs } from "./product-directory-tabs";
import { ProductsPagination } from "./products-pagination";

const PAGE_SIZE = 12;

interface ProductsDirectoryPageProps {
  companyId?: string;
  categorySlug?: string;
}

interface ProductTab {
  id: string;
  label: string;
}

export function ProductsDirectoryPage({
  companyId,
  categorySlug,
}: ProductsDirectoryPageProps) {
  const [products, setProducts] = useState<
    DirectoryProduct[]
  >([]);

  const [pagination, setPagination] =
    useState<ProductsPaginationData>({
      page: 1,
      limit: PAGE_SIZE,
      totalItems: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  const [activeTab, setActiveTab] =
    useState(categorySlug || "all");

  const [sortBy, setSortBy] =
    useState("relevance");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchProducts = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await getProducts(
            page,
            PAGE_SIZE,
          );

        const mappedProducts =
          response.data.products.map(
            mapApiProductToDirectoryProduct,
          );

        setProducts(mappedProducts);

        setPagination(
          response.data.pagination,
        );
      } catch (err) {
        console.error(
          "Failed to fetch products:",
          err,
        );

        setError(
          "Unable to load products. Please try again.",
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  /*
   * The current /products API does not expose
   * a company filter parameter.
   *
   * If companyId is provided, filter the products
   * already returned by the API.
   */
  const companyProducts = useMemo(() => {
    if (!companyId) {
      return products;
    }

    return products.filter(
      (product) =>
        product.companyId === companyId,
    );
  }, [products, companyId]);

  const companyName = useMemo(() => {
    if (!companyId) {
      return "";
    }

    return (
      companyProducts[0]?.company ||
      "this Company"
    );
  }, [companyId, companyProducts]);

  const availableTabs =
    useMemo<ProductTab[]>(() => {
      const uniqueCategories =
        Array.from(
          new Map(
            companyProducts
              .filter(
                (product) =>
                  product.categorySlug &&
                  product.categorySlug !==
                    "uncategorized",
              )
              .map((product) => [
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

  /*
   * Keep category from URL as the initial
   * selected tab.
   */
  useEffect(() => {
    setActiveTab(
      categorySlug || "all",
    );
  }, [categorySlug]);

  const filteredProducts =
    useMemo(() => {
      if (activeTab === "all") {
        return companyProducts;
      }

      return companyProducts.filter(
        (product) =>
          product.categorySlug ===
          activeTab,
      );
    }, [
      companyProducts,
      activeTab,
    ]);

  const sortedProducts =
    useMemo(() => {
      const sorted = [
        ...filteredProducts,
      ];

      switch (sortBy) {
        case "name-asc":
          return sorted.sort((a, b) =>
            a.name.localeCompare(
              b.name,
            ),
          );

        case "name-desc":
          return sorted.sort((a, b) =>
            b.name.localeCompare(
              a.name,
            ),
          );

        case "premium":
          return sorted.sort(
            (a, b) =>
              Number(
                Boolean(b.isPremium),
              ) -
              Number(
                Boolean(a.isPremium),
              ),
          );

        case "verified":
          return sorted.sort(
            (a, b) =>
              Number(
                Boolean(b.isVerified),
              ) -
              Number(
                Boolean(a.isVerified),
              ),
          );

        default:
          return sorted;
      }
    }, [filteredProducts, sortBy]);

  function handlePageChange(
    page: number,
  ) {
    if (
      page < 1 ||
      page > pagination.totalPages ||
      page === pagination.page
    ) {
      return;
    }

    fetchProducts(page);
  }

  return (
    <section className="bg-white py-4 sm:py-5">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 font-medium text-[#555a76] text-[9px] sm:text-[10px]">
          <Link
            href="/"
            className="transition hover:text-[#2118ad]"
          >
            Home
          </Link>

          <ChevronRight
            size={11}
            className="shrink-0 text-[#777b92]"
          />

          {companyId ? (
            <>
              <Link
                href="/companies"
                className="transition hover:text-[#2118ad]"
              >
                Companies
              </Link>

              <ChevronRight
                size={11}
                className="shrink-0 text-[#777b92]"
              />

              <Link
                href={`/companies/${companyId}`}
                className="max-w-[180px] truncate transition hover:text-[#2118ad] sm:max-w-none"
              >
                {companyName}
              </Link>

              <ChevronRight
                size={11}
                className="shrink-0 text-[#777b92]"
              />

              <span className="font-semibold text-[#2118ad]">
                Products
              </span>
            </>
          ) : (
            <span className="font-semibold text-[#2118ad]">
              Products
            </span>
          )}
        </div>

        {/* Heading + count */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="font-bold text-[#171570] text-[24px] leading-tight sm:text-[30px]">
              {companyId
                ? `Products from ${companyName}`
                : "Product Directory"}
            </h1>

            <p className="mt-1 max-w-[760px] text-[#4d526e] text-[9px] leading-[1.5] sm:text-[11px]">
              {companyId
                ? `Browse products offered by ${companyName}.`
                : "Browse air cooler products, components and services from verified suppliers across India."}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:w-auto lg:justify-end lg:gap-6">
            <p className="font-bold text-[#2118ad] text-[9px] sm:text-[10px]">
              {sortedProducts.length}{" "}
              {sortedProducts.length === 1
                ? "product"
                : "products"}{" "}
              found
            </p>

            <div className="flex w-full items-center gap-2 sm:w-auto">
              <span className="shrink-0 font-medium text-[#565b76] text-[9px]">
                Sort by:
              </span>

              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target.value,
                    )
                  }
                  className="h-[34px] w-full appearance-none rounded-[5px] border border-[#dedff0] bg-white px-3 pr-8 font-semibold text-[#29248c] text-[9px] outline-none sm:min-w-[145px]"
                >
                  <option value="relevance">
                    Relevance
                  </option>

                  <option value="premium">
                    Premium First
                  </option>

                  <option value="verified">
                    Verified First
                  </option>

                  <option value="name-asc">
                    Name A - Z
                  </option>

                  <option value="name-desc">
                    Name Z - A
                  </option>
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
        {!loading &&
          availableTabs.length > 1 && (
            <ProductDirectoryTabs
              tabs={availableTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )}

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-2 text-[#2116a5]">
              <Loader2 className="size-5 animate-spin" />

              <span className="font-medium text-[12px]">
                Loading products...
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="mt-5 flex min-h-[300px] flex-col items-center justify-center rounded-[8px] border border-[#e2e3ed] bg-white px-4 text-center">
            <p className="font-semibold text-[#15157d] text-[13px]">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                fetchProducts(
                  pagination.page,
                )
              }
              className="mt-3 rounded-[5px] bg-[#2116a5] px-4 py-2 font-semibold text-[10px] text-white hover:bg-[#3022c6]"
            >
              Try Again
            </button>
          </div>
        ) : sortedProducts.length > 0 ? (
          <>
            {/* Product Grid */}
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
              {sortedProducts.map(
                (product) => (
                  <ProductDirectoryCard
                    key={product.id}
                    product={product}
                    companyId={companyId}
                  />
                ),
              )}
            </div>

            {/* Pagination */}
            {pagination.totalPages >
              1 && (
              <ProductsPagination
                currentPage={
                  pagination.page
                }
                totalPages={
                  pagination.totalPages
                }
                onPageChange={
                  handlePageChange
                }
              />
            )}
          </>
        ) : (
          <div className="mt-4 flex min-h-[200px] items-center justify-center rounded-[8px] border border-[#e2e3ee] bg-[#fafaff] px-4 sm:min-h-[220px]">
            <div className="text-center">
              <p className="font-bold text-[#171570] text-[12px] sm:text-[13px]">
                No products found
              </p>

              <p className="mt-1 text-[#666b83] text-[9px] sm:text-[10px]">
                There are no products available in this category.
              </p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}