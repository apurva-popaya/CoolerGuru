import Link from "next/link";

import { Eye, LockKeyhole } from "lucide-react";

import type { SellerInquiry } from "@/types/seller-inquiry-api";

import type { VerificationStatus } from "./types";

interface RecentInquiriesTableProps {
  inquiries: SellerInquiry[];
  status: VerificationStatus;
  loading?: boolean;
}

function formatDateTime(value: string) {
  const date = new Date(value);

  return {
    date: new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date),

    time: new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
  };
}

export function RecentInquiriesTable({ inquiries, status, loading = false }: RecentInquiriesTableProps) {
  const unlocked = status === "VERIFIED";

  return (
    <section className="relative mt-5 overflow-hidden rounded-[10px] border border-[#e1e2ed] bg-white">
      <div className="flex items-center justify-between border-[#e6e7ef] border-b px-5 py-4">
        <div>
          <h2 className="font-bold text-[#171570] text-[18px]">Recent Inquiries</h2>

          <p className="mt-1 text-[#85899f] text-[9px]">Latest inquiries received from buyers.</p>
        </div>

        {unlocked ? (
          <Link
            href="/supplier/dashboard/inquiries"
            className="!text-[#251bc1] flex h-[34px] items-center justify-center gap-2 rounded-[5px] border border-[#bdb7f4] px-4 font-bold text-[9px] transition hover:bg-[#f7f6ff]"
          >
            <Eye size={12} />
            View All Inquiries
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="flex h-[34px] cursor-not-allowed items-center justify-center gap-2 rounded-[5px] border border-[#dedfe9] px-4 font-bold text-[#a5a8ba] text-[9px]"
          >
            <LockKeyhole size={12} />
            View All Inquiries
          </button>
        )}
      </div>

      <div className={unlocked ? "" : "pointer-events-none select-none opacity-[0.25]"}>
        <div className="grid grid-cols-[1.2fr_1.6fr_0.8fr_0.7fr_0.35fr] bg-[#fafaff] px-5 py-3 font-semibold text-[#85899e] text-[10px]">
          <span>Buyer</span>

          <span>Requirement</span>

          <span>Date</span>

          <span>Status</span>

          <span className="text-center">Action</span>
        </div>

        {loading ? (
          <div className="px-5 py-8 text-center text-[#85899f] text-[9px]">Loading recent inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="px-5 py-8 text-center text-[#85899f] text-[9px]">No inquiries found.</div>
        ) : (
          inquiries.map((inquiry) => {
            const { date, time } = formatDateTime(inquiry.created_at);

            return (
              <div
                key={inquiry.inquiry_number}
                className="grid grid-cols-[1.2fr_1.6fr_0.8fr_0.7fr_0.35fr] items-center border-[#eeeef4] border-t px-5 py-3"
              >
                <div>
                  <p className="font-semibold text-[#343958] text-[10px]">{inquiry.buyer_name}</p>

                  <p className="mt-1 text-[#84889f] text-[9px]">{inquiry.buyer_city_state}</p>
                </div>

                <p className="text-[#656a83] text-[10px]">{inquiry.product_requirement}</p>

                <div>
                  <p className="text-[#656a83] text-[10px]">{date}</p>

                  <p className="mt-0.5 text-[#8b8fa3] text-[9px]">{time}</p>
                </div>

                <InquiryStatus status={inquiry.status} />

                <Link
                  href={`/supplier/dashboard/inquiries/${encodeURIComponent(inquiry.inquiry_number)}`}
                  className="mx-auto flex h-[28px] w-[28px] items-center justify-center rounded-[5px] border border-[#e1e2ec] text-[#3125d1] transition hover:bg-[#f5f3ff]"
                >
                  <Eye size={12} />
                </Link>
              </div>
            );
          })
        )}
      </div>

      {!unlocked && <LockedOverlay status={status} />}
    </section>
  );
}

function InquiryStatus({ status }: { status: SellerInquiry["status"] }) {
  const config =
    status === "NEW"
      ? {
          label: "New",
          style: "bg-[#eef4ff] text-[#3762c5]",
        }
      : status === "REPLIED"
        ? {
            label: "Replied",
            style: "bg-[#edf8f0] text-[#2b9348]",
          }
        : status === "IN_DISCUSSION"
          ? {
              label: "In Discussion",
              style: "bg-[#fff3e8] text-[#d77a26]",
            }
          : status === "SPAM"
            ? {
                label: "Spam",
                style: "bg-[#fff0f0] text-[#cc3333]",
              }
            : {
                label: "Closed",
                style: "bg-[#f2f2f4] text-[#646777]",
              };

  return <span className={`w-fit rounded-[4px] px-2 py-1 font-medium text-[9px] ${config.style}`}>{config.label}</span>;
}

function LockedOverlay({ status }: { status: VerificationStatus }) {
  const title =
    status === "UNDER_VERIFICATION"
      ? "Available after verification"
      : status === "REJECTED"
        ? "Update and resubmit your profile"
        : "Access after verification";

  const description =
    status === "UNDER_VERIFICATION"
      ? "Your company profile is currently being reviewed."
      : status === "REJECTED"
        ? "Correct your company profile and submit it again."
        : "Complete your company profile to view and respond to buyer inquiries.";

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/35 backdrop-blur-[1px]">
      <div className="text-center">
        <div className="mx-auto flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#d9dbe8] bg-white shadow-sm">
          <LockKeyhole size={22} className="text-[#171570]" />
        </div>

        <h3 className="mt-3 font-bold text-[#171570] text-[12px]">{title}</h3>

        <p className="mx-auto mt-1 max-w-[400px] text-[#565c79] text-[10px] leading-[1.5]">{description}</p>
      </div>
    </div>
  );
}
