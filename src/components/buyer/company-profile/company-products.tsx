import Image from "next/image";
import Link from "next/link";

import type { CompanyProfileProduct } from "@/types/company-profile";

interface CompanyProductsProps {
  products: CompanyProfileProduct[];

  companyId: string;
}

export function CompanyProducts({ products, companyId }: CompanyProductsProps) {
  return (
    <div className="mt-4 rounded-[8px] border border-[#e2e3ee] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-[#171570] text-[14px]">Products from this Company</h2>

        <Link href={`/products?company=${companyId}`} className="!text-[#2519c9] font-bold text-[9px]">
          View All Products →
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col rounded-[7px] border border-[#e3e4ed] bg-white p-3">
            <div className="relative h-[115px] w-full">
              <Image src={product.image} alt={product.name} fill sizes="180px" className="object-contain" />
            </div>

            <h3 className="mt-2 font-bold text-[#17159a] text-[9px] leading-[1.3]">{product.name}</h3>

            <div className="mt-2 min-h-[42px] space-y-1 text-[#4e536e] text-[8px]">
              {product.airflow && <p>• Airflow: {product.airflow}</p>}

              {product.tank && <p>• Tank: {product.tank}</p>}

              {product.moq && <p>• MOQ: {product.moq}</p>}
            </div>

            <Link
              href={`/products/${product.id}?company=${companyId}`}
              className="!text-white mt-auto flex h-[28px] items-center justify-center rounded-[4px] bg-[#2116a5] font-bold text-[8px]"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
