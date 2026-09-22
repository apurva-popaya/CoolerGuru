"use client";

import * as React from "react";

import type { ReactTable } from "@tanstack/react-table";
import { RotateCcw, Search } from "lucide-react";

import { FilterBar } from "@/components/common/filter-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DataTableFeatures } from "@/lib/data-table-features";

import { type InquiryRow, inquiryFilterOptions } from "./inquiries-data";

interface InquiriesFiltersProps {
  table: ReactTable<DataTableFeatures, InquiryRow>;
}

export function InquiriesFilters({ table }: InquiriesFiltersProps) {
  const [searchText, setSearchText] = React.useState("");

  function currentValue(columnId: string) {
    return (table.getColumn(columnId)?.getFilterValue() as string | undefined) ?? "All";
  }

  function setFilter(columnId: string, value: string) {
    table.getColumn(columnId)?.setFilterValue(value === "All" ? undefined : value);

    table.setPageIndex(0);
  }

  function applySearch() {
    table.getColumn("search")?.setFilterValue(searchText.trim() || undefined);

    table.setPageIndex(0);
  }

  function reset() {
    setSearchText("");

    table.resetColumnFilters();

    table.setPageIndex(0);
  }

  return (
    <FilterBar>
      <div className="relative min-w-[280px] flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              applySearch();
            }
          }}
          placeholder="Search by inquiry ID, buyer, company or product..."
          className="h-10 pl-10"
        />
      </div>

      <FilterSelect
        value={currentValue("buyerName")}
        options={inquiryFilterOptions.buyer}
        placeholder="All Buyers"
        onChange={(value) => setFilter("buyerName", value)}
      />

      <FilterSelect
        value={currentValue("companyName")}
        options={inquiryFilterOptions.company}
        placeholder="All Companies"
        onChange={(value) => setFilter("companyName", value)}
      />

      <FilterSelect
        value={currentValue("productName")}
        options={inquiryFilterOptions.product}
        placeholder="All Products"
        onChange={(value) => setFilter("productName", value)}
      />

      <FilterSelect
        value={currentValue("status")}
        options={inquiryFilterOptions.status}
        placeholder="All Status"
        onChange={(value) => setFilter("status", value)}
      />

      <FilterSelect
        value={currentValue("inquiryType")}
        options={inquiryFilterOptions.type}
        placeholder="All Types"
        onChange={(value) => setFilter("inquiryType", value)}
      />

      <Button type="button" variant="outline" onClick={reset} className="h-10 gap-2">
        <RotateCcw className="size-4" />
        Reset
      </Button>

      <Button type="button" onClick={applySearch} className="h-10 gap-2 bg-[#2720a8] text-white hover:bg-[#15136f]">
        <Search className="size-4" />
        Search
      </Button>
    </FilterBar>
  );
}

function FilterSelect({
  value,
  options,
  placeholder,
  onChange,
}: {
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 min-w-[150px]">
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
