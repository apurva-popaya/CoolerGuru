import Link from "next/link";

import { Building2, Package } from "lucide-react";

import type { RankingItem } from "./analytics-data";

interface AnalyticsRankingCardProps {
  title: string;

  items: RankingItem[];

  type: "product" | "company";
}

export function AnalyticsRankingCard({ title, items, type }: AnalyticsRankingCardProps) {
  return (
    <div className="rounded-[10px] border border-border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-[#15136f] text-[14px]">{title}</h2>

        <Link
          href={type === "product" ? "/admin/products" : "/admin/companies"}
          className="font-semibold text-[#2720a8] text-[10px]"
        >
          View All
        </Link>
      </div>

      <div>
        {items.map((item, index) => {
          const Icon = type === "product" ? Package : Building2;

          return (
            <div
              key={item.id}
              className="grid min-h-[43px] grid-cols-[22px_34px_1fr_auto] items-center gap-2 border-border border-b last:border-b-0"
            >
              <div className="flex size-5 items-center justify-center rounded-full bg-[#f1f2f8] font-semibold text-[#5d6280] text-[10px]">
                {index + 1}
              </div>

              <div className="flex size-8 items-center justify-center rounded-[5px] bg-[#f4f5fa]">
                <Icon className="size-4 text-[#5d6280]" />
              </div>

              <span className="truncate font-medium text-[#15136f] text-[11px]">{item.name}</span>

              <span className="font-medium text-[#5d6280] text-[10px]">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
