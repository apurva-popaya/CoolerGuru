// "use client";

// import { useCallback, useEffect, useState } from "react";

// import Link from "next/link";

// import { ChevronRight } from "lucide-react";

// import { getBuyerInquiries } from "@/lib/api/buyer-inquiries-api";
// import type {
//   BuyerInquiry,
//   BuyerInquiryPagination,
//   BuyerInquiryStatus,
// } from "@/types/buyer-inquiry";

// import { BuyerInquiriesFilters } from "./buyer-inquiries-filters";
// import { BuyerInquiriesPagination } from "./buyer-inquiries-pagination";
// import { BuyerInquiriesTable } from "./buyer-inquiries-table";

// const emptyPagination: BuyerInquiryPagination = {
//   page: 1,
//   limit: 10,
//   totalItems: 0,
//   totalPages: 0,
//   hasNextPage: false,
//   hasPreviousPage: false,
// };

// export function BuyerInquiriesPage() {
//   const [inquiries, setInquiries] = useState<BuyerInquiry[]>([]);
//   const [pagination, setPagination] =
//     useState<BuyerInquiryPagination>(emptyPagination);

//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState<BuyerInquiryStatus | "">("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadInquiries = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await getBuyerInquiries({
//         search: search.trim() || undefined,
//         status: status || undefined,
//         date_from: dateFrom || undefined,
//         date_to: dateTo || undefined,
//         sort_by: "created_at",
//         sort_order: "desc",
//         page,
//         limit,
//       });

//       setInquiries(response.data.inquiries);
//       setPagination(response.data.pagination);
//     } catch (error) {
//       console.error("Buyer inquiries error:", error);
//       setError("Unable to load inquiries.");
//       setInquiries([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [search, status, dateFrom, dateTo, page, limit]);

//   useEffect(() => {
//     const timer = window.setTimeout(() => {
//       loadInquiries();
//     }, 300);

//     return () => window.clearTimeout(timer);
//   }, [loadInquiries]);

//   return (
//     <section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
//       <h1 className="font-bold text-[#171570] text-[24px] sm:text-[27px]">
//         My Inquiries
//       </h1>

//       <div className="mt-2 flex items-center gap-2 text-[#555b75] text-[9px] sm:text-[10px]">
//         <Link href="/" className="hover:text-[#2118ad]">
//           Home
//         </Link>

//         <ChevronRight size={12} />

//         <span className="font-medium text-[#29247e]">My Inquiries</span>
//       </div>

//       <div className="mt-5 overflow-hidden rounded-[9px] border border-[#e1e2ed] bg-white">
//         <BuyerInquiriesFilters
//           search={search}
//           status={status}
//           dateFrom={dateFrom}
//           dateTo={dateTo}
//           onSearchChange={(value) => {
//             setSearch(value);
//             setPage(1);
//           }}
//           onStatusChange={(value) => {
//             setStatus(value);
//             setPage(1);
//           }}
//           onDateFromChange={(value) => {
//             setDateFrom(value);
//             setPage(1);
//           }}
//           onDateToChange={(value) => {
//             setDateTo(value);
//             setPage(1);
//           }}
//         />

//         {error && (
//           <div className="border-[#ececf2] border-b bg-red-50 px-4 py-3 font-medium text-[9px] text-red-600">
//             {error}
//           </div>
//         )}

//         <BuyerInquiriesTable inquiries={inquiries} loading={loading} />

//         <BuyerInquiriesPagination
//           pagination={pagination}
//           onPageChange={setPage}
//           onLimitChange={(value) => {
//             setLimit(value);
//             setPage(1);
//           }}
//         />
//       </div>
//     </section>
//   );
// }




"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { getBuyerInquiries } from "@/lib/api/buyer-inquiries-api";

import {
  getBuyerNotifications,
  getNotificationInquiryNumber,
  type BuyerNotification,
} from "@/lib/api/buyer-notifications-api";

