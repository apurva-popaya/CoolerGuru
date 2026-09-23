import { ChevronLeft, ChevronRight } from "lucide-react";

import type { BuyerInquiryPagination } from "@/types/buyer-inquiry";

interface Props {
  pagination: BuyerInquiryPagination;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function BuyerInquiriesPagination({
  pagination,
  onPageChange,
  onLimitChange,
}: Props) {
  const start =
    pagination.totalItems === 0
      ? 0
      : (pagination.page - 1) * pagination.limit + 1;

  const end = Math.min(
    pagination.page * pagination.limit,
    pagination.totalItems,
  );

  return (
    <div className="flex flex-col gap-3 border-[#ececf2] border-t px-4 py-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <p className="text-center text-[#555a75] text-[8.5px] sm:text-left">
        Showing {start} to {end} of {pagination.totalItems} inquiries
      </p>

      <div className="flex items-center justify-center gap-2">
        <PageButton
          disabled={!pagination.hasPreviousPage}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          <ChevronLeft size={11} />
        </PageButton>

        <button
          type="button"
          className="flex h-[28px] min-w-[28px] items-center justify-center rounded-[4px] bg-[#2116a5] px-2 font-bold text-[8px] text-white"
        >
          {pagination.page}
        </button>

        <PageButton
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          <ChevronRight size={11} />
        </PageButton>
      </div>

      <div className="flex justify-center sm:justify-end">
        <select
          value={pagination.limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
          className="h-[30px] min-w-[110px] rounded-[5px] border border-[#dedff0] bg-white px-3 text-[#555a75] text-[8px] outline-none"
        >
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
          <option value={50}>50 rows</option>
        </select>
      </div>
    </div>
  );
}

function PageButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex h-[28px] min-w-[28px] items-center justify-center rounded-[4px] border border-[#dedff0] bg-white px-2 font-medium text-[#31355a] text-[8px] transition hover:bg-[#f6f5ff] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}