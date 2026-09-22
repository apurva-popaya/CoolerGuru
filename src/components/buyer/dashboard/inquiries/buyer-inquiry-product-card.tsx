import Image from "next/image";
import Link from "next/link";

import { ExternalLink } from "lucide-react";

import type { BuyerInquiry } from "@/types/buyer-inquiry";

interface Props {
  inquiry: BuyerInquiry;
}

const PRODUCT_PLACEHOLDER = "/images/placeholders/product-placeholder.png";

function getProductImage(inquiry: BuyerInquiry) {
  const images = inquiry.product?.images ?? [];

  const primaryImage = images.find((image) => image.is_primary) ?? images[0];

  const imageUrl = primaryImage?.image_url;

  if (!imageUrl) {
    return PRODUCT_PLACEHOLDER;
  }

  /*
   * Current backend uses example.com placeholder
   * URLs, so don't pass them to next/image.
   */
  if (imageUrl.includes("example.com")) {
    return PRODUCT_PLACEHOLDER;
  }

  /*
   * Current frontend is guaranteed to support
   * local public images.
   *
   * Real S3/CDN domains can be enabled later
   * in next.config.ts.
   */
  if (imageUrl.startsWith("/")) {
    return imageUrl;
  }

  return PRODUCT_PLACEHOLDER;
}

export function BuyerInquiryProductCard({ inquiry }: Props) {
  const product = inquiry.product;

  if (!product) {
    return null;
  }

  const image = getProductImage(inquiry);

  return (
    <div className="rounded-[8px] border border-[#e1e2ed] bg-white p-4">
      <h2 className="font-bold text-[#171570] text-[11px]">Product Reference</h2>

      <div className="mt-3 grid grid-cols-[110px_1fr] items-center gap-4">
        <div className="relative h-[80px] w-[110px]">
          <Image src={image} alt={product.name} fill sizes="110px" className="object-contain" />
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-[#171570] text-[9px]">{product.name}</h3>

          {product.category?.name && (
            <p className="mt-1 font-semibold text-[#3025c6] text-[7px]">{product.category.name}</p>
          )}

          {product.short_description && (
            <p className="mt-2 text-[#60657d] text-[7px] leading-[1.45]">{product.short_description}</p>
          )}

          <Link
            href={`/products/${product.slug}`}
            className="!text-[#2519c9] mt-3 inline-flex items-center gap-1.5 font-bold text-[7px]"
          >
            View Product
            <ExternalLink size={9} />
          </Link>
        </div>
      </div>
    </div>
  );
}
