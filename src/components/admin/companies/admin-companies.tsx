"use client";

import * as React from "react";

import {
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import { Download, Loader2 } from "lucide-react";

import { DataTable } from "@/components/common/data-table/data-table";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { dataTableFeatures } from "@/lib/data-table-features";
import {
  getAdminCompanies,
  type AdminCompanyVerificationStatus,
} from "@/lib/api/admin-companies-api";

import {
  companiesColumns,
} from "./companies-columns";

import {
  CompaniesFilters,
} from "./companies-filters";

import {
  CompaniesStats,
} from "./companies-stats";

import {
  mapAdminCompanyToRow,
  type CompanyRow,
} from "./companies-data";

export function AdminCompanies() {
  const [companies, setCompanies] =
    React.useState<CompanyRow[]>([]);

  const [loading, setLoading] =
    React.useState(true);

  const [error, setError] =
    React.useState<string | null>(null);

  const [totalItems, setTotalItems] =
    React.useState(0);

  const [paginationInfo, setPaginationInfo] =
    React.useState({
      page: 1,
      limit: 10,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  const [sorting, setSorting] =
    React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({
      search: false,
    });

  const [pagination, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const [rowSelection, setRowSelection] =
    React.useState({});

  const loadCompanies =
    React.useCallback(
      async () => {
        try {
          setLoading(true);
          setError(null);

          const verificationFilter =
            columnFilters.find(
              (filter) =>
                filter.id ===
                "verificationStatus",
            )?.value;

          let verification_status:
            | AdminCompanyVerificationStatus
            | undefined;

          if (
            verificationFilter ===
            "Pending"
          ) {
            verification_status =
              "PENDING";
          } else if (
            verificationFilter ===
            "Under Verification"
          ) {
            verification_status =
              "UNDER_VERIFICATION";
          } else if (
            verificationFilter ===
            "Verified"
          ) {
            verification_status =
              "VERIFIED";
          } else if (
            verificationFilter ===
            "Rejected"
          ) {
            verification_status =
              "REJECTED";
          } else if (
            verificationFilter ===
            "Draft"
          ) {
            verification_status =
              "DRAFT";
          }

          const response =
            await getAdminCompanies({
              verification_status,

              page:
                pagination.pageIndex + 1,

              limit:
                pagination.pageSize,
            });

          const apiCompanies =
            response.data?.companies ?? [];

          const mappedCompanies =
            apiCompanies.map(
              mapAdminCompanyToRow,
            );

          setCompanies(
            mappedCompanies,
          );

          if (
            response.data?.pagination
          ) {
            setPaginationInfo(
              response.data.pagination,
            );

            setTotalItems(
              response.data.pagination
                .totalItems,
            );
          } else {
            setTotalItems(
              mappedCompanies.length,
            );
          }
        } catch (err) {
          console.error(
            "Failed to fetch admin companies:",
            err,
          );

          setError(
            err instanceof Error
              ? err.message
              : "Unable to fetch companies.",
          );

          setCompanies([]);
        } finally {
          setLoading(false);
        }
      },
      [
        pagination.pageIndex,
        pagination.pageSize,
        columnFilters,
      ],
    );

  React.useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  const table =
    useTable({
      features:
        dataTableFeatures,

      data: companies,

      columns:
        companiesColumns,

      state: {
        sorting,
        columnFilters,
        columnVisibility,
        pagination,
        rowSelection,
      },

      getRowId: (row) =>
        row.id,

      autoResetPageIndex:
        false,

      manualPagination:
        true,

      pageCount:
        paginationInfo.totalPages,

      onSortingChange:
        setSorting,

      onColumnFiltersChange:
        setColumnFilters,

      onColumnVisibilityChange:
        setColumnVisibility,

      onPaginationChange:
        setPagination,

      onRowSelectionChange:
        setRowSelection,
    });

  /*
   * Stats are based on the API data returned for the
   * current filter/page, except total which comes from
   * API pagination.
   *
   * If the backend later provides dedicated statistics,
   * we can replace these calculations directly.
   */
  const verified =
    companies.filter(
      (company) =>
        company.rawVerificationStatus ===
        "VERIFIED",
    ).length;

  const underVerification =
    companies.filter(
      (company) =>
        company.rawVerificationStatus ===
          "UNDER_VERIFICATION" ||
        company.rawVerificationStatus ===
          "PENDING",
    ).length;

  const rejected =
    companies.filter(
      (company) =>
        company.rawVerificationStatus ===
        "REJECTED",
    ).length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="All Companies"
        description="View and manage all companies registered on CoolerGuru."
        action={
          <Button
            variant="outline"
            className="h-10 gap-2 border-[#cfcdf5] bg-white text-[#2720a8]"
          >
            <Download className="size-4" />

            Export Companies
          </Button>
        }
      />

      <CompaniesStats
        total={totalItems}
        verified={verified}
        underVerification={
          underVerification
        }
        rejected={rejected}
      />

      <CompaniesFilters
        table={table}
      />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-[#15136f] text-[17px]">
            Companies (
            {totalItems}
            )
          </h2>

          {loading && (
            <div className="flex items-center gap-2 text-[#5d6280] text-sm">
              <Loader2 className="size-4 animate-spin" />

              Loading...
            </div>
          )}
        </div>

        <DataTable
          table={table}
          emptyState={{
            title: loading
              ? "Loading companies..."
              : "No companies found",

            description: loading
              ? "Please wait while companies are being loaded."
              : "Try changing or resetting your filters.",
          }}
          paginationConfig={{
            pageSizeOptions: [
              10,
              20,
              30,
              50,
            ],
          }}
        />
      </div>
    </div>
  );
}