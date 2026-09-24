import Link from "next/link";

import {
  Gauge,
  MapPin,
  Package,
  Settings,
} from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";
import type { DirectoryProduct } from "@/types/product-directory";

interface ProductDirectoryCardProps {
  product: DirectoryProduct;
  companyId?: string;
}

export function ProductDirectoryCard({
  product,
  companyId,
}: ProductDirectoryCardProps) {
  const productDetailHref = `/products/${product.slug}`;
  const inquiryHref = `/products/${product.slug}/inquiry`;

  return (
    <div className="relative flex h-full min-w-0 flex-col rounded-[8px] border border-[#e1e2ec] bg-white p-3">
      {/* Status */}
      <div className="absolute top-3 left-3 z-10">
        {product.isPremium ? (
          <span className="rounded-[3px] bg-[#ff6717] px-2 py-[3px] font-bold text-[7px] text-white">
            Premium
          </span>
        ) : product.isVerified ? (
          <span className="rounded-[3px] bg-[#159447] px-2 py-[3px] font-bold text-[7px] text-white">
            Verified
          </span>
        ) : null}
      </div>

      {/* Image */}
      <div className="relative h-[135px] w-full shrink-0 sm:h-[145px]">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 250px"
          className="object-contain"
        />
      </div>

      {/* Name */}
      <h2 className="mt-2 min-h-[34px] font-bold text-[#171570] text-[11px] leading-[1.25]">
        {product.name}
      </h2>

      {/* Company */}
      <p className="mt-1 truncate font-semibold text-[#2b21bd] text-[8px]">
        {product.company}
      </p>

      {/* Location */}
      <div className="mt-1 flex items-center gap-1">
        <MapPin
          size={9}
          className="shrink-0 text-[#3025cf]"
        />

        <span className="truncate text-[#666b82] text-[7px]">
          {product.location}
        </span>
      </div>

      {/* Category */}
      <div className="mt-2">
        <span className="inline-flex max-w-full truncate rounded-[4px] bg-[#f1efff] px-2 py-[3px] font-semibold text-[#2d23c3] text-[7px]">
          {product.category}
        </span>
      </div>

      {/* Specs */}
      <div className="mt-2 space-y-[4px]">
        {product.specs.map((spec, index) => (
          <div
            key={`${product.id}-${spec.label}`}
            className="flex items-start gap-1.5"
          >
            <span className="mt-[1px] shrink-0 text-[#3127cb]">
              {index === 0 ? (
                <Gauge size={9} />
              ) : index === 1 ? (
                <Package size={9} />
              ) : (
                <Settings size={9} />
              )}
            </span>

            <span className="text-[#555b73] text-[7.5px] leading-[1.3]">
              <span className="font-semibold">
                {spec.label}:
              </span>{" "}
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="mt-auto pt-3">
        {/* MOQ + Price */}
        <div className="flex items-end justify-between gap-2">
          <p className="text-[#555b73] text-[7.5px]">
            <span className="font-semibold">
              MOQ:
            </span>{" "}
            {product.moq}
          </p>

          <p className="truncate text-right font-bold text-[#2118ad] text-[8px]">
            {product.price}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={productDetailHref}
            className="!text-white flex h-[30px] items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[8px] transition hover:bg-[#3022c6]"
          >
            View Details
          </Link>

          <Link
            href={inquiryHref}
            className="!text-[#251bb4] flex h-[30px] items-center justify-center rounded-[4px] border border-[#3829dc] bg-white font-bold text-[8px] transition hover:bg-[#f6f5ff]"
          >
            Send Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
}