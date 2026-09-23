import Image from "next/image";

import { Factory, LayoutGrid } from "lucide-react";

interface CategoryHeroProps {
  title: string;
  image: string;
  description: string;
  count: number;
}

export function CategoryHero({
  title,
  image,
  description,
  count,
}: CategoryHeroProps) {
  return (
    <div className="relative mt-4 overflow-hidden rounded-[10px] border border-[#dedff0] bg-gradient-to-r from-[#f1efff] via-white to-[#fafaff]">
      <div className="grid grid-cols-1 items-center gap-3 p-3 sm:grid-cols-[200px_1fr] sm:gap-4 sm:p-4 lg:grid-cols-[250px_1fr_auto] lg:gap-5 lg:px-5 lg:py-2">
        {/* Image */}
        <div className="relative mx-auto h-[120px] w-full max-w-[220px] sm:h-[110px] sm:max-w-[200px] lg:h-[105px] lg:w-[250px] lg:max-w-none">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="(max-width: 640px) 220px, (max-width: 1024px) 200px, 250px"
            className="object-contain object-center sm:object-bottom"
          />
        </div>

        {/* Description */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#eeeaff] text-[#3927e5] sm:h-[46px] sm:w-[46px]">
            <Factory size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="font-bold text-[#2019ab] text-[13px] sm:text-[14px]">
              {title}
            </h2>

            <p className="mt-1 max-w-[450px] text-[#4b5070] text-[9px] leading-[1.5] sm:text-[10px]">
              {description}
            </p>
          </div>
        </div>

        {/* Count */}
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-[#f0edff] px-4 py-2.5 text-[#2118ad] sm:mx-0 sm:px-4 lg:px-5 lg:py-3">
          <LayoutGrid size={16} />

          <span className="font-bold text-[9px] sm:text-[10px]">
            {count} Subcategories
          </span>
        </div>
      </div>
    </div>
  );
}