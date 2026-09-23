"use client";

import { useState } from "react";

import Image from "next/image";

import { ImageOff } from "lucide-react";

import type { ProductApprovalStatus, SellerProduct } from "@/lib/api/seller-products-api";

/* =========================================
   FORMATTERS
========================================= */

function formatAmount(value: string | number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 2,
  }).format(Number(value));
}

export function formatProductPrice(product: Pick<SellerProduct, "price" | "min_price" | "max_price" | "currency">) {
  const { price, min_price, max_price, currency } = product;

  if (min_price && max_price && Number(min_price) !== Number(max_price)) {
    return `${formatAmount(min_price, currency)} – ${formatAmount(max_price, currency)}`;
  }

  const singlePrice = price ?? min_price ?? max_price;

  return singlePrice ? formatAmount(singlePrice, currency) : "Price on request";
}

export function formatProductDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getPrimaryImage(product: Pick<SellerProduct, "images">) {
  return product.images.find((image) => image.is_primary) ?? product.images[0];
}

/* =========================================
   IMAGE
========================================= */

/*
 * Product images can be any remote URL (and dummy URLs until S3 is ready),
 * so they skip Next image optimisation and fall back to a placeholder.
 */
export function ProductImage({ src, alt, className = "object-contain p-1" }: { src?: string; alt: string; className?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div className="flex h-full w-full items-center justify-center text-[#b3b6c7]">
        <ImageOff size={16} />
      </div>
    );
  }

  return <Image src={src} alt={alt} fill unoptimized onError={() => setFailedSrc(src)} className={className} />;
}

/* =========================================
   BADGES
========================================= */

const badgeBaseClass = "w-fit rounded-[4px] border px-2 py-1 font-semibold text-[8px]";

const greenBadge = "border-[#bde5c9] bg-[#eaf8ee] text-[#208b43]";
const orangeBadge = "border-[#f3dab1] bg-[#fff5e5] text-[#df8a17]";
const redBadge = "border-[#f0c3ca] bg-[#fff0f2] text-[#db3e57]";
const blueBadge = "border-[#c9c6f2] bg-[#f3f2ff] text-[#3125c8]";

export function StockBadge({ status }: { status: string | null }) {
  const config =
    status === "OUT_OF_STOCK"
      ? { label: "Out of Stock", style: redBadge }
      : status === "LOW_STOCK"
        ? { label: "Low Stock", style: orangeBadge }
        : { label: "In Stock", style: greenBadge };

  return <span className={`${badgeBaseClass} ${config.style}`}>{config.label}</span>;
}

export function ProductStatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span className={`${badgeBaseClass} ${isActive ? greenBadge : redBadge}`}>{isActive ? "Active" : "Inactive"}</span>
  );
}

const APPROVAL_CONFIG: Record<ProductApprovalStatus, { label: string; style: string }> = {
  PENDING: { label: "Pending Approval", style: orangeBadge },
  UNDER_REVIEW: { label: "Under Review", style: blueBadge },
  APPROVED: { label: "Approved", style: greenBadge },
  REJECTED: { label: "Rejected", style: redBadge },
};

export function ApprovalBadge({ status }: { status: ProductApprovalStatus }) {
  const config = APPROVAL_CONFIG[status] ?? APPROVAL_CONFIG.PENDING;

  return <span className={`${badgeBaseClass} ${config.style}`}>{config.label}</span>;
}
