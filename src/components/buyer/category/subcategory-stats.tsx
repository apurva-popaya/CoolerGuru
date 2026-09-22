import { Package, Search, UsersRound } from "lucide-react";

interface SubcategoryStatsProps {
  productCount: string;
  companyCount: string;
  monthlySearches: string;
}

export function SubcategoryStats({ productCount, companyCount, monthlySearches }: SubcategoryStatsProps) {
  return (
    <div className="mt-5 flex justify-center">
      <div className="grid w-full max-w-[950px] grid-cols-3 rounded-[8px] border border-[#e2e3ee] bg-white py-4">
        <StatItem icon={<Package size={17} />} label="Products" value={productCount} />

        <StatItem icon={<UsersRound size={17} />} label="Companies" value={companyCount} border />

        <StatItem icon={<Search size={17} />} label="Monthly Searches" value={monthlySearches} border />
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

function StatItem({ icon, label, value, border = false }: StatItemProps) {
  return (
    <div className={`flex items-center justify-center gap-3 px-6 ${border ? "border-[#e4e5ee] border-l" : ""}`}>
      <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#f2f0ff] text-[#3425e3]">
        {icon}
      </div>

      <div>
        <p className="text-[#575c77] text-[9px]">{label}</p>

        <p className="mt-0.5 font-bold text-[#171570] text-[13px]">{value}</p>
      </div>
    </div>
  );
}