import type {
  BuyerInquiry,
  BuyerInquiryPagination,
  BuyerInquiryStatus,
} from "@/types/buyer-inquiry";

import {
  BUYER_NOTIFICATIONS_UPDATED,
} from "@/lib/buyer-notification-events";

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
  const [inquiries, setInquiries] =
    useState<BuyerInquiry[]>([]);

  const [pagination, setPagination] =
    useState<BuyerInquiryPagination>(
      emptyPagination,
    );

  const [notifications, setNotifications] =
    useState<BuyerNotification[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<BuyerInquiryStatus | "">("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  /**
   * Load notifications.
   *
   * We request all notifications because the table
   * needs to know which individual inquiries are read
   * and which are unread.
   */
  const loadNotifications = useCallback(
    async () => {
      try {
        const response =
          await getBuyerNotifications({
            unread_only: false,
            page: 1,
            limit: 100,
          });

        setNotifications(
          response.data.notifications,
        );
      } catch (error) {
        console.error(
          "Buyer notifications error:",
          error,
        );

        /*
         * Do not break the inquiry table if the
         * notification endpoint fails.
         */
        setNotifications([]);
      }
    },
    [],
  );

  /**
   * Load inquiries.
   */
  const loadInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getBuyerInquiries({
          search:
            search.trim() || undefined,
          status:
            status || undefined,
          date_from:
            dateFrom || undefined,
          date_to:
            dateTo || undefined,
          sort_by: "created_at",
          sort_order: "desc",
          page,
          limit,
        });

      setInquiries(
        response.data.inquiries,
      );

      setPagination(
        response.data.pagination,
      );
    } catch (error) {
      console.error(
        "Buyer inquiries error:",
        error,
      );

      setError(
        "Unable to load inquiries.",
      );

      setInquiries([]);
    } finally {
      setLoading(false);
    }
  }, [
    search,
    status,
    dateFrom,
    dateTo,
    page,
    limit,
  ]);

  /**
   * Load both inquiries and notifications.
   */
  const loadPageData = useCallback(
    async () => {
      await Promise.all([
        loadInquiries(),
        loadNotifications(),
      ]);
    },
    [
      loadInquiries,
      loadNotifications,
    ],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadPageData();
    }, 300);

    return () =>
      window.clearTimeout(timer);
  }, [loadPageData]);

  /**
   * When an inquiry detail page marks a notification
   * as read, refresh this page's notification state.
   */
  useEffect(() => {
    function handleNotificationsUpdated() {
      void loadNotifications();
    }

    window.addEventListener(
      BUYER_NOTIFICATIONS_UPDATED,
      handleNotificationsUpdated,
    );

    return () => {
      window.removeEventListener(
        BUYER_NOTIFICATIONS_UPDATED,
        handleNotificationsUpdated,
      );
    };
  }, [loadNotifications]);

  /**
   * Build a set of inquiry numbers whose notification
   * is still unread.
   */
  const unreadInquiryNumbers = new Set(
    notifications
      .filter(
        (notification) =>
          !notification.is_read,
      )
      .map(
        getNotificationInquiryNumber,
      )
      .filter(
        (
          inquiryNumber,
        ): inquiryNumber is string =>
          Boolean(inquiryNumber),
      ),
  );

  return (
    <section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <h1 className="font-bold text-[#171570] text-[24px] sm:text-[27px]">
        My Inquiries
      </h1>

      <div className="mt-2 flex items-center gap-2 text-[#555b75] text-[9px] sm:text-[10px]">
        <Link
          href="/"
          className="hover:text-[#2118ad]"
        >
          Home
        </Link>

        <ChevronRight size={12} />

        <span className="font-medium text-[#29247e]">
          My Inquiries
        </span>
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

        <BuyerInquiriesTable
          inquiries={inquiries}
          loading={loading}
          unreadInquiryNumbers={
            unreadInquiryNumbers
          }
        />

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