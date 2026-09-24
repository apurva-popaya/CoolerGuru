"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  MapPin,
  Send,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import {
  removeSavedCompany,
  type SavedCompany,
} from "@/lib/api/buyer-saved-api";

interface Props {
  company: SavedCompany;
  onRemoved?: (companyId: number) => void;
}

export function BuyerSavedCompanyCard({
  company,
  onRemoved,
}: Props) {
  const [removing, setRemoving] = useState(false);

  const location = [
    company.city,
    company.state,
  ]
    .filter(Boolean)
    .join(", ");

  async function handleRemove() {
    if (removing) {
      return;
    }

    setRemoving(true);

    try {
      await removeSavedCompany(company.company_id);

      onRemoved?.(company.company_id);
    } catch (error) {
      console.error(
        "Failed to remove saved company:",
        error,
      );
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="relative rounded-[9px] border border-[#e1e2ec] bg-white p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[82px_1fr] lg:grid-cols-[92px_1fr_115px]">
        {/* Logo */}
        <div className="flex h-[82px] w-[82px] items-center justify-center rounded-[7px] border border-[#e2e3ee] bg-white p-2">
          <div className="relative h-full w-full">
            {company.company_logo_url ? (
              <Image
                src={company.company_logo_url}
                alt={company.name}
                fill
                sizes="82px"
                className="object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#f5f3ff] font-bold text-[#3025c7] text-[20px]">
                {company.name?.charAt(0).toUpperCase() || "C"}
              </div>
            )}
          </div>
        </div>

        {/* Company information */}
        <div className="min-w-0">
          <h3 className="font-bold text-[#171570] text-[13px]">
            {company.name || "Unnamed Company"}
          </h3>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {company.verification_status ===
              "VERIFIED" && (
              <span className="inline-flex items-center gap-1 rounded-[4px] bg-[#eeedff] px-2 py-1 font-bold text-[#2b20c3] text-[7px]">
                <ShieldCheck size={9} />
                Verified Supplier
              </span>
            )}

            {company.company_type && (
              <span className="rounded-[4px] bg-[#f1efff] px-2 py-1 font-bold text-[#3025c7] text-[7px]">
                {company.company_type}
              </span>
            )}
          </div>

          {location && (
            <div className="mt-2 flex items-center gap-1">
              <MapPin
                size={10}
                className="shrink-0 text-[#3025c7]"
              />

              <span className="text-[#555b76] text-[8px]">
                {location}
              </span>
            </div>
          )}

          {company.description && (
            <p className="mt-2 line-clamp-2 text-[#535873] text-[8px] leading-[1.5]">
              {company.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 sm:col-span-2 lg:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 flex h-[30px] items-center justify-center gap-1.5 rounded-[4px] bg-[#fff1f3] font-bold text-[#db3550] text-[8px] lg:col-span-1">
            <Heart
              size={11}
              className="fill-[#e43a55] text-[#e43a55]"
            />
            Saved
          </div>

          <Link
            href={`/companies/${company.company_id}`}
            className="!text-white flex h-[32px] items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[8px] transition hover:bg-[#3022c6]"
          >
            View Profile
          </Link>

          <Link
            href={`/companies/${company.company_id}/inquiry`}
            className="!text-[#251bb4] flex h-[32px] items-center justify-center gap-1.5 rounded-[4px] border border-[#d9d8ef] bg-white font-bold text-[8px] transition hover:bg-[#f7f6ff]"
          >
            <Send size={10} />
            Send Inquiry
          </Link>

          <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="flex h-[32px] items-center justify-center gap-1.5 rounded-[4px] border border-[#d9d8ef] bg-white font-bold text-[#251bb4] text-[8px] transition hover:bg-[#f7f6ff] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={10} />
            {removing ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}