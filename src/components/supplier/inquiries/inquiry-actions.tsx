"use client";

import { useState } from "react";

import Link from "next/link";

import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

import { closeSellerInquiry } from "@/lib/api/seller-inquiries-api";
import type { SellerInquiryStatus } from "@/types/seller-inquiry-api";

interface InquiryActionsProps {
  inquiryNumber: string;
  status: SellerInquiryStatus;
  onClosed?: () => void;
}

export function InquiryActions({ inquiryNumber, status, onClosed }: InquiryActionsProps) {
  const [closing, setClosing] = useState(false);

  const [message, setMessage] = useState("");

  async function handleClose() {
    if (status === "CLOSED" || closing) {
      return;
    }

    try {
      setClosing(true);
      setMessage("");

      const response = await closeSellerInquiry(inquiryNumber);

      setMessage(response.message);

      onClosed?.();
    } catch (error) {
      console.warn("Close inquiry error:", error);

      setMessage(error instanceof Error && error.message ? error.message : "Unable to close inquiry.");
    } finally {
      setClosing(false);
    }
  }

  return (
    <div className="rounded-[9px] border border-[#e1e2ed] bg-white p-4">
      <h2 className="font-bold text-[#171570] text-[13px]">Actions</h2>

      <div className="mt-3 space-y-3">
        <Link
          href={`/supplier/dashboard/inquiries/${encodeURIComponent(inquiryNumber)}?reply=true`}
          className="!text-white flex h-[38px] w-full items-center justify-center gap-2 rounded-[5px] bg-[#2819bd] font-bold text-[10px]"
        >
          <ArrowRight size={12} />
          Reply to Inquiry
        </Link>

        <button
          type="button"
          disabled={status === "CLOSED" || closing}
          onClick={handleClose}
          className="flex h-[38px] w-full items-center justify-center gap-2 rounded-[5px] border border-[#766be0] bg-white font-bold text-[#3024c8] text-[10px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle2 size={12} />

          {status === "CLOSED" ? "Inquiry Closed" : closing ? "Closing..." : "Mark as Closed"}
        </button>

        <button
          type="button"
          disabled
          title="Spam API not integrated yet"
          className="flex h-[38px] w-full cursor-not-allowed items-center justify-center gap-2 rounded-[5px] border border-[#f0a5a5] bg-white font-bold text-[#db3b3b] text-[10px] opacity-50"
        >
          <AlertTriangle size={12} />
          Report as Spam
        </button>
      </div>

      {message && <p className="mt-3 font-medium text-[#555b76] text-[9px]">{message}</p>}
    </div>
  );
}
