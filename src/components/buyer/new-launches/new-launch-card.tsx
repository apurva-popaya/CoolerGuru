"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Heart, MapPin } from "lucide-react";

import type { NewLaunchProduct } from "@/types/new-launch";

interface NewLaunchCardProps {
  product: NewLaunchProduct;
}

export function NewLaunchCard({ product }: NewLaunchCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="relative flex min-w-0 flex-col rounded-[8px] border border-[#e1e2ec] bg-white p-3">
      {product.isNew ? (
        <span className="absolute top-3 left-3 z-10 rounded-[3px] bg-[#0a9d32] px-2 py-[3px] font-bold text-[7px] text-white uppercase">
          New
        </span>
      ) : null}

      <button
        type="button"
        aria-label={saved ? "Remove from saved products" : "Save product"}
        onClick={() => setSaved((current) => !current)}
        className="absolute top-3 right-3 z-10 text-[#27227e] transition hover:text-[#3424e3]"
      >
        <Heart size={15} strokeWidth={1.8} className={saved ? "fill-[#3025cf] text-[#3025cf]" : ""} />
      </button>

      <div className="relative h-[135px] w-full">
        <Image src={product.image} alt={product.name} fill sizes="220px" className="object-contain" />
      </div>

      <h2 className="mt-2 min-h-[34px] font-bold text-[#171570] text-[10px] leading-[1.25]">{product.name}</h2>

      <p className="mt-1 truncate font-medium text-[#454a67] text-[8px]">{product.company}</p>

      <div className="mt-2 flex items-center gap-1.5">
        <MapPin size={9} className="shrink-0 text-[#3025cf]" />

        <span className="truncate text-[#656a82] text-[7px]">{product.location}</span>
      </div>

      <Link
        href={`/products/${product.productId}`}
        className="!text-[#251bb4] mt-4 flex h-[31px] items-center justify-center rounded-[4px] border border-[#3b2ce2] bg-white pt-[1px] font-bold text-[8px] transition hover:bg-[#f6f5ff]"
      >
        View Details
      </Link>
    </div>
  );
}
