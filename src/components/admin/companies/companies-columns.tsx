"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";
import { Building2, Eye } from "lucide-react";

import { StatusBadge, type StatusVariant } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import type { DataTableFeatures } from "@/lib/data-table-features";

import type { CompanyRow } from "./companies-data";

function getVerificationVariant(status: CompanyRow["verificationStatus"]): StatusVariant {
  switch (status) {
    case "Verified":
      return "success";

    case "Pending":
      return "warning";

    case "Under Verification":
      return "info";

    case "Rejected":
      return "danger";

    default:
      return "neutral";
  }
}

function getBusinessTypeVariant(type: CompanyRow["businessType"]): StatusVariant {
  switch (type) {
    case "Manufacturer":
      return "info";

    case "Supplier":
      return "purple";

    case "Exporter":
      return "info";

    case "Distributor":
      return "success";

    case "Trader":
      return "purple";

    default:
      return "neutral";
  }
}

export const companiesColumns: ColumnDef<DataTableFeatures, CompanyRow>[] = [
  {
    id: "search",

    accessorFn: (row) => `${row.name} ${row.location} ${row.businessType} ${row.verificationStatus}`,

    filterFn: "includesString",

    enableHiding: true,
  },

  {
    accessorKey: "name",

    header: "Company",

    cell: ({ row }) => (
      <div className="flex min-w-[210px] items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-border bg-[#fafaff]">
          <Building2 className="size-5 text-[#2720a8]" />
        </div>

        <div className="min-w-0">
          <p className="truncate font-semibold text-[#15136f]">{row.original.name}</p>

          <p className="text-[11px] text-muted-foreground">ID: {row.original.id}</p>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "location",

    header: "Location",

    filterFn: "equalsString",

    cell: ({ row }) => <span className="text-[#5d6280]">{row.original.location}</span>,
  },

  {
    accessorKey: "businessType",

    header: "Business Type",

    filterFn: "equalsString",

    cell: ({ row }) => (
      <StatusBadge variant={getBusinessTypeVariant(row.original.businessType)}>{row.original.businessType}</StatusBadge>
    ),
  },

  {
    accessorKey: "verificationStatus",

    header: "Verification Status",

    filterFn: "equalsString",

    cell: ({ row }) => (
      <StatusBadge variant={getVerificationVariant(row.original.verificationStatus)}>
        {row.original.verificationStatus}
      </StatusBadge>
    ),
  },

  {
    accessorKey: "productsCount",

    header: "Products",

    cell: ({ row }) => <span className="font-medium text-[#11163d]">{row.original.productsCount}</span>,
  },

  {
    accessorKey: "inquiriesReceived",

    header: "Inquiries",

    cell: ({ row }) => <span className="font-medium text-[#11163d]">{row.original.inquiriesReceived}</span>,
  },

  {
    id: "featured",

    accessorFn: (row) => (row.featured ? "Featured" : "Not Featured"),

    header: "Featured",

    filterFn: "equalsString",

    cell: ({ row }) => (
      <StatusBadge variant={row.original.featured ? "success" : "neutral"}>
        {row.original.featured ? "Yes" : "No"}
      </StatusBadge>
    ),
  },

  {
    accessorKey: "joinedDate",

    header: "Joined Date",

    cell: ({ row }) => <span className="whitespace-nowrap text-[#5d6280]">{row.original.joinedDate}</span>,
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
          className="h-8 gap-2 border-[#cfcdf5] px-3 text-[#2720a8] hover:bg-[#f3f2ff] hover:text-[#2720a8]"
        >
          <Link href={`/admin/companies/${row.original.id}`}>
            <Eye className="size-4" />
            View
          </Link>
        </Button>
      </div>
    ),

    enableSorting: false,
    enableHiding: false,
  },
];