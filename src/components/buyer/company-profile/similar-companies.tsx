import { SafeImage } from "@/components/common/safe-image";
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

import type { SimilarCompany } from "@/types/company-profile";

export function SimilarCompanies({
  companies,
}: {
  companies: SimilarCompany[];
}) {
  return (
    <div className="relative mt-4 rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">
        Similar Companies You Might Like
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="grid min-w-0 grid-cols-[80px_minmax(0,1fr)] gap-3 rounded-[7px] border border-[#e3e4ed] p-3 sm:grid-cols-[85px_minmax(0,1fr)]"
          >
            <div className="relative h-[75px] w-[75px] sm:h-[85px] sm:w-[85px]">
              <SafeImage
  src={company.logo}
  alt={company.name}
  fill
  sizes="85px"
  className="object-contain"
/>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h3 className="break-words font-bold text-[#181575] text-[10px]">
                  {company.name}
                </h3>

                {company.isVerified && (
                  <span className="rounded bg-[#19994d] px-1.5 py-0.5 font-bold text-[6px] text-white">
                    Verified
                  </span>
                )}

                {company.isPremium && (
                  <span className="rounded bg-[#ff6b1a] px-1.5 py-0.5 font-bold text-[6px] text-white">
                    Premium
                  </span>
                )}
              </div>

              <div className="mt-1 flex min-w-0 items-start gap-1">
                <MapPin
                  size={9}
                  className="mt-0.5 shrink-0 text-[#3025ca]"
                />

                <span className="break-words text-[#686d85] text-[7px]">
                  {company.location}
                </span>
              </div>

              <p className="mt-2 text-[#555a74] text-[8px] leading-[1.4]">
                {company.description}
              </p>

              <Link
  href={`/companies/${company.slug}`}
  className="!text-white mt-3 flex h-[28px] w-full max-w-[120px] items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[8px] transition hover:bg-[#3022c6]"
>
  View Profile
</Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        type="button"
        aria-label="Previous companies"
        className="absolute top-1/2 -left-2.5 hidden h-[28px] w-[28px] -translate-y-1/2 items-center justify-center rounded-full border border-[#e1e2ec] bg-white text-[#281fc0] shadow-sm sm:flex"
      >
        <ChevronLeft size={14} />
      </button>

      <button
        type="button"
        aria-label="Next companies"
        className="absolute top-1/2 -right-2.5 hidden h-[28px] w-[28px] -translate-y-1/2 items-center justify-center rounded-full border border-[#e1e2ec] bg-white text-[#281fc0] shadow-sm sm:flex"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}