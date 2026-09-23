"use client";

import * as React from "react";

import {
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import { Download } from "lucide-react";

import { DataTable } from "@/components/common/data-table/data-table";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { dataTableFeatures } from "@/lib/data-table-features";

import { companiesColumns } from "./companies-columns";
import { companiesData } from "./companies-data";
import { CompaniesFilters } from "./companies-filters";
import { CompaniesStats } from "./companies-stats";

export function AdminCompanies() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({
    search: false,
  });

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useTable({
    features: dataTableFeatures,

    data: companiesData,

    columns: companiesColumns,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
      rowSelection,
    },

    getRowId: (row) => row.id,

    autoResetPageIndex: false,

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    onColumnVisibilityChange: setColumnVisibility,

    onPaginationChange: setPagination,

    onRowSelectionChange: setRowSelection,
  });

  const total = companiesData.length;

  const verified = companiesData.filter((company) => company.verificationStatus === "Verified").length;

  const underVerification = companiesData.filter(
    (company) => company.verificationStatus === "Under Verification" || company.verificationStatus === "Pending",
  ).length;

  const rejected = companiesData.filter((company) => company.verificationStatus === "Rejected").length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="All Companies"
        description="View and manage all companies registered on CoolerGuru."
        action={
          <Button variant="outline" className="h-10 gap-2 border-[#cfcdf5] bg-white text-[#2720a8]">
            <Download className="size-4" />
            Export Companies
          </Button>
        }
      />

      <CompaniesStats total={total} verified={verified} underVerification={underVerification} rejected={rejected} />

      <CompaniesFilters table={table} />

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-[#15136f] text-[17px]">
            Companies ({table.getFilteredRowModel().rows.length})
          </h2>
        </div>

        <DataTable
          table={table}
          emptyState={{
            title: "No companies found",
            description: "Try changing or resetting your filters.",
          }}
          paginationConfig={{
            pageSizeOptions: [10, 20, 30, 50],
          }}
        />
      </div>
    </div>
  );
}