"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { StatusBadge, type StatusVariant } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import type { DataTableFeatures } from "@/lib/data-table-features";

import { UserActionsMenu } from "./user-actions-menu";
import type { AdminUserRow } from "./users-data";

function roleVariant(role: AdminUserRow["role"]): StatusVariant {
  if (role === "Buyer") {
    return "info";
  }

  return "purple";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function createUsersColumns({
  onDelete,
}: {
  onDelete?: (userId: string) => void;
} = {}): ColumnDef<DataTableFeatures, AdminUserRow>[] {
  return [
    {
      id: "search",

      accessorFn: (row) => `${row.name} ${row.mobile}`,

      filterFn: "includesString",

      enableHiding: true,
    },

    {
      accessorKey: "name",

      header: "Name",

      cell: ({ row }) => (
        <div className="flex min-w-[190px] items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#edf3ff] font-bold text-[#2720a8] text-[12px]">
            {getInitials(row.original.name)}
          </div>

          <span className="font-semibold text-[#15136f]">{row.original.name}</span>
        </div>
      ),
    },

    {
      id: "contact",

      accessorFn: (row) => `${row.mobile} `,

      header: "Mobile",

      cell: ({ row }) => (
        <div className="min-w-[190px]">
          <p className="text-[#5d6280]">{row.original.mobile}</p>

          {/* {row.original.email && (
            <p className="mt-1 text-[11px] text-muted-foreground">
              {
                row.original
                  .email
              }
            </p>
          )} */}
        </div>
      ),
    },

    {
      accessorKey: "role",

      header: "Role",

      filterFn: "equalsString",

      cell: ({ row }) => <StatusBadge variant={roleVariant(row.original.role)}>{row.original.role}</StatusBadge>,
    },

    {
      accessorKey: "accountType",

      header: "Account Type",

      filterFn: "equalsString",
    },

    // {
    //   accessorKey:
    //     "status",

    //   header: "Status",

    //   filterFn:
    //     "equalsString",

    //   cell: ({ row }) => (
    //     <StatusBadge variant={row.original.status === "Active" ? "success" : "danger"}>
    //       {row.original.status}
    //     </StatusBadge>
    //   ),
    // },

    {
      accessorKey: "joinedDate",

      header: "Joined",

      cell: ({ row }) => <span className="whitespace-nowrap text-[#5d6280]">{row.original.joinedDate}</span>,
    },

    {
      accessorKey: "lastActivity",

      header: "Last Activity",

      cell: ({ row }) => <span className="whitespace-nowrap text-[#5d6280]">{row.original.lastActivity}</span>,
    },

    {
      id: "action",

      header: () => <div className="text-center">Action</div>,

      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            asChild
            variant="outline"
            size="icon-sm"
            className="border-[#d9d8ef] text-[#2720a8] hover:bg-[#f3f2ff]"
          >
            <Link href={`/admin/users/${row.original.id}`} aria-label={`View ${row.original.name}`}>
              <Eye className="size-4" />
            </Link>
          </Button>

          <UserActionsMenu user={row.original} onDelete={onDelete} />
        </div>
      ),

      enableSorting: false,
      enableHiding: false,
    },
  ];
}
