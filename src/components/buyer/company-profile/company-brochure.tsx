import Link from "next/link";

import { Download, FileText } from "lucide-react";

import type { CompanyProfile } from "@/types/company-profile";

export function CompanyBrochure({
  company,
}: {
  company: CompanyProfile;
}) {
  if (!company.brochureUrl) {
    return null;
  }

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">
        Company Brochure
      </h2>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-[58px] w-[48px] shrink-0 items-center justify-center rounded-[5px] bg-[#e92d2d] text-white">
          <FileText size={24} />
        </div>

        <div className="min-w-0">
          <p className="break-words font-bold text-[#1a1675] text-[9px] leading-[1.3]">
            Company Brochure
          </p>

          <p className="mt-1 text-[#686d85] text-[8px]">
            PDF Document
          </p>
        </div>
      </div>

      <Link
        href={company.brochureUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="!text-white mt-4 flex h-[34px] items-center justify-center gap-2 rounded-[4px] bg-[#2116a5] font-bold text-[9px] transition hover:bg-[#3022c6]"
      >
        <Download size={12} />
        Download Brochure
      </Link>
    </div>
  );
}