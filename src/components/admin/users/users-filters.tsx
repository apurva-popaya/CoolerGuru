"use client";

import {
  RotateCcw,
  Search,
} from "lucide-react";

import {
  FilterBar,
} from "@/components/common/filter-bar";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  AdminUserAccountType,
  AdminUserRole,
  AdminUserStatus,
} from "@/lib/api/admin-users-api";

export interface UsersFilterValues {
  search: string;

  role:
    | "ALL"
    | AdminUserRole;

  accountType:
    | "ALL"
    | AdminUserAccountType;

  status:
    | "ALL"
    | AdminUserStatus;
}

interface UsersFiltersProps {
  values:
    UsersFilterValues;

  onChange: (
    values: UsersFilterValues,
  ) => void;

  onSearch:
    () => void;

  onReset:
    () => void;
}

export function UsersFilters({
  values,
  onChange,
  onSearch,
  onReset,
}: UsersFiltersProps) {
  function updateValue<
    K extends keyof UsersFilterValues,
  >(
    key: K,
    value: UsersFilterValues[K],
  ) {
    onChange({
      ...values,
      [key]: value,
    });
  }

  return (
    <FilterBar>
      <FilterSelect
        value={values.role}
        options={[
          {
            value: "ALL",
            label: "All Roles",
          },
          {
            value: "BUYER",
            label: "Buyer",
          },
          {
            value: "SELLER",
            label: "Supplier",
          },
          {
            value: "ADMIN",
            label: "Admin",
          },
        ]}
        onChange={(value) => updateValue("role", value as UsersFilterValues["role"])}
      />

      <FilterSelect
        value={values.accountType}
        options={[
          {
            value: "ALL",
            label: "All Account Types",
          },
          {
            value: "INDIVIDUAL",
            label: "Individual",
          },
          {
            value: "COMPANY",
            label: "Company",
          },
        ]}
        onChange={(value) => updateValue("accountType", value as UsersFilterValues["accountType"])}
      />

      <FilterSelect
        value={values.status}
        options={[
          {
            value: "ALL",
            label: "All Statuses",
          },
          {
            value: "ACTIVE",
            label: "Active",
          },
          {
            value: "INACTIVE",
            label: "Inactive",
          },
        ]}
        onChange={(value) => updateValue("status", value as UsersFilterValues["status"])}
      />

      <div className="relative min-w-[280px] flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input value={values.search} onChange={(event) => updateValue("search", event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { onSearch(); } }} placeholder="Search by name, email or mobile..." className="h-10 pl-10" />
      </div>

      <Button type="button" variant="outline" onClick={onReset} className="h-10 gap-2">
        <RotateCcw className="size-4" />
        Reset
      </Button>

      <Button type="button" onClick={onSearch} className="h-10 gap-2 bg-[#2720a8] text-white hover:bg-[#15136f]">
        <Search className="size-4" />
        Search
      </Button>
    </FilterBar>
  );
}

function FilterSelect({
  value,
  options,
  onChange,
}: {
  value: string;

  options: {
    value: string;
    label: string;
  }[];

  onChange:
    (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 min-w-[170px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {options.map(
          (option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ),
        )}
      </SelectContent>
    </Select>
  );
}