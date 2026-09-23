import Image from "next/image";
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

import type { ProductDetail } from "@/types/product-detail";

export function ProductMainInfo({ product }: { product: ProductDetail }) {
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

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-4 sm:p-5">
      <h1 className="font-bold text-[#171570] text-[21px] leading-tight sm:text-[25px]">
        {product.name}
      </h1>

      <p className="mt-1 font-bold text-[#2c21bd] text-[10px]">
        {product.category}
      </p>

      <div className="mt-3 flex items-center gap-3">
        <div className="relative h-[34px] w-[34px] shrink-0">
          <Image
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
            <MapPin size={9} className="shrink-0 text-[#3024cb]" />

            <span className="truncate text-[#62677e] text-[8px]">
              {product.companyLocation}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 max-w-[680px] text-[#4d526e] text-[10px] leading-[1.5]">
        {product.description}
      </p>

      <div className="mt-3 border-[#e5e6ee] border-b pb-3">
        <span className="font-bold text-[#2117ad] text-[18px]">
          {product.price}
        </span>

        <span className="ml-1 font-semibold text-[#30355a] text-[10px]">
          {product.priceUnit}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-y-2 min-[500px]:grid-cols-2 min-[500px]:gap-x-8">
        {product.highlightSpecs.map((spec, index) => (
          <div
            key={spec.label}
            className="grid grid-cols-[18px_100px_1fr] items-center gap-2 min-[500px]:grid-cols-[18px_110px_1fr]"
          >
            <span className="text-[#3126cd]">{icons[index]}</span>

            <span className="font-semibold text-[#555a75] text-[9px]">
              {spec.label}
            </span>

            <span className="font-semibold text-[#33385b] text-[9px]">
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={`/products/${product.id}/inquiry`}
          className="!text-white flex h-[36px] items-center justify-center gap-2 rounded-[4px] bg-[#2116a5] font-bold text-[10px] transition hover:bg-[#181080]"
        >
          <Send size={13} />
          Send Inquiry
        </Link>

        <Link
          href={`/companies/${product.companyId}`}
          className="!text-[#251bb5] flex h-[36px] items-center justify-center rounded-[4px] border border-[#3b2ce2] font-bold text-[10px] transition hover:bg-[#f7f6ff]"
        >
          View Company Profile
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={product.catalogueUrl}
          className="flex min-h-[50px] items-center gap-3 rounded-[6px] border border-[#e3e4ed] px-3 transition hover:bg-[#fafaff] sm:px-4"
        >
          <Download size={18} className="shrink-0 text-[#3025cc]" />

          <div className="min-w-0">
            <p className="!text-[#2118ad] font-bold text-[9px]">
              Download PDF Catalogue
            </p>

            <p className="text-[#666b82] text-[7px]">
              Get detailed product brochure
            </p>
          </div>
        </Link>

        <Link
          href={product.videoUrl}
          className="flex min-h-[50px] items-center gap-3 rounded-[6px] border border-[#e3e4ed] px-3 transition hover:bg-[#fafaff] sm:px-4"
        >
          <PlayCircle size={19} className="shrink-0 text-[#3025cc]" />

          <div className="min-w-0">
            <p className="!text-[#2118ad] font-bold text-[9px]">
              Watch Product Video
            </p>

            <p className="text-[#666b82] text-[7px]">
              See product in action
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}