"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";

import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Heart,
  Search,
} from "lucide-react";

import {
  getSavedProducts,
  type SavedProduct,
} from "@/lib/api/buyer-saved-api";

import { BuyerSavedProductCard } from "./buyer-saved-product-card";

type SortOption = "recent" | "name-asc" | "name-desc";

const PAGE_SIZE = 12;

export function BuyerSavedProductsPage() {
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [savedCount, setSavedCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [sortOpen, setSortOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSavedProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getSavedProducts({
        search: searchQuery,
        page: 1,
        limit: PAGE_SIZE,
      });

      setProducts(response.data.products);
      setSavedCount(response.data.saved_count);
    } catch (error) {
      console.error("Failed to fetch saved products:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load saved products.",
      );
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadSavedProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [loadSavedProducts]);

  function handleProductRemoved(productId: number) {
    setProducts((current) =>
      current.filter(
        (product) => product.product_id !== productId,
      ),
    );

    setSavedCount((current) => Math.max(0, current - 1));
  }

  const visibleProducts = [...products];

  if (sortBy === "name-asc") {
    visibleProducts.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  if (sortBy === "name-desc") {
    visibleProducts.sort((a, b) =>
      b.name.localeCompare(a.name),
    );
  }

  const sortLabel =
    sortBy === "name-asc"
      ? "Name A - Z"
      : sortBy === "name-desc"
        ? "Name Z - A"
        : "Recently Saved";

  return (
    <section className="px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-7">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-4 sm:mb-5 lg:flex-row lg:items-start lg:justify-between lg:gap-5">
        <div className="min-w-0">
          <h1 className="font-bold text-[#171570] text-[22px] leading-tight sm:text-[25px] lg:text-[27px]">
            Saved Products
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-1.5 font-medium text-[#666b83] text-[9px] sm:text-[10px]">
            <Link
              href="/"
              className="transition hover:text-[#2118ad]"
            >
              Home
            </Link>

            <ChevronRight size={11} />

            <Link
              href="/dashboard"
              className="transition hover:text-[#2118ad]"
            >
              Dashboard
            </Link>

            <ChevronRight size={11} />

            <span className="font-semibold text-[#2118ad]">
              Saved Products
            </span>
          </div>
        </div>

        {/* Saved count */}
        <div className="flex w-full items-center gap-3 rounded-[8px] bg-[#f5f3ff] px-3 py-3 sm:px-4 lg:w-auto lg:min-w-[250px]">
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#ebe8ff]">
            <Heart
              size={15}
              className="fill-[#3124d7] text-[#3124d7]"
            />
          </div>

          <div className="min-w-0">
            <p className="font-bold text-[#171570] text-[9px] sm:text-[10px]">
              You have {savedCount} saved{" "}
              {savedCount === 1 ? "product" : "products"}
            </p>

            <p className="mt-0.5 text-[#666b83] text-[7.5px] sm:text-[8px]">
              View or send inquiries anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="rounded-[9px] border border-[#e2e3ee] bg-white px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
          <div className="min-w-0">
            <h2 className="font-bold text-[#171570] text-[16px] sm:text-[18px]">
              Saved Products ({savedCount})
            </h2>

            <p className="mt-0.5 text-[#555b76] text-[8px] sm:text-[9px]">
              Products you&apos;ve saved for later
            </p>
          </div>

          {/* Search + sort */}
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
            <div className="flex h-[36px] w-full items-center gap-2 rounded-[6px] border border-[#dedff0] bg-white px-3 sm:w-[220px]">
              <Search
                size={13}
                className="shrink-0 text-[#3025c6]"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search saved products..."
                className="min-w-0 w-full bg-transparent text-[#34395d] text-[9px] outline-none placeholder:text-[#999db2]"
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <button
                type="button"
                onClick={() =>
                  setSortOpen((previous) => !previous)
                }
                className="flex h-[36px] w-full min-w-0 items-center justify-between gap-3 rounded-[6px] border border-[#dedff0] bg-white px-3 font-semibold text-[#34395d] text-[9px] sm:min-w-[150px]"
              >
                <span className="truncate">
                  {sortLabel}
                </span>

                <ChevronDown
                  size={12}
                  className={`shrink-0 text-[#2118ad] transition-transform ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sortOpen && (
                <div className="absolute top-[42px] right-0 z-50 w-full min-w-[170px] overflow-hidden rounded-[7px] border border-[#dedff0] bg-white py-1 shadow-[0_10px_28px_rgba(31,24,150,0.12)]">
                  <SortButton
                    label="Recently Saved"
                    active={sortBy === "recent"}
                    onClick={() => {
                      setSortBy("recent");
                      setSortOpen(false);
                    }}
                  />

                  <SortButton
                    label="Name A - Z"
                    active={sortBy === "name-asc"}
                    onClick={() => {
                      setSortBy("name-asc");
                      setSortOpen(false);
                    }}
                  />

                  <SortButton
                    label="Name Z - A"
                    active={sortBy === "name-desc"}
                    onClick={() => {
                      setSortBy("name-desc");
                      setSortOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-3 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-[9px]">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="mt-3 flex min-h-[240px] items-center justify-center rounded-[9px] border border-[#e2e3ee] bg-white">
          <p className="text-[#555b76] text-[9px]">
            Loading saved products...
          </p>
        </div>
      ) : products.length > 0 ? (
        <div className="mt-3 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <BuyerSavedProductCard
              key={product.product_id}
              product={product}
              onRemoved={handleProductRemoved}
            />
          ))}
        </div>
      ) : (
        <EmptySavedProducts
          hasFavorites={Boolean(searchQuery.trim())}
        />
      )}

      {/* Bottom CTA */}
      <div className="mt-5 flex flex-col gap-4 rounded-[9px] border border-[#dfdff2] bg-[#f8f7ff] px-4 py-4 sm:px-5 sm:py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
        <div className="flex items-start gap-3">
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#eeecff]">
            <Heart size={14} className="text-[#3124d7]" />
          </div>

          <div className="min-w-0">
            <p className="font-bold text-[#171570] text-[11px] sm:text-[12px]">
              Don&apos;t miss out!
            </p>

            <p className="mt-0.5 text-[#555b76] text-[8px] leading-[1.4] sm:text-[8.5px]">
              Explore more products and connect with verified
              suppliers.
            </p>
          </div>
        </div>

        <Link
          href="/products"
          className="!text-white flex h-[38px] w-full shrink-0 items-center justify-center gap-2 rounded-[5px] bg-[#2619bb] px-5 font-bold text-[9px] transition hover:bg-[#1d1398] sm:w-auto"
        >
          Browse More Products
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}

function SortButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-3 py-2.5 text-left font-medium text-[9px] transition ${
        active
          ? "bg-[#f0eeff] text-[#251bc1]"
          : "text-[#414661] hover:bg-[#f8f8ff]"
      }`}
    >
      {label}
    </button>
  );
}

function EmptySavedProducts({
  hasFavorites,
}: {
  hasFavorites: boolean;
}) {
  return (
    <div className="mt-3 flex min-h-[240px] items-center justify-center rounded-[9px] border border-[#e2e3ee] bg-white px-4 py-8 sm:min-h-[270px]">
      <div className="text-center">
        <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#f1efff]">
          <Heart size={21} className="text-[#3024ca]" />
        </div>

        <h3 className="mt-3 font-bold text-[#171570] text-[13px] sm:text-[14px]">
          {hasFavorites
            ? "No matching products found"
            : "No saved products yet"}
        </h3>

        <p className="mx-auto mt-1 max-w-[300px] text-[#666b83] text-[8px] leading-[1.5] sm:text-[9px]">
          {hasFavorites
            ? "Try searching with a different product name."
            : "Products that you save will appear here so you can easily find them later."}
        </p>

        {!hasFavorites && (
          <Link
            href="/products"
            className="!text-white mt-4 inline-flex h-[34px] items-center justify-center rounded-[5px] bg-[#2116a5] px-5 font-bold text-[9px]"
          >
            Browse Products
          </Link>
        )}
      </div>
    </div>
  );
}