import Image from "next/image";

import { BriefcaseBusiness, Clock3, MapPin, UsersRound } from "lucide-react";

import type { CompanyProfile } from "@/types/company-profile";

interface CompanyInquirySummaryProps {
  company: CompanyProfile;
}

export function CompanyInquirySummary({ company }: CompanyInquirySummaryProps) {
  return (
    <div className="rounded-[10px] border border-[#e1e2ed] bg-white p-5">
      <h2 className="font-bold text-[#171570] text-[16px]">Supplier Summary</h2>

      <div className="mt-5 flex items-start gap-4">
        {/* Logo */}
        <div className="flex h-[105px] w-[105px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#dfe1eb] bg-white p-3">
          <div className="relative h-full w-full">
            <Image src={company.logo} alt={company.name} fill sizes="105px" className="object-contain" />
          </div>
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-[#171570] text-[18px] leading-tight">{company.name}</h3>

          <div className="mt-2 flex items-center gap-2">
            {company.isVerified && (
              <span className="rounded-[3px] bg-[#158d42] px-2 py-[3px] font-bold text-[8px] text-white">Verified</span>
            )}

            {company.isPremium && (
              <span className="rounded-[3px] bg-[#ff6c1b] px-2 py-[3px] font-bold text-[8px] text-white">Premium</span>
            )}
          </div>

          <div className="mt-4 space-y-3">
            <SummaryRow icon={<MapPin size={14} />} text={company.location} />

            <SummaryRow icon={<BriefcaseBusiness size={14} />} text={company.businessTypes.join(" / ")} />

            <SummaryRow icon={<Clock3 size={14} />} text={`${company.yearsInBusiness} Years in Business`} />

            <SummaryRow icon={<UsersRound size={14} />} text={`${company.employees} Employees`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-[1px] shrink-0 text-[#2d22d2]">{icon}</span>

      <span className="font-medium text-[#555b76] text-[10px] leading-[1.4]">{text}</span>
    </div>
  );
}
