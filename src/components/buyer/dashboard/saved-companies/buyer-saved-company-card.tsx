"use client";

import Image from "next/image";
import Link from "next/link";

import { Heart, MapPin, Send, ShieldCheck, Trash2 } from "lucide-react";

import { useFavorites } from "@/context/favorites-context";
import type { CompanyProfile } from "@/types/company-profile";

interface FavoriteCompany {
  id: string;
  type: "product" | "company";
  title: string;
  image: string;
}

interface Props {
  favorite: FavoriteCompany;
  company?: CompanyProfile;
}

export function BuyerSavedCompanyCard({ favorite, company }: Props) {
  const { toggleFavorite } = useFavorites();

  const companyName = company?.name ?? favorite.title;

  const companyImage = company?.logo ?? favorite.image;

  function handleRemove() {
    toggleFavorite({
      id: favorite.id,
      type: "company",
      title: favorite.title,
      image: favorite.image,
    });
  }

  return (
    <div className="relative rounded-[9px] border border-[#e1e2ec] bg-white p-4">
      <div className="grid grid-cols-[92px_1fr_115px] gap-4">
        <div className="flex h-[82px] w-[82px] items-center justify-center rounded-[7px] border border-[#e2e3ee] bg-white p-2">
          <div className="relative h-full w-full">
            <Image src={companyImage} alt={companyName} fill sizes="82px" className="object-contain" />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-[#171570] text-[13px]">{companyName}</h3>

          {company && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {company.isVerified && (
                <span className="inline-flex items-center gap-1 rounded-[4px] bg-[#eeedff] px-2 py-1 font-bold text-[#2b20c3] text-[7px]">
                  <ShieldCheck size={9} />
                  Verified Supplier
                </span>
              )}

              {company.isPremium && (
                <span className="rounded-[4px] bg-[#fff2e9] px-2 py-1 font-bold text-[#e66416] text-[7px]">
                  Premium
                </span>
              )}
            </div>
          )}

          {company?.location && (
            <div className="mt-2 flex items-center gap-1">
              <MapPin size={10} className="shrink-0 text-[#3025c7]" />

              <span className="text-[#555b76] text-[8px]">{company.location}</span>
            </div>
          )}

          {company && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[#535873] text-[8px]">
              {company.businessTypes.map((type, index) => (
                <span key={type}>
                  {type}

                  {index < company.businessTypes.length - 1 && <span className="ml-1.5 text-[#aaaaba]">/</span>}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-[30px] items-center justify-center gap-1.5 rounded-[4px] bg-[#fff1f3] font-bold text-[#db3550] text-[8px]">
            <Heart size={11} className="fill-[#e43a55] text-[#e43a55]" />
            Saved
          </div>

          <Link
            href={`/companies/${favorite.id}`}
            className="!text-white flex h-[32px] items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[8px] transition hover:bg-[#3022c6]"
          >
            View Profile
          </Link>

          <Link
            href={`/companies/${favorite.id}/inquiry`}
            className="!text-[#251bb4] flex h-[32px] items-center justify-center gap-1.5 rounded-[4px] border border-[#d9d8ef] bg-white font-bold text-[8px] transition hover:bg-[#f7f6ff]"
          >
            <Send size={10} />
            Send Inquiry
          </Link>

          <button
            type="button"
            onClick={handleRemove}
            className="flex h-[32px] items-center justify-center gap-1.5 rounded-[4px] border border-[#d9d8ef] bg-white font-bold text-[#251bb4] text-[8px] transition hover:bg-[#f7f6ff]"
          >
            <Trash2 size={10} />
            Remove
          </button>
        </div>
      </div>

      {company?.shortDescription && (
        <p className="mt-3 max-w-[560px] text-[#535873] text-[8.5px] leading-[1.5]">{company.shortDescription}</p>
      )}

      {company && company.productCategories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {company.productCategories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="rounded-full bg-[#f1efff] px-2.5 py-1 font-semibold text-[#2c21bd] text-[7px]"
            >
              {category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
