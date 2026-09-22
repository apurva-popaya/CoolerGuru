"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Package } from "lucide-react";

import { StatusBadge, type StatusVariant } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import type { DataTableFeatures } from "@/lib/data-table-features";

import type { ProductRow } from "./products-data";

function approvalVariant(status: ProductRow["approvalStatus"]): StatusVariant {
  switch (status) {
    case "Approved":
      return "success";

    case "Pending":
      return "warning";

    case "Under Review":
      return "info";

    case "Rejected":
      return "danger";

    default:
      return "neutral";
  }
}

function stockVariant(status: ProductRow["stockStatus"]): StatusVariant {
  switch (status) {
    case "In Stock":
      return "success";

    case "Low Stock":
      return "warning";

    case "Out of Stock":
      return "danger";

    default:
      return "neutral";
  }
}

export const productsColumns: ColumnDef<DataTableFeatures, ProductRow>[] = [
  {
    id: "search",

    accessorFn: (row) => `${row.name} ${row.modelNumber} ${row.company} ${row.category}`,

    filterFn: "includesString",

    enableHiding: true,
  },

  {
    accessorKey: "name",

    header: "Product",

    cell: ({ row }) => (
      <div className="flex min-w-[230px] items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-[8px] border border-border bg-[#fafaff]">
          <Package className="size-5 text-[#2720a8]" />
        </div>

        <div>
          <p className="font-semibold text-[#15136f]">{row.original.name}</p>

          <p className="mt-1 text-[11px] text-muted-foreground">{row.original.modelNumber}</p>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "company",

    header: "Company",

    filterFn: "equalsString",
  },

  {
    accessorKey: "category",

    header: "Category",

    filterFn: "equalsString",
  },

  {
    accessorKey: "modelNumber",

    header: "Model Number",
  },

  {
    accessorKey: "price",

    header: "Price",

    cell: ({ row }) => (
      <span className="whitespace-nowrap font-medium text-[#15136f]">
        {row.original.price !== null ? `₹ ${row.original.price.toLocaleString("en-IN")}` : "-"}
      </span>
    ),
  },

  {
    accessorKey: "listingStatus",

    header: "Status",

    filterFn: "equalsString",

    cell: ({ row }) => (
      <StatusBadge variant={row.original.listingStatus === "Active" ? "success" : "danger"}>
        {row.original.listingStatus}
      </StatusBadge>
    ),
  },

  {
    accessorKey: "stockStatus",

    header: "Stock",

    filterFn: "equalsString",

    cell: ({ row }) => (
      <StatusBadge variant={stockVariant(row.original.stockStatus)}>{row.original.stockStatus}</StatusBadge>
    ),
  },

  {
    accessorKey: "approvalStatus",

    header: "Approval Status",

    filterFn: "equalsString",

    cell: ({ row }) => (
      <StatusBadge variant={approvalVariant(row.original.approvalStatus)}>{row.original.approvalStatus}</StatusBadge>
    ),
  },

  {
    accessorKey: "views",
    header: "Views",
  },

  {
    accessorKey: "savedCount",
    header: "Saved",
  },

  {
    accessorKey: "inquiries",
    header: "Inquiries",
  },

  {
    id: "action",

    header: () => <div className="text-center">Action</div>,

    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 gap-2 border-[#cfcdf5] px-3 text-[#2720a8] hover:bg-[#f3f2ff]"
        >
          <Link href={`/admin/products/${row.original.slug}`}>
            <Eye className="size-4" />
            View
          </Link>
        </Button>
      </div>
    ),

    enableSorting: false,
  },
];
