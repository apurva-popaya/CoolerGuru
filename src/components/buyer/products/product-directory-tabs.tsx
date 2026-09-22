"use client";

interface ProductTab {
  id: string;
  label: string;
}

interface ProductDirectoryTabsProps {
  tabs: ProductTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ProductDirectoryTabs({ tabs, activeTab, onTabChange }: ProductDirectoryTabsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-3 rounded-[8px] border border-[#e2e3ee] bg-white p-2">
      {tabs.map((tab) => {
        const active = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={
              active
                ? "flex h-[36px] min-w-[150px] flex-1 items-center justify-center rounded-[5px] bg-[#2116a5] px-3 font-bold text-[9px] text-white transition"
                : "flex h-[36px] min-w-[150px] flex-1 items-center justify-center rounded-[5px] border border-[#e4e5ed] bg-white px-3 font-bold text-[#2118ad] text-[9px] transition hover:bg-[#f6f5ff]"
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
