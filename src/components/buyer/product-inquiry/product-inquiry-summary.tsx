import { SafeImage } from "@/components/common/safe-image";
import Link from "next/link";

import {
  BadgeCheck,
  ExternalLink,
  MapPin,
  Package,
  Container as TankIcon,
  Wind,
  Zap,
} from "lucide-react";

import type { ProductDetail } from "@/types/product-detail";

interface ProductInquirySummaryProps {
  product: ProductDetail;
}

export function ProductInquirySummary({
  product,
}: ProductInquirySummaryProps) {
  const airflow =
    product.highlightSpecs.find(
      (item) => item.label === "Airflow",
    )?.value ?? "-";

  const tank =
    product.highlightSpecs.find(
      (item) => item.label === "Tank Capacity",
    )?.value ?? "-";

  const power =
    product.highlightSpecs.find(
      (item) => item.label === "Power",
    )?.value ?? "-";

  const moq =
    product.highlightSpecs.find(
      (item) => item.label === "MOQ",
    )?.value ?? "-";

  return (
    <div className="rounded-[10px] border border-[#e1e2ed] bg-white p-4 sm:p-5">
      <h2 className="font-bold text-[#171570] text-[15px] sm:text-[16px]">
        Product Summary
      </h2>

      {/* Product */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[125px_minmax(0,1fr)] sm:gap-4">
        <div className="relative mx-auto h-[145px] w-[135px] sm:mx-0 sm:h-[150px] sm:w-[125px]">
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 135px, 125px"
            className="object-contain"
          />
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-[#171570] text-[15px] leading-[1.25] sm:text-[17px]">
            {product.name}
          </h3>

          {/* Company */}
          <div className="mt-3 flex items-center gap-2">
            <div className="relative h-[28px] w-[28px] shrink-0">
              <SafeImage
                src={product.companyLogo}
                alt={product.companyName}
                fill
                sizes="28px"
                className="object-contain"
              />
            </div>

            <span className="min-w-0 truncate font-bold text-[#252174] text-[9px]">
              {product.companyName}
            </span>

            {product.isVerifiedSupplier ? (
              <BadgeCheck
                size={12}
                className="shrink-0 fill-[#159447] text-white"
              />
            ) : null}
          </div>

          {/* Location */}
          <div className="mt-2 flex items-start gap-1.5">
            <MapPin
              size={11}
              className="mt-[1px] shrink-0 text-[#3025cf]"
            />

            <span className="text-[#656a82] text-[8px]">
              {product.companyLocation}
            </span>
          </div>

          {/* Specs */}
          <div className="mt-4 space-y-2 border-[#e6e7ef] border-t pt-3">
            <SummarySpec
              icon={<Wind size={12} />}
              label="Airflow"
              value={airflow}
            />

            <SummarySpec
              icon={<TankIcon size={12} />}
              label="Tank Capacity"
              value={tank}
            />

            <SummarySpec
              icon={<Zap size={12} />}
              label="Power"
              value={power}
            />

            <SummarySpec
              icon={<Package size={12} />}
              label="MOQ"
              value={moq}
            />
          </div>
        </div>
      </div>

      {/* Product Page Button */}
      <div className="mt-4">
        <Link
          href={`/products/${product.slug}`}
          className="!text-[#251bb4] flex h-[36px] w-full items-center justify-center gap-2 rounded-[4px] border border-[#3929dc] bg-white font-bold text-[9px] transition hover:bg-[#f6f5ff]"
        >
          View Product Page
          <ExternalLink size={11} />
        </Link>
      </div>
    </div>
  );
}

function SummarySpec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[18px_100px_minmax(0,1fr)] items-center gap-2">
      <span className="text-[#3025cf]">{icon}</span>

      <span className="text-[#5d627b] text-[8px]">
        {label}
      </span>

      <span className="truncate font-semibold text-[#34395b] text-[8px]">
        {value}
      </span>
    </div>
  );
}