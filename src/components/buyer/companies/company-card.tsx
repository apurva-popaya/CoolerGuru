import Image from "next/image";
import Link from "next/link";

import { Clock3, MapPin, Package, Send, UsersRound } from "lucide-react";

import type { DirectoryCompany } from "@/types/company-directory";

interface CompanyCardProps {
  company: DirectoryCompany;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="relative flex min-h-[260px] flex-col rounded-[8px] border border-[#e2e3ed] bg-white p-4">
      {/* Badge */}

      <div className="absolute top-3 left-3 z-10">
        {company.isPremium ? (
          <span className="rounded-[3px] bg-[#ff6a16] px-2 py-[3px] font-bold text-[8px] text-white">Premium</span>
        ) : company.isVerified ? (
          <span className="rounded-[3px] bg-[#16944b] px-2 py-[3px] font-bold text-[8px] text-white">Verified</span>
        ) : null}
      </div>

      {/* Top */}

      <div className="grid grid-cols-[110px_1fr] gap-4">
        {/* Logo */}

        <div className="mt-3 flex h-[105px] w-[105px] items-center justify-center overflow-hidden rounded-full border border-[#e3e4ee] bg-white p-3">
          <div className="relative h-full w-full">
            <Image src={company.logo} alt={company.name} fill sizes="105px" className="object-contain" />
          </div>
        </div>

        {/* Details */}

        <div className="min-w-0 pr-2">
          <h2 className="font-bold text-[#15157d] text-[15px] leading-tight">{company.name}</h2>

          <div className="mt-1.5 flex items-center gap-1.5">
            <MapPin size={12} className="shrink-0 text-[#2119bb]" />

            <span className="font-medium text-[#535873] text-[9px]">{company.location}</span>
          </div>

          <p className="mt-2 max-w-[390px] text-[#464b67] text-[9px] leading-[1.5]">{company.description}</p>

          <div className="mt-2 flex flex-wrap gap-2">
            {company.businessTypes.map((type) => (
              <span key={type} className="rounded-[4px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2920bb] text-[8px]">
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="mt-4 grid grid-cols-3 gap-4 px-2">
        <CompanyStat icon={<Clock3 size={17} />} value={company.yearsInBusiness} label="in Business" />

        <CompanyStat icon={<Package size={17} />} value={company.productCount} label="Products" />

        <CompanyStat icon={<UsersRound size={17} />} value={company.employees} label="Employees" />
      </div>

      {/* Main Products */}

      <p className="mt-4 min-h-[32px] text-[#464b67] text-[9px] leading-[1.45]">
        <span className="font-bold text-[#171765]">Main Products:</span> {company.mainProducts.join(", ")}
      </p>

      {/* Actions */}

      <div className="mt-auto grid grid-cols-2 gap-4 pt-3">
        <Link
          href={`/companies/${company.id}`}
          className="!text-[#251bb2] flex h-[34px] items-center justify-center rounded-[5px] border border-[#3829dc] bg-white font-bold text-[9px] transition hover:bg-[#f5f4ff]"
        >
          View Profile
        </Link>

        <Link
          href={`/companies/${company.id}/inquiry`}
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

function CompanyStat({ icon, value, label }: CompanyStatProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="shrink-0 text-[#281cc3]">{icon}</div>

      <div>
        <p className="font-bold text-[#171765] text-[10px] leading-tight">{value}</p>

        <p className="mt-0.5 text-[#696d85] text-[8px]">{label}</p>
      </div>
    </div>
  );
}
