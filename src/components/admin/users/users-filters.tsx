"use client";

import type { ReactTable } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { FilterBar } from "@/components/common/filter-bar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DataTableFeatures } from "@/lib/data-table-features";

import { type AdminUserRow, userFilterOptions } from "./users-data";

interface UsersFiltersProps {
  table: ReactTable<DataTableFeatures, AdminUserRow>;
}

export function UsersFilters({ table }: UsersFiltersProps) {
  const searchValue = (table.getColumn("search")?.getFilterValue() as string) ?? "";

  function getValue(columnId: string) {
    return (table.getColumn(columnId)?.getFilterValue() as string | undefined) ?? "All";
  }

  function setFilter(columnId: string, value: string) {
    table.getColumn(columnId)?.setFilterValue(value === "All" ? undefined : value);

    table.setPageIndex(0);
  }

  return (
    <FilterBar>
      <FilterSelect
        value={getValue("role")}
        placeholder="All Roles"
        options={userFilterOptions.roles}
        onChange={(value) => setFilter("role", value)}
      />

      <FilterSelect
        value={getValue("accountType")}
        placeholder="All Account Types"
        options={userFilterOptions.accountTypes}
        onChange={(value) => setFilter("accountType", value)}
      />

      {/* <FilterSelect
        value={getValue(
          "status",
        )}
        placeholder="All Statuses"
        options={
          userFilterOptions.statuses
        }
        onChange={(value) =>
          setFilter(
            "status",
            value,
          )
        }
      /> */}

      <div className="relative min-w-[280px] flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={searchValue}
          onChange={(event) => {
            table.getColumn("search")?.setFilterValue(event.target.value || undefined);

            table.setPageIndex(0);
          }}
          placeholder="Search by name, email or mobile..."
          className="h-10 pl-10"
        />
      </div>
    </FilterBar>
  );
}

function FilterSelect({
  value,
  placeholder,
  options,
  onChange,
}: {
  value: string;

  placeholder: string;

  options: string[];

  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 min-w-[190px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
