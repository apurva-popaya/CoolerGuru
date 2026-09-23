import { MapPin } from "lucide-react";

import type { CompanyProfile } from "@/types/company-profile";

export function CompanyLocation({
  company,
}: {
  company: CompanyProfile;
}) {
  if (!company.mapAddress) {
    return null;
  }

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">
        Company Location
      </h2>

      <div className="mt-3 flex items-start gap-3 rounded-[6px] border border-[#e4e5ee] bg-[#fafaff] p-4">
        <MapPin
          size={18}
          className="mt-0.5 shrink-0 text-[#2920cb]"
        />

        <div>
          <p className="font-semibold text-[#25207e] text-[9px]">
            Business Address
          </p>

          <p className="mt-1 break-words text-[#656a82] text-[9px] leading-[1.5]">
            {company.mapAddress}
          </p>
        </div>
      </div>
    </div>
  );
}