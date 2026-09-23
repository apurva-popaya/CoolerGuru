import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Container } from "@/components/common/container";
import type { ProductDetail } from "@/types/product-detail";

import { ProductColoursCatalogue } from "./product-colours-catalogue";
import { ProductGallery } from "./product-gallery";
import { ProductMainInfo } from "./product-main-info";
import { ProductNextSteps } from "./product-next-steps";
import { ProductOverview } from "./product-overview";
import { ProductSpecifications } from "./product-specifications";
import { ProductSupplierCard } from "./product-supplier-card";
import { RelatedProducts } from "./related-products";

interface ProductDetailPageProps {
  product: ProductDetail;
  companyId?: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export function ProductDetailPage({ product, companyId }: ProductDetailPageProps) {
  const categorySlug = slugify(product.category);

  const hasCompanyContext = Boolean(companyId);

  return (
    <section className="bg-white pt-3 pb-5 sm:pt-4">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-3 flex flex-wrap items-center gap-1.5 font-medium text-[#555a76] text-[9px] sm:text-[10px]">
          <Link href="/" className="transition hover:text-[#2118ad]">
            Home
          </Link>

          <ChevronRight size={11} />

          {hasCompanyContext ? (
            <>
              <Link
                href="/companies"
                className="transition hover:text-[#2118ad]"
              >
                Companies
              </Link>

              <ChevronRight size={11} />

              <Link
                href={`/companies/${product.companyId}`}
                className="max-w-[150px] truncate transition hover:text-[#2118ad] sm:max-w-none"
              >
                {product.companyName}
              </Link>

              <ChevronRight size={11} />

              <Link
                href={`/products?company=${product.companyId}`}
                className="transition hover:text-[#2118ad]"
              >
                Products
              </Link>

              <ChevronRight size={11} />
            </>
          ) : (
            <>
              <Link
                href="/products"
                className="transition hover:text-[#2118ad]"
              >
                Products
              </Link>

              <ChevronRight size={11} />
            </>
          )}

          <Link
            href={`/products?category=${categorySlug}`}
            className="max-w-[130px] truncate transition hover:text-[#2118ad] sm:max-w-none"
          >
            {product.category}
          </Link>

          <ChevronRight size={11} />

          <span className="max-w-[180px] truncate font-semibold text-[#2118ad] sm:max-w-none">
            {product.name}
          </span>
        </div>

        {/* Gallery + Main Info */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,500px)_minmax(0,1fr)] lg:gap-5">
          <ProductGallery product={product} />

          <ProductMainInfo product={product} />
        </div>

        {/* Overview / Specifications / Colours */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.05fr_1.2fr_0.85fr]">
          <ProductOverview product={product} />

          <ProductSpecifications product={product} />

          <ProductColoursCatalogue product={product} />
        </div>

        {/* Supplier */}
        <ProductSupplierCard product={product} />

        {/* Related Products */}
        <RelatedProducts products={product.relatedProducts} />

        {/* Next Steps */}
        <ProductNextSteps />
      </Container>
    </section>
  );
}