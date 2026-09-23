import Link from "next/link";

import { ChevronsUpDown } from "lucide-react";

import type { BuyerInquiry } from "@/types/buyer-inquiry";

interface Props {
  inquiries: BuyerInquiry[];
  loading?: boolean;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function BuyerInquiriesTable({
  inquiries,
  loading = false,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[820px]">
        <div className="grid grid-cols-[0.8fr_1.25fr_1.3fr_0.55fr_0.7fr_0.65fr] items-center bg-[#f6f4ff] px-4 py-3 font-bold text-[#4d5270] text-[9px]">
          <HeaderCell>Inquiry ID</HeaderCell>

          <HeaderCell>Company</HeaderCell>

          <HeaderCell>Product / Requirement</HeaderCell>

          <HeaderCell>Quantity</HeaderCell>

          <HeaderCell>Date</HeaderCell>

          <span className="text-center">Action</span>
        </div>

        {loading ? (
          <div className="px-4 py-10 text-center text-[#686d84] text-[9px]">
            Loading inquiries...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="px-4 py-10 text-center text-[#686d84] text-[9px]">
            No inquiries found.
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div
              key={inquiry.inquiry_number}
              className="grid min-h-[58px] grid-cols-[0.8fr_1.25fr_1.3fr_0.55fr_0.7fr_0.65fr] items-center border-[#ececf2] border-t px-4"
            >
              <p className="font-medium text-[#30355b] text-[8.5px]">
                {inquiry.inquiry_number}
              </p>

              <div className="min-w-0">
                <p className="truncate font-bold text-[#171570] text-[9px]">
                  {inquiry.company?.name ?? "Supplier"}
                </p>

                <p className="mt-0.5 truncate text-[#686d84] text-[7.5px]">
                  {[inquiry.company?.city, inquiry.company?.state]
                    .filter(Boolean)
                    .join(", ") || "-"}
                </p>
              </div>

              <p className="truncate pr-4 text-[#454a67] text-[8.5px]">
                {inquiry.product_requirement}
              </p>

              <p className="text-[#454a67] text-[8.5px]">
                {inquiry.quantity} {inquiry.quantity_unit}
              </p>

              <p className="text-[#454a67] text-[8.5px]">
                {formatDate(inquiry.created_at)}
              </p>

              <div className="flex justify-center">
                <Link
                  href={`/dashboard/inquiries/${encodeURIComponent(
                    inquiry.inquiry_number,
                  )}`}
                  className="!text-[#251bb4] flex h-[30px] min-w-[95px] items-center justify-center rounded-[4px] border border-[#3829dc] bg-white px-3 font-bold text-[8px] transition hover:bg-[#f6f5ff]"
                >
                  View Inquiry
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <span>{children}</span>

      <ChevronsUpDown size={10} className="text-[#898da2]" />
    </div>
  );
}