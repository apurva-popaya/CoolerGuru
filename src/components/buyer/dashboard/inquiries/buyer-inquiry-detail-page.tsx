"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

import {
  getBuyerInquiryDetail,
} from "@/lib/api/buyer-inquiries-api";

import {
  getBuyerNotifications,
  getNotificationInquiryNumber,
  markBuyerNotificationAsRead,
  type BuyerNotification,
} from "@/lib/api/buyer-notifications-api";

import {
  notifyBuyerNotificationsUpdated,
} from "@/lib/buyer-notification-events";

import type { BuyerInquiry } from "@/types/buyer-inquiry";

import { BuyerInquiryInformation } from "./buyer-inquiry-information";
import { BuyerInquiryNextSteps } from "./buyer-inquiry-next-steps";
import { BuyerInquiryProductCard } from "./buyer-inquiry-product-card";
import { BuyerInquirySummary } from "./buyer-inquiry-summary";
import { BuyerInquirySupplierCard } from "./buyer-inquiry-supplier-card";

interface Props {
  inquiryNumber: string;
}

export function BuyerInquiryDetailPage({
  inquiryNumber,
}: Props) {
  const [inquiry, setInquiry] =
    useState<BuyerInquiry | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadInquiry() {
      try {
        setLoading(true);
        setError("");

        /*
         * Load inquiry and notifications together.
         */
        const [
          inquiryResponse,
          notificationsResponse,
        ] = await Promise.all([
          getBuyerInquiryDetail(
            inquiryNumber,
          ),

          getBuyerNotifications({
            unread_only: false,
            page: 1,
            limit: 50,
          }),
        ]);

        if (cancelled) {
          return;
        }

        const loadedInquiry =
          inquiryResponse.data.inquiry;

        setInquiry(loadedInquiry);

        /*
         * Find the notification belonging to
         * this inquiry.
         */
        const notification =
          notificationsResponse.data.notifications.find(
            (
              item: BuyerNotification,
            ) => {
              const notificationInquiryNumber =
                getNotificationInquiryNumber(
                  item,
                );

              return (
                notificationInquiryNumber ===
                String(inquiryNumber)
              );
            },
          );

        /*
         * If this inquiry has an unread notification,
         * mark it as read because the buyer has opened
         * the inquiry.
         */
        if (
          notification &&
          !notification.is_read
        ) {
          try {
            await markBuyerNotificationAsRead(
              notification.notification_id,
            );

            /*
             * Tell navbar and inquiry list that
             * notification state changed.
             */
            notifyBuyerNotificationsUpdated();
          } catch (notificationError) {
            /*
             * The inquiry itself should still display
             * even if marking notification as read fails.
             */
            console.error(
              "Unable to mark buyer notification as read:",
              notificationError,
            );
          }
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Buyer inquiry detail error:",
            error,
          );

          setError(
            "Unable to load inquiry details.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInquiry();

    return () => {
      cancelled = true;
    };
  }, [inquiryNumber]);

  if (loading) {
    return (
      <section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <div className="rounded-[8px] border border-[#e1e2ed] bg-white px-5 py-12 text-center text-[#60657d] text-[10px]">
          Loading inquiry details...
        </div>
      </section>
    );
  }

  if (error || !inquiry) {
    return (
      <section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <div className="rounded-[8px] border border-red-200 bg-red-50 px-5 py-8 text-center text-[10px] text-red-600">
          {error ||
            "Inquiry not found."}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-[#555b75] text-[9px]">
        <Link
          href="/dashboard"
          className="hover:text-[#2118ad]"
        >
          Dashboard
        </Link>

        <ChevronRight size={11} />

        <Link
          href="/dashboard/inquiries"
          className="hover:text-[#2118ad]"
        >
          My Inquiries
        </Link>

        <ChevronRight size={11} />

        <span className="font-medium text-[#29247e]">
          Inquiry Detail
        </span>
      </div>

      {/* Header */}
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-bold text-[#171570] text-[24px] sm:text-[26px]">
            Inquiry Details
          </h1>

          <p className="mt-1 text-[#60657d] text-[9px]">
            Review the inquiry you submitted to
            the supplier.
          </p>
        </div>

        <Link
          href="/dashboard/inquiries"
          className="!text-[#251bb4] flex h-[34px] w-full items-center justify-center gap-2 rounded-[5px] border border-[#3929dd] bg-white px-4 font-bold text-[8px] transition hover:bg-[#f6f5ff] sm:w-auto"
        >
          <ArrowLeft size={12} />
          Back to My Inquiries
        </Link>
      </div>

      <BuyerInquirySummary
        inquiry={inquiry}
      />

      <div className="mt-4 grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <BuyerInquiryInformation
          inquiry={inquiry}
        />

        <div className="space-y-4">
          <BuyerInquirySupplierCard
            inquiry={inquiry}
          />

          {inquiry.product && (
            <BuyerInquiryProductCard
              inquiry={inquiry}
            />
          )}
        </div>
      </div>

      <BuyerInquiryNextSteps />
    </section>
  );
}