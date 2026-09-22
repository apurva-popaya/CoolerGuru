import Image from "next/image";
import Link from "next/link";

import { BadgeCheck, Clock3, MapPin } from "lucide-react";

import type { ProductDetail } from "@/types/product-detail";

export function ProductSupplierCard({ product }: { product: ProductDetail }) {
  return (
    <div className="mt-4 grid grid-cols-[330px_1fr_290px] items-center gap-5 rounded-[8px] border border-[#e2e3ee] bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="relative h-[60px] w-[90px] shrink-0">
          <Image src={product.companyLogo} alt={product.companyName} fill sizes="90px" className="object-contain" />
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="font-bold text-[#171570] text-[14px]">{product.companyName}</h2>

            {product.isVerifiedSupplier ? <BadgeCheck size={12} className="fill-[#159447] text-white" /> : null}
          </div>

          <p className="mt-1 text-[#555a76] text-[8px]">{product.companyBusinessTypes.join(" | ")}</p>

          <div className="mt-2 flex items-center gap-4">
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

      <div className="border-[#e8e8f0] border-l pl-5">
        <p className="font-bold text-[#27217e] text-[9px]">About Company</p>

        <p className="mt-1 text-[#555a75] text-[8px] leading-[1.5]">{product.companyDescription}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href={`/companies/${product.companyId}`}
          className="!text-[#251bb4] flex h-[34px] items-center justify-center rounded-[4px] border border-[#3829db] font-bold text-[8px] transition hover:bg-[#f7f6ff]"
        >
          View Profile
        </Link>

        <Link
          href={`/companies/${product.companyId}/inquiry`}
          className="!text-white flex h-[34px] items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[8px] transition hover:bg-[#181080]"
        >
          Contact Supplier
        </Link>
      </div>
    </div>
  );
}
