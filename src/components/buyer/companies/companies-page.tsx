"use client";

import * as React from "react";

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Container } from "@/components/common/container";

import {
  getCompanies,
  type CompaniesPagination as CompaniesPaginationData,
} from "@/lib/api/companies-api";

import { mapApiCompanyToDirectoryCompany } from "@/lib/mappers/company-mapper";

import type { DirectoryCompany } from "@/types/company-directory";

import { CompanyCard } from "./company-card";
import {
  CompanyTabs,
  type CompanyTab,
} from "./company-tabs";
import { CompaniesPagination } from "./companies-pagination";

const PAGE_SIZE = 12;

/**
 * Maps the UI tab value to the business_type
 * expected by the backend API.
 */
const BUSINESS_TYPE_MAP: Record<
  Exclude<CompanyTab, "all">,
  string
> = {
  manufacturers: "MANUFACTURER",
  suppliers: "SUPPLIER",
  exporters: "EXPORTER",
  oem: "OEM",
  distributors: "DISTRIBUTOR",
};

function getTabFromBusinessType(
  businessType: string | null,
): CompanyTab {
  if (!businessType) {
    return "all";
  }

  const normalized = businessType.toLowerCase();

  switch (normalized) {
    case "manufacturer":
    case "manufacturers":
      return "manufacturers";

    case "supplier":
    case "suppliers":
      return "suppliers";

    case "exporter":
    case "exporters":
      return "exporters";

    case "oem":
      return "oem";

    case "distributor":
    case "distributors":
      return "distributors";

    default:
      return "all";
  }
}

export function CompaniesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const city = searchParams.get("city");
  const state = searchParams.get("state");

  /*
   * Support both:
   *
   * ?businessType=manufacturer
   *
   * and
   *
   * ?business_type=MANUFACTURER
   */
  const businessType =
    searchParams.get("businessType") ??
    searchParams.get("business_type");

  const activeTab = React.useMemo(
    () => getTabFromBusinessType(businessType),
    [businessType],
  );

  const [companies, setCompanies] =
    React.useState<DirectoryCompany[]>([]);

  const [pagination, setPagination] =
    React.useState<CompaniesPaginationData>({
      page: 1,
      limit: PAGE_SIZE,
      totalItems: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  const [loading, setLoading] =
    React.useState(true);

  const [error, setError] =
    React.useState<string | null>(null);

  const fetchCompanies = React.useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        setError(null);

        /*
         * Convert URL business type to the value
         * expected by the backend.
         */
        let apiBusinessType: string | undefined;

        if (businessType) {
          const normalized =
            businessType.toLowerCase();

          switch (normalized) {
            case "manufacturer":
            case "manufacturers":
              apiBusinessType = "MANUFACTURER";
              break;

            case "supplier":
            case "suppliers":
              apiBusinessType = "SUPPLIER";
              break;

            case "exporter":
            case "exporters":
              apiBusinessType = "EXPORTER";
              break;

            case "oem":
              apiBusinessType = "OEM";
              break;

            case "distributor":
            case "distributors":
              apiBusinessType = "DISTRIBUTOR";
              break;

            default:
              apiBusinessType = undefined;
          }
        }

        const response = await getCompanies(
          page,
          PAGE_SIZE,
          {
            city: city || undefined,
            state: state || undefined,
            business_type: apiBusinessType,
          },
        );

        const mappedCompanies =
          response.data.companies.map(
            mapApiCompanyToDirectoryCompany,
          );

        setCompanies(mappedCompanies);

        setPagination(
          response.data.pagination,
        );
      } catch (err) {
        console.error(
          "Failed to fetch companies:",
          err,
        );

        setError(
          "Unable to load companies. Please try again.",
        );

        setCompanies([]);
      } finally {
        setLoading(false);
      }
    },
    [city, state, businessType],
  );

  React.useEffect(() => {
    fetchCompanies(1);
  }, [fetchCompanies]);

  function handlePageChange(page: number) {
    if (
      page < 1 ||
      page > pagination.totalPages ||
      page === pagination.page
    ) {
      return;
    }

    fetchCompanies(page);
  }

  function handleTabChange(tab: CompanyTab) {
    /*
     * All Companies
     */
    if (tab === "all") {
      const params = new URLSearchParams(
        searchParams.toString(),
      );

      params.delete("businessType");
      params.delete("business_type");

      router.push(
        `/companies${
          params.toString()
            ? `?${params.toString()}`
            : ""
        }`,
      );

      return;
    }

    /*
     * Business-type tab
     */
    const businessType =
      BUSINESS_TYPE_MAP[tab];

    const params = new URLSearchParams(
      searchParams.toString(),
    );

    /*
     * Keep using businessType in the URL
     * because the homepage also uses it.
     */
    params.set("businessType", businessType);

    /*
     * Remove the old API-style parameter
     * so we have only one source of truth.
     */
    params.delete("business_type");

    router.push(
      `/companies?${params.toString()}`,
    );
  }

  return (
    <main className="bg-[#f8f8fc] py-5 sm:py-7">
      <Container>
        {/* Header */}
        <div className="mb-5">
          <h1 className="font-bold text-[#15157d] text-[22px] sm:text-[26px]">
            Companies
          </h1>

          <p className="mt-1 text-[11px] text-[#626780] sm:text-[12px]">
            Discover verified manufacturers,
            suppliers, exporters and other
            industry companies.
          </p>
        </div>

        {/* Tabs */}
        <CompanyTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          totalCompanies={
            pagination.totalItems
          }
        />

        {/* Content */}
        <div className="mt-5">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-2 text-[#2116a5]">
                <Loader2 className="size-5 animate-spin" />

                <span className="font-medium text-[12px]">
                  Loading companies...
                </span>
              </div>
            </div>
          ) : error ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[8px] border border-[#e2e3ed] bg-white px-4 text-center">
              <p className="font-semibold text-[#15157d] text-[13px]">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  fetchCompanies(
                    pagination.page,
                  )
                }
                className="mt-3 rounded-[5px] bg-[#2116a5] px-4 py-2 font-semibold text-[10px] text-white hover:bg-[#3022c6]"
              >
                Try Again
              </button>
            </div>
          ) : companies.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-[8px] border border-[#e2e3ed] bg-white">
              <p className="text-[12px] text-[#696d85]">
                No companies found.
              </p>
            </div>
          ) : (
            <>
              {/* Result count */}
              <div className="mb-3 flex items-center justify-between">
                <p className="font-semibold text-[#535873] text-[10px]">
                  Showing{" "}
                  <span className="text-[#2116a5]">
                    {companies.length}
                  </span>{" "}
                  companies
                </p>

                <p className="text-[10px] text-[#777b91]">
                  {pagination.totalItems}{" "}
                  total companies
                </p>
              </div>

              {/* Company Grid */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {companies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <CompaniesPagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </Container>
    </main>
  );
}