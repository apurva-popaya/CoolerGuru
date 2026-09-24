import { CheckCircle2 } from "lucide-react";

import type { ProductDetail } from "@/types/product-detail";

export function ProductOverview({
  product,
}: {
  product: ProductDetail;
}) {
  const hasOverview = Boolean(product.overview?.trim());
  const hasBenefits = product.benefits.length > 0;

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <div className="flex min-h-[26px] flex-wrap items-start gap-x-5 gap-y-2 border-[#e8e8f2] border-b">
        <span className="h-[26px] border-[#2b20cc] border-b-2 px-1 font-bold text-[#2118ad] text-[9px]">
          Overview
        </span>

        {/* <span className="font-semibold text-[#62677f] text-[9px]">
          Specifications
        </span>

        <span className="font-semibold text-[#62677f] text-[9px]">
          Colours
        </span>

        <span className="font-semibold text-[#62677f] text-[9px]">
          Video & Catalogue
        </span> */}
      </div>

      {hasOverview ? (
        <p className="mt-3 text-[#464b67] text-[9px] leading-[1.55]">
          {product.overview}
        </p>
      ) : (
        <p className="mt-3 text-[#777b90] text-[9px] leading-[1.55]">
          No product overview available.
        </p>
      )}

      {hasBenefits ? (
        <div className="mt-3 space-y-1">
          {product.benefits.map((benefit, index) => (
            <div
              key={`${benefit}-${index}`}
              className="flex items-start gap-1.5"
            >
              <CheckCircle2
                size={10}
                className="mt-[1px] shrink-0 text-[#3427da]"
              />

              <span className="text-[#4e536d] text-[8px]">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}