"use client";

import * as React from "react";

import type { ReactTable } from "@tanstack/react-table";
import { RotateCcw, Search } from "lucide-react";

import { FilterBar } from "@/components/common/filter-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DataTableFeatures } from "@/lib/data-table-features";

import { type CompanyRow, companyFilterOptions } from "./companies-data";

interface CompaniesFiltersProps {
  table: ReactTable<DataTableFeatures, CompanyRow>;
}

export function CompaniesFilters({ table }: CompaniesFiltersProps) {
  const currentSearch = (table.getColumn("search")?.getFilterValue() as string | undefined) ?? "";

  const [searchText, setSearchText] = React.useState(currentSearch);

  const verificationStatus = (table.getColumn("verificationStatus")?.getFilterValue() as string | undefined) ?? "All";

  const businessType = (table.getColumn("businessType")?.getFilterValue() as string | undefined) ?? "All";

  const location = (table.getColumn("location")?.getFilterValue() as string | undefined) ?? "All";

  const featured = (table.getColumn("featured")?.getFilterValue() as string | undefined) ?? "All";

  function setSelectFilter(columnId: string, value: string) {
    table.getColumn(columnId)?.setFilterValue(value === "All" ? undefined : value);

    table.setPageIndex(0);
  }

  function applySearch() {
    table.getColumn("search")?.setFilterValue(searchText.trim() || undefined);

    table.setPageIndex(0);
  }

  function resetFilters() {
    setSearchText("");

    table.resetColumnFilters();

    table.setPageIndex(0);
  }

  return (
    <div className="space-y-3">
      <FilterBar>
        <div className="relative min-w-[260px] flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                applySearch();
              }
            }}
            placeholder="Search company, location or type..."
            className="h-10 pl-10"
          />
        </div>

        <Select value={verificationStatus} onValueChange={(value) => setSelectFilter("verificationStatus", value)}>
          <SelectTrigger className="h-10 w-[190px]">
            <SelectValue placeholder="Verification Status" />
          </SelectTrigger>

          <SelectContent>
            {companyFilterOptions.verificationStatus.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={businessType} onValueChange={(value) => setSelectFilter("businessType", value)}>
          <SelectTrigger className="h-10 w-[165px]">
            <SelectValue placeholder="Business Type" />
          </SelectTrigger>

          <SelectContent>
            {companyFilterOptions.businessType.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={location} onValueChange={(value) => setSelectFilter("location", value)}>
          <SelectTrigger className="h-10 w-[190px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>

          <SelectContent>
            {companyFilterOptions.location.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={featured} onValueChange={(value) => setSelectFilter("featured", value)}>
          <SelectTrigger className="h-10 w-[155px]">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>

          <SelectContent>
            {companyFilterOptions.featured.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button type="button" variant="outline" className="h-10 gap-2" onClick={resetFilters}>
          <RotateCcw className="size-4" />
          Reset
        </Button>

        <Button
          type="button"
          className="h-10 gap-2 bg-[#2720a8] px-5 text-white hover:bg-[#15136f]"
          onClick={applySearch}
        >
          <Search className="size-4" />
          Search
        </Button>
      </FilterBar>

      <div className="flex flex-wrap items-center gap-2 px-1">
        <span className="mr-1 font-medium text-[#5d6280] text-[12px]">Quick Filters:</span>

        <QuickFilter label="Verified" onClick={() => setSelectFilter("verificationStatus", "Verified")} />

        <QuickFilter
          label="Under Verification"
          onClick={() => setSelectFilter("verificationStatus", "Under Verification")}
        />

        <QuickFilter label="Pending" onClick={() => setSelectFilter("verificationStatus", "Pending")} />

        <QuickFilter label="Rejected" onClick={() => setSelectFilter("verificationStatus", "Rejected")} />

        <QuickFilter label="Manufacturer" onClick={() => setSelectFilter("businessType", "Manufacturer")} />

        <QuickFilter label="Supplier" onClick={() => setSelectFilter("businessType", "Supplier")} />

        <QuickFilter label="Exporter" onClick={() => setSelectFilter("businessType", "Exporter")} />

        <QuickFilter label="Featured" onClick={() => setSelectFilter("featured", "Featured")} />
      </div>
    </div>
  );
}

function QuickFilter({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[#e1e2ef] bg-white px-3 py-1.5 font-medium text-[#5d6280] text-[11px] transition-colors hover:border-[#cfcdf5] hover:bg-[#f3f2ff] hover:text-[#2720a8]"
    >
      {label}
    </button>
  );
}
