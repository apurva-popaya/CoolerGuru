"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { ArrowLeft, ChevronRight } from "lucide-react";

import { getBuyerInquiryDetail } from "@/lib/api/buyer-inquiries-api";
import type { BuyerInquiry } from "@/types/buyer-inquiry";

import { BuyerInquiryInformation } from "./buyer-inquiry-information";
import { BuyerInquiryNextSteps } from "./buyer-inquiry-next-steps";
import { BuyerInquiryProductCard } from "./buyer-inquiry-product-card";
import { BuyerInquirySummary } from "./buyer-inquiry-summary";
import { BuyerInquirySupplierCard } from "./buyer-inquiry-supplier-card";

interface Props {
  inquiryNumber: string;
}

export function BuyerInquiryDetailPage({ inquiryNumber }: Props) {
  const [inquiry, setInquiry] = useState<BuyerInquiry | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInquiry() {
      try {
        setLoading(true);
        setError("");

        const response = await getBuyerInquiryDetail(inquiryNumber);

        setInquiry(response.data.inquiry);
      } catch (error) {
        console.error("Buyer inquiry detail error:", error);

        setError("Unable to load inquiry details.");
      } finally {
        setLoading(false);
      }
    }

    loadInquiry();
  }, [inquiryNumber]);

  if (loading) {
    return (
      <section className="px-8 py-7">
        <div className="rounded-[8px] border border-[#e1e2ed] bg-white px-5 py-12 text-center text-[#60657d] text-[10px]">
          Loading inquiry details...
        </div>
      </section>
    );
  }

  if (error || !inquiry) {
    return (
      <section className="px-8 py-7">
        <div className="rounded-[8px] border border-red-200 bg-red-50 px-5 py-8 text-center text-[10px] text-red-600">
          {error || "Inquiry not found."}
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-7">
      <div className="flex items-center gap-2 text-[#555b75] text-[9px]">
        <Link href="/dashboard" className="hover:text-[#2118ad]">
          Dashboard
        </Link>

        <ChevronRight size={11} />

        <Link href="/dashboard/inquiries" className="hover:text-[#2118ad]">
          My Inquiries
        </Link>

        <ChevronRight size={11} />

        <span className="font-medium text-[#29247e]">Inquiry Detail</span>
      </div>

      <div className="mt-2 flex items-start justify-between gap-5">
        <div>
          <h1 className="font-bold text-[#171570] text-[26px]">Inquiry Details</h1>

          <p className="mt-1 text-[#60657d] text-[9px]">Review the inquiry you submitted to the supplier.</p>
        </div>

        <Link
          href="/dashboard/inquiries"
          className="!text-[#251bb4] flex h-[34px] items-center gap-2 rounded-[5px] border border-[#3929dd] bg-white px-4 font-bold text-[8px] transition hover:bg-[#f6f5ff]"
        >
          <ArrowLeft size={12} />
          Back to My Inquiries
        </Link>
      </div>

      <BuyerInquirySummary inquiry={inquiry} />

      <div className="mt-4 grid grid-cols-[1.25fr_0.75fr] items-start gap-4">
        <BuyerInquiryInformation inquiry={inquiry} />

        <div className="space-y-4">
          <BuyerInquirySupplierCard inquiry={inquiry} />

          {inquiry.product && <BuyerInquiryProductCard inquiry={inquiry} />}
        </div>
      </div>

      <BuyerInquiryNextSteps />
    </section>
  );
}
