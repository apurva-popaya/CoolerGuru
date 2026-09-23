"use client";

import type { ReactTable } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { FilterBar } from "@/components/common/filter-bar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DataTableFeatures } from "@/lib/data-table-features";

import { type FeaturedCompanyRow, featuredCompanyFilterOptions } from "./featured-companies-data";

interface FeaturedCompaniesFiltersProps {
  table: ReactTable<DataTableFeatures, FeaturedCompanyRow>;
}

export function FeaturedCompaniesFilters({ table }: FeaturedCompaniesFiltersProps) {
  const searchValue = (table.getColumn("search")?.getFilterValue() as string | undefined) ?? "";

  function getFilterValue(columnId: string) {
    return (table.getColumn(columnId)?.getFilterValue() as string | undefined) ?? "All";
  }

  function setFilter(columnId: string, value: string) {
    table.getColumn(columnId)?.setFilterValue(value === "All" ? undefined : value);

    table.setPageIndex(0);
  }

  return (
    <FilterBar>
      <div className="min-w-[260px]">
        <label className="mb-2 block font-semibold text-[#15136f] text-[12px]">Featured Status</label>

        <Select value={getFilterValue("featuredStatus")} onValueChange={(value) => setFilter("featuredStatus", value)}>
          <SelectTrigger className="h-10 w-full min-w-[240px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {featuredCompanyFilterOptions.featuredStatus.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[260px]">
        <label className="mb-2 block font-semibold text-[#15136f] text-[12px]">Business Type</label>

        <Select value={getFilterValue("businessType")} onValueChange={(value) => setFilter("businessType", value)}>
          <SelectTrigger className="h-10 w-full min-w-[240px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {featuredCompanyFilterOptions.businessType.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[320px] flex-1">
        <label className="mb-2 block font-semibold text-[12px] text-transparent">Search</label>

        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#5d6280]" />

          <Input
            value={searchValue}
            onChange={(event) => {
              table.getColumn("search")?.setFilterValue(event.target.value || undefined);

              table.setPageIndex(0);
            }}
            placeholder="Search by company name..."
            className="h-10 pl-10"
          />
        </div>
      </div>
    </FilterBar>
  );
}