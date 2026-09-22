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

type SortOption = "featured" | "verified" | "premium" | "name-asc" | "name-desc" | "experience-high" | "products-high";

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

  const selectedSortLabel = sortOptions.find((option) => option.value === sortBy)?.label ?? "Featured First";

  const filteredCompanies = useMemo(() => {
    return directoryCompanies.filter((company) => matchesTab(company, activeTab));
  }, [activeTab]);

  const sortedCompanies = useMemo(() => {
    return [...filteredCompanies].sort((a, b) => sortCompanies(a, b, sortBy));
  }, [filteredCompanies, sortBy]);

  const actualPageCount = Math.max(Math.ceil(sortedCompanies.length / PAGE_SIZE), 1);
  const safePage = Math.min(currentPage, actualPageCount);
  const startIndex = (safePage - 1) * PAGE_SIZE;

  const visibleCompanies = sortedCompanies.slice(startIndex, startIndex + PAGE_SIZE);

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
    <section className="bg-white py-5">
      <Container>
        <div className="w-full">
          {/* Breadcrumb */}
          <div className="mb-3 flex items-center gap-1.5 text-[#666b83] text-[10px]">
            <Link href="/" className="transition hover:text-[#2118ad]">
              Home
            </Link>

            <ChevronRight size={12} />

            <span className="font-medium text-[#2118ad]">Companies</span>
          </div>

          {/* Heading */}
          <div className="mb-4 flex items-end justify-between gap-5">
            <div>
              <h1 className="font-bold text-[#171570] text-[30px] leading-tight">Air Cooler Companies</h1>

              <p className="mt-1 max-w-[500px] font-medium text-[#444b69] text-[11px] leading-[1.45]">
                Discover trusted manufacturers, suppliers, exporters and industry businesses across India.
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <p className="font-bold text-[#2118ad] text-[11px]">
                {TOTAL_COMPANY_COUNT.toLocaleString()} Companies Found
              </p>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#34395d] text-[10px]">Sort by:</span>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortOpen((previous) => !previous)}
                    className="flex h-[38px] min-w-[180px] items-center justify-between gap-4 rounded-[6px] border border-[#dedff0] bg-white px-3 font-semibold text-[#383d5f] text-[10px] transition hover:border-[#bbb8eb]"
                  >
                    <span className="whitespace-nowrap">{selectedSortLabel}</span>

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
                    <div className="absolute top-[44px] right-0 z-50 w-[230px] overflow-hidden rounded-[8px] border border-[#dedff0] bg-white py-1.5 shadow-[0_10px_30px_rgba(31,24,150,0.13)]">
                      {sortOptions.map((option) => {
                        const active = sortBy === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSortChange(option.value)}
                            className={
                              active
                                ? "flex w-full items-center justify-between gap-3 bg-[#f1efff] px-4 py-2.5 text-left font-medium text-[#2118ad] text-[10px] transition"
                                : "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left font-medium text-[#3e4262] text-[10px] transition hover:bg-[#f8f8ff]"
                            }
                          >
                            <span>{option.label}</span>

                            {active && <Check size={13} strokeWidth={2.5} className="shrink-0 text-[#2118ad]" />}
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
          <CompanyTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Companies */}
          {visibleCompanies.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {visibleCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="mt-4 flex min-h-[260px] flex-col items-center justify-center rounded-[8px] border border-[#dedff0] border-dashed bg-[#fafaff] text-center">
              <h3 className="font-bold text-[#171570] text-[14px]">No companies found</h3>

              <p className="mt-2 text-[#666b82] text-[10px]">No companies match the selected filter.</p>
            </div>
          )}

          {/* Pagination */}
          <CompaniesPagination currentPage={safePage} totalPages={actualPageCount} onPageChange={setCurrentPage} />
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
  return company.businessTypes.some((businessType) => businessType.toLowerCase() === type.toLowerCase());
}

function sortCompanies(a: DirectoryCompany, b: DirectoryCompany, sortBy: SortOption) {
  switch (sortBy) {
    case "verified":
      return Number(Boolean(b.isVerified)) - Number(Boolean(a.isVerified));

    case "premium":
      return Number(Boolean(b.isPremium)) - Number(Boolean(a.isPremium));

    case "name-asc":
      return a.name.localeCompare(b.name);

    case "name-desc":
      return b.name.localeCompare(a.name);

    case "experience-high":
      return extractNumber(b.yearsInBusiness) - extractNumber(a.yearsInBusiness);

    case "products-high":
      return extractNumber(b.productCount) - extractNumber(a.productCount);
    default:
      return Number(Boolean(b.isPremium)) - Number(Boolean(a.isPremium));
  }
}

function extractNumber(value: string) {
  const result = value.match(/\d+/);

  return result ? Number(result[0]) : 0;
}
