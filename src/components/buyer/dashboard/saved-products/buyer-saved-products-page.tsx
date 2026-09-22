"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { ArrowRight, ChevronDown, ChevronRight, Heart, Search } from "lucide-react";

import { useFavorites } from "@/context/favorites-context";
import { directoryProducts } from "@/data/products-directory";

import { BuyerSavedProductCard } from "./buyer-saved-product-card";

type SortOption = "recent" | "name-asc" | "name-desc";

export function BuyerSavedProductsPage() {
  const { favorites } = useFavorites();

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const [sortOpen, setSortOpen] = useState(false);

  const savedProductFavorites = useMemo(() => favorites.filter((item) => item.type === "product"), [favorites]);

  const savedProducts = useMemo(() => {
    return savedProductFavorites
      .map((favorite) => directoryProducts.find((product) => product.id === favorite.id))
      .filter((product): product is (typeof directoryProducts)[number] => Boolean(product))
      .reverse();
  }, [savedProductFavorites]);

  const visibleProducts = useMemo(() => {
    let products = [...savedProducts];

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.company.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      );
    }

    if (sortBy === "name-asc") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "name-desc") {
      products.sort((a, b) => b.name.localeCompare(a.name));
    }

    return products;
  }, [savedProducts, searchQuery, sortBy]);

  const sortLabel = sortBy === "name-asc" ? "Name A - Z" : sortBy === "name-desc" ? "Name Z - A" : "Recently Saved";

  return (
    <section className="px-8 py-7">
      <div className="mb-4 flex items-start justify-between gap-5">
        <div>
          <h1 className="font-bold text-[#171570] text-[27px] leading-tight">Saved Products</h1>

          <div className="mt-2 flex items-center gap-1.5 font-medium text-[#666b83] text-[10px]">
            <Link href="/" className="transition hover:text-[#2118ad]">
              Home
            </Link>

            <ChevronRight size={11} />

            <Link href="/dashboard" className="transition hover:text-[#2118ad]">
              Dashboard
            </Link>

            <ChevronRight size={11} />

            <span className="font-semibold text-[#2118ad]">Saved Products</span>
          </div>
        </div>

        <div className="flex min-w-[250px] items-center gap-3 rounded-[8px] bg-[#f5f3ff] px-4 py-3">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#ebe8ff]">
            <Heart size={15} className="fill-[#3124d7] text-[#3124d7]" />
          </div>

          <div>
            <p className="font-bold text-[#171570] text-[10px]">
              You have {savedProductFavorites.length} saved{" "}
              {savedProductFavorites.length === 1 ? "product" : "products"}
            </p>

            <p className="mt-0.5 text-[#666b83] text-[8px]">View or send inquiries anytime.</p>
          </div>
        </div>
      </div>

      <div className="rounded-[9px] border border-[#e2e3ee] bg-white px-4 py-4">
        <div className="flex items-center justify-between gap-5">
          <div>
            <h2 className="font-bold text-[#171570] text-[18px]">Saved Products ({savedProductFavorites.length})</h2>

            <p className="mt-0.5 text-[#555b76] text-[9px]">Products you&apos;ve saved for later</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-[36px] w-[220px] items-center gap-2 rounded-[6px] border border-[#dedff0] bg-white px-3">
              <Search size={13} className="shrink-0 text-[#3025c6]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search saved products..."
                className="w-full bg-transparent text-[#34395d] text-[9px] outline-none placeholder:text-[#999db2]"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((previous) => !previous)}
                className="flex h-[36px] min-w-[150px] items-center justify-between gap-3 rounded-[6px] border border-[#dedff0] bg-white px-3 font-semibold text-[#34395d] text-[9px]"
              >
                {sortLabel}

                <ChevronDown
                  size={12}
                  className={`text-[#2118ad] transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>

              {sortOpen && (
                <div className="absolute top-[42px] right-0 z-50 w-[170px] overflow-hidden rounded-[7px] border border-[#dedff0] bg-white py-1 shadow-[0_10px_28px_rgba(31,24,150,0.12)]">
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

      {visibleProducts.length > 0 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {visibleProducts.map((product) => (
            <BuyerSavedProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptySavedProducts hasFavorites={savedProductFavorites.length > 0} />
      )}

      <div className="mt-5 flex items-center justify-between gap-5 rounded-[9px] border border-[#dfdff2] bg-[#f8f7ff] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#eeecff]">
            <Heart size={14} className="text-[#3124d7]" />
          </div>

          <div>
            <p className="font-bold text-[#171570] text-[12px]">Don&apos;t miss out!</p>

            <p className="mt-0.5 text-[#555b76] text-[8.5px]">
              Explore more products and connect with verified suppliers.
            </p>
          </div>
        </div>

        <Link
          href="/products"
          className="!text-white flex h-[38px] items-center justify-center gap-2 rounded-[5px] bg-[#2619bb] px-5 font-bold text-[9px] transition hover:bg-[#1d1398]"
        >
          Browse More Products
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}

function SortButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-3 py-2.5 text-left font-medium text-[9px] transition ${active ? "bg-[#f0eeff] text-[#251bc1]" : "text-[#414661] hover:bg-[#f8f8ff]"}`}
    >
      {label}
    </button>
  );
}

function EmptySavedProducts({ hasFavorites }: { hasFavorites: boolean }) {
  return (
    <div className="mt-3 flex min-h-[270px] items-center justify-center rounded-[9px] border border-[#e2e3ee] bg-white">
      <div className="text-center">
        <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#f1efff]">
          <Heart size={21} className="text-[#3024ca]" />
        </div>

        <h3 className="mt-3 font-bold text-[#171570] text-[14px]">
          {hasFavorites ? "No matching products found" : "No saved products yet"}
        </h3>

        <p className="mx-auto mt-1 max-w-[300px] text-[#666b83] text-[9px] leading-[1.5]">
          {hasFavorites
            ? "Try searching with a different product, company or category name."
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
