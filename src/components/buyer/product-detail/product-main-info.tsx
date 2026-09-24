import Link from "next/link";

import {
  BadgeCheck,
  Download,
  Factory,
  Hash,
  MapPin,
  Maximize2,
  Package,
  Palette,
  PlayCircle,
  Send,
  Container as Tank,
  Wind,
  Zap,
} from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";
import type { ProductDetail } from "@/types/product-detail";

export function ProductMainInfo({
  product,
}: {
  product: ProductDetail;
}) {
  const icons = [
    <Wind key="wind" size={12} />,
    <Tank key="tank" size={12} />,
    <Zap key="power" size={12} />,
    <Maximize2 key="coverage" size={12} />,
    <Package key="moq" size={12} />,
    <Palette key="colour" size={12} />,
    <Factory key="supply" size={12} />,
    <Hash key="hsn" size={12} />,
  ];

  const inquiryHref = `/products/${product.id}/inquiry${
    product.companyId
      ? `?company=${encodeURIComponent(product.companyId)}`
      : ""
  }`;

  const companyHref = product.companyId
    ? `/companies/${product.companyId}`
    : "/companies";

  const hasCatalogue = Boolean(product.catalogueUrl);

  const hasVideo = Boolean(product.videoUrl);

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-4 sm:p-5">
      {/* Product Name */}
      <h1 className="font-bold text-[#171570] text-[21px] leading-tight sm:text-[25px]">
        {product.name}
      </h1>

      {/* Category */}
      <p className="mt-1 font-bold text-[#2c21bd] text-[10px]">
        {product.category}
      </p>

      {/* Company */}
      <div className="mt-3 flex items-center gap-3">
        <div className="relative h-[34px] w-[34px] shrink-0">
          <SafeImage
            src={product.companyLogo}
            alt={product.companyName}
            fill
            sizes="34px"
            className="object-contain"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-bold text-[#191574] text-[11px]">
              {product.companyName}
            </p>

            {product.isVerifiedSupplier ? (
              <BadgeCheck
                size={13}
                className="shrink-0 fill-[#159447] text-white"
              />
            ) : null}
          </div>

          <div className="mt-0.5 flex items-center gap-1">
            <MapPin
              size={9}
              className="shrink-0 text-[#3024cb]"
            />

            <span className="truncate text-[#62677e] text-[8px]">
              {product.companyLocation}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description ? (
        <p className="mt-3 max-w-[680px] text-[#4d526e] text-[10px] leading-[1.5]">
          {product.description}
        </p>
      ) : null}

      {/* Price */}
      <div className="mt-3 border-[#e5e6ee] border-b pb-3">
        <span className="font-bold text-[#2117ad] text-[18px]">
          {product.price}
        </span>

        {product.priceUnit ? (
          <span className="ml-1 font-semibold text-[#30355a] text-[10px]">
            {product.priceUnit}
          </span>
        ) : null}
      </div>

      {/* Highlight Specifications */}
      {product.highlightSpecs.length > 0 ? (
        <div className="mt-3 grid grid-cols-1 gap-y-2 min-[500px]:grid-cols-2 min-[500px]:gap-x-8">
          {product.highlightSpecs.map((spec, index) => (
            <div
              key={`${spec.label}-${index}`}
              className="grid grid-cols-[18px_100px_1fr] items-center gap-2 min-[500px]:grid-cols-[18px_110px_1fr]"
            >
              <span className="text-[#3126cd]">
                {icons[index] ?? <Package size={12} />}
              </span>

              <span className="font-semibold text-[#555a75] text-[9px]">
                {spec.label}
              </span>

              <span className="font-semibold text-[#33385b] text-[9px]">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {/* Main Actions */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={inquiryHref}
          className="!text-white flex h-[36px] items-center justify-center gap-2 rounded-[4px] bg-[#2116a5] font-bold text-[10px] transition hover:bg-[#181080]"
        >
          <Send size={13} />
          Send Inquiry
        </Link>

        <Link
          href={companyHref}
          className="!text-[#251bb5] flex h-[36px] items-center justify-center rounded-[4px] border border-[#3b2ce2] font-bold text-[10px] transition hover:bg-[#f7f6ff]"
        >
          View Company Profile
        </Link>
      </div>

      {/* Catalogue + Video */}
      {hasCatalogue || hasVideo ? (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {hasCatalogue ? (
            <Link
              href={product.catalogueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[50px] items-center gap-3 rounded-[6px] border border-[#e3e4ed] px-3 transition hover:bg-[#fafaff] sm:px-4"
            >
              <Download
                size={18}
                className="shrink-0 text-[#3025cc]"
              />

              <div className="min-w-0">
                <p className="!text-[#2118ad] font-bold text-[9px]">
                  {product.catalogueTitle ||
                    "Download PDF Catalogue"}
                </p>

                <p className="text-[#666b82] text-[7px]">
                  {product.catalogueSize ||
                    "Get detailed product brochure"}
                </p>
              </div>
            </Link>
          ) : null}

          {hasVideo ? (
            <Link
              href={product.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[50px] items-center gap-3 rounded-[6px] border border-[#e3e4ed] px-3 transition hover:bg-[#fafaff] sm:px-4"
            >
              <PlayCircle
                size={19}
                className="shrink-0 text-[#3025cc]"
              />

              <div className="min-w-0">
                <p className="!text-[#2118ad] font-bold text-[9px]">
                  Watch Product Video
                </p>

                <p className="text-[#666b82] text-[7px]">
                  See product in action
                </p>
              </div>
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}