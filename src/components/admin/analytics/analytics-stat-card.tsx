import type { LucideIcon } from "lucide-react";
import { ArrowUp } from "lucide-react";

interface AnalyticsStatCardProps {
  title: string;

  value: string;

  growth: number;

  icon: LucideIcon;
}

export function AnalyticsStatCard({ title, value, growth, icon: Icon }: AnalyticsStatCardProps) {
  return (
    <div className="rounded-[10px] border border-border bg-white p-4">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-[#f0efff]">
          <Icon className="size-6 text-[#2720a8]" />
        </div>

        <div className="min-w-0">
          <p className="font-medium text-[#5d6280] text-[12px]">{title}</p>

          <p className="mt-1 font-bold text-[#15136f] text-[24px] leading-none">{value}</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-1 font-semibold text-[11px] text-emerald-600">
              <ArrowUp className="size-3" />
              {growth}%
            </span>

            <span className="text-[10px] text-muted-foreground">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
