"use client";

export type CompanyTab =
  | "all"
  | "verified"
  | "premium"
  | "manufacturers"
  | "suppliers"
  | "exporters";

interface CompanyTabItem {
  id: CompanyTab;
  label: string;
  count?: number;
}

interface CompanyTabsProps {
  activeTab: CompanyTab;
  onTabChange: (tab: CompanyTab) => void;
  totalCompanies?: number;
}

export function CompanyTabs({
  activeTab,
  onTabChange,
  totalCompanies,
}: CompanyTabsProps) {
  const tabs: CompanyTabItem[] = [
    {
      id: "all",
      label: "All Companies",
      count: totalCompanies,
    },
    {
      id: "verified",
      label: "Verified",
    },
    {
      id: "premium",
      label: "Premium",
    },
    {
      id: "manufacturers",
      label: "Manufacturers",
    },
    {
      id: "suppliers",
      label: "Suppliers",
    },
    {
      id: "exporters",
      label: "Exporters",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-[8px] border border-[#e3e4ef] bg-white p-2 scrollbar-none">
      <div className="grid min-w-[650px] grid-cols-6">
        {tabs.map((tab, index) => {
          const active =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                onTabChange(tab.id)
              }
              className={`relative flex h-[36px] items-center justify-center gap-2 rounded-[5px] px-3 font-bold text-[9px] transition sm:text-[10px] ${
                active
                  ? "bg-[#2116a5] text-white"
                  : "text-[#201b8a] hover:bg-[#f7f6ff]"
              }`}
            >
              {index !== 0 && !active && (
                <span className="absolute top-1/2 -left-[1px] h-[18px] w-px -translate-y-1/2 bg-[#e4e4ef]" />
              )}

              <span className="whitespace-nowrap">
                {tab.label}
              </span>

              {tab.count !== undefined && (
                <span
                  className={`rounded px-1.5 py-0.5 text-[8px] ${
                    active
                      ? "bg-white/15 text-white"
                      : "bg-[#f0efff] text-[#5046b4]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}