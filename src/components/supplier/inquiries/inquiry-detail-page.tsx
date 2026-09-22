"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";

import { ChevronLeft } from "lucide-react";

import { getSellerInquiryDetail } from "@/lib/api/seller-inquiries-api";
import type { SellerInquiry } from "@/types/seller-inquiry-api";

import { InquiryActions } from "./inquiry-actions";
import { InquiryAttachments } from "./inquiry-attachments";
import { InquiryBuyerSummary } from "./inquiry-buyer-summary";
import { InquiryReplyPanel } from "./inquiry-reply-panel";
import { InquiryRequirementDetails } from "./inquiry-requirement-details";
import { InquiryTimeline } from "./inquiry-timeline";

interface InquiryDetailPageProps {
  inquiryNumber: string;
  replyMode?: boolean;
}

export function SupplierInquiryDetailPage({ inquiryNumber, replyMode = false }: InquiryDetailPageProps) {
  const [inquiry, setInquiry] = useState<SellerInquiry | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadInquiry = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getSellerInquiryDetail(inquiryNumber);

      setInquiry(response.data.inquiry);
    } catch (error) {
      console.error("Seller inquiry detail error:", error);

      setError("Unable to load inquiry details.");
    } finally {
      setLoading(false);
    }
  }, [inquiryNumber]);

  useEffect(() => {
    loadInquiry();
  }, [loadInquiry]);

  if (loading) {
    return (
      <section className="px-7 py-6">
        <div className="rounded-[9px] border border-[#e1e2ed] bg-white px-5 py-12 text-center text-[#666b83] text-[10px]">
          Loading inquiry details...
        </div>
      </section>
    );
  }

  if (error || !inquiry) {
    return (
      <section className="px-7 py-6">
        <div className="rounded-[9px] border border-red-200 bg-red-50 px-5 py-10 text-center text-[10px] text-red-600">
          {error || "Inquiry not found."}
        </div>
      </section>
    );
  }

  const requirementDetails = buildRequirementDetails(inquiry);

  return (
    <section className="px-7 py-6">
      <Link
        href="/supplier/dashboard/inquiries"
        className="!text-[#3024c8] inline-flex items-center gap-1 font-semibold text-[9px]"
      >
        <ChevronLeft size={11} />
        Back to Inquiries
      </Link>

      <div className="mt-3 flex items-start justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-bold text-[#171570] text-[28px]">Inquiry Details</h1>

            <span className="rounded-[4px] border border-[#d8d9e8] bg-white px-2.5 py-1 font-semibold text-[#555b76] text-[9px]">
              ID: {inquiry.inquiry_number}
            </span>
          </div>

          <p className="mt-1 text-[#555b76] text-[10px]">View full details of the inquiry received from the buyer.</p>
        </div>

        <div className="text-right">
          <InquiryDetailStatus status={inquiry.status} />

          <p className="mt-2 text-[#85899f] text-[9px]">
            Received on: {formatDate(inquiry.created_at)}, {formatTime(inquiry.created_at)}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <InquiryBuyerSummary inquiry={inquiry} />
      </div>

      <div className="mt-4 grid grid-cols-[0.95fr_1.2fr] gap-4">
        <div className="rounded-[9px] border border-[#e1e2ed] bg-white p-4">
          <h2 className="font-bold text-[#171570] text-[13px]">Buyer&apos;s Message</h2>

          <p className="mt-4 whitespace-pre-line text-[#454b68] text-[10px] leading-[1.75]">
            {inquiry.requirement_details}
          </p>
        </div>

        <InquiryRequirementDetails details={requirementDetails} />
      </div>

      <InquiryTimeline events={inquiry.events ?? []} />

      <div className="mt-4 grid grid-cols-[1fr_1.05fr] gap-4">
        <InquiryAttachments attachments={[]} />

        <InquiryActions inquiryNumber={inquiry.inquiry_number} status={inquiry.status} onClosed={loadInquiry} />
      </div>

      {replyMode ? (
        <InquiryReplyPanel inquiryId={inquiry.inquiry_number} buyerName={inquiry.buyer_name} companyName="" />
      ) : null}
    </section>
  );
}

function buildRequirementDetails(inquiry: SellerInquiry) {
  const details = [
    {
      label: "Product / Requirement",
      value: inquiry.product_requirement,
    },
    {
      label: "Quantity",
      value: `${inquiry.quantity} ${inquiry.quantity_unit}`,
    },
  ];

  if (inquiry.product?.brand) {
    details.push({
      label: "Brand",
      value: inquiry.product.brand,
    });
  }

  if (inquiry.product?.model_number) {
    details.push({
      label: "Model",
      value: inquiry.product.model_number,
    });
  }

  if (inquiry.product?.airflow) {
    details.push({
      label: "Airflow",
      value: inquiry.product.airflow,
    });
  }

  if (inquiry.product?.tank_capacity) {
    details.push({
      label: "Tank Capacity",
      value: inquiry.product.tank_capacity,
    });
  }

  if (inquiry.product?.power) {
    details.push({
      label: "Power",
      value: inquiry.product.power,
    });
  }

  return details;
}

function InquiryDetailStatus({ status }: { status: SellerInquiry["status"] }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="font-semibold text-[#555b76] text-[9px]">Status</span>

      <span className="flex h-[32px] min-w-[125px] items-center justify-center rounded-[5px] border border-[#f0cfa3] bg-[#fff5e8] px-3 font-semibold text-[#d57a20] text-[9px]">
        {formatStatus(status)}
      </span>
    </div>
  );
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
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
