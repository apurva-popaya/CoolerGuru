"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Search } from "lucide-react";

import { WideContainer } from "@/components/common/wide-container";

export function HeroSection() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch() {
    const query = searchQuery.trim();

    if (!query) {
      router.push("/search");

      return;
    }

    router.push(`/search?q=${encodeURIComponent(query)}&type=all`);
  }

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <section className="w-full bg-white">
      <WideContainer className="px-0">
        <div className="relative overflow-hidden bg-[#f4f2ff]">
          <Image
            src="/images/home/hero/hero-image.png"
            alt="Air Cooler Industry"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Overlay only for mobile and tablet */}
          <div className="absolute inset-0 z-[1] bg-white/85 lg:bg-transparent" />

          <div className="relative z-10 flex min-h-[335px] items-center px-5 py-8 sm:px-7 md:px-8 md:py-10 lg:px-10">
            <div className="w-full max-w-[620px]">
              <h1 className="font-bold text-[#17159a] text-[30px] leading-[1.08] sm:text-[36px] md:text-[40px] lg:text-[42px] lg:leading-[1.05]">
                India&apos;s Air Cooler
                <br />
                Industry Directory
              </h1>

              <p className="mt-3 max-w-[520px] text-[#4d5270] text-[11px] leading-[1.5] sm:text-[12px]">
                Find manufacturers, suppliers, dealers, distributors, exporters and components all in one place.
              </p>

              <div className="mt-5 flex h-[44px] w-full max-w-[570px] overflow-hidden rounded-md border border-[#dedff0] bg-white sm:h-[46px]">
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  type="text"
                  placeholder="Search companies, products, brands or categories..."
                  className="min-w-0 flex-1 px-3 text-[#11163d] text-[10px] outline-none placeholder:text-[#9a9db3] sm:px-4 sm:text-[11px]"
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex w-[58px] shrink-0 items-center justify-center gap-1 bg-[#21159b] font-bold text-[9px] text-white sm:w-[70px] sm:gap-1.5 sm:text-[10px]"
                >
                  Search
                  <Search size={13} className="sm:h-[14px] sm:w-[14px]" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[10px] sm:gap-x-3 sm:text-[11px]">
                <span className="font-semibold text-[#626783]">
                  Popular Searches:
                </span>

                {[
                  "Air Cooler Manufacturers",
                  "Cooler Motors",
                  "Pumps",
                  "Honeycomb Pads",
                  "Cooler Dealers",
                ].map((item) => (
                  <Link
                    key={item}
                    href={`/search?q=${encodeURIComponent(item)}&type=all`}
                    className="font-semibold text-[#2118ad]"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WideContainer>
    </section>
  );
}