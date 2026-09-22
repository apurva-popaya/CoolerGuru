import { topCategoriesData } from "./analytics-data";

export function TopCategories() {
  const maximum = Math.max(...topCategoriesData.map((item) => item.value));

  return (
    <div className="h-[235px] rounded-[10px] border border-border bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-[#15136f] text-[15px]">Top Categories</h2>

        <button type="button" className="font-semibold text-[#2720a8] text-[11px]">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {topCategoriesData.map((category) => {
          const percentage = (category.value / maximum) * 100;

          return (
            <div key={category.name} className="grid grid-cols-[145px_1fr_45px] items-center gap-3">
              <span className="truncate text-[#5d6280] text-[11px]">{category.name}</span>

              <div className="h-[12px] overflow-hidden rounded-[3px] bg-[#edeef7]">
                <div
                  className="h-full rounded-[3px] bg-[#8b85f5]"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <span className="text-right text-[#5d6280] text-[10px]">{category.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
