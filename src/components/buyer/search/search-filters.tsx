"use client";

import { useEffect, useState } from "react";

import { ChevronDown } from "lucide-react";

import type { SearchBusinessType, SearchFacets } from "@/types/search-api";

interface SearchFiltersProps {
  businessTypes: SearchBusinessType[];
  categorySlugs: string[];

  verifiedOnly: boolean;
  premiumOnly: boolean;

  state?: string;
  city?: string;

  facets?: SearchFacets;

  onApply: (values: {
    businessTypes: SearchBusinessType[];
    categorySlugs: string[];
    verifiedOnly: boolean;
    premiumOnly: boolean;
    state?: string;
    city?: string;
  }) => void;

  onClear: () => void;
}

const fallbackBusinessTypes: {
  value: SearchBusinessType;
  label: string;
  count: number;
}[] = [
  {
    value: "MANUFACTURER",
    label: "Manufacturer",
    count: 682,
  },
  {
    value: "SUPPLIER",
    label: "Supplier",
    count: 412,
  },
  {
    value: "EXPORTER",
    label: "Exporter",
    count: 198,
  },
  {
    value: "OEM",
    label: "OEM",
    count: 102,
  },
  {
    value: "DISTRIBUTOR",
    label: "Distributor",
    count: 74,
  },
];

const fallbackCategories = [
  {
    slug: "industrial-air-coolers",
    name: "Industrial Air Coolers",
    count: 652,
  },
  {
    slug: "commercial-air-coolers",
    name: "Commercial Air Coolers",
    count: 318,
  },
  {
    slug: "desert-air-coolers",
    name: "Desert Air Coolers",
    count: 186,
  },
  {
    slug: "tower-air-coolers",
    name: "Tower Air Coolers",
    count: 124,
  },
  {
    slug: "personal-air-coolers",
    name: "Personal Air Coolers",
    count: 78,
  },
  {
    slug: "window-air-coolers",
    name: "Window Air Coolers",
    count: 52,
  },
];

