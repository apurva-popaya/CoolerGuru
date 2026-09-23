"use client";

import Link from "next/link";

import {
  BadgeCheck,
  Box,
  CalendarDays,
  Droplets,
  Heart,
  MapPin,
  Package,
  UsersRound,
  Wind,
  Zap,
} from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";
import { useFavorites } from "@/context/favorites-context";
import type {
  CompanySearchResult,
  ProductSearchResult,
  SearchResult,
} from "@/types/search";

interface SearchResultCardProps {
  result: SearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  if (result.type === "product") {
    return <ProductResultCard result={result} />;
  }

  return <CompanyResultCard result={result} />;
}

function ProductResultCard({
  result,
}: {
  result: ProductSearchResult;
}) {
  return (
    <div className="relative w-full min-w-0 overflow-hidden rounded-[8px] border border-[#e2e3ef] bg-white px-3 py-4 sm:px-4">
      <FavoriteButton
        id={result.id}
        type="product"
        title={result.title}
        image={result.image}
      />

      {/* Image + Content */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:gap-5">
        {/* Product Image */}
        <div className="relative mx-auto h-[145px] w-[145px] shrink-0 sm:mx-0 sm:h-[120px] sm:w-[105px]">
          <SafeImage
            src={result.image}
            alt={result.title}
            fill
            sizes="(max-width: 640px) 145px, 105px"
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-[3px] bg-[#eeecff] px-2 py-[2px] font-bold text-[#3425d3] text-[8px] uppercase">
            Product
          </span>

          <h3 className="mt-1 break-words font-bold text-[#17149d] text-[14px] leading-tight">
            {result.title}
          </h3>

          <p className="mt-1 break-words font-medium text-[#454a67] text-[9px]">
            {result.category}
          </p>

          {/* Specifications */}
          <div className="mt-3 grid grid-cols-1 gap-2 text-[#464b6e] text-[9px] min-[400px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
            <Spec
              icon={<Wind size={12} />}
              text={`Airflow: ${result.airflow}`}
            />

            <Spec
              icon={<Droplets size={12} />}
              text={`Tank: ${result.tank}`}
            />

            <Spec
              icon={<Zap size={12} />}
              text={`Power: ${result.power}`}
            />

            <Spec
              icon={<Box size={12} />}
              text={`MOQ: ${result.moq}`}
            />
          </div>

          <p className="mt-3 max-w-[760px] break-words text-[#444967] text-[10px] leading-[1.5]">
            {result.description}
          </p>

          {/* Company / Location / Experience */}
          <div className="mt-3 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="inline-flex max-w-full items-center gap-1 rounded-[3px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2c21c1] text-[9px]">
                <span className="truncate">{result.company}</span>

                <BadgeCheck
                  size={12}
                  className="shrink-0 fill-[#2478ff] text-white"
                />
              </span>

              <span className="inline-flex max-w-full items-center gap-1 rounded-[3px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2c21c1] text-[9px]">
                <MapPin size={10} className="shrink-0" />

                <span className="truncate">{result.location}</span>
              </span>

              <span className="rounded-[3px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2c21c1] text-[9px]">
                {result.experience}
              </span>
            </div>

            {/* Buttons */}
            <div className="grid w-full shrink-0 grid-cols-2 gap-2 sm:flex sm:w-auto">
              <Link
                href={`/products/${result.id}`}
                className="flex h-[34px] min-w-0 items-center justify-center rounded-[4px] border border-[#392aff] bg-white px-2 font-bold text-[#271bc7] text-[9px] transition hover:bg-[#f5f4ff] sm:min-w-[100px] sm:px-4 sm:text-[10px]"
              >
                View Details
              </Link>

              <Link
                href={`/products/${result.id}/inquiry`}
                className="flex h-[34px] min-w-0 items-center justify-center rounded-[4px] bg-[#2516c7] px-2 font-bold text-[9px] text-white transition hover:bg-[#3424df] sm:min-w-[105px] sm:px-4 sm:text-[10px]"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyResultCard({
  result,
}: {
  result: CompanySearchResult;
}) {
  return (
    <div className="relative w-full min-w-0 overflow-hidden rounded-[8px] border border-[#e2e3ef] bg-white px-3 py-4 sm:px-4">
      <FavoriteButton
        id={result.id}
        type="company"
        title={result.title}
        image={result.image}
      />

      {/* Main Company Content */}
      <div className="flex min-w-0 flex-col gap-4 lg:grid lg:grid-cols-[110px_minmax(0,1fr)_minmax(180px,1.1fr)] lg:items-center lg:gap-5">
        {/* Logo */}
        <div className="relative mx-auto h-[100px] w-[105px] shrink-0 lg:mx-0">
          <SafeImage
            src={result.image}
            alt={result.title}
            fill
            sizes="105px"
            className="object-contain"
          />
        </div>

        {/* Company Information */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="rounded-[3px] bg-[#eaf8ef] px-2 py-[2px] font-bold text-[#23915a] text-[8px] uppercase">
              Company
            </span>

            <BadgeCheck
              size={13}
              className="shrink-0 fill-[#2478ff] text-white"
            />
          </div>

          <h3 className="mt-1 break-words font-bold text-[#17149d] text-[14px] leading-tight">
            {result.title}
          </h3>

          <div className="mt-1 flex min-w-0 items-center gap-1 text-[#565a75] text-[9px]">
            <MapPin
              size={11}
              className="shrink-0 text-[#202489]"
            />

            <span className="min-w-0 truncate">
              {result.location}
            </span>
          </div>

          <p className="mt-2 break-words text-[#454a67] text-[10px] leading-[1.45]">
            {result.description}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-[3px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2c21c1] text-[9px]">
              {result.businessType}
            </span>

            <span className="rounded-[3px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2c21c1] text-[9px]">
              {result.experience}
            </span>
          </div>
        </div>

        {/* Stats + Actions */}
        <div className="min-w-0">
          <div className="grid grid-cols-3 divide-x divide-[#e2e3ef] border-[#e2e3ef] border-l">
            <CompanyStat
              icon={<Package size={15} />}
              label="Products"
              value={result.products}
            />

            <CompanyStat
              icon={<UsersRound size={15} />}
              label="Employees"
              value={result.employees}
            />

            <CompanyStat
              icon={<CalendarDays size={15} />}
              label="Established"
              value={result.established}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href={`/companies/${result.id}`}
              className="flex h-[34px] min-w-0 items-center justify-center rounded-[4px] border border-[#392aff] bg-white px-2 font-bold text-[#271bc7] text-[9px] transition hover:bg-[#f5f4ff] sm:px-4 sm:text-[10px]"
            >
              View Profile
            </Link>

            <Link
              href={`/companies/${result.id}/inquiry`}
              className="flex h-[34px] min-w-0 items-center justify-center rounded-[4px] bg-[#2516c7] px-2 font-bold text-[9px] text-white transition hover:bg-[#3424df] sm:px-4 sm:text-[10px]"
            >
              Send Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SpecProps {
  icon: React.ReactNode;
  text: string;
}

function Spec({ icon, text }: SpecProps) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <span className="shrink-0 text-[#2420aa]">{icon}</span>

      <span className="min-w-0 break-words">{text}</span>
    </div>
  );
}

interface CompanyStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function CompanyStat({
  icon,
  label,
  value,
}: CompanyStatProps) {
  return (
    <div className="min-w-0 px-2 sm:px-3 lg:px-5">
      <div className="flex min-w-0 flex-col items-center gap-1 sm:flex-row sm:gap-2">
        <span className="shrink-0 text-[#2b20d0]">
          {icon}
        </span>

        <span className="truncate font-medium text-[#565a75] text-[7px] sm:text-[8px]">
          {label}
        </span>
      </div>

      <p className="mt-1 text-center font-bold text-[#15166f] text-[10px] sm:text-[11px]">
        {value}
      </p>
    </div>
  );
}

interface FavoriteButtonProps {
  id: string;
  type: "product" | "company";
  title: string;
  image: string;
}

function FavoriteButton({
  id,
  type,
  title,
  image,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const liked = isFavorite(id, type);

  return (
    <button
      type="button"
      aria-label={
        liked
          ? `Remove ${type} from favorites`
          : `Add ${type} to favorites`
      }
      onClick={() =>
        toggleFavorite({
          id,
          type,
          title,
          image,
        })
      }
      className="absolute top-3 right-3 z-10 text-[#3325e2] transition hover:scale-110"
    >
      <Heart
        size={18}
        strokeWidth={2}
        className={
          liked
            ? "fill-[#3325e2] text-[#3325e2]"
            : "fill-transparent text-[#3325e2]"
        }
      />
    </button>
  );
}