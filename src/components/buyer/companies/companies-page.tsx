"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { Check, ChevronDown, ChevronRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { directoryCompanies } from "@/data/companies-directory";
import type { DirectoryCompany } from "@/types/company-directory";

import { CompaniesPagination } from "./companies-pagination";
import { CompanyCard } from "./company-card";
import { type CompanyTab, CompanyTabs } from "./company-tabs";

type SortOption =
  | "featured"
  | "verified"
  | "premium"
  | "name-asc"
  | "name-desc"
  | "experience-high"
  | "products-high";

interface SortItem {
  value: SortOption;
  label: string;
}

const sortOptions: SortItem[] = [
  {
    value: "featured",
    label: "Featured First",
  },
  {
    value: "verified",
    label: "Verified First",
  },
  {
    value: "premium",
    label: "Premium First",
  },
  {
    value: "name-asc",
    label: "Company Name A - Z",
  },
  {
    value: "name-desc",
    label: "Company Name Z - A",
  },
  {
    value: "experience-high",
    label: "Years in Business: High to Low",
  },
  {
    value: "products-high",
    label: "Products: High to Low",
  },
];

const PAGE_SIZE = 6;
const TOTAL_COMPANY_COUNT = 1254;

export function CompaniesPage() {
  const [activeTab, setActiveTab] = useState<CompanyTab>("all");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ?? "Featured First";

  const filteredCompanies = useMemo(() => {
    return directoryCompanies.filter((company) => matchesTab(company, activeTab));
  }, [activeTab]);

  const sortedCompanies = useMemo(() => {
    return [...filteredCompanies].sort((a, b) => sortCompanies(a, b, sortBy));
  }, [filteredCompanies, sortBy]);

  const actualPageCount = Math.max(
    Math.ceil(sortedCompanies.length / PAGE_SIZE),
    1,
  );

  const safePage = Math.min(currentPage, actualPageCount);

  const startIndex = (safePage - 1) * PAGE_SIZE;

  const visibleCompanies = sortedCompanies.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  function handleTabChange(tab: CompanyTab) {
    setActiveTab(tab);
    setCurrentPage(1);
  }

  function handleSortChange(value: SortOption) {
    setSortBy(value);
    setSortOpen(false);
    setCurrentPage(1);
  }

  return (
    <section className="bg-white py-4 sm:py-5">
      <Container>
        <div className="w-full">
          {/* Breadcrumb */}
          <div className="mb-3 flex min-w-0 items-center gap-1.5 overflow-hidden text-[10px] text-[#666b83]">
            <Link
              href="/"
              className="shrink-0 transition hover:text-[#2118ad]"
            >
              Home
            </Link>

            <ChevronRight size={12} className="shrink-0" />

            <span className="truncate font-medium text-[#2118ad]">
              Companies
            </span>
          </div>

          {/* Heading + Sort */}
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <h1 className="font-bold text-[24px] leading-tight text-[#171570] sm:text-[30px]">
                Air Cooler Companies
              </h1>

              <p className="mt-1 max-w-[500px] font-medium text-[10px] leading-[1.5] text-[#444b69] sm:text-[11px]">
                Discover trusted manufacturers, suppliers, exporters and
                industry businesses across India.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:w-auto lg:flex-col lg:items-end">
              <p className="font-bold text-[10px] text-[#2118ad] sm:text-[11px]">
                {TOTAL_COMPANY_COUNT.toLocaleString()} Companies Found
              </p>

              {/* Sort */}
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <span className="shrink-0 font-semibold text-[10px] text-[#34395d]">
                  Sort by:
                </span>

                <div className="relative min-w-0 flex-1 sm:flex-none">
                  <button
                    type="button"
                    onClick={() => setSortOpen((previous) => !previous)}
                    className="flex h-[38px] w-full min-w-0 items-center justify-between gap-3 rounded-[6px] border border-[#dedff0] bg-white px-3 font-semibold text-[10px] text-[#383d5f] transition hover:border-[#bbb8eb] sm:min-w-[180px]"
                  >
                    <span className="truncate whitespace-nowrap">
                      {selectedSortLabel}
                    </span>

                    <ChevronDown
                      size={14}
                      className={
                        sortOpen
                          ? "shrink-0 rotate-180 text-[#2118ad] transition-transform duration-200"
                          : "shrink-0 text-[#2118ad] transition-transform duration-200"
                      }
                    />
                  </button>

                  {sortOpen && (
                    <div className="absolute top-[44px] right-0 z-50 w-[230px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[8px] border border-[#dedff0] bg-white py-1.5 shadow-[0_10px_30px_rgba(31,24,150,0.13)]">
                      {sortOptions.map((option) => {
                        const active = sortBy === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSortChange(option.value)}
                            className={
                              active
                                ? "flex w-full items-center justify-between gap-3 bg-[#f1efff] px-4 py-2.5 text-left font-medium text-[10px] text-[#2118ad] transition"
                                : "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left font-medium text-[10px] text-[#3e4262] transition hover:bg-[#f8f8ff]"
                            }
                          >
                            <span className="truncate">
                              {option.label}
                            </span>

                            {active && (
                              <Check
                                size={13}
                                strokeWidth={2.5}
                                className="shrink-0 text-[#2118ad]"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <CompanyTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Companies */}
          {visibleCompanies.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {visibleCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 flex min-h-[220px] flex-col items-center justify-center rounded-[8px] border border-dashed border-[#dedff0] bg-[#fafaff] px-4 text-center sm:min-h-[260px]">
              <h3 className="font-bold text-[14px] text-[#171570]">
                No companies found
              </h3>

              <p className="mt-2 text-[10px] text-[#666b82]">
                No companies match the selected filter.
              </p>
            </div>
          )}

          {/* Pagination */}
          <CompaniesPagination
            currentPage={safePage}
            totalPages={actualPageCount}
            onPageChange={setCurrentPage}
          />
        </div>
      </Container>
    </section>
  );
}

function matchesTab(company: DirectoryCompany, tab: CompanyTab) {
  switch (tab) {
    case "verified":
      return Boolean(company.isVerified);

    case "premium":
      return Boolean(company.isPremium);

    case "manufacturers":
      return hasBusinessType(company, "Manufacturer");

    case "suppliers":
      return hasBusinessType(company, "Supplier");

    case "exporters":
      return hasBusinessType(company, "Exporter");

    default:
      return true;
  }
}

function hasBusinessType(company: DirectoryCompany, type: string) {
  return company.businessTypes.some(
    (businessType) =>
      businessType.toLowerCase() === type.toLowerCase(),
  );
}

function sortCompanies(
  a: DirectoryCompany,
  b: DirectoryCompany,
  sortBy: SortOption,
) {
  switch (sortBy) {
    case "verified":
      return (
        Number(Boolean(b.isVerified)) -
        Number(Boolean(a.isVerified))
      );

    case "premium":
      return (
        Number(Boolean(b.isPremium)) -
        Number(Boolean(a.isPremium))
      );

    case "name-asc":
      return a.name.localeCompare(b.name);

    case "name-desc":
      return b.name.localeCompare(a.name);

    case "experience-high":
      return (
        extractNumber(b.yearsInBusiness) -
        extractNumber(a.yearsInBusiness)
      );

    case "products-high":
      return (
        extractNumber(b.productCount) -
        extractNumber(a.productCount)
      );

    default:
      return (
        Number(Boolean(b.isPremium)) -
        Number(Boolean(a.isPremium))
      );
  }
}

function extractNumber(value: string) {
  const result = value.match(/\d+/);

  return result ? Number(result[0]) : 0;
}