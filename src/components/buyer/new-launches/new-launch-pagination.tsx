"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NewLaunchPaginationProps {
  page: number;
  totalPages: number;
  limit: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function NewLaunchPagination({
  page,
  totalPages,
  limit,
  totalItems,
  onPageChange,
  onLimitChange,
}: NewLaunchPaginationProps) {
  const startItem =
    totalItems === 0
      ? 0
      : (page - 1) * limit + 1;

  const endItem =
    Math.min(page * limit, totalItems);

  const visiblePages = getVisiblePages(
    page,
    totalPages,
  );

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:justify-end">
      {/* Pagination buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <PageButton
          ariaLabel="Previous page"
          disabled={page <= 1}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          <ChevronLeft size={12} />
        </PageButton>

        {visiblePages.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-[30px] min-w-[20px] items-center justify-center text-[#454a68] text-[9px]"
            >
              ...
            </span>
          ) : (
            <button
              key={pageNumber}
              type="button"
              onClick={() =>
                onPageChange(pageNumber)
              }
              className={`flex h-[30px] min-w-[30px] items-center justify-center rounded-[5px] px-2 font-bold text-[9px] ${
                pageNumber === page
                  ? "bg-[#2116a5] text-white"
                  : "border border-[#dedff0] bg-white text-[#21186f] transition hover:bg-[#f5f4ff]"
              }`}
            >
              {pageNumber}
            </button>
          ),
        )}

        <PageButton
          ariaLabel="Next page"
          disabled={page >= totalPages}
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          <ChevronRight size={12} />
        </PageButton>
      </div>

      {/* Page size */}
      <select
        value={limit}
        onChange={(event) =>
          onLimitChange(
            Number(event.target.value),
          )
        }
        className="h-[32px] min-w-[105px] appearance-none rounded-[5px] border border-[#dedff0] bg-white px-3 font-medium text-[#454a68] text-[8px] outline-none"
      >
        <option value={12}>12 / page</option>
        <option value={24}>24 / page</option>
        <option value={48}>48 / page</option>
      </select>
    </div>
  );
}

interface PageButtonProps {
  children: React.ReactNode;
  ariaLabel: string;
  disabled?: boolean;
  onClick: () => void;
}

function PageButton({
  children,
  ariaLabel,
  disabled = false,
  onClick,
}: PageButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="flex h-[30px] min-w-[30px] items-center justify-center rounded-[5px] border border-[#dedff0] bg-white px-2 font-semibold text-[#21186f] text-[9px] transition hover:bg-[#f5f4ff] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): (number | "...")[] {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "...",
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