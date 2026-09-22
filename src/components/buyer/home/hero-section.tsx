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

          <div className="relative z-10 flex min-h-[335px] items-center px-5 md:px-8 lg:px-10">
            <div className="w-full max-w-[620px]">
              <h1 className="font-bold text-[#17159a] text-[42px] leading-[1.05]">
                India&apos;s Air Cooler
                <br />
                Industry Directory
              </h1>

              <p className="mt-3 max-w-[520px] text-[#4d5270] text-[12px] leading-[1.5]">
                Find manufacturers, suppliers, dealers, distributors, exporters and components all in one place.
              </p>

              <div className="mt-5 flex h-[46px] max-w-[570px] overflow-hidden rounded-md border border-[#dedff0] bg-white">
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  type="text"
                  placeholder="Search companies, products, brands or categories..."
                  className="min-w-0 flex-1 px-4 text-[#11163d] text-[11px] outline-none placeholder:text-[#9a9db3]"
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex w-[70px] items-center justify-center gap-1.5 bg-[#21159b] font-bold text-[10px] text-white"
                >
                  Search
                  <Search size={14} />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                <span className="font-semibold text-[#626783]">Popular Searches:</span>

                {["Air Cooler Manufacturers", "Cooler Motors", "Pumps", "Honeycomb Pads", "Cooler Dealers"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`/search?q=${encodeURIComponent(item)}&type=all`}
                      className="font-semibold text-[#2118ad]"
                    >
                      {item}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </WideContainer>
    </section>
  );
}
