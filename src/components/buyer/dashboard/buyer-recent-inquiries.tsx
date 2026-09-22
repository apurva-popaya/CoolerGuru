import Link from "next/link";

import { ClipboardList } from "lucide-react";

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

export function BuyerRecentInquiries({ inquiries, loading = false }: Props) {
  return (
    <div className="mt-5 overflow-hidden rounded-[9px] border border-[#e1e2ed] bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] bg-[#f0edff] text-[#3327d4]">
            <ClipboardList size={15} />
          </div>

          <h2 className="font-bold text-[#171570] text-[16px]">Recent Inquiries</h2>
        </div>

        <Link href="/dashboard/inquiries" className="!text-[#2519c9] font-bold text-[9px]">
          View All Inquiries →
        </Link>
      </div>

      <div className="grid grid-cols-[1.4fr_1.35fr_0.55fr_0.75fr_0.7fr] items-center bg-[#f5f3ff] px-4 py-3 font-bold text-[#4d5270] text-[9px]">
        <span>Company</span>
        <span>Product / Requirement</span>
        <span>Quantity</span>
        <span>Date</span>
        <span>Action</span>
      </div>

      {loading ? (
        <div className="px-4 py-8 text-center text-[#686d84] text-[9px]">Loading recent inquiries...</div>
      ) : inquiries.length === 0 ? (
        <div className="px-4 py-8 text-center text-[#686d84] text-[9px]">No inquiries found.</div>
      ) : (
        inquiries.map((inquiry) => (
          <div
            key={inquiry.inquiry_number}
            className="grid min-h-[58px] grid-cols-[1.4fr_1.35fr_0.55fr_0.75fr_0.7fr] items-center border-[#ececf2] border-t px-4"
          >
            <div className="min-w-0">
              <p className="truncate font-bold text-[#171570] text-[10px]">{inquiry.company?.name ?? "Supplier"}</p>

              <p className="mt-0.5 truncate text-[#686d84] text-[8px]">
                {[inquiry.company?.city, inquiry.company?.state].filter(Boolean).join(", ") || "-"}
              </p>
            </div>

            <p className="truncate pr-4 text-[#454a67] text-[9px]">{inquiry.product_requirement}</p>

            <p className="text-[#454a67] text-[9px]">
              {inquiry.quantity} {inquiry.quantity_unit}
            </p>

            <p className="text-[#454a67] text-[9px]">{formatDate(inquiry.created_at)}</p>

            <Link
              href={`/dashboard/inquiries/${encodeURIComponent(inquiry.inquiry_number)}`}
              className="!text-[#251bb4] flex h-[30px] min-w-[95px] items-center justify-center rounded-[4px] border border-[#3729dc] bg-white px-3 font-bold text-[8px] transition hover:bg-[#f6f5ff]"
            >
              View Inquiry
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
