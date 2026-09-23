import Link from "next/link";

import {
  Clock3,
  MapPin,
  Package,
  Send,
  UsersRound,
} from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";

import type { DirectoryCompany } from "@/types/company-directory";

interface CompanyCardProps {
  company: DirectoryCompany;
}

export function CompanyCard({
  company,
}: CompanyCardProps) {
  return (
    <div className="relative flex min-h-0 flex-col rounded-[8px] border border-[#e2e3ed] bg-white p-3 sm:min-h-[260px] sm:p-4">
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        {company.isPremium ? (
          <span className="rounded-[3px] bg-[#ff6a16] px-2 py-[3px] font-bold text-[8px] text-white">
            Premium
          </span>
        ) : company.isVerified ? (
          <span className="rounded-[3px] bg-[#16944b] px-2 py-[3px] font-bold text-[8px] text-white">
            Verified
          </span>
        ) : null}
      </div>

      {/* Top */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[110px_1fr]">
        {/* Logo */}
        <div className="flex justify-center sm:block">
          <div className="mt-6 flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-full border border-[#e3e4ee] bg-white p-3 sm:mt-3 sm:h-[105px] sm:w-[105px]">
            <div className="relative h-full w-full">
              <SafeImage
                src={company.logo}
                alt={`${company.name} logo`}
                fill
                sizes="105px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="min-w-0 pr-0 sm:pr-2">
          <h2 className="text-center font-bold text-[14px] leading-tight text-[#15157d] sm:text-left sm:text-[15px]">
            {company.name}
          </h2>

          <div className="mt-1.5 flex items-center justify-center gap-1.5 sm:justify-start">
            <MapPin
              size={12}
              className="shrink-0 text-[#2119bb]"
            />

            <span className="truncate font-medium text-[9px] text-[#535873]">
              {company.location}
            </span>
          </div>

          <p className="mt-2 line-clamp-3 text-[9px] leading-[1.5] text-[#464b67]">
            {company.description || "-"}
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
            {company.businessTypes.length > 0 ? (
              company.businessTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-[4px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[8px] text-[#2920bb]"
                >
                  {type}
                </span>
              ))
            ) : (
              <span className="rounded-[4px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[8px] text-[#2920bb]">
                -
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#f0f0f5] pt-3 sm:gap-4 sm:border-t-0 sm:pt-0">
        <CompanyStat
          icon={<Clock3 size={17} />}
          value={company.yearsInBusiness}
          label="in Business"
        />

        <CompanyStat
          icon={<Package size={17} />}
          value={company.productCount}
          label="Products"
        />

        <CompanyStat
          icon={<UsersRound size={17} />}
          value={company.employees}
          label="Employees"
        />
      </div>

      {/* Main Products */}
      <p className="mt-4 min-h-0 text-[9px] leading-[1.45] text-[#464b67] sm:min-h-[32px]">
        <span className="font-bold text-[#171765]">
          Main Products:
        </span>{" "}
        {company.mainProducts.length > 0
          ? company.mainProducts.join(", ")
          : "-"}
      </p>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-1 gap-2 pt-1 sm:mt-auto sm:grid-cols-2 sm:gap-4 sm:pt-3">
        <Link
          href={`/companies/${company.slug}`}
          className="!text-[#251bb2] flex h-[34px] items-center justify-center rounded-[5px] border border-[#3829dc] bg-white font-bold text-[9px] transition hover:bg-[#f5f4ff]"
        >
          View Profile
        </Link>

        <Link
          href={`/companies/${company.slug}/inquiry`}
          className="!text-white flex h-[34px] items-center justify-center gap-2 rounded-[5px] bg-[#2116a5] font-bold text-[9px] transition hover:bg-[#3022c6]"
        >
          <Send size={12} />
          Send Inquiry
        </Link>
      </div>
    </div>
  );
}

interface CompanyStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function CompanyStat({
  icon,
  value,
  label,
}: CompanyStatProps) {
  return (
    <div className="flex min-w-0 items-center justify-center gap-1.5 sm:gap-2.5">
      <div className="shrink-0 text-[#281cc3]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate font-bold text-[9px] leading-tight text-[#171765] sm:text-[10px]">
          {value}
        </p>

        <p className="mt-0.5 truncate text-[7px] text-[#696d85] sm:text-[8px]">
          {label}
        </p>
      </div>
    </div>
  );
}