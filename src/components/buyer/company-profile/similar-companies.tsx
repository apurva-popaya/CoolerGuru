import Image from "next/image";
import Link from "next/link";

import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

import type { SimilarCompany } from "@/types/company-profile";

export function SimilarCompanies({ companies }: { companies: SimilarCompany[] }) {
  return (
    <div className="relative mt-4 rounded-[8px] border border-[#e2e3ee] bg-white p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">Similar Companies You Might Like</h2>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {companies.map((company) => (
          <div key={company.id} className="grid grid-cols-[95px_1fr] gap-3 rounded-[7px] border border-[#e3e4ed] p-3">
            <div className="relative h-[85px] w-[85px]">
              <Image src={company.logo} alt={company.name} fill sizes="85px" className="object-contain" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#181575] text-[10px]">{company.name}</h3>

                {company.isVerified && (
                  <span className="rounded bg-[#19994d] px-1.5 py-0.5 font-bold text-[6px] text-white">Verified</span>
                )}

                {company.isPremium && (
                  <span className="rounded bg-[#ff6b1a] px-1.5 py-0.5 font-bold text-[6px] text-white">Premium</span>
                )}
              </div>

              <div className="mt-1 flex items-center gap-1">
                <MapPin size={9} className="text-[#3025ca]" />

                <span className="text-[#686d85] text-[7px]">{company.location}</span>
              </div>

              <p className="mt-2 text-[#555a74] text-[8px] leading-[1.4]">{company.description}</p>

              <Link
                href={`/companies/${company.id}`}
                className="!text-white mt-3 flex h-[28px] max-w-[120px] items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[8px]"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous companies"
        className="absolute top-1/2 -left-3 flex h-[28px] w-[28px] items-center justify-center rounded-full border border-[#e1e2ec] bg-white text-[#281fc0]"
      >
        <ChevronLeft size={14} />
      </button>

      <button
        type="button"
        aria-label="Next companies"
        className="absolute top-1/2 -right-3 flex h-[28px] w-[28px] items-center justify-center rounded-full border border-[#e1e2ec] bg-white text-[#281fc0]"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
