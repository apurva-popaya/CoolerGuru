import Link from "next/link";

import { MapPin } from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";
import type { ProductDetailRelatedProduct } from "@/types/product-detail";

export function RelatedProducts({
  products,
}: {
  products: ProductDetailRelatedProduct[];
}) {
  if (!products.length) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="font-bold text-[#171570] text-[13px]">
          Related Products
        </h2>

        <Link
          href="/products"
          className="!text-[#2519c9] shrink-0 font-bold text-[8px]"
        >
          View All Products →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative grid min-h-[155px] grid-cols-[110px_1fr] gap-3 rounded-[7px] border border-[#e2e3ed] bg-white p-3 sm:grid-cols-[120px_1fr]"
          >
            {/* Status */}
            <div className="absolute top-2 left-2 z-10">
              {product.isPremium ? (
                <span className="rounded bg-[#ff6717] px-1.5 py-0.5 font-bold text-[6px] text-white">
                  Premium
                </span>
              ) : product.isVerified ? (
                <span className="rounded bg-[#159447] px-1.5 py-0.5 font-bold text-[6px] text-white">
                  Verified
                </span>
              ) : null}
            </div>

            {/* Image */}
            <div className="relative h-[105px]">
              <SafeImage
                src={product.image}
                alt={product.name}
                fill
                sizes="120px"
                className="object-contain"
              />
            </div>

            {/* Product Information */}
            <div className="min-w-0">
              <h3 className="font-bold text-[#171570] text-[9px] leading-[1.25]">
                {product.name}
              </h3>

              <p className="mt-1 truncate font-semibold text-[#2820bd] text-[7px]">
                {product.company}
              </p>

              <div className="mt-1 flex items-center gap-1">
                <MapPin
                  size={8}
                  className="shrink-0 text-[#3025c8]"
                />

                <span className="truncate text-[#666b82] text-[6px]">
                  {product.location}
                </span>
              </div>

              <div className="mt-2 space-y-[2px]">
                {product.specs.map((spec, index) => (
                  <p
                    key={`${product.id}-spec-${index}`}
                    className="text-[#555a76] text-[6.5px] leading-[1.3]"
                  >
                    • {spec}
                  </p>
                ))}
              </div>

              <p className="mt-2 font-bold text-[#2118ad] text-[7px]">
                {product.price}
              </p>
            </div>

            {/* Actions */}
            <div className="col-span-2 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
              <Link
                href={`/products/${product.slug ?? product.id}`}
                className="!text-white flex h-[27px] items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[7px] transition hover:bg-[#181080]"
              >
                View Details
              </Link>

              <Link
                href={`/products/${product.slug ?? product.id}/inquiry`}
                className="!text-[#251bb4] flex h-[27px] items-center justify-center rounded-[4px] border border-[#3829dc] font-bold text-[7px] transition hover:bg-[#f7f6ff]"
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}