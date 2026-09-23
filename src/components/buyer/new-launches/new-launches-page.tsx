"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import {
  ChevronDown,
  ChevronRight,
  Grid2X2,
  List,
  Rocket,
} from "lucide-react";

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
    <section className="bg-white py-4 sm:py-5">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap font-medium text-[#555a76] text-[9px] sm:text-[10px]">
          <Link
            href="/"
            className="shrink-0 transition hover:text-[#2118ad]"
          >
            Home
          </Link>

          <ChevronRight size={11} className="shrink-0 text-[#777b92]" />

          <span className="shrink-0 font-semibold text-[#2118ad]">
            New Launches
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          {/* Heading */}
          <div className="min-w-0">
            <h1 className="font-bold text-[#171570] text-[24px] leading-tight sm:text-[30px]">
              All New Launches
            </h1>

            <p className="mt-1 max-w-[620px] text-[#4d526e] text-[10px] leading-[1.5] sm:text-[11px]">
              Explore the latest products launched by verified companies in
              the cooling industry.
            </p>
          </div>

          {/* Innovation card */}
          <div className="flex w-full items-center gap-3 rounded-[8px] border border-[#dedff0] bg-white px-4 py-3 sm:px-5 sm:py-4 lg:w-[390px] lg:min-w-[390px]">
            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#f1efff] text-[#3325df] sm:h-[42px] sm:w-[42px]">
              <Rocket size={19} className="sm:h-[21px] sm:w-[21px]" />
            </div>

            <div className="min-w-0">
              <p className="font-bold text-[#171570] text-[10px] sm:text-[11px]">
                Stay Ahead with Innovation!
              </p>

              <p className="mt-1 text-[#5f647c] text-[8px] leading-[1.4]">
                Discover the newest cooling solutions from trusted
                manufacturers.
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-5 flex flex-col gap-3 rounded-t-[8px] border border-[#e2e3ee] bg-white px-3 py-3 sm:px-4 sm:py-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Count */}
          <p className="font-medium text-[#353a5d] text-[9px] sm:text-[10px]">
            Showing{" "}
            <span className="font-bold">
              1 to {products.length}
            </span>{" "}
            of <span className="font-bold">48</span> new launches
          </p>

          {/* Controls */}
          <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 lg:w-auto">
            {/* Sort */}
            <div className="relative min-w-0 flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="h-[36px] w-full appearance-none rounded-[5px] border border-[#dedff0] bg-white px-3 pr-8 font-semibold text-[#171570] text-[9px] outline-none sm:min-w-[185px]"
              >
                <option value="latest">
                  Sort by: Latest First
                </option>

                <option value="name-asc">
                  Name: A to Z
                </option>

                <option value="name-desc">
                  Name: Z to A
                </option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#353a5d]"
              />
            </div>

            {/* Grid */}
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[5px] border transition ${
                view === "grid"
                  ? "border-[#2116a5] bg-[#2116a5] text-white"
                  : "border-[#dedff0] bg-white text-[#27227f]"
              }`}
            >
              <Grid2X2 size={15} />
            </button>

            {/* List */}
            <button
              type="button"
              aria-label="List view"
              onClick={() => setView("list")}
              className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[5px] border transition ${
                view === "list"
                  ? "border-[#2116a5] bg-[#2116a5] text-white"
                  : "border-[#dedff0] bg-white text-[#27227f]"
              }`}
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="border-x border-[#e2e3ee] bg-white px-2 pb-3 sm:px-3">
          {view === "grid" ? (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-6">
              {products.map((product) => (
                <NewLaunchCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <NewLaunchCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="border-x border-b border-[#e2e3ee] bg-white px-3 pt-2 pb-4 sm:px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[#434866] text-[8px] sm:text-[9px]">
              Showing 1 to {products.length} of 48 new launches
            </p>

            <NewLaunchPagination />
          </div>
        </div>
      </Container>
    </section>
  );
}