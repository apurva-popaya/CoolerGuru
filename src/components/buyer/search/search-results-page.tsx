"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChevronRight, SlidersHorizontal, X } from "lucide-react";

import { Container } from "@/components/common/container";
import { searchGlobal } from "@/lib/api/search-api";
import { mapMixedSearchResults } from "@/lib/mappers/search-result-mapper";
import type { SearchResult } from "@/types/search";
import type {
  GlobalSearchType,
  SearchBusinessType,
  SearchCounts,
  SearchFacets,
  SearchPagination,
  SearchSort,
} from "@/types/search-api";

import { SearchFilters } from "./search-filters";
import { SearchResultCard } from "./search-result-card";

interface SearchResultsPageProps {
  query: string;
  type: GlobalSearchType;

  businessTypes: SearchBusinessType[];

  categorySlugs: string[];

  verifiedOnly: boolean;
  premiumOnly: boolean;

  state?: string;
  city?: string;

  sort: SearchSort;

  page: number;
}

const emptyCounts: SearchCounts = {
  all: 0,
  products: 0,
  companies: 0,
};

export function SearchResultsPage({
  query,
  type,
  businessTypes,
  categorySlugs,
  verifiedOnly,
  premiumOnly,
  state,
  city,
  sort,
  page,
}: SearchResultsPageProps) {
  const router = useRouter();

  const [results, setResults] = useState<SearchResult[]>([]);
  const [counts, setCounts] = useState<SearchCounts>(emptyCounts);
  const [pagination, setPagination] = useState<SearchPagination | null>(null);
  const [facets, setFacets] = useState<SearchFacets>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Controls the mobile/tablet filter drawer.
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    async function loadResults() {
      if (!query.trim()) {
        setResults([]);
        setCounts(emptyCounts);
        setPagination(null);

        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await searchGlobal({
          q: query,
          type,
          business_types: businessTypes,
          category_slugs: categorySlugs,
          verified_only: verifiedOnly,
          premium_only: premiumOnly,
          state,
          city,
          sort,
          page,
          limit: 12,
        });

        setResults(mapMixedSearchResults(response.data.results));
        setCounts(response.data.counts);
        setPagination(response.data.pagination);
        setFacets(response.data.facets);
      } catch (error) {
        console.error("Search API error:", error);

        setResults([]);
        setCounts(emptyCounts);
        setError("Unable to load search results.");
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [
    query,
    type,
    businessTypes,
    categorySlugs,
    verifiedOnly,
    premiumOnly,
    state,
    city,
    sort,
    page,
  ]);

  function updateUrl(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    params.set("type", type);

    if (businessTypes.length) {
      params.set("business_type", businessTypes.join(","));
    }

    if (categorySlugs.length) {
      params.set("category_slug", categorySlugs.join(","));
    }

    if (verifiedOnly) {
      params.set("verified_only", "true");
    }

    if (premiumOnly) {
      params.set("premium_only", "true");
    }

    if (state) {
      params.set("state", state);
    }

    if (city) {
      params.set("city", city);
    }

    params.set("sort", sort);
    params.set("page", String(page));

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/search?${params.toString()}`);
  }

  function applyFilters(values: {
    businessTypes: SearchBusinessType[];
    categorySlugs: string[];
    verifiedOnly: boolean;
    premiumOnly: boolean;
    state?: string;
    city?: string;
  }) {
    updateUrl({
      business_type: values.businessTypes.length
        ? values.businessTypes.join(",")
        : undefined,

      category_slug: values.categorySlugs.length
        ? values.categorySlugs.join(",")
        : undefined,

      verified_only: values.verifiedOnly ? "true" : undefined,

      premium_only: values.premiumOnly ? "true" : undefined,

      state: values.state,
      city: values.city,

      page: "1",
    });

    // Close mobile/tablet drawer after applying filters.
    setFiltersOpen(false);
  }

  function clearFilters() {
    updateUrl({
      business_type: undefined,
      category_slug: undefined,
      verified_only: undefined,
      premium_only: undefined,
      state: undefined,
      city: undefined,
      page: "1",
    });

    // Close mobile/tablet drawer.
    setFiltersOpen(false);
  }

  function changeType(newType: GlobalSearchType) {
    updateUrl({
      type: newType,
      page: "1",
    });
  }

  function changeSort(newSort: SearchSort) {
    updateUrl({
      sort: newSort,
      page: "1",
    });
  }

  return (
    <section className="w-full overflow-x-hidden bg-white py-5 sm:py-6">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-1.5 text-[#6d7187] text-[10px] sm:text-[11px]">
          <Link
            href="/"
            className="transition hover:text-[#2118ad]"
          >
            Home
          </Link>

          <ChevronRight size={12} />

          <span>Search Results</span>
        </div>

        {/* Heading + result count + sort */}
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-5">
          <div className="min-w-0">
            <h1 className="font-bold text-[#14168f] text-[22px] sm:text-[26px]">
              Search Results
            </h1>

            <p className="mt-1 text-[#51566f] text-[10px] sm:text-[11px]">
              Showing results for{" "}
              <span className="font-bold text-[#2118ad]">
                &quot;{query}&quot;
              </span>
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:w-auto lg:justify-end lg:gap-6">
            <p className="font-medium text-[#252a53] text-[10px]">
              About {counts.all.toLocaleString()} results found
            </p>

            <div className="flex h-[38px] w-full items-center justify-between rounded-[6px] border border-[#dedff0] bg-white px-3 sm:w-auto sm:justify-start">
              <span className="mr-1 whitespace-nowrap font-medium text-[#343959] text-[10px]">
                Sort by:
              </span>

              <select
                value={sort}
                onChange={(event) =>
                  changeSort(event.target.value as SearchSort)
                }
                className="min-w-0 cursor-pointer bg-transparent pr-1 font-bold text-[#2118ad] text-[10px] outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name_asc">Name A - Z</option>
                <option value="name_desc">Name Z - A</option>
              </select>
            </div>
          </div>
        </div>

        {/* =========================================================
            MOBILE / TABLET FILTER BUTTON

            This is the ONLY Filters button on small screens.
        ========================================================== */}
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex h-[44px] w-full items-center justify-center gap-2 rounded-[6px] border border-[#dedff0] bg-white font-bold text-[#2118ad] text-[11px] shadow-sm transition hover:bg-[#f7f6ff]"
          >
            <SlidersHorizontal size={15} />

            <span>Filters</span>
          </button>
        </div>

        {/* =========================================================
            MAIN SEARCH LAYOUT
        ========================================================== */}
        <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden min-w-0 lg:block">
            <SearchFilters
              businessTypes={businessTypes}
              categorySlugs={categorySlugs}
              verifiedOnly={verifiedOnly}
              premiumOnly={premiumOnly}
              state={state}
              city={city}
              facets={facets}
              onApply={applyFilters}
              onClear={clearFilters}
            />
          </div>

          {/* =====================================================
              SEARCH RESULTS
          ====================================================== */}
          <div className="min-w-0 w-full">
            {/* Result Tabs */}
            <div className="mb-3 grid w-full grid-cols-3 border-[#e6e7f1] border-b">
              <ResultTabButton
                active={type === "all"}
                onClick={() => changeType("all")}
              >
                <span className="block sm:inline">
                  All Results
                </span>{" "}
                <span>
                  ({counts.all.toLocaleString()})
                </span>
              </ResultTabButton>

              <ResultTabButton
                active={type === "products"}
                onClick={() => changeType("products")}
              >
                <span className="block sm:inline">
                  Products
                </span>{" "}
                <span>
                  ({counts.products.toLocaleString()})
                </span>
              </ResultTabButton>

              <ResultTabButton
                active={type === "companies"}
                onClick={() => changeType("companies")}
              >
                <span className="block sm:inline">
                  Companies
                </span>{" "}
                <span>
                  ({counts.companies.toLocaleString()})
                </span>
              </ResultTabButton>
            </div>

            {error && (
              <div className="mb-3 rounded-[7px] border border-red-200 bg-red-50 px-4 py-3 font-medium text-[10px] text-red-600">
                {error}
              </div>
            )}

            {loading ? (
              <div className="rounded-[8px] border border-[#e2e3ef] bg-white px-5 py-12 text-center">
                <p className="font-semibold text-[#555a75] text-[12px]">
                  Loading results...
                </p>
              </div>
            ) : (
              <div className="w-full min-w-0 space-y-3">
                {results.length > 0 ? (
                  results.map((result) => (
                    <SearchResultCard
                      key={`${result.type}-${result.id}`}
                      result={result}
                    />
                  ))
                ) : (
                  <div className="rounded-[8px] border border-[#e2e3ef] bg-white px-5 py-12 text-center">
                    <p className="font-semibold text-[#555a75] text-[12px]">
                      No results found.
                    </p>
                  </div>
                )}
              </div>
            )}

            {pagination && (
              <SearchPagination
                pagination={pagination}
                onPageChange={(newPage) =>
                  updateUrl({
                    page: String(newPage),
                  })
                }
              />
            )}
          </div>
        </div>
      </Container>

      {/* =========================================================
          MOBILE / TABLET FILTER DRAWER

          SearchResultsPage owns the drawer.
          SearchFilters ONLY renders the actual filters.
      ========================================================== */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          {/* Dark overlay */}
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/40"
          />

          {/* Sidebar */}
          <aside className="absolute top-0 bottom-0 left-0 flex w-[min(88vw,360px)] max-w-full flex-col bg-white shadow-2xl">
            {/* Scrollable filter content */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <SearchFilters
                businessTypes={businessTypes}
                categorySlugs={categorySlugs}
                verifiedOnly={verifiedOnly}
                premiumOnly={premiumOnly}
                state={state}
                city={city}
                facets={facets}
                onApply={applyFilters}
                onClear={clearFilters}
                onClose={() => setFiltersOpen(false)}
                isMobileDrawer
              />
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

/* ===============================================================
   RESULT TAB
================================================================ */

function ResultTabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-0 border-b-2 px-1 py-3 font-bold text-[9px] transition sm:px-3 sm:text-[11px] ${
        active
          ? "border-[#3c2cff] text-[#2218ad]"
          : "border-transparent text-[#17176f] hover:text-[#3024c5]"
      }`}
    >
      {children}
    </button>
  );
}

