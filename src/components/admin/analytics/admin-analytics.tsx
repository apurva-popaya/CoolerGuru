"use client";

import * as React from "react";

import { Building2, CalendarDays, MessageSquare, Package, Store, UserPlus, Users } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  analyticsStats,
  mostSavedCompanies,
  mostSavedProducts,
  mostViewedCompanies,
  mostViewedProducts,
} from "./analytics-data";
import { AnalyticsRankingCard } from "./analytics-ranking-card";
import { AnalyticsStatCard } from "./analytics-stat-card";
import { InquiryVolumeChart } from "./inquiry-volume-chart";
import { TopCategories } from "./top-categories";
import { UserGrowthChart } from "./user-growth-chart";

const mainStatIcons = [Users, Users, Store, Building2, Package, MessageSquare];

const monthlyStatIcons = [UserPlus, Building2, Package];

export function AdminAnalytics() {
  const [period, setPeriod] = React.useState("monthly");

  return (
    <div className="space-y-4">
      {/* HEADER */}

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="font-bold text-[#15136f] text-[27px] leading-none">Analytics</h1>

          <p className="mt-2 text-[#5d6280] text-[12px]">
            Track overall platform performance and aggregated insights across buyers, suppliers, companies, products,
            and inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex h-10 items-center gap-3 rounded-[7px] border border-border bg-white px-4 font-medium text-[#15136f] text-[12px]"
          >
            <CalendarDays className="size-4 text-[#2720a8]" />
            Jan 1, 2024 – Dec 31, 2024
            <span className="ml-2">⌄</span>
          </button>

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="h-10 w-[125px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>

              <SelectItem value="weekly">Weekly</SelectItem>

              <SelectItem value="monthly">Monthly</SelectItem>

              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* PRIMARY STATS */}

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {analyticsStats.main.slice(0, 4).map((stat, index) => (
          <AnalyticsStatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            growth={stat.growth}
            icon={mainStatIcons[index]}
          />
        ))}
      </div>

      {/* PRODUCTS + INQUIRIES */}

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {analyticsStats.main.slice(4).map((stat, index) => (
          <AnalyticsStatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            growth={stat.growth}
            icon={mainStatIcons[index + 4]}
          />
        ))}
      </div>

      {/* MONTHLY */}

      <div className="grid gap-3 md:grid-cols-3">
        {analyticsStats.monthly.map((stat, index) => (
          <AnalyticsStatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            growth={stat.growth}
            icon={monthlyStatIcons[index]}
          />
        ))}
      </div>

      {/* CHARTS */}

      <div className="grid gap-3 xl:grid-cols-3">
        <InquiryVolumeChart />

        <UserGrowthChart />

        <TopCategories />
      </div>

      {/* RANKINGS */}

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsRankingCard title="Most Viewed Products" items={mostViewedProducts} type="product" />

        <AnalyticsRankingCard title="Most Saved Products" items={mostSavedProducts} type="product" />

        <AnalyticsRankingCard title="Most Viewed Companies" items={mostViewedCompanies} type="company" />

        <AnalyticsRankingCard title="Most Saved Companies" items={mostSavedCompanies} type="company" />
      </div>
    </div>
  );
}
