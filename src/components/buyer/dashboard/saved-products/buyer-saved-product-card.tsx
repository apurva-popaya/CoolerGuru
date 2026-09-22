"use client";

import Image from "next/image";
import Link from "next/link";

import { Gauge, Heart, MapPin, Package, Settings, Trash2 } from "lucide-react";

import { useFavorites } from "@/context/favorites-context";
import type { DirectoryProduct } from "@/types/product-directory";

interface Props {
  product: DirectoryProduct;
}

export function BuyerSavedProductCard({ product }: Props) {
  const { toggleFavorite } = useFavorites();

  function handleRemove() {
    toggleFavorite({
      id: product.id,
      type: "product",
      title: product.name,
      image: product.image,
    });
  }

  return (
    <div className="relative flex min-w-0 flex-col rounded-[8px] border border-[#e1e2ec] bg-white p-3">
      <button
        type="button"
        onClick={handleRemove}
        title="Remove from saved products"
        className="absolute top-3 right-3 z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#fff0f3] transition hover:bg-[#ffe4e9]"
      >
        <Heart size={14} className="fill-[#ec3152] text-[#ec3152]" />
      </button>

      <div className="relative h-[135px] w-full">
        <Image src={product.image} alt={product.name} fill sizes="250px" className="object-contain" />
      </div>

      <h2 className="mt-2 min-h-[34px] font-bold text-[#171570] text-[11px] leading-[1.3]">{product.name}</h2>

      <p className="mt-1 font-semibold text-[#2920ba] text-[8px]">{product.company}</p>

      <div className="mt-1 flex items-center gap-1">
        <MapPin size={9} className="shrink-0 text-[#3125c8]" />

        <span className="text-[#666b82] text-[7px]">{product.location}</span>
      </div>

      <div className="mt-2">
        <span className="inline-flex rounded-[4px] bg-[#f0eeff] px-2 py-[4px] font-semibold text-[#2b20bf] text-[7px]">
          {product.category}
        </span>
      </div>

      <div className="mt-3 space-y-[5px]">
        {product.specs.map((spec, index) => (
          <div key={`${product.id}-${spec.label}`} className="flex items-start gap-1.5">
            <span className="mt-[1px] text-[#3127cb]">
              {index === 0 ? <Gauge size={9} /> : index === 1 ? <Package size={9} /> : <Settings size={9} />}
            </span>

            <p className="text-[#555b73] text-[7.5px] leading-[1.3]">
              <span className="font-semibold">{spec.label}:</span> {spec.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 border-[#ececf3] border-t pt-2">
        <p className="text-[#555b73] text-[7.5px]">
          <span className="font-semibold">MOQ:</span> {product.moq}
        </p>

        <p className="mt-1 font-bold text-[#2118ad] text-[11px]">{product.price}</p>
      </div>

      <div className="mt-auto pt-3">
        <Link
          href={`/products/${product.id}`}
          className="!text-white flex h-[32px] w-full items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[8px] transition hover:bg-[#3022c6]"
        >
          View Details
        </Link>

        <button
          type="button"
          onClick={handleRemove}
          className="mt-2 flex h-[32px] w-full items-center justify-center gap-1.5 rounded-[4px] border border-[#d9d8ef] bg-white font-bold text-[#271db6] text-[8px] transition hover:bg-[#f7f6ff]"
        >
          <Trash2 size={11} />
          Remove
        </button>
      </div>
    </div>
  );
}
