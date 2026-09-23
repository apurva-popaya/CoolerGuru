"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export function NewLaunchPagination() {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:justify-end">
      {/* Pagination buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <PageButton ariaLabel="Previous page">
          <ChevronLeft size={12} />
        </PageButton>

        <button
          type="button"
          className="flex h-[30px] min-w-[30px] items-center justify-center rounded-[5px] bg-[#2116a5] px-2 font-bold text-[9px] text-white"
        >
          1
        </button>

        <PageButton>2</PageButton>

        <PageButton>3</PageButton>

        <PageButton>4</PageButton>

        <PageButton ariaLabel="Next page">
          <ChevronRight size={12} />
        </PageButton>
      </div>

      {/* Page size */}
      <button
        type="button"
        className="flex h-[32px] min-w-[105px] items-center justify-between rounded-[5px] border border-[#dedff0] bg-white px-3 font-medium text-[#454a68] text-[8px]"
      >
        <span>
          <strong className="text-[#171570]">12</strong> / page
        </span>

        <ChevronDown size={11} />
      </button>
    </div>
  );
}

interface PageButtonProps {
  children: React.ReactNode;
  ariaLabel?: string;
}

function PageButton({ children, ariaLabel }: PageButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="flex h-[30px] min-w-[30px] items-center justify-center rounded-[5px] border border-[#dedff0] bg-white px-2 font-semibold text-[#21186f] text-[9px] transition hover:bg-[#f5f4ff]"
    >
      {children}
    </button>
  );
}