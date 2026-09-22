"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { getBuyerInquiries } from "@/lib/api/buyer-inquiries-api";
import type { BuyerInquiry, BuyerInquiryPagination, BuyerInquiryStatus } from "@/types/buyer-inquiry";

import { BuyerInquiriesFilters } from "./buyer-inquiries-filters";
import { BuyerInquiriesPagination } from "./buyer-inquiries-pagination";
import { BuyerInquiriesTable } from "./buyer-inquiries-table";

const emptyPagination: BuyerInquiryPagination = {
  page: 1,
  limit: 10,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

export function BuyerInquiriesPage() {
  const [inquiries, setInquiries] = useState<BuyerInquiry[]>([]);
  const [pagination, setPagination] = useState<BuyerInquiryPagination>(emptyPagination);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BuyerInquiryStatus | "">("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBuyerInquiries({
        search: search.trim() || undefined,

        status: status || undefined,

        date_from: dateFrom || undefined,

        date_to: dateTo || undefined,

        sort_by: "created_at",

        sort_order: "desc",

        page,
        limit,
      });

      setInquiries(response.data.inquiries);

      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Buyer inquiries error:", error);

      setError("Unable to load inquiries.");

      setInquiries([]);
    } finally {
      setLoading(false);
    }
  }, [search, status, dateFrom, dateTo, page, limit]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadInquiries();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [loadInquiries]);

  return (
    <section className="px-8 py-7">
      <h1 className="font-bold text-[#171570] text-[27px]">My Inquiries</h1>

      <div className="mt-2 flex items-center gap-2 text-[#555b75] text-[10px]">
        <Link href="/" className="hover:text-[#2118ad]">
          Home
        </Link>

        <ChevronRight size={12} />

        <span className="font-medium text-[#29247e]">My Inquiries</span>
      </div>

      <div className="mt-5 overflow-hidden rounded-[9px] border border-[#e1e2ed] bg-white">
        <BuyerInquiriesFilters
          search={search}
          status={status}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onDateFromChange={(value) => {
            setDateFrom(value);
            setPage(1);
          }}
          onDateToChange={(value) => {
            setDateTo(value);
            setPage(1);
          }}
        />

        {error && (
          <div className="border-[#ececf2] border-b bg-red-50 px-4 py-3 font-medium text-[9px] text-red-600">
            {error}
          </div>
        )}

        <BuyerInquiriesTable inquiries={inquiries} loading={loading} />

        <BuyerInquiriesPagination
          pagination={pagination}
          onPageChange={setPage}
          onLimitChange={(value) => {
            setLimit(value);
            setPage(1);
          }}
        />
      </div>
    </section>
  );
}
