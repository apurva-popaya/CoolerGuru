"use client";

// import Image from "next/image";
import { SafeImage } from "@/components/common/safe-image";
import Link from "next/link";

import {
  Bookmark,
  BriefcaseBusiness,
  Clock3,
  Download,
  MapPin,
  Send,
  Timer,
  UsersRound,
} from "lucide-react";

import { useFavorites } from "@/context/favorites-context";
import type { CompanyProfile } from "@/types/company-profile";

interface CompanyProfileHeroProps {
  company: CompanyProfile;
}

export function CompanyProfileHero({
  company,
}: CompanyProfileHeroProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const isSaved = isFavorite(company.id, "company");

  function handleSaveCompany() {
    toggleFavorite({
      id: company.id,
      type: "company",
      title: company.name,
      image: company.logo,
    });
  }

  const hasLocation = Boolean(company.location?.trim());

  const businessTypes =
    company.businessTypes?.filter((type) => type?.trim()) ?? [];

  const hasDescription = Boolean(
    company.shortDescription?.trim(),
  );

  const brochureUrl = company.brochureUrl?.trim();

  return (
    <div className="overflow-hidden rounded-[8px] border border-[#e2e3ee] bg-white sm:rounded-[10px]">
      {/* Cover */}
      <div className="relative h-[120px] w-full sm:h-[150px] md:h-[180px]">
        <SafeImage
  src={company.coverImage}
  alt={`${company.name} cover`}
  fill
  priority
  sizes="(max-width: 640px) 100vw, 1200px"
  className="object-cover"
/>
      </div>

      {/* Profile card */}
      <div className="relative z-10 mx-3 -mt-[35px] rounded-[8px] border border-[#e1e2ed] bg-white p-3 shadow-[0_4px_18px_rgba(20,20,80,0.06)] sm:mx-4 sm:-mt-[48px] sm:rounded-[10px] sm:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[125px_1fr] lg:grid-cols-[150px_1fr_220px] lg:gap-5">
          {/* Logo */}
          <div className="flex h-[90px] w-[90px] items-center justify-center self-start rounded-full border border-[#dfe1eb] bg-white p-3 sm:h-[110px] sm:w-[110px] sm:p-4 md:h-[115px] md:w-[115px] lg:h-[130px] lg:w-[130px]">
            <div className="relative h-full w-full">
              <SafeImage
  src={company.logo}
  alt={company.name}
  fill
  sizes="130px"
  className="object-contain"
/>
            </div>
          </div>

          {/* Details */}
          <div className="min-w-0">
            {/* Company name + badges */}
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="break-words font-bold text-[#171570] text-[20px] leading-tight sm:text-[24px]">
                {company.name}
              </h1>

              {company.isVerified && (
                <span className="rounded bg-[#159447] px-2 py-1 font-bold text-[7px] text-white sm:text-[8px]">
                  Verified
                </span>
              )}

              {company.isPremium && (
                <span className="rounded bg-[#ff6b1a] px-2 py-1 font-bold text-[7px] text-white sm:text-[8px]">
                  Premium
                </span>
              )}
            </div>

            {/* Location */}
            {hasLocation && (
              <div className="mt-2 flex items-start gap-1.5">
                <MapPin
                  size={13}
                  className="mt-0.5 shrink-0 text-[#2820c5]"
                />

                <span className="break-words font-medium text-[#555a76] text-[9px] sm:text-[10px]">
                  {company.location}
                </span>
              </div>
            )}

            {/* Business Types */}
            {businessTypes.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                {businessTypes.map((type, index) => (
                  <span
                    key={`${type}-${index}`}
                    className="font-semibold text-[#2a22ba] text-[8px] sm:text-[9px]"
                  >
                    {type}

                    {index < businessTypes.length - 1 && (
                      <span className="ml-2 text-[#a5a7b8]">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {hasDescription && (
              <p className="mt-3 max-w-[620px] text-[#4c516c] text-[9px] leading-[1.55] sm:text-[10px]">
                {company.shortDescription}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 md:col-span-2 md:grid md:grid-cols-3 lg:col-span-1 lg:grid-cols-1">
            {/* Send Inquiry */}
            <Link
              href={`/companies/${company.slug}/inquiry`}
              className="!text-white flex h-[38px] items-center justify-center gap-2 rounded-[5px] bg-[#2116a5] font-bold text-[9px] transition hover:bg-[#19118d] sm:h-[40px] sm:text-[10px]"
            >
              <Send size={14} />
              Send Inquiry
            </Link>

            {/* Brochure */}
            {brochureUrl && (
              <Link
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-[#241ab5] flex h-[38px] items-center justify-center gap-2 rounded-[5px] border border-[#e0e1ec] font-bold text-[9px] transition hover:bg-[#f7f6ff] sm:h-[40px] sm:text-[10px]"
              >
                <Download size={14} />
                Download Brochure
              </Link>
            )}

            {/* Save Company */}
            <button
              type="button"
              onClick={handleSaveCompany}
              className={`flex h-[38px] items-center justify-center gap-2 rounded-[5px] border font-bold text-[9px] transition sm:h-[40px] sm:text-[10px] ${
                isSaved
                  ? "border-[#cbc7ff] bg-[#f0eeff] text-[#241ab5]"
                  : "border-[#e0e1ec] bg-white text-[#241ab5] hover:bg-[#f7f6ff]"
              }`}
            >
              <Bookmark
                size={14}
                className={
                  isSaved
                    ? "fill-[#241ab5] text-[#241ab5]"
                    : "fill-transparent text-[#241ab5]"
                }
              />

              {isSaved ? "Saved Company" : "Save Company"}
            </button>
          </div>
        </div>

        {/* Stats */}
        {(company.yearsInBusiness ||
          company.employees ||
          company.productCount ||
          company.responseTime) && (
          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#ececf3] pt-4 sm:gap-6 md:grid-cols-4">
            {company.yearsInBusiness?.trim() && (
              <ProfileStat
                icon={<Clock3 size={18} />}
                value={company.yearsInBusiness}
                label="Years in Business"
              />
            )}

            {company.employees?.trim() && (
              <ProfileStat
                icon={<UsersRound size={18} />}
                value={company.employees}
                label="Employees"
              />
            )}

            {company.productCount?.trim() && (
              <ProfileStat
                icon={<BriefcaseBusiness size={18} />}
                value={company.productCount}
                label="Products"
              />
            )}

            {company.responseTime?.trim() && (
              <ProfileStat
                icon={<Timer size={18} />}
                value={company.responseTime}
                label="Response Time"
              />
            )}
          </div>
        )}
      </div>

      <div className="h-3 sm:h-4" />
    </div>
  );
}

function ProfileStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <span className="shrink-0 text-[#281dc9]">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="truncate font-bold text-[#171570] text-[11px] sm:text-[13px]">
          {value}
        </p>

        <p className="text-[#686d85] text-[7px] sm:text-[8px]">
          {label}
        </p>
      </div>
    </div>
  );
}