import Image from "next/image";
import Link from "next/link";

import { BadgeCheck, Building2, MapPin, ShieldCheck } from "lucide-react";

import type { BuyerInquiry } from "@/types/buyer-inquiry";

interface Props {
  inquiry: BuyerInquiry;
}

const COMPANY_PLACEHOLDER =
  "/images/placeholders/company-placeholder.png";

function getCompanyLogo(value?: string | null) {
  if (!value) return COMPANY_PLACEHOLDER;
  if (value.includes("example.com")) return COMPANY_PLACEHOLDER;
  if (value.startsWith("/")) return value;

  return COMPANY_PLACEHOLDER;
}

function formatBusinessTypes(values?: string[]) {
  if (!values || values.length === 0) {
    return "Supplier";
  }

  return values
    .map((value) =>
      value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (character) => character.toUpperCase()),
    )
    .join(" / ");
}

export function BuyerInquirySupplierCard({ inquiry }: Props) {
  const company = inquiry.company;

  if (!company) {
    return (
      <div className="rounded-[8px] border border-[#e1e2ed] bg-white p-4">
        <h2 className="font-bold text-[#171570] text-[11px]">
          Supplier Information
        </h2>

        <p className="mt-3 text-[#60657d] text-[8px]">
          Supplier information is not available for this inquiry.
        </p>
      </div>
    );
  }

  const logo = getCompanyLogo(company.company_logo_url);
  const location = [company.city, company.state].filter(Boolean).join(", ");
  const verified = company.verification_status === "VERIFIED";

  return (
    <div className="rounded-[8px] border border-[#e1e2ed] bg-white p-4">
      <h2 className="font-bold text-[#171570] text-[11px]">
        Supplier Information
      </h2>

      <div className="mt-4 flex items-start gap-3 sm:gap-4">
        <div className="relative h-[60px] w-[75px] shrink-0 sm:h-[72px] sm:w-[95px]">
          <Image
            src={logo}
            alt={company.name}
            fill
            sizes="95px"
            className="object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-1.5">
            <h3 className="break-words font-bold text-[#171570] text-[10px]">
              {company.name}
            </h3>

            {verified && (
              <BadgeCheck
                size={11}
                className="mt-0.5 shrink-0 fill-[#159447] text-white"
              />
            )}
          </div>

          <div className="mt-2 space-y-2">
            <DetailLine
              icon={<MapPin size={10} />}
              text={location || "Location not available"}
            />

            <DetailLine
              icon={<Building2 size={10} />}
              text={formatBusinessTypes(company.business_types)}
            />

            <DetailLine
              icon={<ShieldCheck size={10} />}
              text={verified ? "Verified Supplier" : "Supplier"}
            />
          </div>
        </div>
      </div>

      <Link
        href={`/companies/${company.slug}`}
        className="!text-[#251bb4] mt-4 flex h-[30px] items-center justify-center rounded-[4px] border border-[#3929dc] bg-white font-bold text-[8px] transition hover:bg-[#f6f5ff]"
      >
        View Company Profile
      </Link>
    </div>
  );
}

function DetailLine({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0 text-[#3025ca]">
        {icon}
      </span>

      <span className="break-words text-[#565b74] text-[7.5px]">
        {text}
      </span>
    </div>
  );
}