interface SubcategoryTabsProps {
  productCount: string;
  companyCount: string;
  activeTab: "products" | "companies";
  onTabChange: (tab: "products" | "companies") => void;
}

export function SubcategoryTabs({
  productCount,
  companyCount,
  activeTab,
  onTabChange,
}: SubcategoryTabsProps) {
  return (
    <div className="flex w-full justify-center border-[#e2e3ee] border-b">
      <TabButton
        active={activeTab === "products"}
        onClick={() => onTabChange("products")}
      >
        Products ({productCount.replace("+", "")})
      </TabButton>

      <TabButton
        active={activeTab === "companies"}
        onClick={() => onTabChange("companies")}
      >
        Companies ({companyCount.replace("+", "")})
      </TabButton>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-0 flex-1 px-3 pt-2 pb-3 font-bold text-[9px] transition sm:min-w-[150px] sm:px-8 sm:text-[11px] ${
        active
          ? "border-[#3324ed] border-b-2 text-[#2118b7]"
          : "text-[#17176e]"
      }`}
    >
      {children}
    </button>
  );
}