"use client";

import Image from "next/image";
import Link from "next/link";

import { Bookmark, BriefcaseBusiness, Clock3, Download, MapPin, Send, Timer, UsersRound } from "lucide-react";

import { useFavorites } from "@/context/favorites-context";
import type { CompanyProfile } from "@/types/company-profile";

interface CompanyProfileHeroProps {
  company: CompanyProfile;
}

export function CompanyProfileHero({ company }: CompanyProfileHeroProps) {
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

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#e2e3ee] bg-white">
      {/* Cover */}

      <div className="relative h-[180px] w-full">
        <Image src={company.coverImage} alt={company.name} fill priority className="object-cover" />
      </div>

      {/* Profile card */}

      <div className="relative z-10 mx-4 -mt-[48px] rounded-[10px] border border-[#e1e2ed] bg-white p-5 shadow-[0_4px_18px_rgba(20,20,80,0.06)]">
        <div className="grid grid-cols-[150px_1fr_220px] gap-5">
          {/* Logo */}

          <div className="flex h-[130px] w-[130px] items-center justify-center rounded-full border border-[#dfe1eb] bg-white p-4">
            <div className="relative h-full w-full">
              <Image src={company.logo} alt={company.name} fill className="object-contain" />
            </div>
          </div>

          {/* Details */}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-bold text-[#171570] text-[24px]">{company.name}</h1>

              {company.isVerified && (
                <span className="rounded bg-[#159447] px-2 py-1 font-bold text-[8px] text-white">Verified</span>
              )}

              {company.isPremium && (
                <span className="rounded bg-[#ff6b1a] px-2 py-1 font-bold text-[8px] text-white">Premium</span>
              )}
            </div>

            <div className="mt-2 flex items-center gap-1.5">
              <MapPin size={13} className="text-[#2820c5]" />

              <span className="font-medium text-[#555a76] text-[10px]">{company.location}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {company.businessTypes.map((type, index) => (
                <span key={type} className="font-semibold text-[#2a22ba] text-[9px]">
                  {type}

                  {index < company.businessTypes.length - 1 && <span className="ml-2 text-[#a5a7b8]">/</span>}
                </span>
              ))}
            </div>

            <p className="mt-3 max-w-[620px] text-[#4c516c] text-[10px] leading-[1.55]">{company.shortDescription}</p>
          </div>

          {/* Actions */}

          <div className="flex flex-col gap-2">
            <Link
              href={`/companies/${company.id}/inquiry`}
              className="!text-white flex h-[40px] items-center justify-center gap-2 rounded-[5px] bg-[#2116a5] font-bold text-[10px] transition hover:bg-[#19118d]"
            >
              <Send size={14} />
              Send Inquiry
            </Link>

            <Link
              href={company.brochureUrl}
              className="!text-[#241ab5] flex h-[40px] items-center justify-center gap-2 rounded-[5px] border border-[#e0e1ec] font-bold text-[10px] transition hover:bg-[#f7f6ff]"
            >
              <Download size={14} />
              Download Brochure
            </Link>

            <button
              type="button"
              onClick={handleSaveCompany}
              className={`flex h-[40px] items-center justify-center gap-2 rounded-[5px] border font-bold text-[10px] transition ${
                isSaved
                  ? "border-[#cbc7ff] bg-[#f0eeff] text-[#241ab5]"
                  : "border-[#e0e1ec] bg-white text-[#241ab5] hover:bg-[#f7f6ff]"
              }
              `}
            >
              <Bookmark
                size={14}
                className={isSaved ? "fill-[#241ab5] text-[#241ab5]" : "fill-transparent text-[#241ab5]"}
              />

              {isSaved ? "Saved Company" : "Save Company"}
            </button>
          </div>
        </div>

        {/* Stats */}

        <div className="mt-5 grid grid-cols-4 gap-6">
          <ProfileStat icon={<Clock3 size={20} />} value={company.yearsInBusiness} label="Years in Business" />

          <ProfileStat icon={<UsersRound size={20} />} value={company.employees} label="Employees" />

          <ProfileStat icon={<BriefcaseBusiness size={20} />} value={company.productCount} label="Products" />

          <ProfileStat icon={<Timer size={20} />} value={company.responseTime} label="Response Time" />
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}

function ProfileStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-[#281dc9]">{icon}</span>

      <div>
        <p className="font-bold text-[#171570] text-[13px]">{value}</p>

        <p className="text-[#686d85] text-[8px]">{label}</p>
      </div>
    </div>
  );
}
