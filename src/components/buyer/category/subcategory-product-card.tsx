"use client";

import Image from "next/image";
import Link from "next/link";

import { Heart, Container as TankIcon, Wind } from "lucide-react";

import { useFavorites } from "@/context/favorites-context";
import type { SubcategoryProduct } from "@/types/subcategory-detail";

interface SubcategoryProductCardProps {
  product: SubcategoryProduct;
}

export function SubcategoryProductCard({ product }: SubcategoryProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const liked = isFavorite(product.id, "product");

  return (
    <div className="relative flex min-w-0 flex-col rounded-[8px] border border-[#e1e2ec] bg-white p-3">
      <button
        type="button"
        aria-label={liked ? "Remove saved product" : "Save product"}
        onClick={() =>
          toggleFavorite({
            id: product.id,
            type: "product",
            title: product.name,
            image: product.image,
          })
        }
        className="absolute top-3 right-3 z-10 text-[#3829f2]"
      >
        <Heart size={16} className={liked ? "fill-[#3829f2]" : ""} />
      </button>

      <div className="relative h-[190px] w-full">
        <Image src={product.image} alt={product.name} fill sizes="300px" className="object-contain" />
      </div>

      <h3 className="mt-2 font-bold text-[#19149e] text-[12px] leading-[1.3]">{product.name}</h3>

      <p className="mt-1 font-medium text-[#575c76] text-[9px]">{product.company}</p>

      <div className="mt-3 flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <Wind size={12} className="text-[#2b20d4]" />

          <span className="text-[#454b6b] text-[9px]">{product.airflow}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <TankIcon size={12} className="text-[#2b20d4]" />

          <span className="text-[#454b6b] text-[9px]">{product.tank}</span>
        </div>
      </div>

      <Link
        href={`/products/${product.id}`}
        className="mt-4 flex h-[34px] items-center justify-center rounded-[4px] border border-[#3b2ce2] font-bold text-[#251bb5] text-[9px] transition hover:bg-[#f5f4ff]"
      >
        View Details
      </Link>
    </div>
  );
}
