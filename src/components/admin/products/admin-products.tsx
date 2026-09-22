"use client";

import * as React from "react";

import {
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import { Download } from "lucide-react";

import { DataTable } from "@/components/common/data-table/data-table";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { type AdminProductsSummary, getAdminProducts } from "@/lib/api/admin-products-api";
import { dataTableFeatures } from "@/lib/data-table-features";

import { productsColumns } from "./products-columns";
import { mapAdminProductToRow, type ProductRow } from "./products-data";
import { type ProductFilterOption, ProductsFilters, type ProductsFilterValues } from "./products-filters";
import { ProductsStats } from "./products-stats";

const initialFilters: ProductsFilterValues = {
  search: "",
  companyId: "ALL",
  categoryId: "ALL",
  status: "ALL",
  stockStatus: "ALL",
  approvalStatus: "ALL",
};

const emptySummary: AdminProductsSummary = {
  total: 0,
  active: 0,
  inactive: 0,
  approved: 0,
  pending_approval: 0,
  out_of_stock: 0,
};

export function AdminProducts() {
  const [products, setProducts] = React.useState<ProductRow[]>([]);

  const [summary, setSummary] = React.useState<AdminProductsSummary>(emptySummary);

  const [totalItems, setTotalItems] = React.useState(0);

  const [totalPages, setTotalPages] = React.useState(1);

  const [loading, setLoading] = React.useState(true);

  const [error, setError] = React.useState("");

  const [filters, setFilters] = React.useState<ProductsFilterValues>(initialFilters);

  const [appliedSearch, setAppliedSearch] = React.useState("");

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({
    search: false,
  });

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [rowSelection, setRowSelection] = React.useState({});

  const [companyOptions, setCompanyOptions] = React.useState<ProductFilterOption[]>([]);

  const [categoryOptions, setCategoryOptions] = React.useState<ProductFilterOption[]>([]);

  React.useEffect(() => {
    let active = true;

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await getAdminProducts({
          search: appliedSearch || undefined,

          company_id: filters.companyId !== "ALL" ? Number(filters.companyId) : undefined,

          category_id: filters.categoryId !== "ALL" ? Number(filters.categoryId) : undefined,

          status: filters.status,

          stock_status: filters.stockStatus,

          approval_status: filters.approvalStatus,

          page: pagination.pageIndex + 1,

          limit: pagination.pageSize,
        });

        if (!active || !response.data) {
          return;
        }

        const rows = response.data.products.map(mapAdminProductToRow);

        setProducts(rows);

        setSummary(response.data.summary);

        setTotalItems(response.data.pagination.totalItems);

        setTotalPages(Math.max(response.data.pagination.totalPages, 1));

        const companies = response.data.products
          .filter((product) => product.company !== null)
          .map((product) => ({
            value: String(product.company!.company_id),

            label: product.company!.name,
          }));

        setCompanyOptions(Array.from(new Map(companies.map((company) => [company.value, company])).values()));

        const categories = response.data.products.map((product) => ({
          value: String(product.category.category_id),

          label: product.category.name,
        }));

        setCategoryOptions(Array.from(new Map(categories.map((category) => [category.value, category])).values()));
      } catch (error) {
        if (!active) {
          return;
        }

        setProducts([]);

        setSummary(emptySummary);

        setTotalItems(0);

        setTotalPages(1);

        setError(error instanceof Error ? error.message : "Unable to load products.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      active = false;
    };
  }, [
    appliedSearch,
    filters.companyId,
    filters.categoryId,
    filters.status,
    filters.stockStatus,
    filters.approvalStatus,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  const table = useTable({
    features: dataTableFeatures,

    data: products,

    columns: productsColumns,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
      rowSelection,
    },

    getRowId: (row) => row.id,

    manualPagination: true,

    pageCount: totalPages,

    rowCount: totalItems,

    autoResetPageIndex: false,

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    onColumnVisibilityChange: setColumnVisibility,

    onPaginationChange: setPagination,

    onRowSelectionChange: setRowSelection,
  });

  function handleFiltersChange(values: ProductsFilterValues) {
    setFilters(values);

    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  }

  function handleSearch() {
    setAppliedSearch(filters.search.trim());

    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  }

  function handleReset() {
    setFilters(initialFilters);

    setAppliedSearch("");

    setPagination((previous) => ({
      ...previous,
      pageIndex: 0,
    }));
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="All Products"
        description="View and manage all products added by sellers on CoolerGuru. Review product details, approval status and listings."
        action={
          <Button variant="outline" className="h-10 gap-2 border-[#cfcdf5] text-[#2720a8]">
            <Download className="size-4" />
            Export Products
          </Button>
        }
      />

      <ProductsStats
        total={summary.total}
        active={summary.active}
        inactive={summary.inactive}
        approved={summary.approved}
        pending={summary.pending_approval}
        outOfStock={summary.out_of_stock}
      />

      <ProductsFilters
        values={filters}
        companies={companyOptions}
        categories={categoryOptions}
        onChange={handleFiltersChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {error ? (
        <div className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-medium text-red-600">
          {error}
        </div>
      ) : null}

      <div>
        <h2 className="mb-3 text-[17px] font-bold text-[#15136f]">Products ({totalItems})</h2>

        <DataTable
          table={table}
          emptyState={{
            title: loading ? "Loading products..." : "No products found",

            description: loading
              ? "Please wait while products are being loaded."
              : "Try changing or resetting your filters.",
          }}
        />
      </div>
    </div>
  );
}
