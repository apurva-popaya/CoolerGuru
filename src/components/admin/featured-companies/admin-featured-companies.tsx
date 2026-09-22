"use client";

import * as React from "react";

import {
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";

import { DataTable } from "@/components/common/data-table/data-table";
import { PageHeader } from "@/components/common/page-header";
import { dataTableFeatures } from "@/lib/data-table-features";

import { createFeaturedCompaniesColumns } from "./featured-companies-columns";
import { type FeaturedCompanyRow, featuredCompaniesData } from "./featured-companies-data";
import { FeaturedCompaniesFilters } from "./featured-companies-filters";

export function AdminFeaturedCompanies() {
  const [companies, setCompanies] = React.useState<FeaturedCompanyRow[]>(featuredCompaniesData);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({
    search: false,
    featuredStatus: false,
  });

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const toggleFeatured = React.useCallback((companyId: string) => {
    setCompanies((current) => {
      const company = current.find((item) => item.id === companyId);

      if (!company) {
        return current;
      }

      /*
       * REMOVE FROM FEATURED
       */
      if (company.isFeatured) {
        return current.map((item) =>
          item.id === companyId
            ? {
                ...item,

                isFeatured: false,

                featuredSince: null,

                priority: null,
              }
            : item,
        );
      }

      /*
       * ADD TO FEATURED
       *
       * For mock UI we
       * automatically assign
       * the next priority.
       *
       * Later backend can return
       * the real priority.
       */

      const highestPriority = current.reduce((maximum, item) => {
        if (!item.isFeatured || item.priority === null) {
          return maximum;
        }

        return Math.max(maximum, item.priority);
      }, 0);

      return current.map((item) =>
        item.id === companyId
          ? {
              ...item,

              isFeatured: true,

              featuredSince: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),

              priority: highestPriority + 1,
            }
          : item,
      );
    });
  }, []);

  const columns = React.useMemo(
    () =>
      createFeaturedCompaniesColumns({
        onToggleFeatured: toggleFeatured,
      }),
    [toggleFeatured],
  );

  const table = useTable({
    features: dataTableFeatures,

    data: companies,

    columns,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },

    getRowId: (row) => row.id,

    autoResetPageIndex: false,

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    onColumnVisibilityChange: setColumnVisibility,

    onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Featured Companies" description="Manage companies featured on the homepage." />

      <FeaturedCompaniesFilters table={table} />

      <DataTable
        table={table}
        emptyState={{
          title: "No companies found",

          description: "Try changing the featured company filters.",
        }}
      />
    </div>
  );
}
