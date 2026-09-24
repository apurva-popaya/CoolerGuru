"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Container as TankIcon,
  Wind,
} from "lucide-react";

import { FavoriteButton } from "@/components/common/favorite-button";
import type { SubcategoryProduct } from "@/types/subcategory-detail";

interface SubcategoryProductCardProps {
  product: SubcategoryProduct;
}

export function SubcategoryProductCard({
  product,
}: SubcategoryProductCardProps) {
  return (
    <div className="relative flex min-w-0 flex-col rounded-[8px] border border-[#e1e2ec] bg-white p-3">
      <FavoriteButton
        id={String(product.productId)}
        type="product"
        title={product.name}
        image={product.image}
      />

      <div className="relative h-[170px] w-full sm:h-[180px] lg:h-[190px]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          className="object-contain"
        />
      </div>

      <h3 className="mt-2 font-bold text-[#19149e] text-[11px] leading-[1.3] sm:text-[12px]">
        {product.name}
      </h3>

      <p className="mt-1 truncate font-medium text-[#575c76] text-[8px] sm:text-[9px]">
        {product.company}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-1.5">
          <Wind
            size={12}
            className="text-[#2b20d4]"
          />

          <span className="text-[#454b6b] text-[8px] sm:text-[9px]">
            {product.airflow}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <TankIcon
            size={12}
            className="text-[#2b20d4]"
          />

          <span className="text-[#454b6b] text-[8px] sm:text-[9px]">
            {product.tank}
          </span>
        </div>
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="mt-4 flex h-[34px] items-center justify-center rounded-[4px] border border-[#3b2ce2] font-bold text-[#251bb5] text-[9px] transition hover:bg-[#f5f4ff]"
      >
        View Details
      </Link>
    </div>
  );
}