export function SearchFilters({
  businessTypes,
  categorySlugs,
  verifiedOnly,
  premiumOnly,
  state,
  city,
  facets,
  onApply,
  onClear,
}: SearchFiltersProps) {
  const [localBusinessTypes, setLocalBusinessTypes] = useState<SearchBusinessType[]>(businessTypes);

  const [localCategorySlugs, setLocalCategorySlugs] = useState<string[]>(categorySlugs);

  const [localVerifiedOnly, setLocalVerifiedOnly] = useState(verifiedOnly);

  const [localPremiumOnly, setLocalPremiumOnly] = useState(premiumOnly);

  const [localState, setLocalState] = useState(state ?? "");

  const [localCity, setLocalCity] = useState(city ?? "");

  useEffect(() => {
    setLocalBusinessTypes(businessTypes);

    setLocalCategorySlugs(categorySlugs);

    setLocalVerifiedOnly(verifiedOnly);

    setLocalPremiumOnly(premiumOnly);

    setLocalState(state ?? "");

    setLocalCity(city ?? "");
  }, [businessTypes, categorySlugs, verifiedOnly, premiumOnly, state, city]);

  const businessTypeOptions = facets?.business_types?.length
    ? facets.business_types.map((item) => ({
        value: item.value as SearchBusinessType,
        label: item.label,
        count: item.count,
      }))
    : fallbackBusinessTypes;

  const categoryOptions = facets?.categories?.length ? facets.categories : fallbackCategories;

  const states = facets?.states?.length
    ? facets.states
    : ["Gujarat", "Maharashtra", "Delhi", "Rajasthan", "Tamil Nadu"];

  const cities = facets?.cities?.length ? facets.cities : ["Ahmedabad", "Rajkot", "Surat", "Mumbai", "Delhi"];

  function toggleBusinessType(value: SearchBusinessType) {
    setLocalBusinessTypes((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  function toggleCategory(slug: string) {
    setLocalCategorySlugs((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }

  function handleClear() {
    setLocalBusinessTypes([]);

    setLocalCategorySlugs([]);

    setLocalVerifiedOnly(false);

    setLocalPremiumOnly(false);

    setLocalState("");

    setLocalCity("");

    onClear();
  }

  return (
    <aside className="rounded-[8px] border border-[#dedff0] bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-[#15166f] text-[14px]">Filters</h2>

        <button
          type="button"
          onClick={handleClear}
          className="font-bold text-[#2618c7] text-[9px] transition hover:text-[#4334e0]"
        >
          Clear All
        </button>
      </div>

      <FilterSection title="Business Type">
        <div className="space-y-2">
          {businessTypeOptions.map((item) => (
            <CheckboxRow
              key={item.value}
              label={item.label}
              count={String(item.count)}
              checked={localBusinessTypes.includes(item.value)}
              onChange={() => toggleBusinessType(item.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Verified Company">
        <CheckboxRow
          label="Verified Only"
          count={String(facets?.verified_count ?? 325)}
          checked={localVerifiedOnly}
          onChange={() => setLocalVerifiedOnly((current) => !current)}
        />
      </FilterSection>

      <FilterSection title="Premium Listing">
        <CheckboxRow
          label="Premium Only"
          count={String(facets?.premium_count ?? 86)}
          checked={localPremiumOnly}
          onChange={() => setLocalPremiumOnly((current) => !current)}
        />
      </FilterSection>

      <FilterSection title="Location">
        <p className="mb-1.5 font-semibold text-[#313661] text-[9px]">State</p>

        <select
          value={localState}
          onChange={(event) => {
            setLocalState(event.target.value);
            setLocalCity("");
          }}
          className="mb-3 h-[34px] w-full rounded border border-[#dedff0] bg-white px-2 text-[#373b64] text-[9px] outline-none"
        >
          <option value="">All States</option>

          {states.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <p className="mb-1.5 font-semibold text-[#313661] text-[9px]">City</p>

        <select
          value={localCity}
          onChange={(event) => setLocalCity(event.target.value)}
          className="h-[34px] w-full rounded border border-[#dedff0] bg-white px-2 text-[#373b64] text-[9px] outline-none"
        >
          <option value="">All Cities</option>

          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="Category">
        <div className="space-y-2">
          {categoryOptions.map((item) => (
            <CheckboxRow
              key={item.slug}
              label={item.name}
              count={String(item.count)}
              checked={localCategorySlugs.includes(item.slug)}
              onChange={() => toggleCategory(item.slug)}
            />
          ))}
        </div>
      </FilterSection>

      <button
        type="button"
        onClick={() =>
          onApply({
            businessTypes: localBusinessTypes,
            categorySlugs: localCategorySlugs,
            verifiedOnly: localVerifiedOnly,
            premiumOnly: localPremiumOnly,
            state: localState || undefined,
            city: localCity || undefined,
          })
        }
        className="mt-3 h-[36px] w-full rounded-[4px] border border-[#3b2cff] font-bold text-[#2118ad] text-[10px] transition hover:bg-[#f4f3ff]"
      >
        Apply Filters
      </button>
    </aside>
  );
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div className="border-[#ececf4] border-b py-3 first:pt-0 last:border-b-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-[#1a1b6f] text-[10px]">{title}</h3>

        <ChevronDown size={13} className="text-[#252681]" />
      </div>

      {children}
    </div>
  );
}

interface CheckboxRowProps {
  label: string;
  count: string;
  checked: boolean;
  onChange: () => void;
}

function CheckboxRow({ label, count, checked, onChange }: CheckboxRowProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-[13px] w-[13px] cursor-pointer accent-[#3426d4]"
      />

      <span className="min-w-0 flex-1 text-[#33375f] text-[9px]">{label}</span>

      <span className="font-semibold text-[#313179] text-[9px]">{count}</span>
    </label>
  );
}
