"use client";

import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";
import type { ProductDetail } from "@/types/product-detail";

const PRODUCT_PLACEHOLDER =
  "/images/product-placeholder.png";

export function ProductGallery({
  product,
}: {
  product: ProductDetail;
}) {
  const images =
    product.images.length > 0
      ? product.images
      : [PRODUCT_PLACEHOLDER];

  const [activeImage, setActiveImage] = useState(0);

  function previousImage() {
    setActiveImage((current) =>
      current === 0
        ? images.length - 1
        : current - 1,
    );
  }

  function nextImage() {
    setActiveImage((current) =>
      current === images.length - 1
        ? 0
        : current + 1,
    );
  }

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      {/* Main Image */}
      <div className="relative h-[250px] overflow-hidden rounded-[6px] bg-white sm:h-[310px]">
        {product.isVerifiedSupplier ? (
          <span className="absolute top-2 left-2 z-20 rounded-[3px] bg-[#159447] px-2 py-[3px] font-bold text-[7px] text-white">
            Verified Supplier
          </span>
        ) : null}

        <SafeImage
          src={images[activeImage]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 500px"
          className="object-contain p-4 sm:p-6"
        />

        {/* Previous */}
        {images.length > 1 ? (
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous product image"
            className="absolute top-1/2 left-2 z-20 flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full border border-[#e1e2ec] bg-white text-[#281cc4] shadow-sm transition hover:bg-[#f7f6ff]"
          >
            <ChevronLeft size={15} />
          </button>
        ) : null}

        {/* Next */}
        {images.length > 1 ? (
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next product image"
            className="absolute top-1/2 right-2 z-20 flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full border border-[#e1e2ec] bg-white text-[#281cc4] shadow-sm transition hover:bg-[#f7f6ff]"
          >
            <ChevronRight size={15} />
          </button>
        ) : null}
      </div>

      {/* Thumbnails */}
      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`View product image ${index + 1}`}
              className={`relative h-[55px] overflow-hidden rounded-[5px] border bg-white sm:h-[60px] ${
                activeImage === index
                  ? "border-[#3929df]"
                  : "border-[#e3e4ed]"
              }`}
            >
              <SafeImage
                src={image}
                alt={`${product.name} view ${index + 1}`}
                fill
                sizes="100px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}