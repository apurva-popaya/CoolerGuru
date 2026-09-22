"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MinusCircle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DataTableFeatures } from "@/lib/data-table-features";

import type { FeaturedCompanyRow } from "./featured-companies-data";

interface CreateColumnsProps {
  onToggleFeatured: (companyId: string) => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export function createFeaturedCompaniesColumns({
  onToggleFeatured,
}: CreateColumnsProps): ColumnDef<DataTableFeatures, FeaturedCompanyRow>[] {
  return [
    {
      id: "search",

      accessorFn: (row) => `${row.name} ${row.location} ${row.businessType}`,

      filterFn: "includesString",

      enableHiding: true,
    },

    {
      id: "featuredStatus",

      accessorFn: (row) => (row.isFeatured ? "Featured" : "Not Featured"),

      filterFn: "equalsString",

      enableHiding: true,
    },

    {
      accessorKey: "name",

      header: "Company",

      cell: ({ row }) => (
        <div className="flex min-w-[230px] items-center gap-4">
          <div className="flex h-10 min-w-[56px] items-center justify-center font-bold text-[#15136f] text-[15px]">
            {getInitials(row.original.name)}
          </div>

          <span className="font-semibold text-[#15136f]">{row.original.name}</span>
        </div>
      ),
    },

    {
      accessorKey: "location",

      header: "Location",

      cell: ({ row }) => <span className="text-[#5d6280]">{row.original.location}</span>,
    },

    {
      accessorKey: "businessType",

      header: "Business Type",

      filterFn: "equalsString",

      cell: ({ row }) => <span className="text-[#5d6280]">{row.original.businessType}</span>,
    },

    {
      accessorKey: "featuredSince",

      header: "Featured Since",

      cell: ({ row }) => <span className="text-[#5d6280]">{row.original.featuredSince ?? "-"}</span>,
    },

    {
      accessorKey: "priority",

      header: "Priority",

      cell: ({ row }) =>
        row.original.priority !== null ? (
          <div className="flex size-10 items-center justify-center rounded-[7px] border border-border bg-white font-medium text-[#15136f] text-[12px]">
            {row.original.priority}
          </div>
        ) : (
          <div className="flex size-10 items-center justify-center rounded-[7px] border border-border bg-white text-[12px] text-muted-foreground">
            -
          </div>
        ),
    },

    {
      id: "action",

      header: "Action",

      cell: ({ row }) => {
        const company = row.original;

        if (company.isFeatured) {
          return (
            <Button
              type="button"
              variant="outline"
              onClick={() => onToggleFeatured(company.id)}
              className="h-9 min-w-[180px] gap-2 border-[#efcaca] text-red-600 hover:bg-red-50 hover:text-red-600"
            >
              <MinusCircle className="size-4" />
              Remove from Featured
            </Button>
          );
        }

        return (
          <Button
            type="button"
            variant="outline"
            onClick={() => onToggleFeatured(company.id)}
            className="h-9 min-w-[180px] gap-2 border-[#8ea0ff] text-[#2720a8] hover:bg-[#f3f2ff]"
          >
            <Plus className="size-4" />
            Add to Featured
          </Button>
        );
      },

      enableSorting: false,
    },
  ];
}
