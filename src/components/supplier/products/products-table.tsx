"use client";

import type { ReactNode } from "react";

import Link from "next/link";

import { ChevronDown, Download, Eye, Loader2, Pencil, Search } from "lucide-react";

import type { GetSellerProductsParams, Pagination, SellerProduct } from "@/lib/api/seller-products-api";

import {
  ApprovalBadge,
  formatProductPrice,
  getPrimaryImage,
  ProductImage,
  ProductStatusBadge,
  StockBadge,
} from "./product-display";

export interface ProductsTableFilters {
  search: string;
  categoryId: number | "all";
  status: NonNullable<GetSellerProductsParams["status"]>;
  stockStatus: NonNullable<GetSellerProductsParams["stock_status"]>;
  page: number;
  limit: number;
}

interface ProductsTableProps {
  products: SellerProduct[];
  pagination: Pagination | null;
  filters: ProductsTableFilters;
  categoryOptions: { id: number; label: string }[];
  isLoading: boolean;
  error: string | null;
  onFiltersChange: (changes: Partial<ProductsTableFilters>) => void;
}

const gridColumns = "grid-cols-[2.2fr_1.2fr_1fr_1fr_0.9fr_0.9fr_0.6fr]";

export function ProductsTable({
  products,
  pagination,
  filters,
  categoryOptions,
  isLoading,
  error,
  onFiltersChange,
}: ProductsTableProps) {
  const totalItems = pagination?.totalItems ?? 0;
  const firstItem = totalItems === 0 ? 0 : (filters.page - 1) * filters.limit + 1;
  const lastItem = Math.min(filters.page * filters.limit, totalItems);

  return (
    <div className="mt-5 overflow-hidden rounded-[9px] border border-[#e1e2ed] bg-white">
      <div className="flex items-center gap-3 border-[#e5e6ee] border-b p-4">
        <div className="flex h-[38px] min-w-[300px] flex-1 items-center gap-2 rounded-[5px] border border-[#dedff0] px-3">
          <input
            value={filters.search}
            onChange={(event) => onFiltersChange({ search: event.target.value })}
            placeholder="Search by product name, category or SKU..."
            className="min-w-0 flex-1 text-[#404560] text-[10px] outline-none placeholder:text-[#9b9eb1]"
          />

          <Search size={14} className="text-[#3024ca]" />
        </div>

        <FilterSelect
          value={String(filters.categoryId)}
          onChange={(value) => onFiltersChange({ categoryId: value === "all" ? "all" : Number(value) })}
          width="w-[180px]"
        >
          <option value="all">All Categories</option>

          {categoryOptions.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={filters.status}
          onChange={(value) => onFiltersChange({ status: value as ProductsTableFilters["status"] })}
          width="w-[140px]"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </FilterSelect>

        <FilterSelect
          value={filters.stockStatus}
          onChange={(value) => onFiltersChange({ stockStatus: value as ProductsTableFilters["stockStatus"] })}
          width="w-[150px]"
        >
          <option value="ALL">All Stock Status</option>
          <option value="IN_STOCK">In Stock</option>
          <option value="LOW_STOCK">Low Stock</option>
          <option value="OUT_OF_STOCK">Out of Stock</option>
        </FilterSelect>

        <button
          type="button"
          onClick={() => exportProductsCsv(products)}
          disabled={products.length === 0}
          className="flex h-[38px] shrink-0 items-center justify-center gap-2 rounded-[5px] border border-[#aaa4ec] px-4 font-bold text-[#2c21c3] text-[9px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={12} />
          Export List
        </button>
      </div>

      <div className={`grid ${gridColumns} items-center bg-[#fafaff] px-4 py-3 font-bold text-[#272d54] text-[10px]`}>
        <span>Product</span>
        <span>Category</span>
        <span>Model / SKU</span>
        <span>Price</span>
        <span>Stock Status</span>
        <span>Status</span>
        <span className="text-center">Actions</span>
      </div>

      {isLoading ? (
        <TableMessage>
          <Loader2 size={18} className="mx-auto animate-spin text-[#3024ca]" />
          <p className="mt-2 text-[#7c8097] text-[9px]">Loading products...</p>
        </TableMessage>
      ) : error ? (
        <TableMessage>
          <p className="font-bold text-[#db3e57] text-[11px]">Could not load products</p>
          <p className="mt-1 text-[#7c8097] text-[8px]">{error}</p>
        </TableMessage>
      ) : products.length > 0 ? (
        products.map((product) => <ProductRow key={product.product_id} product={product} />)
      ) : (
        <TableMessage>
          <p className="font-bold text-[#171570] text-[11px]">No products found</p>
          <p className="mt-1 text-[#7c8097] text-[8px]">Try changing your search or filters, or add a new product.</p>
        </TableMessage>
      )}

      <div className="flex items-center justify-between border-[#e5e6ee] border-t px-4 py-3">
        <p className="text-[#686d85] text-[8px]">
          Showing {firstItem} to {lastItem} of {totalItems} products
        </p>

        <div className="flex items-center gap-2">
          <PaginationButton
            disabled={!pagination?.hasPreviousPage}
            onClick={() => onFiltersChange({ page: filters.page - 1 })}
          >
            ‹
          </PaginationButton>

          {getPageNumbers(filters.page, pagination?.totalPages ?? 1).map((page) => (
            <PaginationButton key={page} active={page === filters.page} onClick={() => onFiltersChange({ page })}>
              {page}
            </PaginationButton>
          ))}

          <PaginationButton
            disabled={!pagination?.hasNextPage}
            onClick={() => onFiltersChange({ page: filters.page + 1 })}
          >
            ›
          </PaginationButton>

          <select
            value={filters.limit}
            onChange={(event) => onFiltersChange({ limit: Number(event.target.value) })}
            className="ml-3 h-[30px] rounded-[4px] border border-[#dedff0] px-2 text-[#555a76] text-[8px] outline-none"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product }: { product: SellerProduct }) {
  const primaryImage = getPrimaryImage(product);
  const viewHref = `/supplier/dashboard/products/${product.slug}`;

  return (
    <div className={`grid min-h-[70px] ${gridColumns} items-center border-[#ededf3] border-t px-4 py-2`}>
      <Link href={viewHref} className="flex min-w-0 items-center gap-3">
        <div className="relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[5px] border border-[#e3e4ed] bg-[#fafafa]">
          <ProductImage src={primaryImage?.image_url} alt={primaryImage?.alt_text ?? product.name} />
        </div>

        <div className="min-w-0">
          <p className="truncate font-bold text-[#171570] text-[10px]">{product.name}</p>

          <p className="mt-1 line-clamp-2 max-w-[220px] text-[#6e738b] text-[8px] leading-[1.4]">
            {product.short_description}
          </p>
        </div>
      </Link>

      <p className="text-[#555b76] text-[9px]">{product.category?.name ?? "-"}</p>

      <div className="font-medium text-[#555b76] text-[9px]">
        <p>{product.model_number ?? "-"}</p>
        {product.sku && product.sku !== product.model_number ? (
          <p className="mt-0.5 text-[#8b8fa3] text-[8px]">SKU: {product.sku}</p>
        ) : null}
      </div>

      <p className="font-medium text-[#3d4260] text-[9px]">{formatProductPrice(product)}</p>

      <StockBadge status={product.availability_status} />

      <div className="flex flex-col gap-1">
        <ProductStatusBadge isActive={product.is_active} />
        <ApprovalBadge status={product.approval_status} />
      </div>

      <div className="flex justify-center gap-1.5">
        <Link
          href={viewHref}
          aria-label={`View ${product.name}`}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[5px] border border-[#d8d9e8] text-[#3024ca] transition hover:bg-[#f5f3ff]"
        >
          <Eye size={12} />
        </Link>

        <Link
          href={`${viewHref}/edit`}
          aria-label={`Edit ${product.name}`}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[5px] border border-[#d8d9e8] text-[#3024ca] transition hover:bg-[#f5f3ff]"
        >
          <Pencil size={12} />
        </Link>
      </div>
    </div>
  );
}

function TableMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[180px] items-center justify-center border-[#ededf3] border-t">
      <div className="text-center">{children}</div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  width,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  width: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${width}`}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[38px] w-full appearance-none rounded-[5px] border border-[#dedff0] bg-white px-3 pr-8 font-medium text-[#444965] text-[8px] outline-none"
      >
        {children}
      </select>

      <ChevronDown size={11} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#3024ca]" />
    </div>
  );
}

function PaginationButton({
  children,
  active = false,
  disabled = false,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || active}
      className={`flex h-[30px] w-[30px] items-center justify-center rounded-[4px] font-semibold text-[8px] disabled:cursor-default ${active ? "bg-[#2719bd] text-white" : "border border-[#e0e1ed] text-[#555a76] disabled:opacity-40"}`}
    >
      {children}
    </button>
  );
}

/* Shows at most 5 page numbers around the current page. */
function getPageNumbers(currentPage: number, totalPages: number) {
  const pageCount = Math.max(totalPages, 1);
  const start = Math.max(1, Math.min(currentPage - 2, pageCount - 4));
  const end = Math.min(pageCount, start + 4);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function exportProductsCsv(products: SellerProduct[]) {
  const header = ["Name", "Category", "Model Number", "SKU", "Price", "Stock Status", "Status", "Approval"];

  const rows = products.map((product) => [
    product.name,
    product.category?.name ?? "",
    product.model_number ?? "",
    product.sku ?? "",
    formatProductPrice(product),
    product.availability_status ?? "",
    product.is_active ? "Active" : "Inactive",
    product.approval_status,
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");

  link.href = url;
  link.download = "products.csv";
  link.click();

  URL.revokeObjectURL(url);
}
