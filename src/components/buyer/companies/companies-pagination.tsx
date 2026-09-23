"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CompaniesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CompaniesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CompaniesPaginationProps) {
  const pages = getVisiblePages(
    currentPage,
    totalPages,
  );

  return (
    <div className="mt-5 flex w-full items-center justify-center gap-1.5 overflow-x-auto py-1 sm:gap-2">
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={13} />
      </PageButton>

      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <PageButton
              key={`ellipsis-${index}`}
              disabled
            >
              ...
            </PageButton>
          );
        }

        const active = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-[30px] min-w-[30px] shrink-0 items-center justify-center rounded-[5px] px-2 font-bold text-[10px] transition ${
              active
                ? "bg-[#2116a5] text-white"
                : "border border-[#e0e1ec] bg-white text-[#21207c] hover:bg-[#f5f4ff]"
            }`}
          >
            {page}
          </button>
        );
      })}

      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={13} />
      </PageButton>
    </div>
  );
}

interface PageButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function PageButton({
  children,
  onClick,
  disabled = false,
}: PageButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex h-[30px] min-w-[30px] shrink-0 items-center justify-center rounded-[5px] border border-[#e0e1ec] bg-white px-2 font-semibold text-[10px] text-[#21207c] transition hover:bg-[#f5f4ff] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from(
      {
        length: totalPages,
      },
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
      "ellipsis",
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}