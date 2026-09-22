import type { ElementType } from "react";

import { LockKeyhole } from "lucide-react";

interface OverviewStatCardProps {
  icon: ElementType;
  title: string;
  value: string | number;
  description: string;
  locked?: boolean;
}

export function OverviewStatCard({ icon: Icon, title, value, description, locked = false }: OverviewStatCardProps) {
  return (
    <div className="relative min-h-[145px] rounded-[10px] border border-[#e1e2ed] bg-white p-4">
      {locked && <LockKeyhole size={13} className="absolute top-4 right-4 text-[#8b8fa4]" />}

      <div className="flex items-center gap-3">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#f0eeff]">
          <Icon size={21} className="text-[#3124d4]" />
        </div>

        <p className="font-semibold text-[#313656] text-[11px]">{title}</p>
      </div>

      <p className="mt-3 font-bold text-[#171570] text-[24px]">{value}</p>

      <p className="mt-2 text-[#85899f] text-[10px] leading-[1.45]">{description}</p>
    </div>
  );
}
