import Link from "next/link";

import { LockKeyhole, Package } from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";

import type { SupplierProductSummary, VerificationStatus } from "./types";

interface ProductSummaryGridProps {
  products: SupplierProductSummary[];
  status: VerificationStatus;
  loading?: boolean;
}

export function ProductSummaryGrid({ products, status, loading = false }: ProductSummaryGridProps) {
  const unlocked = status === "VERIFIED";

  return (
    <section className="relative mt-5 overflow-hidden rounded-[10px] border border-[#e1e2ed] bg-white">
      <div className="flex items-center justify-between border-[#e6e7ef] border-b px-5 py-4">
        <div>
          <h2 className="font-bold text-[#171570] text-[18px]">Your Products</h2>

          <p className="mt-1 text-[#85899f] text-[9px]">Manage your recently added products.</p>
        </div>

        {unlocked ? (
          <Link
            href="/supplier/dashboard/products"
            className="!text-[#251bc1] flex h-[34px] items-center justify-center gap-2 rounded-[5px] border border-[#bdb7f4] px-4 font-bold text-[9px] transition hover:bg-[#f7f6ff]"
          >
            <Package size={12} />
            Manage Products
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="flex h-[34px] cursor-not-allowed items-center justify-center gap-2 rounded-[5px] border border-[#dedfe9] px-4 font-bold text-[#a5a8ba] text-[9px]"
          >
            <LockKeyhole size={12} />
            Manage Products
          </button>
        )}
      </div>

      {!unlocked ? (
        <div className="min-h-[200px]" />
      ) : loading ? (
        <div className="px-5 py-8 text-center text-[#85899f] text-[9px]">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p className="text-[#85899f] text-[9px]">You haven&apos;t added any products yet.</p>

          <Link
            href="/supplier/dashboard/products/add"
            className="!text-[#251bc1] mt-3 inline-flex h-[30px] items-center justify-center rounded-[5px] border border-[#bdb7f4] px-4 font-bold text-[9px] transition hover:bg-[#f7f6ff]"
          >
            Add Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 p-4">
          {products.map((product) => (
            <article key={product.slug} className="rounded-[8px] border border-[#e2e3ed] bg-white p-3">
              <div className="relative h-[125px] w-full">
                <SafeImage src={product.image} alt={product.title} fill sizes="250px" className="object-contain" />
              </div>

              <h3 className="mt-2 truncate font-semibold text-[#171570] text-[11px]" title={product.title}>
                {product.title}
              </h3>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[#70758e] text-[10px]">{product.units}</span>

                <Link
                  href={`/supplier/dashboard/products/${encodeURIComponent(product.slug)}/edit`}
                  className="!text-[#2b20bf] flex h-[26px] items-center justify-center rounded-[4px] border border-[#dcd9fa] px-3 font-semibold text-[9px]"
                >
                  Edit
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/35 backdrop-blur-[1px]">
          <div className="text-center">
            <div className="mx-auto flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#d9dbe8] bg-white shadow-sm">
              <LockKeyhole size={22} className="text-[#171570]" />
            </div>

            <h3 className="mt-3 font-bold text-[#171570] text-[12px]">Products available after verification</h3>

            <p className="mx-auto mt-1 max-w-[400px] text-[#565c79] text-[10px] leading-[1.5]">
              Complete your company verification to add and manage products.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
