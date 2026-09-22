import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import type { CategorySubcategory } from "@/types/category-detail";

interface SubcategoryCardProps {
  subcategory: CategorySubcategory;
}

export function SubcategoryCard({ subcategory }: SubcategoryCardProps) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-[8px] border border-[#e0e1ed] bg-white transition duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(32,25,150,0.08)]">
      <div className="relative h-[118px] w-full overflow-hidden bg-[#f7f7fa]">
        <Image
          src={subcategory.image}
          alt={subcategory.title}
          fill
          sizes="220px"
          className="object-cover transition duration-300 hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col px-3 pt-2.5 pb-3">
        <h3 className="font-bold text-[#19149e] text-[12px] leading-tight">{subcategory.title}</h3>

        <p className="mt-1 min-h-[34px] text-[#545970] text-[9px] leading-[1.45]">{subcategory.description}</p>

        <Link
          href={subcategory.href}
          className="mt-auto inline-flex items-center gap-2 pt-2 font-bold text-[#2519d5] text-[9px] transition hover:text-[#4436ef]"
        >
          Explore Category
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