/* ===============================================================
   PAGINATION
================================================================ */

function SearchPagination({
  pagination,
  onPageChange,
}: {
  pagination: SearchPagination;
  onPageChange: (page: number) => void;
}) {
  const pages = getVisiblePages(
    pagination.page,
    pagination.totalPages,
  );

  return (
    <div className="mt-5 flex w-full items-center justify-center gap-1.5 overflow-x-auto py-1 sm:gap-2">
      <PaginationButton
        disabled={!pagination.hasPreviousPage}
        onClick={() => onPageChange(pagination.page - 1)}
      >
        ‹
      </PaginationButton>

      {pages.map((item, index) =>
        item === "..." ? (
          <PaginationButton
            key={`ellipsis-${index}`}
            disabled
          >
            ...
          </PaginationButton>
        ) : (
          <PaginationButton
            key={item}
            active={item === pagination.page}
            onClick={() => onPageChange(item)}
          >
            {item}
          </PaginationButton>
        ),
      )}

      <PaginationButton
        disabled={!pagination.hasNextPage}
        onClick={() => onPageChange(pagination.page + 1)}
      >
        ›
      </PaginationButton>
    </div>
  );
}

function PaginationButton({
  children,
  active = false,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={
        active
          ? "flex h-[28px] min-w-[28px] shrink-0 items-center justify-center rounded bg-[#2118ad] px-2 font-bold text-[10px] text-white"
          : "flex h-[28px] min-w-[28px] shrink-0 items-center justify-center rounded border border-[#dedff0] px-2 text-[#2118ad] text-[10px] disabled:cursor-default disabled:opacity-40"
      }
    >
      {children}
    </button>
  );
}

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): Array<number | "..."> {
  if (totalPages <= 7) {
    return Array.from(
      {
        length: totalPages,
      },
      (_, index) => index + 1,
    );
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}