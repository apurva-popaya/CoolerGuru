"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (
    page: number,
  ) => void;
}

export function ProductsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductsPaginationProps) {
  const pages = getPageNumbers(
    currentPage,
    totalPages,
  );

  return (
    <div className="mt-5 flex items-center justify-center">
      <div className="flex items-center gap-1.5 overflow-x-auto sm:gap-2">
        <PageButton
          ariaLabel="Previous page"
          disabled={currentPage <= 1}
          onClick={() =>
            onPageChange(
              currentPage - 1,
            )
          }
        >
          <ChevronLeft size={12} />
        </PageButton>

        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-[30px] min-w-[30px] items-center justify-center px-1 font-semibold text-[#777b91] text-[9px]"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() =>
                onPageChange(page)
              }
              className={
                page === currentPage
                  ? "flex h-[30px] min-w-[30px] items-center justify-center rounded-[5px] bg-[#2116a5] px-2 font-bold text-[9px] text-white"
                  : "flex h-[30px] min-w-[30px] items-center justify-center rounded-[5px] border border-[#dedff0] bg-white px-2 font-semibold text-[#21186f] text-[9px] transition hover:bg-[#f5f4ff]"
              }
            >
              {page}
            </button>
          ),
        )}

        <PageButton
          ariaLabel="Next page"
          disabled={
            currentPage >= totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1,
            )
          }
        >
          <ChevronRight size={12} />
        </PageButton>
      </div>
    </div>
  );
}

interface PageButtonProps {
  children: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function PageButton({
  children,
  ariaLabel,
  disabled,
  onClick,
}: PageButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="flex h-[30px] min-w-[30px] shrink-0 items-center justify-center rounded-[5px] border border-[#dedff0] bg-white px-2 font-semibold text-[#21186f] text-[9px] transition hover:bg-[#f5f4ff] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  if (currentPage <= 4) {
    return [
      1,
      2,
      3,
      4,
      5,
      "...",
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}