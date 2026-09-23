import {
  BriefcaseBusiness,
  Clock3,
  MapPin,
  UsersRound,
} from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";
import type { CompanyProfile } from "@/types/company-profile";

interface CompanyInquirySummaryProps {
  company: CompanyProfile;
}

export function CompanyInquirySummary({
  company,
}: CompanyInquirySummaryProps) {
  return (
    <div className="rounded-[10px] border border-[#e1e2ed] bg-white p-4 sm:p-5">
      <h2 className="font-bold text-[#171570] text-[16px]">
        Supplier Summary
      </h2>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4">
        {/* Logo */}
        <div className="mx-auto flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#dfe1eb] bg-white p-3 sm:mx-0 sm:h-[105px] sm:w-[105px]">
          <div className="relative h-full w-full">
            <SafeImage
              src={company.logo}
              alt={company.name}
              fill
              sizes="105px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <h3 className="text-center font-bold text-[#171570] text-[17px] leading-tight sm:text-left sm:text-[18px]">
            {company.name}
          </h3>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {company.isVerified && (
              <span className="rounded-[3px] bg-[#158d42] px-2 py-[3px] font-bold text-[8px] text-white">
                Verified
              </span>
            )}

            {company.isPremium && (
              <span className="rounded-[3px] bg-[#ff6c1b] px-2 py-[3px] font-bold text-[8px] text-white">
                Premium
              </span>
            )}
          </div>

          <div className="mt-4 space-y-3">
            <SummaryRow
              icon={<MapPin size={14} />}
              text={company.location}
            />

            <SummaryRow
              icon={<BriefcaseBusiness size={14} />}
              text={company.businessTypes.join(" / ")}
            />

            <SummaryRow
              icon={<Clock3 size={14} />}
              text={`${company.yearsInBusiness} Years in Business`}
            />

            <SummaryRow
              icon={<UsersRound size={14} />}
              text={`${company.employees} Employees`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-[1px] shrink-0 text-[#2d22d2]">
        {icon}
      </span>

      <span className="font-medium text-[#555b76] text-[10px] leading-[1.4]">
        {text}
      </span>
    </div>
  );
}