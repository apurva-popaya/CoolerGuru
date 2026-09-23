"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export function ProductsPagination() {
  return (
    <div className="mt-5 flex flex-col gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      {/* Empty space on desktop */}
      <div className="hidden sm:block" />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto sm:gap-2">
        <PageButton ariaLabel="Previous page">
          <ChevronLeft size={12} />
        </PageButton>

        <button
          type="button"
          className="flex h-[30px] min-w-[30px] items-center justify-center rounded-[5px] bg-[#2116a5] px-2 font-bold text-[9px] text-white"
        >
          1
        </button>

        {[2, 3, 4, 5].map((page) => (
          <PageButton key={page}>{page}</PageButton>
        ))}

        <PageButton>...</PageButton>

        <PageButton>25</PageButton>

        <PageButton ariaLabel="Next page">
          <ChevronRight size={12} />
        </PageButton>
      </div>

      {/* Per page */}
      <div className="flex justify-center sm:justify-end">
        <button
          type="button"
          className="flex h-[34px] min-w-[145px] items-center justify-between rounded-[5px] border border-[#dedff0] bg-white px-3 text-[#454b68] text-[9px]"
        >
          <span>
            Show per page:{" "}
            <strong className="text-[#2118ad]">20</strong>
          </span>

          <ChevronDown size={12} />
        </button>
      </div>
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
      className="flex h-[30px] min-w-[30px] shrink-0 items-center justify-center rounded-[5px] border border-[#dedff0] bg-white px-2 font-semibold text-[#21186f] text-[9px] transition hover:bg-[#f5f4ff]"
    >
      {children}
    </button>
  );
}