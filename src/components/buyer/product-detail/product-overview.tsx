import { CheckCircle2 } from "lucide-react";

import type { ProductDetail } from "@/types/product-detail";

export function ProductOverview({ product }: { product: ProductDetail }) {
  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-4">
      <div className="flex h-[26px] items-start gap-7 border-[#e8e8f2] border-b">
        <span className="h-[26px] border-[#2b20cc] border-b-2 px-1 font-bold text-[#2118ad] text-[9px]">Overview</span>

        <span className="font-semibold text-[#62677f] text-[9px]">Specifications</span>

        <span className="font-semibold text-[#62677f] text-[9px]">Colours</span>

        <span className="font-semibold text-[#62677f] text-[9px]">Video & Catalogue</span>
      </div>

      <p className="mt-3 text-[#464b67] text-[9px] leading-[1.55]">{product.overview}</p>

      <div className="mt-3 space-y-1">
        {product.benefits.map((benefit) => (
          <div key={benefit} className="flex items-center gap-1.5">
            <CheckCircle2 size={10} className="shrink-0 text-[#3427da]" />

            <span className="text-[#4e536d] text-[8px]">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
