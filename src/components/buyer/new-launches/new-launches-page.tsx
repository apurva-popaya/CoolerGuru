"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { ChevronDown, ChevronRight, Grid2X2, List, Rocket } from "lucide-react";

import { Container } from "@/components/common/container";
import { newLaunchProducts } from "@/data/new-launches";

import { NewLaunchCard } from "./new-launch-card";
import { NewLaunchPagination } from "./new-launch-pagination";

type SortOption = "latest" | "name-asc" | "name-desc";

export function NewLaunchesPage() {
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [view, setView] = useState<"grid" | "list">("grid");

  const products = useMemo(() => {
    const result = [...newLaunchProducts];

    if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [sortBy]);

  return (
    <section className="bg-white py-5">
      <Container>
        <div className="mb-3 flex items-center gap-1.5 font-medium text-[#555a76] text-[10px]">
          <Link href="/" className="transition hover:text-[#2118ad]">
            Home
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          <span className="font-semibold text-[#2118ad]">New Launches</span>
        </div>

        <div className="flex items-start justify-between gap-8">
          <div>
            <h1 className="font-bold text-[#171570] text-[30px] leading-tight">All New Launches</h1>

            <p className="mt-1 text-[#4d526e] text-[11px]">
              Explore the latest products launched by verified companies in the cooling industry.
            </p>
          </div>

          <div className="flex min-w-[390px] items-center gap-4 rounded-[8px] border border-[#dedff0] bg-white px-5 py-4">
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#f1efff] text-[#3325df]">
              <Rocket size={21} />
            </div>

            <div>
              <p className="font-bold text-[#171570] text-[11px]">Stay Ahead with Innovation!</p>

              <p className="mt-1 text-[#5f647c] text-[8px] leading-[1.4]">
                Discover the newest cooling solutions from trusted manufacturers.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-t-[8px] border border-[#e2e3ee] bg-white px-4 py-3">
          <p className="font-medium text-[#353a5d] text-[10px]">
            Showing <span className="font-bold">1 to {products.length}</span> of <span className="font-bold">48</span>{" "}
            new launches
          </p>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="h-[36px] min-w-[185px] appearance-none rounded-[5px] border border-[#dedff0] bg-white px-3 pr-8 font-semibold text-[#171570] text-[9px] outline-none"
              >
                <option value="latest">Sort by: Latest First</option>

                <option value="name-asc">Name: A to Z</option>

                <option value="name-desc">Name: Z to A</option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#353a5d]"
              />
            </div>

            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={`flex h-[34px] w-[34px] items-center justify-center rounded-[5px] border transition ${view === "grid" ? "border-[#2116a5] bg-[#2116a5] text-white" : "border-[#dedff0] bg-white text-[#27227f]"}`}
            >
              <Grid2X2 size={15} />
            </button>

            <button
              type="button"
              aria-label="List view"
              onClick={() => setView("list")}
              className={`flex h-[34px] w-[34px] items-center justify-center rounded-[5px] border transition ${view === "list" ? "border-[#2116a5] bg-[#2116a5] text-white" : "border-[#dedff0] bg-white text-[#27227f]"}`}
            >
              <List size={15} />
            </button>
          </div>
        </div>

        <div
          className={`${view === "grid" ? "grid grid-cols-6 gap-3" : "grid grid-cols-3 gap-3"} border-[#e2e3ee] border-x bg-white px-3 pb-3`}
        >
          {products.map((product) => (
            <NewLaunchCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex items-center justify-between border-[#e2e3ee] border-x border-b bg-white px-4 pt-2 pb-4">
          <p className="text-[#434866] text-[9px]">Showing 1 to {products.length} of 48 new launches</p>

          <NewLaunchPagination />
        </div>
      </Container>
    </section>
  );
}
