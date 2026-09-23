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
  AdminInquiryStatus,
  AdminInquiryType,
} from "@/lib/api/admin-inquiries-api";

export interface InquiryFilterValues {
  search: string;

  status:
    | "ALL"
    | AdminInquiryStatus;

  inquiryType:
    | "ALL"
    | AdminInquiryType;

  dateFrom: string;

  dateTo: string;
}

interface InquiriesFiltersProps {
  values:
    InquiryFilterValues;

  onChange: (
    values: InquiryFilterValues,
  ) => void;

  onSearch: () => void;

  onReset: () => void;
}

export function InquiriesFilters({
  values,
  onChange,
  onSearch,
  onReset,
}: InquiriesFiltersProps) {
  function updateValue<
    K extends keyof InquiryFilterValues,
  >(
    key: K,
    value: InquiryFilterValues[K],
  ) {
    onChange({
      ...values,
      [key]: value,
    });
  }

  return (
    <FilterBar>
      <div className="relative min-w-[280px] flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input value={values.search} onChange={(event) => updateValue("search", event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { onSearch(); } }} placeholder="Search by inquiry ID, buyer, company or product..." className="h-10 pl-10" />
      </div>

      <Select value={values.status} onValueChange={(value) => updateValue("status", value as InquiryFilterValues["status"])}>
        <SelectTrigger className="h-10 min-w-[150px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">
            All Status
          </SelectItem>

          <SelectItem value="NEW">
            New
          </SelectItem>

          <SelectItem value="REPLIED">
            Replied
          </SelectItem>

          <SelectItem value="IN_DISCUSSION">
            In Discussion
          </SelectItem>

          <SelectItem value="CLOSED">
            Closed
          </SelectItem>

          <SelectItem value="SPAM">
            Spam
          </SelectItem>
        </SelectContent>
      </Select>

      <Select value={values.inquiryType} onValueChange={(value) => updateValue("inquiryType", value as InquiryFilterValues["inquiryType"])}>
        <SelectTrigger className="h-10 min-w-[165px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">
            All Types
          </SelectItem>

          <SelectItem value="REQUEST_QUOTE">
            Request Quote
          </SelectItem>

          <SelectItem value="CONTACT_SUPPLIER">
            Contact Supplier
          </SelectItem>
        </SelectContent>
      </Select>

      <Input type="date" value={values.dateFrom} onChange={(event) => updateValue("dateFrom", event.target.value)} className="h-10 w-[145px]" />

      <Input type="date" value={values.dateTo} onChange={(event) => updateValue("dateTo", event.target.value)} className="h-10 w-[145px]" />

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