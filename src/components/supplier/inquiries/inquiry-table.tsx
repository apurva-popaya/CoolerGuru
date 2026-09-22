import Link from "next/link";

import { Eye, MessageCircle, Reply } from "lucide-react";

import type { SellerInquiry } from "@/types/seller-inquiry-api";

interface InquiryTableProps {
  inquiries: SellerInquiry[];
  totalCount: number;
  loading?: boolean;
}

export function InquiryTable({ inquiries, totalCount, loading = false }: InquiryTableProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-[9px] border border-[#e1e2ed] bg-white">
      <div className="grid grid-cols-[0.95fr_1.3fr_1.05fr_1.15fr_1.2fr_0.9fr_0.75fr_0.6fr] items-center bg-[#fafaff] px-4 py-3 font-bold text-[#272d54] text-[10px]">
        <span>Inquiry ID</span>
        <span>Buyer</span>
        <span>Inquiry Type</span>
        <span>Requirement</span>
        <span>Product / Category</span>
        <span>Date</span>
        <span>Status</span>
        <span className="text-center">Actions</span>
      </div>

      {loading ? (
        <div className="flex min-h-[180px] items-center justify-center text-[#777c94] text-[10px]">
          Loading inquiries...
        </div>
      ) : inquiries.length > 0 ? (
        inquiries.map((inquiry) => <InquiryRow key={inquiry.inquiry_number} inquiry={inquiry} />)
      ) : (
        <div className="flex min-h-[180px] items-center justify-center">
          <div className="text-center">
            <p className="font-bold text-[#171570] text-[11px]">No inquiries found</p>

            <p className="mt-1 text-[#7d8197] text-[8px]">Try changing the filters or search text.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-[#e5e6ee] border-t px-4 py-3">
        <p className="text-[#686d85] text-[9px]">
          Showing {inquiries.length === 0 ? 0 : 1} to {inquiries.length} of {totalCount} inquiries
        </p>
      </div>
    </div>
  );
}

function InquiryRow({ inquiry }: { inquiry: SellerInquiry }) {
  const productName = inquiry.product?.name ?? inquiry.product_requirement;

  const category = inquiry.product?.category?.name ?? (inquiry.product ? "Product" : "General Inquiry");

  return (
    <div className="grid min-h-[72px] grid-cols-[0.95fr_1.3fr_1.05fr_1.15fr_1.2fr_0.9fr_0.75fr_0.6fr] items-center border-[#ededf3] border-t px-4 py-3">
      <p className="font-bold text-[#3024c8] text-[9px]">{inquiry.inquiry_number}</p>

      <div>
        <p className="font-bold text-[#171570] text-[9px]">{inquiry.buyer_name}</p>

        <p className="mt-1 text-[#7f839a] text-[8px]">{inquiry.buyer_city_state}</p>
      </div>

      <InquiryTypeBadge type={inquiry.inquiry_type} />

      <div>
        <p className="font-medium text-[#4f5570] text-[9px]">
          {inquiry.quantity} {inquiry.quantity_unit}
        </p>

        <p className="mt-1 text-[#777c94] text-[8px]">{inquiry.product_requirement}</p>
      </div>

      <div>
        <p className="font-semibold text-[#171570] text-[9px]">{productName}</p>

        <p className="mt-1 text-[#777c94] text-[8px]">{category}</p>
      </div>

      <div>
        <p className="text-[#555b76] text-[9px]">{formatDate(inquiry.created_at)}</p>

        <p className="mt-1 text-[#85899f] text-[8px]">{formatTime(inquiry.created_at)}</p>
      </div>

      <InquiryStatusBadge status={inquiry.status} />

      <div className="flex justify-center gap-2">
        <Link
          href={`/supplier/dashboard/inquiries/${encodeURIComponent(inquiry.inquiry_number)}`}
          aria-label="View inquiry"
          className="flex h-[29px] w-[29px] items-center justify-center rounded-[5px] border border-[#dadbea] text-[#3024ca] transition hover:bg-[#f6f5ff]"
        >
          <Eye size={11} />
        </Link>

        <Link
          href={`/supplier/dashboard/inquiries/${encodeURIComponent(inquiry.inquiry_number)}?reply=true`}
          aria-label="Reply to inquiry"
          className="flex h-[29px] w-[29px] items-center justify-center rounded-[5px] border border-[#dadbea] text-[#3024ca] transition hover:bg-[#f6f5ff]"
        >
          <Reply size={11} />
        </Link>
      </div>
    </div>
  );
}

function InquiryTypeBadge({ type }: { type: SellerInquiry["inquiry_type"] }) {
  const quote = type === "REQUEST_QUOTE";

  return (
    <div className="flex items-center gap-1.5">
      <MessageCircle size={11} className={quote ? "text-[#3024ca]" : "text-[#21914a]"} />

      <span className={`font-semibold text-[9px] ${quote ? "text-[#3024ca]" : "text-[#21914a]"}`}>
        {quote ? "Request Quote" : "Contact Supplier"}
      </span>
    </div>
  );
}

function InquiryStatusBadge({ status }: { status: SellerInquiry["status"] }) {
  const config =
    status === "NEW"
      ? {
          label: "New",
          style: "border-[#cfe0ff] bg-[#eef4ff] text-[#316bd3]",
        }
      : status === "REPLIED"
        ? {
            label: "Replied",
            style: "border-[#cce7d3] bg-[#edf8f0] text-[#288e48]",
          }
        : status === "IN_DISCUSSION"
          ? {
              label: "In Discussion",
              style: "border-[#f3d4ad] bg-[#fff3e8] text-[#d67b26]",
            }
          : status === "SPAM"
            ? {
                label: "Spam",
                style: "border-red-200 bg-red-50 text-red-600",
              }
            : {
                label: "Closed",
                style: "border-[#d8dbe5] bg-[#f1f2f6] text-[#62677d]",
              };

  return (
    <span className={`w-fit rounded-[4px] border px-2 py-1 font-semibold text-[8px] ${config.style}`}>
      {config.label}
    </span>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
