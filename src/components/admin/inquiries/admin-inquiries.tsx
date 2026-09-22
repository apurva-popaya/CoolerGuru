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

import { inquiriesColumns } from "./inquiries-columns";
import { inquiriesData } from "./inquiries-data";
import { InquiriesFilters } from "./inquiries-filters";
import { InquiriesStats } from "./inquiries-stats";

export function AdminInquiries() {
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

    data: inquiriesData,

    columns: inquiriesColumns,

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

  const newCount = inquiriesData.filter((item) => item.status === "New").length;

  const replied = inquiriesData.filter((item) => item.status === "Replied").length;

  const discussion = inquiriesData.filter((item) => item.status === "In Discussion").length;

  const closed = inquiriesData.filter((item) => item.status === "Closed").length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Inquiries"
        description="Monitor buyer and supplier inquiries across CoolerGuru and track their current status."
        action={
          <Button variant="outline" className="h-10 gap-2 border-[#cfcdf5] text-[#2720a8]">
            <Download className="size-4" />
            Export Inquiries
          </Button>
        }
      />

      <InquiriesStats
        total={inquiriesData.length}
        newCount={newCount}
        replied={replied}
        discussion={discussion}
        closed={closed}
      />

      <InquiriesFilters table={table} />

      <div>
        <h2 className="mb-3 font-bold text-[#15136f] text-[17px]">
          Inquiries ({table.getFilteredRowModel().rows.length})
        </h2>

        <DataTable
          table={table}
          emptyState={{
            title: "No inquiries found",
            description: "Try changing or resetting the inquiry filters.",
          }}
        />
      </div>
    </div>
  );
}
