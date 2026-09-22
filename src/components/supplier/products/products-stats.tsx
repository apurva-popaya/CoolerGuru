import { CheckCircle2, CirclePause, Package, PackageX } from "lucide-react";

interface Props {
  total: number;
  active: number;
  inactive: number;
  outOfStock: number;
}

export function ProductsStats({ total, active, inactive, outOfStock }: Props) {
  const items = [
    {
      label: "Total Products",
      value: total,
      description: "All products in your catalog",
      icon: Package,
      iconClass: "bg-[#f0eeff] text-[#3124d4]",
    },
    {
      label: "Active Products",
      value: active,
      description: "Products visible to buyers",
      icon: CheckCircle2,
      iconClass: "bg-[#eaf8ef] text-[#149340]",
    },
    {
      label: "Inactive Products",
      value: inactive,
      description: "Products currently inactive",
      icon: CirclePause,
      iconClass: "bg-[#fff4df] text-[#e18a18]",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      description: "Products out of stock",
      icon: PackageX,
      iconClass: "bg-[#fff0f3] text-[#e13b58]",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className="min-h-[140px] rounded-[9px] border border-[#e1e2ed] bg-white p-5">
            <div className="flex items-center gap-3">
              <div className={`flex h-[42px] w-[42px] items-center justify-center rounded-full ${item.iconClass}`}>
                <Icon size={19} />
              </div>

              <p className="font-semibold text-[#313656] text-[10px]">{item.label}</p>
            </div>

            <p className="mt-3 font-bold text-[#171570] text-[24px]">{item.value}</p>

            <p className="mt-2 text-[#85899f] text-[9px]">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}
