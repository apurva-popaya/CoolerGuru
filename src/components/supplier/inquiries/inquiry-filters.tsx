"use client";

import { CalendarDays, ChevronDown, Download, Search } from "lucide-react";

interface InquiryFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;

  inquiryType: string;
  onInquiryTypeChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  dateRange: string;
  onDateRangeChange: (value: string) => void;
}

export function InquiryFilters({
  searchQuery,
  onSearchChange,
  inquiryType,
  onInquiryTypeChange,
  status,
  onStatusChange,
  dateRange,
  onDateRangeChange,
}: InquiryFiltersProps) {
  return (
    <div className="mt-5 rounded-[9px] border border-[#e1e2ed] bg-white p-4">
      <div className="grid grid-cols-[2.2fr_0.95fr_0.95fr_1fr_auto] gap-3">
        <div>
          <label className="mb-2 block font-bold text-[#303558] text-[9px]">Search</label>

          <div className="flex h-[38px] items-center gap-2 rounded-[5px] border border-[#dedff0] px-3">
            <Search size={12} className="text-[#3024ca]" />

            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by buyer, company, product or inquiry ID"
              className="min-w-0 flex-1 text-[#414660] text-[9px] outline-none placeholder:text-[#9b9eb1]"
            />
          </div>
        </div>

        <FilterField label="Inquiry Type">
          <FilterSelect value={inquiryType} onChange={onInquiryTypeChange}>
            <option value="all">All Types</option>
            <option value="REQUEST_QUOTE">Request Quote</option>
            <option value="CONTACT_SUPPLIER">Contact Supplier</option>
          </FilterSelect>
        </FilterField>

        <FilterField label="Status">
          <FilterSelect value={status} onChange={onStatusChange}>
            <option value="all">All Status</option>
            <option value="NEW">New</option>
            <option value="REPLIED">Replied</option>
            <option value="IN_DISCUSSION">In Discussion</option>
            <option value="CLOSED">Closed</option>
          </FilterSelect>
        </FilterField>

        <FilterField label="Date Range">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(event) => onDateRangeChange(event.target.value)}
              className="h-[38px] w-full appearance-none rounded-[5px] border border-[#dedff0] bg-white px-3 pr-8 text-[#444965] text-[9px] outline-none"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7-days">Last 7 Days</option>
              <option value="30-days">Last 30 Days</option>
            </select>

            <CalendarDays
              size={11}
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#3024ca]"
            />
          </div>
        </FilterField>

        <div className="flex items-end">
          <button
            type="button"
            className="flex h-[38px] items-center justify-center gap-2 rounded-[5px] border border-[#aaa4ec] px-4 font-bold text-[#2c21c3] text-[9px]"
          >
            <Download size={12} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block font-bold text-[#303558] text-[9px]">{label}</label>

      {children}
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[38px] w-full appearance-none rounded-[5px] border border-[#dedff0] bg-white px-3 pr-8 text-[#444965] text-[9px] outline-none"
      >
        {children}
      </select>

      <ChevronDown size={11} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#3024ca]" />
    </div>
  );
}
