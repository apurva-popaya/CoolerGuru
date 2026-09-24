"use client";

import { useState } from "react";
import { SafeImage } from "@/components/common/safe-image";
import Link from "next/link";

import { Heart, MapPin } from "lucide-react";

import type { NewLaunchProduct } from "@/types/new-launch";

interface NewLaunchCardProps {
  product: NewLaunchProduct;
}

export function NewLaunchCard({
  product,
}: NewLaunchCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="relative flex min-w-0 flex-col rounded-[8px] border border-[#e1e2ec] bg-white p-2.5 sm:p-3">
      {/* New badge */}
      {product.isNew ? (
        <span className="absolute top-2.5 left-2.5 z-10 rounded-[3px] bg-[#0a9d32] px-2 py-[3px] font-bold text-[7px] text-white uppercase sm:top-3 sm:left-3">
          New
        </span>
      ) : null}

      {/* Wishlist */}
      <button
        type="button"
        aria-label={
          saved
            ? "Remove from saved products"
            : "Save product"
        }
        onClick={() =>
          setSaved((current) => !current)
        }
        className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full text-[#27227e] transition hover:bg-[#f5f4ff] hover:text-[#3424e3] sm:top-3 sm:right-3"
      >
        <Heart
          size={15}
          strokeWidth={1.8}
          className={
            saved
              ? "fill-[#3025cf] text-[#3025cf]"
              : ""
          }
        />
      </button>

      {/* Product image */}
      <div className="relative h-[105px] w-full sm:h-[125px] lg:h-[135px]">
        <SafeImage
          src={
            product.image ||
            "/images/product-placeholder.png"
          }
          alt={product.name}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 220px"
          className="object-contain"
        />
      </div>

      {/* Product name */}
      <h2 className="mt-2 min-h-[34px] font-bold text-[#171570] text-[9px] leading-[1.3] sm:text-[10px]">
        {product.name}
      </h2>

      {/* Company */}
      <p className="mt-1 truncate font-medium text-[#454a67] text-[8px]">
        {product.company}
      </p>

      {/* Location */}
      <div className="mt-2 flex min-w-0 items-center gap-1.5">
        <MapPin
          size={9}
          className="shrink-0 text-[#3025cf]"
        />

        <span className="truncate text-[#656a82] text-[7px]">
          {product.location}
        </span>
      </div>

      {/* Action */}
      <Link
        href={`/products/${product.slug}`}
        className="!text-[#251bb4] mt-3 flex h-[30px] items-center justify-center rounded-[4px] border border-[#3b2ce2] bg-white pt-[1px] font-bold text-[8px] transition hover:bg-[#f6f5ff] sm:mt-4 sm:h-[31px]"
      >
        View Details
      </Link>
    </div>
  );
}