"use client";

import * as React from "react";

import Link from "next/link";

import {
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { DataTable } from "@/components/common/data-table/data-table";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { dataTableFeatures } from "@/lib/data-table-features";

import { createUsersColumns } from "./users-columns";
import { type AdminUserRow, usersData } from "./users-data";
import { UsersFilters } from "./users-filters";
import { UsersStats } from "./users-stats";

export function AdminUsers() {
  const [users, setUsers] = React.useState<AdminUserRow[]>(usersData);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({
    search: false,
  });

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  function handleDelete(userId: string) {
    setUsers((current) => current.filter((user) => user.id !== userId));
  }

  function _handleStatusChange(userId: string, nextStatus: "Active" | "Inactive") {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: nextStatus,
            }
          : user,
      ),
    );
  }

  const columns = React.useMemo(
    () =>
      createUsersColumns({
        onDelete: handleDelete,
      }),
    [handleDelete],
  );

  const table = useTable({
    features: dataTableFeatures,

    data: users,

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

  const buyers = users.filter((user) => user.role === "Buyer").length;

  const suppliers = users.filter((user) => user.role === "Supplier").length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Manage Users"
        description="View and manage all buyers and suppliers on CoolerGuru."
        action={
          <Button asChild className="gap-2 bg-[#2720a8] text-white hover:bg-[#15136f]">
            <Link href="/admin/users/add">
              <Plus className="size-4" />
              Add User
            </Link>
          </Button>
        }
      />

      <UsersFilters table={table} />

      <UsersStats total={users.length} buyers={buyers} suppliers={suppliers} />

      <DataTable
        table={table}
        emptyState={{
          title: "No users found",

          description: "Try changing or resetting the user filters.",
        }}
      />
    </div>
  );
}
