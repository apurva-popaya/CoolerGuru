import Link from "next/link";

import { Download, FileText } from "lucide-react";

import type { CompanyProfile } from "@/types/company-profile";

export function CompanyBrochure({ company }: { company: CompanyProfile }) {
  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">Company Brochure</h2>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-[58px] w-[48px] items-center justify-center rounded-[5px] bg-[#e92d2d] text-white">
          <FileText size={24} />
        </div>

        <div>
          <p className="font-bold text-[#1a1675] text-[9px] leading-[1.3]">{company.brochureTitle}</p>

          <p className="mt-1 text-[#686d85] text-[8px]">PDF Document - {company.brochureSize}</p>
        </div>
      </div>

      <Link
        href={company.brochureUrl}
        className="!text-white mt-4 flex h-[34px] items-center justify-center gap-2 rounded-[4px] bg-[#2116a5] font-bold text-[9px]"
      >
        <Download size={12} />
        Download Brochure
      </Link>
    </div>
  );
}
