"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Plus, ShieldAlert } from "lucide-react";

import { useDebounce } from "@/hooks/use-debounce";
import { ApiError } from "@/lib/api/api-client";
import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import {
  type GetSellerProductsParams,
  getCategoryTree,
  getLeafCategories,
  getSellerProducts,
  type Pagination,
  type SellerProduct,
  type SellerProductsSummary,
} from "@/lib/api/seller-products-api";

import { ProductsStats } from "./products-stats";
import { type ProductsTableFilters, ProductsTable } from "./products-table";

const initialFilters: ProductsTableFilters = {
  search: "",
  categoryId: "all",
  status: "ALL",
  stockStatus: "ALL",
  page: 1,
  limit: 10,
};

export function SupplierManageProductsPage() {
  const [filters, setFilters] = useState<ProductsTableFilters>(initialFilters);

  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [summary, setSummary] = useState<SellerProductsSummary | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<{ id: number; label: string }[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);

  const debouncedSearch = useDebounce(filters.search, 400);

  useEffect(() => {
    getCategoryTree()
      .then((tree) => setCategoryOptions(getLeafCategories(tree)))
      .catch(() => setCategoryOptions([]));
  }, []);

  useEffect(() => {
    let isCurrent = true;

    const params: GetSellerProductsParams = {
      search: debouncedSearch,
      category_id: filters.categoryId === "all" ? undefined : filters.categoryId,
      status: filters.status,
      stock_status: filters.stockStatus,
      page: filters.page,
      limit: filters.limit,
    };

    setIsLoading(true);
    setError(null);

    getSellerProducts(params)
      .then((response) => {
        if (!isCurrent) return;

        setProducts(response.data?.products ?? []);
        setSummary(response.data?.summary ?? null);
        setPagination(response.data?.pagination ?? null);
      })
      .catch((requestError) => {
        if (!isCurrent) return;

        // 403 = company not created / not verified yet.
        if (requestError instanceof ApiError && requestError.status === 403) {
          setBlockedMessage(requestError.message);
          return;
        }

        setError(getApiErrorMessage(requestError));
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [debouncedSearch, filters.categoryId, filters.status, filters.stockStatus, filters.page, filters.limit]);

  const updateFilters = (changes: Partial<ProductsTableFilters>) => {
    setFilters((previous) => ({
      ...previous,
      ...changes,
      // Any filter change (other than paging) starts again from page 1.
      page: changes.page ?? 1,
    }));
  };

  if (blockedMessage) {
    return (
      <section className="px-7 py-6">
        <h1 className="font-bold text-[#171570] text-[28px]">Manage Products</h1>

        <div className="mt-5 flex items-center justify-between gap-5 rounded-[9px] border border-[#f2c694] bg-[#fffaf5] px-5 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#fff0df] text-[#ea6a17]">
              <ShieldAlert size={22} />
            </div>

            <div>
              <h2 className="font-bold text-[#171570] text-[12px]">Products are locked</h2>
              <p className="mt-1 text-[#555b76] text-[9px]">
                {blockedMessage} You can add products once your company profile is verified.
              </p>
            </div>
          </div>

          <Link
            href="/supplier/dashboard/company-profile"
            className="!text-white flex h-[36px] shrink-0 items-center rounded-[5px] bg-[#2619bd] px-4 font-bold text-[9px]"
          >
            Go to Company Profile
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-7 py-6">
      <div className="mb-5 flex items-start justify-between gap-5">
        <div>
          <h1 className="font-bold text-[#171570] text-[28px]">Manage Products</h1>

          <p className="mt-1 text-[#555b76] text-[11px]">
            Manage your products, edit details and keep your catalog updated.
          </p>
        </div>

        <Link
          href="/supplier/dashboard/products/add"
          className="!text-white flex h-[40px] items-center justify-center gap-2 rounded-[6px] bg-[#2619bd] px-5 font-bold text-[10px] transition hover:bg-[#3325db]"
        >
          <Plus size={14} />
          Add New Product
        </Link>
      </div>

      <ProductsStats
        total={summary?.total ?? 0}
        active={summary?.active ?? 0}
        inactive={summary?.inactive ?? 0}
        outOfStock={summary?.out_of_stock ?? 0}
      />

      <ProductsTable
        products={products}
        pagination={pagination}
        filters={filters}
        categoryOptions={categoryOptions}
        isLoading={isLoading}
        error={error}
        onFiltersChange={updateFilters}
      />
    </section>
  );
}
