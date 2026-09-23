import { SafeImage } from "@/components/common/safe-image";
import Link from "next/link";

import type { CompanyProfileProduct } from "@/types/company-profile";

interface CompanyProductsProps {
  products: CompanyProfileProduct[];
  companyId: string;
}

export function CompanyProducts({
  products,
  companyId,
}: CompanyProductsProps) {
  // Don't render the section if the company has no products.
  if (!products.length) {
    return null;
  }

  return (
    <div className="mt-4 rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-bold text-[#171570] text-[13px] sm:text-[14px]">
          Products from this Company
        </h2>

        <Link
          href={`/products?company=${encodeURIComponent(companyId)}`}
          className="!text-[#2519c9] self-start font-bold text-[8px] sm:text-[9px]"
        >
          View All Products →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex min-w-0 flex-col rounded-[7px] border border-[#e3e4ed] bg-white p-3"
          >
            <div className="relative h-[150px] w-full sm:h-[130px] lg:h-[115px]">
              {product.image ? (
                <SafeImage
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 180px"
  className="object-contain"
/>
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-[5px] bg-[#f7f7fc] text-[#8a8da1] text-[8px]">
                  No Image
                </div>
              )}
            </div>

            <h3 className="mt-2 break-words font-bold text-[#17159a] text-[9px] leading-[1.3]">
              {product.name}
            </h3>

            <div className="mt-2 min-h-[42px] space-y-1 text-[#4e536e] text-[8px]">
              {product.airflow && (
                <p>• Airflow: {product.airflow}</p>
              )}

              {product.tank && (
                <p>• Tank: {product.tank}</p>
              )}

              {product.moq && (
                <p>• MOQ: {product.moq}</p>
              )}
            </div>

            <Link
              href={`/products/${product.slug}?company=${encodeURIComponent(companyId)}`}
              className="!text-white mt-3 flex h-[30px] items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[8px] transition hover:bg-[#3022c6]"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}