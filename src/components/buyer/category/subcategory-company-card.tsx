import Image from "next/image";
import Link from "next/link";

import {
  BadgeCheck,
  CalendarDays,
  MapPin,
  Package,
} from "lucide-react";

import type { SubcategoryCompany } from "@/types/subcategory-detail";

interface SubcategoryCompanyCardProps {
  company: SubcategoryCompany;
}

export function SubcategoryCompanyCard({
  company,
}: SubcategoryCompanyCardProps) {
  return (
    <div className="flex min-w-0 flex-col rounded-[8px] border border-[#e1e2ec] bg-white p-3 sm:p-4">
      <div className="relative mx-auto h-[70px] w-[120px] sm:h-[75px] sm:w-[130px]">
        <Image
          src={company.logo}
          alt={company.name}
          fill
          sizes="130px"
          className="object-contain"
        />
      </div>

      <div className="mt-2 flex min-w-0 items-center gap-1.5">
        <h3 className="truncate font-bold text-[#19149e] text-[10px] sm:text-[11px]">
          {company.name}
        </h3>

        {company.isVerified && (
          <BadgeCheck
            size={12}
            className="shrink-0 fill-[#2e73ff] text-white"
          />
        )}
      </div>

      <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
        <MapPin
          size={11}
          className="shrink-0 text-[#2920c3]"
        />

        <span className="truncate text-[#575c76] text-[8px]">
          {company.location}
        </span>
      </div>

      <p className="mt-2 min-h-[45px] text-[#4b506a] text-[8px] leading-[1.5]">
        {company.description}
      </p>

      <div className="mt-3 grid grid-cols-2 border-[#eeeef4] border-t pt-3">
        <CompanyStat
          icon={<Package size={13} />}
          label="Products"
          value={company.products}
        />

        <CompanyStat
          icon={<CalendarDays size={13} />}
          label="Established"
          value={company.established}
        />
      </div>

      <Link
        href={`/companies/${company.id}`}
        className="mt-4 flex h-[32px] items-center justify-center rounded-[4px] border border-[#3b2ce2] font-bold text-[#251bb5] text-[9px] transition hover:bg-[#f5f4ff]"
      >
        View Profile
      </Link>
    </div>
  );
}

function CompanyStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
      <span className="shrink-0 text-[#2b20d4]">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="truncate text-[#777b90] text-[7px]">
          {label}
        </p>

        <p className="truncate font-bold text-[#171570] text-[8px] sm:text-[9px]">
          {value}
        </p>
      </div>
    </div>
  );
}