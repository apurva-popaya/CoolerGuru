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

import {
  Plus,
} from "lucide-react";

import {
  DataTable,
} from "@/components/common/data-table/data-table";

import {
  PageHeader,
} from "@/components/common/page-header";

import {
  Button,
} from "@/components/ui/button";

import {
  getAdminUsers,
  getAdminUsersSummary,
  type AdminUsersSummary,
} from "@/lib/api/admin-users-api";

import {
  dataTableFeatures,
} from "@/lib/data-table-features";

import {
  createUsersColumns,
} from "./users-columns";

import {
  mapAdminUserToRow,
  type AdminUserRow,
} from "./users-data";

import {
  UsersFilters,
  type UsersFilterValues,
} from "./users-filters";

import {
  UsersStats,
} from "./users-stats";

const initialFilters: UsersFilterValues = {
  search: "",
  role: "ALL",
  accountType: "ALL",
  status: "ALL",
};

const emptySummary: AdminUsersSummary = {
  total: 0,
  buyers: 0,
  suppliers: 0,
  active: 0,
  inactive: 0,
};

export function AdminUsers() {
  const [
    users,
    setUsers,
  ] =
    React.useState<AdminUserRow[]>(
      [],
    );

  const [
    summary,
    setSummary,
  ] =
    React.useState<AdminUsersSummary>(
      emptySummary,
    );

  const [
    totalItems,
    setTotalItems,
  ] = React.useState(0);

  const [
    totalPages,
    setTotalPages,
  ] = React.useState(1);

  const [
    loading,
    setLoading,
  ] = React.useState(true);

  const [
    error,
    setError,
  ] = React.useState("");

  const [
    filters,
    setFilters,
  ] =
    React.useState<UsersFilterValues>(
      initialFilters,
    );

  const [
    appliedSearch,
    setAppliedSearch,
  ] = React.useState("");

  const [
    sorting,
    setSorting,
  ] =
    React.useState<SortingState>(
      [],
    );

  const [
    columnFilters,
    setColumnFilters,
  ] =
    React.useState<ColumnFiltersState>(
      [],
    );

  const [
    columnVisibility,
    setColumnVisibility,
  ] =
    React.useState<ColumnVisibilityState>(
      {
        search: false,
      },
    );

  const [
    pagination,
    setPagination,
  ] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const loadUsers =
    React.useCallback(
      async () => {
        setLoading(true);
        setError("");

        try {
          const response =
            await getAdminUsers({
              search:
                appliedSearch ||
                undefined,

              role:
                filters.role !==
                "ALL"
                  ? filters.role
                  : undefined,

              account_type:
                filters.accountType !==
                "ALL"
                  ? filters.accountType
                  : undefined,

              status:
                filters.status !==
                "ALL"
                  ? filters.status
                  : undefined,

              page:
                pagination.pageIndex +
                1,

              limit:
                pagination.pageSize,
            });

          if (!response.data) {
            return;
          }

          setUsers(
            response.data.users.map(
              mapAdminUserToRow,
            ),
          );

          setTotalItems(
            response.data.pagination
              .totalItems,
          );

          setTotalPages(
            Math.max(
              response.data.pagination
                .totalPages,
              1,
            ),
          );
        } catch (error) {
          setUsers([]);

          setTotalItems(0);

          setTotalPages(1);

          setError(
            error instanceof Error
              ? error.message
              : "Unable to load users.",
          );
        } finally {
          setLoading(false);
        }
      },
      [
        appliedSearch,
        filters.role,
        filters.accountType,
        filters.status,
        pagination.pageIndex,
        pagination.pageSize,
      ],
    );

  const loadSummary =
    React.useCallback(
      async () => {
        try {
          const response =
            await getAdminUsersSummary();

          if (
            response.data
              ?.summary
          ) {
            setSummary(
              response.data
                .summary,
            );
          }
        } catch (error) {
          console.error(
            "Unable to load user summary:",
            error,
          );
        }
      },
      [],
    );

  React.useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  React.useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  const handleStatusUpdated =
  React.useCallback(
    () => {
      void loadUsers();
      void loadSummary();
    },
    [
      loadUsers,
      loadSummary,
    ],
  );

  const columns =
  React.useMemo(
    () =>
      createUsersColumns({
        onStatusUpdated:
          handleStatusUpdated,
      }),
    [
      handleStatusUpdated,
    ],
  );

  const table =
    useTable({
      features:
        dataTableFeatures,

      data:
        users,

      columns,

      state: {
        sorting,
        columnFilters,
        columnVisibility,
        pagination,
      },

      getRowId:
        (row) => row.id,

      manualPagination:
        true,

      pageCount:
        totalPages,

      rowCount:
        totalItems,

      autoResetPageIndex:
        false,

      onSortingChange:
        setSorting,

      onColumnFiltersChange:
        setColumnFilters,

      onColumnVisibilityChange:
        setColumnVisibility,

      onPaginationChange:
        setPagination,
    });

  function handleFiltersChange(
    values: UsersFilterValues,
  ) {
    setFilters(
      values,
    );

    setPagination(
      (previous) => ({
        ...previous,
        pageIndex: 0,
      }),
    );
  }

  function handleSearch() {
    setAppliedSearch(
      filters.search.trim(),
    );

    setPagination(
      (previous) => ({
        ...previous,
        pageIndex: 0,
      }),
    );
  }

  function handleReset() {
    setFilters(
      initialFilters,
    );

    setAppliedSearch("");

    setPagination(
      (previous) => ({
        ...previous,
        pageIndex: 0,
      }),
    );
  }

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

      <UsersFilters values={filters} onChange={handleFiltersChange} onSearch={handleSearch} onReset={handleReset} />

      <UsersStats total={summary.total} buyers={summary.buyers} suppliers={summary.suppliers} active={summary.active} inactive={summary.inactive} />

      {error ? (
        <div className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-medium text-red-600">
          {error}
        </div>
      ) : null}

      <DataTable
        table={table}
        emptyState={{
          title:
            loading
              ? "Loading users..."
              : "No users found",

          description:
            loading
              ? "Please wait while users are being loaded."
              : "Try changing or resetting the user filters.",
        }}
      />
    </div>
  );
}