"use client";

import { CalendarDays, Search } from "lucide-react";

import type { BuyerInquiryStatus } from "@/types/buyer-inquiry";

interface Props {
  search: string;
  status: BuyerInquiryStatus | "";
  dateFrom: string;
  dateTo: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: BuyerInquiryStatus | "") => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

export function BuyerInquiriesFilters({
  search,
  status,
  dateFrom,
  dateTo,
  onSearchChange,
  onStatusChange,
  onDateFromChange,
  onDateToChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 border-[#e7e8ef] border-b px-4 py-4 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.85fr_0.9fr_0.9fr] lg:items-center lg:gap-4">
      <div className="flex h-[40px] items-center gap-3 rounded-[5px] border border-[#dedff0] bg-white px-3 sm:col-span-2 lg:col-span-1">
        <Search size={15} className="shrink-0 text-[#706da5]" />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by company, product or inquiry ID..."
          className="min-w-0 flex-1 bg-transparent text-[#353a5d] text-[10px] outline-none placeholder:text-[#9094aa]"
        />
      </div>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as BuyerInquiryStatus | "")
        }
        className="h-[40px] w-full rounded-[5px] border border-[#dedff0] bg-white px-4 font-medium text-[#383d60] text-[10px] outline-none"
      >
        <option value="">All Status</option>
        <option value="NEW">New</option>
        <option value="REPLIED">Replied</option>
        <option value="IN_DISCUSSION">In Discussion</option>
        <option value="CLOSED">Closed</option>
        <option value="SPAM">Spam</option>
      </select>

      <div className="flex h-[40px] items-center gap-2 rounded-[5px] border border-[#dedff0] bg-white px-3">
        <CalendarDays size={14} className="shrink-0 text-[#706da5]" />

        <input
          type="date"
          value={dateFrom}
          onChange={(event) => onDateFromChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[#60657e] text-[9px] outline-none"
        />
      </div>

      <div className="flex h-[40px] items-center gap-2 rounded-[5px] border border-[#dedff0] bg-white px-3">
        <CalendarDays size={14} className="shrink-0 text-[#706da5]" />

        <input
          type="date"
          value={dateTo}
          onChange={(event) => onDateToChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[#60657e] text-[9px] outline-none"
        />
      </div>
    </div>
  );
}