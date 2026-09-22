"use client";

import { RotateCcw, Search } from "lucide-react";

import { FilterBar } from "@/components/common/filter-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type {
  AdminProductApprovalStatus,
  AdminProductStatus,
  AdminProductStockStatus,
} from "@/lib/api/admin-products-api";

export interface ProductFilterOption {
  label: string;
  value: string;
}

export interface ProductsFilterValues {
  search: string;

  companyId: string;

  categoryId: string;

  status: AdminProductStatus;

  stockStatus: AdminProductStockStatus;

  approvalStatus: AdminProductApprovalStatus;
}

interface ProductsFiltersProps {
  values: ProductsFilterValues;

  companies: ProductFilterOption[];

  categories: ProductFilterOption[];

  onChange: (values: ProductsFilterValues) => void;

  onSearch: () => void;

  onReset: () => void;
}

export function ProductsFilters({ values, companies, categories, onChange, onSearch, onReset }: ProductsFiltersProps) {
  function updateValue<K extends keyof ProductsFilterValues>(key: K, value: ProductsFilterValues[K]) {
    onChange({
      ...values,
      [key]: value,
    });
  }

  return (
    <FilterBar>
      <div className="relative min-w-[260px] flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={values.search}
          onChange={(event) => updateValue("search", event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch();
            }
          }}
          placeholder="Search products by name, model number or company..."
          className="h-10 pl-10"
        />
      </div>

      <FilterSelect
        value={values.companyId}
        options={[
          {
            value: "ALL",
            label: "All Companies",
          },
          ...companies,
        ]}
        onChange={(value) => updateValue("companyId", value)}
      />

      <FilterSelect
        value={values.categoryId}
        options={[
          {
            value: "ALL",
            label: "All Categories",
          },
          ...categories,
        ]}
        onChange={(value) => updateValue("categoryId", value)}
      />

      <FilterSelect
        value={values.status}
        options={[
          {
            value: "ALL",
            label: "All Status",
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
        onChange={(value) => updateValue("status", value as AdminProductStatus)}
      />

      <FilterSelect
        value={values.stockStatus}
        options={[
          {
            value: "ALL",
            label: "All Stock",
          },
          {
            value: "IN_STOCK",
            label: "In Stock",
          },
          {
            value: "LOW_STOCK",
            label: "Low Stock",
          },
          {
            value: "OUT_OF_STOCK",
            label: "Out of Stock",
          },
        ]}
        onChange={(value) => updateValue("stockStatus", value as AdminProductStockStatus)}
      />

      <FilterSelect
        value={values.approvalStatus}
        options={[
          {
            value: "ALL",
            label: "All Approvals",
          },
          {
            value: "PENDING",
            label: "Pending",
          },
          {
            value: "UNDER_REVIEW",
            label: "Under Review",
          },
          {
            value: "APPROVED",
            label: "Approved",
          },
          {
            value: "REJECTED",
            label: "Rejected",
          },
        ]}
        onChange={(value) => updateValue("approvalStatus", value as AdminProductApprovalStatus)}
      />

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

  options: ProductFilterOption[];

  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 min-w-[145px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
