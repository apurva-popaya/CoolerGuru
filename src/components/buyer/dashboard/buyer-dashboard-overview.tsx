"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { ArrowRight, BarChart3, ChevronRight } from "lucide-react";

import { getBuyerInquiries, getBuyerInquirySummary } from "@/lib/api/buyer-inquiries-api";
import type { BuyerInquiry, BuyerInquirySummaryData } from "@/types/buyer-inquiry";

import { BuyerDashboardStats } from "./buyer-dashboard-stats";
import { BuyerRecentInquiries } from "./buyer-recent-inquiries";

const emptySummary: BuyerInquirySummaryData = {
  total: 0,
  recent_30_days: 0,
  new: 0,
  replied: 0,
  in_discussion: 0,
  closed: 0,
};

export function BuyerDashboardOverview() {
  const [summary, setSummary] = useState<BuyerInquirySummaryData>(emptySummary);
  const [recentInquiries, setRecentInquiries] = useState<BuyerInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [summaryResponse, inquiriesResponse] = await Promise.all([
          getBuyerInquirySummary(),
          getBuyerInquiries({
            page: 1,
            limit: 5,
            sort_by: "created_at",
            sort_order: "desc",
          }),
        ]);

        setSummary(summaryResponse.data.summary);
        setRecentInquiries(inquiriesResponse.data.inquiries);
      } catch (error) {
        console.error("Buyer dashboard error:", error);
        setError("Unable to load dashboard information.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <h1 className="font-bold text-[#171570] text-[24px] sm:text-[27px]">
        Dashboard Overview
      </h1>

      <div className="mt-2 flex items-center gap-2 text-[#555b75] text-[9px] sm:text-[10px]">
        <Link href="/" className="hover:text-[#2118ad]">
          Home
        </Link>

        <ChevronRight size={12} />

        <span className="font-medium text-[#29247e]">Dashboard</span>
      </div>

      <div className="relative mt-5 flex min-h-[145px] flex-col items-start gap-4 overflow-hidden rounded-[9px] border border-[#dedff0] bg-gradient-to-r from-[#f8f6ff] to-[#f2f0ff] p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-0">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-white/70 text-[#392ada] sm:h-[58px] sm:w-[58px]">
          <BarChart3 size={25} />
        </div>

        <div className="lg:ml-5">
          <h2 className="font-bold text-[#171570] text-[19px] sm:text-[22px]">
            Welcome back, Buyer!
          </h2>

          <p className="mt-2 max-w-[360px] text-[#565b75] text-[9px] leading-[1.5] sm:text-[10px]">
            Find the best cooling products and connect with trusted manufacturers across India.
          </p>
        </div>

        <Link
          href="/products"
          className="!text-white flex h-[40px] w-full items-center justify-center gap-3 rounded-[5px] bg-[#2116a5] px-5 font-bold text-[10px] transition hover:bg-[#3022c6] sm:w-auto lg:ml-auto lg:min-w-[165px]"
        >
          Browse Products
          <ArrowRight size={14} />
        </Link>
      </div>

      {error && (
        <div className="mt-5 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 font-medium text-[10px] text-red-600">
          {error}
        </div>
      )}

      <BuyerDashboardStats
        totalInquiries={summary.total}
        recentInquiries={summary.recent_30_days}
        loading={loading}
      />

      <BuyerRecentInquiries inquiries={recentInquiries} loading={loading} />
    </section>
  );
}