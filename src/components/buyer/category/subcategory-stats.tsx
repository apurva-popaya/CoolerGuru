import { Package, Search, UsersRound } from "lucide-react";

interface SubcategoryStatsProps {
  productCount: string;
  companyCount: string;
  monthlySearches: string;
}

export function SubcategoryStats({
  productCount,
  companyCount,
  monthlySearches,
}: SubcategoryStatsProps) {
  return (
    <div className="mt-5 flex justify-center">
      <div className="grid w-full max-w-[950px] grid-cols-3 rounded-[8px] border border-[#e2e3ee] bg-white py-3 sm:py-4">
        <StatItem
          icon={<Package size={15} />}
          label="Products"
          value={productCount}
        />

        <StatItem
          icon={<UsersRound size={15} />}
          label="Companies"
          value={companyCount}
          border
        />

        <StatItem
          icon={<Search size={15} />}
          label="Monthly Searches"
          value={monthlySearches}
          border
        />
      </div>
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  border?: boolean;
}

function StatItem({
  icon,
  label,
  value,
  border = false,
}: StatItemProps) {
  return (
    <div
      className={`flex min-w-0 items-center justify-center gap-1.5 px-2 sm:gap-3 sm:px-6 ${
        border ? "border-[#e4e5ee] border-l" : ""
      }`}
    >
      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#f2f0ff] text-[#3425e3] sm:h-[36px] sm:w-[36px]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-[#575c77] text-[7px] sm:text-[9px]">
          {label}
        </p>

        <p className="mt-0.5 truncate font-bold text-[#171570] text-[10px] sm:text-[13px]">
          {value}
        </p>
      </div>
    </div>
  );
}