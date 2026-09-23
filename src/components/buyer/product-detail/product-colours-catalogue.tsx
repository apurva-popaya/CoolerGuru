import Image from "next/image";
import Link from "next/link";

import { Download, FileText, Play } from "lucide-react";

import type { ProductDetail } from "@/types/product-detail";

export function ProductColoursCatalogue({ product }: { product: ProductDetail }) {
  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[11px]">Available Colours</h2>

      <div className="mt-3 flex flex-wrap items-start gap-4 sm:gap-5">
        {product.colours.map((colour) => (
          <div key={colour.name} className="text-center">
            <div
              className={`h-[24px] w-[24px] rounded-full border border-[#353a60] ${colour.className}`}
            />

            <p className="mt-1 text-[#555a76] text-[7px]">{colour.name}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-4 border-[#ececf3] border-t pt-3 font-bold text-[#171570] text-[11px]">
        Video & Catalogue
      </h2>

      <div className="mt-2 grid grid-cols-1 gap-2 min-[420px]:grid-cols-[1.1fr_0.9fr]">
        <Link
          href={product.videoUrl}
          className="relative h-[110px] overflow-hidden rounded-[5px] border border-[#e2e3ee] min-[420px]:h-[70px]"
        >
          <Image
            src={product.videoThumbnail}
            alt={`${product.name} video`}
            fill
            sizes="(max-width: 420px) 100vw, 170px"
            className="object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/15">
            <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-black/65 text-white">
              <Play size={13} fill="currentColor" />
            </div>
          </div>
        </Link>

        <div className="flex min-w-0 items-center gap-2 rounded-[5px] border border-[#e2e3ee] p-2">
          <FileText size={24} className="shrink-0 text-[#4334dc]" />

          <div className="min-w-0 flex-1">
            <p className="truncate font-bold text-[#262174] text-[7px]">
              {product.catalogueTitle}
            </p>

            <p className="mt-0.5 text-[#777b90] text-[6px]">
              {product.catalogueSize}
            </p>

            <Link
              href={product.catalogueUrl}
              className="!text-[#2518c6] mt-1 flex items-center gap-1 font-bold text-[6px]"
            >
              Download
              <Download size={8} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}