"use client";

import { SafeImage } from "@/components/common/safe-image";
import Link from "next/link";

import {
  Gauge,
  Heart,
  MapPin,
  Package,
  Settings,
  Trash2,
} from "lucide-react";

import {
  removeSavedProduct,
  type SavedProduct,
} from "@/lib/api/buyer-saved-api";

interface Props {
  product: SavedProduct;
  onRemoved?: (productId: number) => void;
}

export function BuyerSavedProductCard({
  product,
  onRemoved,
}: Props) {
  const image =
    product.images?.[0]?.image_url || "/images/placeholder-product.png";

  const companyName =
    product.company?.name || product.brand || "Unknown Supplier";

  const location = [
    product.company?.city,
    product.company?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const specifications = [
    product.airflow
      ? { label: "Airflow", value: product.airflow }
      : null,

    product.tank_capacity
      ? {
          label: "Tank Capacity",
          value: product.tank_capacity,
        }
      : null,

    product.power
      ? { label: "Power", value: product.power }
      : null,
  ].filter(
    (
      item,
    ): item is { label: string; value: string } =>
      Boolean(item),
  );

  async function handleRemove() {
    try {
      await removeSavedProduct(product.product_id);

      onRemoved?.(product.product_id);
    } catch (error) {
      console.error(
        "Failed to remove saved product:",
        error,
      );
    }
  }

  return (
    <div className="relative flex min-w-0 flex-col rounded-xl border border-[#e1e2ec] bg-white p-3">
      {/* Remove icon */}
      <button
        type="button"
        onClick={handleRemove}
        title="Remove from saved products"
        className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#fff0f3] transition hover:bg-[#ffe4e9]"
      >
        <Heart
          size={14}
          className="fill-[#ec3152] text-[#ec3152]"
        />
      </button>

      {/* Product image */}
      <div className="relative h-[150px] w-full sm:h-[135px]">
        <SafeImage
          src={image}
          alt={product.images?.[0]?.alt_text || product.name}
          fill
          sizes="(max-width: 479px) 90vw, (max-width: 1023px) 45vw, 250px"
          className="object-contain"
        />
      </div>

      {/* Product name */}
      <h2 className="mt-2 min-h-[34px] font-bold text-[#171570] text-[11px] leading-[1.3]">
        {product.name || "Unnamed Product"}
      </h2>

      {/* Company */}
      <p className="mt-1 truncate font-semibold text-[#2920ba] text-[8px]">
        {companyName}
      </p>

      {/* Location */}
      {location && (
        <div className="mt-1 flex min-w-0 items-center gap-1">
          <MapPin
            size={9}
            className="shrink-0 text-[#3125c8]"
          />

          <span className="truncate text-[#666b82] text-[7px]">
            {location}
          </span>
        </div>
      )}

      {/* Category */}
      {product.category && (
        <div className="mt-2">
          <span className="inline-flex max-w-full truncate rounded-lg bg-[#f0eeff] px-2 py-1 font-semibold text-[#2b20bf] text-[7px]">
            {product.category.name}
          </span>
        </div>
      )}

      {/* Specifications */}
      {specifications.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {specifications.map((spec, index) => (
            <div
              key={`${product.product_id}-${spec.label}`}
              className="flex min-w-0 items-start gap-1.5"
            >
              <span className="mt-px shrink-0 text-[#3127cb]">
                {index === 0 ? (
                  <Gauge size={9} />
                ) : index === 1 ? (
                  <Package size={9} />
                ) : (
                  <Settings size={9} />
                )}
              </span>

              <p className="min-w-0 text-[#555b73] text-[7.5px] leading-[1.3]">
                <span className="font-semibold">
                  {spec.label}:
                </span>{" "}
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Price */}
      <div className="mt-3 border-[#ececf3] border-t pt-2">
        {product.moq !== null && (
          <p className="text-[#555b73] text-[7.5px]">
            <span className="font-semibold">MOQ:</span>{" "}
            {product.moq} {product.moq_unit}
          </p>
        )}

        {product.price && (
          <p className="mt-1 font-bold text-[#2118ad] text-[11px]">
            ₹{Number(product.price).toLocaleString("en-IN")}
            {product.price_unit
              ? ` / ${product.price_unit}`
              : ""}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto pt-3">
        <Link
          href={`/products/${product.slug || product.product_id}`}
          className="!text-white flex h-8 w-full items-center justify-center rounded-lg bg-[#2116a5] font-bold text-[8px] transition hover:bg-[#3022c6]"
        >
          View Details
        </Link>

        <button
          type="button"
          onClick={handleRemove}
          className="mt-2 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-[#d9d8ef] bg-white font-bold text-[#271db6] text-[8px] transition hover:bg-[#f7f6ff]"
        >
          <Trash2 size={11} />
          Remove
        </button>
      </div>
    </div>
  );
}