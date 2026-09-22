"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { ChevronDown, Download, Pencil, Search } from "lucide-react";

import type { SupplierProduct } from "@/types/supplier-product";

interface ProductsTableProps {
  products: SupplierProduct[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [stockStatus, setStockStatus] = useState("all");

  const categories = Array.from(new Set(products.map((product) => product.category)));

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const searchMatches =
        product.name.toLowerCase().includes(query) ||
        product.modelNumber.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const categoryMatches = category === "all" || product.category === category;

      const statusMatches = status === "all" || product.status === status;

      const stockMatches = stockStatus === "all" || product.stockStatus === stockStatus;

      return searchMatches && categoryMatches && statusMatches && stockMatches;
    });
  }, [products, searchQuery, category, status, stockStatus]);

  return (
    <div className="mt-5 overflow-hidden rounded-[9px] border border-[#e1e2ed] bg-white">
      <div className="flex items-center gap-3 border-[#e5e6ee] border-b p-4">
        <div className="flex h-[38px] min-w-[300px] flex-1 items-center gap-2 rounded-[5px] border border-[#dedff0] px-3">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by product name, category or SKU..."
            className="min-w-0 flex-1 text-[#404560] text-[10px] outline-none placeholder:text-[#9b9eb1]"
          />

          <Search size={14} className="text-[#3024ca]" />
        </div>

        <FilterSelect value={category} onChange={setCategory} width="w-[160px]">
          <option value="all">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect value={status} onChange={setStatus} width="w-[140px]">
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </FilterSelect>

        <FilterSelect value={stockStatus} onChange={setStockStatus} width="w-[150px]">
          <option value="all">All Stock Status</option>
          <option value="IN_STOCK">In Stock</option>
          <option value="LOW_STOCK">Low Stock</option>
          <option value="OUT_OF_STOCK">Out of Stock</option>
        </FilterSelect>

        <button
          type="button"
          className="flex h-[38px] shrink-0 items-center justify-center gap-2 rounded-[5px] border border-[#aaa4ec] px-4 font-bold text-[#2c21c3] text-[9px]"
        >
          <Download size={12} />
          Export List
        </button>
      </div>

      <div className="grid grid-cols-[2.2fr_1.2fr_1fr_0.8fr_0.9fr_0.75fr_0.45fr] items-center bg-[#fafaff] px-4 py-3 font-bold text-[#272d54] text-[10px]">
        <span>Product</span>
        <span>Category</span>
        <span>Model Number</span>
        <span>Price (₹)</span>
        <span>Stock Status</span>
        <span>Status</span>
        <span className="text-center">Actions</span>
      </div>

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => <ProductRow key={product.id} product={product} />)
      ) : (
        <div className="flex min-h-[180px] items-center justify-center">
          <div className="text-center">
            <p className="font-bold text-[#171570] text-[11px]">No products found</p>
            <p className="mt-1 text-[#7c8097] text-[8px]">Try changing your search or filters.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-[#e5e6ee] border-t px-4 py-3">
        <p className="text-[#686d85] text-[8px]">
          Showing {filteredProducts.length === 0 ? 0 : 1} to {filteredProducts.length} of {products.length} products
        </p>

        <div className="flex items-center gap-2">
          <PaginationButton>‹</PaginationButton>
          <PaginationButton active>1</PaginationButton>
          <PaginationButton>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
          <PaginationButton>›</PaginationButton>

          <select className="ml-3 h-[30px] rounded-[4px] border border-[#dedff0] px-2 text-[#555a76] text-[8px] outline-none">
            <option>10 / page</option>
            <option>20 / page</option>
            <option>50 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product }: { product: SupplierProduct }) {
  return (
    <div className="grid min-h-[70px] grid-cols-[2.2fr_1.2fr_1fr_0.8fr_0.9fr_0.75fr_0.45fr] items-center border-[#ededf3] border-t px-4 py-2">
      <div className="flex items-center gap-3">
        <div className="relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[5px] border border-[#e3e4ed] bg-[#fafafa]">
          <Image src={product.image} alt={product.name} fill sizes="48px" className="object-contain p-1" />
        </div>

        <div className="min-w-0">
          <p className="truncate font-bold text-[#171570] text-[10px]">{product.name}</p>

          <p className="mt-1 line-clamp-2 max-w-[220px] text-[#6e738b] text-[8px] leading-[1.4]">
            {product.description}
          </p>
        </div>
      </div>

      <p className="text-[#555b76] text-[9px]">{product.category}</p>

      <p className="font-medium text-[#555b76] text-[9px]">{product.modelNumber}</p>

      <p className="font-medium text-[#3d4260] text-[9px]">₹ {product.price.toLocaleString("en-IN")}</p>

      <StockBadge status={product.stockStatus} />

      <ProductStatusBadge status={product.status} />

      <div className="flex justify-center">
        <Link
          href={`/supplier/dashboard/products/${product.id}/edit`}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[5px] border border-[#d8d9e8] text-[#3024ca] transition hover:bg-[#f5f3ff]"
        >
          <Pencil size={12} />
        </Link>
      </div>
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
  children: React.ReactNode;
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

function StockBadge({ status }: { status: SupplierProduct["stockStatus"] }) {
  const config =
    status === "IN_STOCK"
      ? {
          label: "In Stock",
          style: "border-[#bde5c9] bg-[#eaf8ee] text-[#208b43]",
        }
      : status === "LOW_STOCK"
        ? {
            label: "Low Stock",
            style: "border-[#f3dab1] bg-[#fff5e5] text-[#df8a17]",
          }
        : {
            label: "Out of Stock",
            style: "border-[#f0c3ca] bg-[#fff0f2] text-[#db3e57]",
          };

  return (
    <span className={`w-fit rounded-[4px] border px-2 py-1 font-semibold text-[8px] ${config.style}`}>
      {config.label}
    </span>
  );
}

function ProductStatusBadge({ status }: { status: SupplierProduct["status"] }) {
  const active = status === "ACTIVE";

  return (
    <span
      className={`w-fit rounded-[4px] border px-2 py-1 font-semibold text-[8px] ${active ? "border-[#bde5c9] bg-[#eaf8ee] text-[#208b43]" : "border-[#f0c3ca] bg-[#fff0f2] text-[#db3e57]"}`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function PaginationButton({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      type="button"
      className={`flex h-[30px] w-[30px] items-center justify-center rounded-[4px] font-semibold text-[8px] ${active ? "bg-[#2719bd] text-white" : "border border-[#e0e1ed] text-[#555a76]"}`}
    >
      {children}
    </button>
  );
}
