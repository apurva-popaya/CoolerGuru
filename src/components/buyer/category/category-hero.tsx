import Image from "next/image";

import { Factory, LayoutGrid } from "lucide-react";

interface CategoryHeroProps {
  title: string;
  image: string;
  description: string;
  count: number;
}

export function CategoryHero({ title, image, description, count }: CategoryHeroProps) {
  return (
    <div className="relative mt-4 min-h-[112px] overflow-hidden rounded-[10px] border border-[#dedff0] bg-gradient-to-r from-[#f1efff] via-white to-[#fafaff]">
      <div className="grid min-h-[112px] grid-cols-[310px_1fr_auto] items-center gap-5 px-5">
        <div className="relative h-[105px] w-[300px] self-end">
          <Image src={image} alt={title} fill priority sizes="300px" className="object-contain object-bottom" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#eeeaff] text-[#3927e5]">
            <Factory size={23} />
          </div>

          <div>
            <h2 className="font-bold text-[#2019ab] text-[14px]">{title}</h2>

            <p className="mt-1 max-w-[350px] text-[#4b5070] text-[10px] leading-[1.45]">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-full bg-[#f0edff] px-5 py-3 text-[#2118ad]">
          <LayoutGrid size={18} />

          <span className="font-bold text-[10px]">{count} Subcategories</span>
        </div>
      </div>
    </div>
  );
}
