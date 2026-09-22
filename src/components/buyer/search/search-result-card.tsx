"use client";

import Link from "next/link";

import { BadgeCheck, Box, CalendarDays, Droplets, Heart, MapPin, Package, UsersRound, Wind, Zap } from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";
import { useFavorites } from "@/context/favorites-context";
import type { CompanySearchResult, ProductSearchResult, SearchResult } from "@/types/search";

interface SearchResultCardProps {
  result: SearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  if (result.type === "product") {
    return <ProductResultCard result={result} />;
  }

  return <CompanyResultCard result={result} />;
}

function ProductResultCard({ result }: { result: ProductSearchResult }) {
  return (
    <div className="relative rounded-[8px] border border-[#e2e3ef] bg-white px-4 py-3">
      <FavoriteButton id={result.id} type="product" title={result.title} image={result.image} />

      <div className="grid grid-cols-[110px_1fr] gap-4">
        <div className="relative h-[120px] w-[105px] self-center">
          <SafeImage src={result.image} alt={result.title} fill sizes="..." className="object-contain" />
        </div>

        <div className="min-w-0 pr-4">
          <span className="inline-flex rounded-[3px] bg-[#eeecff] px-2 py-[2px] font-bold text-[#3425d3] text-[8px] uppercase">
            Product
          </span>

          <h3 className="mt-1 font-bold text-[#17149d] text-[14px] leading-tight">{result.title}</h3>

          <p className="mt-1 font-medium text-[#454a67] text-[9px]">{result.category}</p>

          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-[#464b6e] text-[9px]">
            <Spec icon={<Wind size={12} />} text={`Airflow: ${result.airflow}`} />

            <Spec icon={<Droplets size={12} />} text={`Tank: ${result.tank}`} />

            <Spec icon={<Zap size={12} />} text={`Power: ${result.power}`} />

            <Spec icon={<Box size={12} />} text={`MOQ: ${result.moq}`} />
          </div>

          <p className="mt-2 max-w-[760px] text-[#444967] text-[10px] leading-[1.5]">{result.description}</p>

          <div className="mt-3 flex items-end justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-[3px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2c21c1] text-[9px]">
                {result.company}

                <BadgeCheck size={12} className="fill-[#2478ff] text-white" />
              </span>

              <span className="inline-flex items-center gap-1 rounded-[3px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2c21c1] text-[9px]">
                <MapPin size={10} />

                {result.location}
              </span>

              <span className="rounded-[3px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2c21c1] text-[9px]">
                {result.experience}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/products/${result.id}`}
                className="flex h-[32px] min-w-[100px] items-center justify-center rounded-[4px] border border-[#392aff] bg-white px-4 font-bold text-[#271bc7] text-[10px] transition hover:bg-[#f5f4ff]"
              >
                View Details
              </Link>

              <Link
                href={`/products/${result.id}/inquiry`}
                className="flex h-[32px] min-w-[105px] items-center justify-center rounded-[4px] bg-[#2516c7] px-4 font-bold text-[10px] text-white transition hover:bg-[#3424df]"
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

function CompanyResultCard({ result }: { result: CompanySearchResult }) {
  return (
    <div className="relative rounded-[8px] border border-[#e2e3ef] bg-white px-4 py-3">
      <FavoriteButton id={result.id} type="company" title={result.title} image={result.image} />

      <div className="grid grid-cols-[110px_minmax(250px,1fr)_1.1fr] items-center gap-5">
        <div className="relative h-[100px] w-[105px]">
          <SafeImage src={result.image} alt={result.title} fill sizes="..." className="object-contain" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="rounded-[3px] bg-[#eaf8ef] px-2 py-[2px] font-bold text-[#23915a] text-[8px] uppercase">
              Company
            </span>

            <BadgeCheck size={13} className="fill-[#2478ff] text-white" />
          </div>

          <h3 className="mt-1 font-bold text-[#17149d] text-[14px] leading-tight">{result.title}</h3>

          <div className="mt-1 flex items-center gap-1 text-[#565a75] text-[9px]">
            <MapPin size={11} className="shrink-0 text-[#202489]" />

            <span>{result.location}</span>
          </div>

          <p className="mt-2 max-w-[360px] text-[#454a67] text-[10px] leading-[1.45]">{result.description}</p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-[3px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2c21c1] text-[9px]">
              {result.businessType}
            </span>

            <span className="rounded-[3px] bg-[#f2f0ff] px-2 py-[4px] font-bold text-[#2c21c1] text-[9px]">
              {result.experience}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-3 divide-x divide-[#e2e3ef] border-[#e2e3ef] border-l">
            <CompanyStat icon={<Package size={15} />} label="Products" value={result.products} />

            <CompanyStat icon={<UsersRound size={15} />} label="Employees" value={result.employees} />

            <CompanyStat icon={<CalendarDays size={15} />} label="Established" value={result.established} />
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <Link
              href={`/companies/${result.id}`}
              className="flex h-[32px] min-w-[98px] items-center justify-center rounded-[4px] border border-[#392aff] bg-white px-4 font-bold text-[#271bc7] text-[10px] transition hover:bg-[#f5f4ff]"
            >
              View Profile
            </Link>

            <Link
              href={`/companies/${result.id}/inquiry`}
              className="flex h-[32px] min-w-[105px] items-center justify-center rounded-[4px] bg-[#2516c7] px-4 font-bold text-[10px] text-white transition hover:bg-[#3424df]"
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
    <div className="flex items-center gap-1.5">
      <span className="shrink-0 text-[#2420aa]">{icon}</span>

      <span>{text}</span>
    </div>
  );
}

interface CompanyStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function CompanyStat({ icon, label, value }: CompanyStatProps) {
  return (
    <div className="px-5">
      <div className="flex items-center gap-2">
        <span className="text-[#2b20d0]">{icon}</span>

        <span className="font-medium text-[#565a75] text-[8px]">{label}</span>
      </div>

      <p className="mt-1 pl-[23px] font-bold text-[#15166f] text-[11px]">{value}</p>
    </div>
  );
}

interface FavoriteButtonProps {
  id: string;
  type: "product" | "company";
  title: string;
  image: string;
}

function FavoriteButton({ id, type, title, image }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const liked = isFavorite(id, type);

  return (
    <button
      type="button"
      aria-label={liked ? `Remove ${type} from favorites` : `Add ${type} to favorites`}
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
        className={liked ? "fill-[#3325e2] text-[#3325e2]" : "fill-transparent text-[#3325e2]"}
      />
    </button>
  );
}
