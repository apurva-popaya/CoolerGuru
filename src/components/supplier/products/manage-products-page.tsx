import Link from "next/link";

import { Plus } from "lucide-react";

import { supplierProducts } from "@/data/supplier-products";

import { ProductsStats } from "./products-stats";
import { ProductsTable } from "./products-table";

export function SupplierManageProductsPage() {
  const totalProducts = supplierProducts.length;

  const activeProducts = supplierProducts.filter((product) => product.status === "ACTIVE").length;

  const inactiveProducts = supplierProducts.filter((product) => product.status === "INACTIVE").length;

  const outOfStockProducts = supplierProducts.filter((product) => product.stockStatus === "OUT_OF_STOCK").length;

  return (
    <section className="px-7 py-6">
      <div className="mb-5 flex items-start justify-between gap-5">
        <div>
          <h1 className="font-bold text-[#171570] text-[28px]">Manage Products</h1>

          <p className="mt-1 text-[#555b76] text-[11px]">
            Manage your products, edit details and keep your catalog updated.
          </p>
        </div>

        <Link
          href="/supplier/dashboard/products/add"
          className="!text-white flex h-[40px] items-center justify-center gap-2 rounded-[6px] bg-[#2619bd] px-5 font-bold text-[10px] transition hover:bg-[#3325db]"
        >
          <Plus size={14} />
          Add New Product
        </Link>
      </div>

      <ProductsStats
        total={totalProducts}
        active={activeProducts}
        inactive={inactiveProducts}
        outOfStock={outOfStockProducts}
      />

      <ProductsTable products={supplierProducts} />
    </section>
  );
}
