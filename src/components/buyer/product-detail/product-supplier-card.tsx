import Link from "next/link";

import { BadgeCheck, Clock3, MapPin } from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";
import type { ProductDetail } from "@/types/product-detail";

export function ProductSupplierCard({
  product,
}: {
  product: ProductDetail;
}) {
  const companyHref = product.companySlug
    ? `/companies/${encodeURIComponent(product.companySlug)}`
    : "/companies";

  const inquiryHref = product.companySlug
    ? `/companies/${encodeURIComponent(product.companySlug)}/inquiry`
    : "/companies";

  const businessTypes =
    product.companyBusinessTypes.length > 0
      ? product.companyBusinessTypes.join(" | ")
      : "Supplier";

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 rounded-[8px] border border-[#e2e3ee] bg-white px-4 py-4 sm:px-5 lg:grid-cols-[minmax(280px,330px)_minmax(0,1fr)] lg:items-center lg:gap-5 lg:px-4 lg:py-3 xl:grid-cols-[330px_1fr_290px]">
      {/* Company */}
      <div className="flex items-center gap-3">
        <div className="relative h-[60px] w-[90px] shrink-0">
          <SafeImage
            src={product.companyLogo}
            alt={product.companyName}
            fill
            sizes="90px"
            className="object-contain"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="truncate font-bold text-[#171570] text-[14px]">
              {product.companyName}
            </h2>

            {product.isVerifiedSupplier ? (
              <BadgeCheck
                size={12}
                className="shrink-0 fill-[#159447] text-white"
              />
            ) : null}
          </div>

          <p className="mt-1 text-[#555a76] text-[8px]">
            {businessTypes}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1 text-[#555a76] text-[7px]">
              <Clock3 size={9} />
              {product.companyYears}
            </span>

            <span className="flex items-center gap-1 text-[#555a76] text-[7px]">
              <MapPin size={9} />
              {product.companyLocation}
            </span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="border-[#e8e8f0] border-t pt-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
        <p className="font-bold text-[#27217e] text-[9px]">
          About Company
        </p>

        <p className="mt-1 text-[#555a75] text-[8px] leading-[1.5]">
          {product.companyDescription ||
            "No company description available."}
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:col-span-2 xl:col-span-1">
        <Link
          href={companyHref}
          className="!text-[#251bb4] flex h-[34px] items-center justify-center rounded-[4px] border border-[#3829db] font-bold text-[8px] transition hover:bg-[#f7f6ff]"
        >
          View Profile
        </Link>

        <Link
          href={inquiryHref}
          className="!text-white flex h-[34px] items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[8px] transition hover:bg-[#181080]"
        >
          Contact Supplier
        </Link>
      </div>
    </div>
  );
}