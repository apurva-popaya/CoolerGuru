"use client";

import { useEffect, useMemo, useState } from "react";

import { getSellerInquiries, getSellerInquirySummary } from "@/lib/api/seller-inquiries-api";
import type { SellerInquiry, SellerInquirySummaryData } from "@/types/seller-inquiry-api";

import { InquiryFilters } from "./inquiry-filters";
import { InquiryStats } from "./inquiry-stats";
import { InquiryTable } from "./inquiry-table";

const emptySummary: SellerInquirySummaryData = {
  total: 0,
  new: 0,
  replied: 0,
  in_discussion: 0,
  closed: 0,
  spam: 0,
};

export function SupplierInquiriesPage() {
  const [inquiries, setInquiries] = useState<SellerInquiry[]>([]);
  const [summary, setSummary] = useState<SellerInquirySummaryData>(emptySummary);

  const [searchQuery, setSearchQuery] = useState("");
  const [inquiryType, setInquiryType] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInquiries() {
      try {
        setLoading(true);
        setError("");

        const [inquiriesResponse, summaryResponse] = await Promise.all([
          getSellerInquiries(),
          getSellerInquirySummary(),
        ]);

        setInquiries(inquiriesResponse.data.inquiries);

        setSummary(summaryResponse.data.summary);
      } catch (error) {
        console.error("Seller inquiries error:", error);

        setError("Unable to load seller inquiries.");
      } finally {
        setLoading(false);
      }
    }

    loadInquiries();
  }, []);

  const filteredInquiries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return inquiries.filter((inquiry) => {
      const searchMatches =
        !query ||
        inquiry.inquiry_number.toLowerCase().includes(query) ||
        inquiry.buyer_name.toLowerCase().includes(query) ||
        inquiry.product_requirement.toLowerCase().includes(query) ||
        inquiry.product?.name?.toLowerCase().includes(query) ||
        inquiry.product?.category?.name?.toLowerCase().includes(query);

      const typeMatches = inquiryType === "all" || inquiry.inquiry_type === inquiryType;

      const statusMatches = status === "all" || inquiry.status === status;

      const dateMatches = matchesDateRange(inquiry.created_at, dateRange);

      return searchMatches && typeMatches && statusMatches && dateMatches;
    });
  }, [inquiries, searchQuery, inquiryType, status, dateRange]);

  return (
    <section className="px-7 py-6">
      <div>
        <h1 className="font-bold text-[#171570] text-[28px]">Supplier Inquiries</h1>

        <p className="mt-1 text-[#555b76] text-[11px]">
          Track, review, and respond to buyer inquiries received for your products and services.
        </p>
      </div>

      <div className="mt-5">
        <InquiryStats
          total={summary.total}
          newCount={summary.new}
          repliedCount={summary.replied}
          closedCount={summary.closed}
        />
      </div>

      <InquiryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        inquiryType={inquiryType}
        onInquiryTypeChange={setInquiryType}
        status={status}
        onStatusChange={setStatus}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {error && (
        <div className="mt-4 rounded-[7px] border border-red-200 bg-red-50 px-4 py-3 font-medium text-[10px] text-red-600">
          {error}
        </div>
      )}

      <InquiryTable inquiries={filteredInquiries} totalCount={summary.total} loading={loading} />
    </section>
  );
}

function matchesDateRange(value: string, range: string) {
  if (range === "all") {
    return true;
  }

  const createdAt = new Date(value);

  const now = new Date();

  const difference = now.getTime() - createdAt.getTime();

  const days = difference / (1000 * 60 * 60 * 24);

  if (range === "today") {
    return createdAt.toDateString() === now.toDateString();
  }

  if (range === "7-days") {
    return days <= 7;
  }

  if (range === "30-days") {
    return days <= 30;
  }

  return true;
}
