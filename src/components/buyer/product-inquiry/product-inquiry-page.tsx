import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Container } from "@/components/common/container";
import type { ProductDetail } from "@/types/product-detail";

import { ProductInquiryForm } from "./product-inquiry-form";
import { ProductInquiryNextSteps } from "./product-inquiry-next-steps";
import { ProductInquirySummary } from "./product-inquiry-summary";

interface ProductInquiryPageProps {
  product: ProductDetail;
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

export function ProductInquiryPage({
  product,
}: ProductInquiryPageProps) {
  const categorySlug = slugify(product.category);

  return (
    <section className="bg-[#fdfdff] py-4 sm:py-6">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex min-w-max items-center gap-1.5 whitespace-nowrap font-medium text-[#555a76] text-[9px] sm:text-[10px]">
            <Link
              href="/"
              className="transition hover:text-[#2118ad]"
            >
              Home
            </Link>

            <ChevronRight
              size={12}
              className="shrink-0 text-[#777b92]"
            />

            <Link
              href="/products"
              className="transition hover:text-[#2118ad]"
            >
              Products
            </Link>

            <ChevronRight
              size={12}
              className="shrink-0 text-[#777b92]"
            />

            <Link
              href={`/products?category=${categorySlug}`}
              className="transition hover:text-[#2118ad]"
            >
              {product.category}
            </Link>

            <ChevronRight
              size={12}
              className="shrink-0 text-[#777b92]"
            />

            {/* Product URL should use slug */}
            <Link
              href={`/products/${product.slug}`}
              className="max-w-[180px] truncate transition hover:text-[#2118ad] sm:max-w-none"
            >
              {product.name}
            </Link>

            <ChevronRight
              size={12}
              className="shrink-0 text-[#777b92]"
            />

            <span className="font-semibold text-[#2118ad]">
              Send Inquiry
            </span>
          </div>
        </div>

        {/* Page Heading */}
        <div>
          <h1 className="max-w-[900px] font-bold text-[#171570] text-[22px] leading-[1.2] sm:text-[26px] lg:text-[30px]">
            Send Inquiry to {product.companyName}
          </h1>

          <p className="mt-1 max-w-[800px] text-[#4d526e] text-[9px] leading-[1.5] sm:text-[10px] lg:text-[11px]">
            Share your requirement for this product and the supplier will
            contact you with details.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_390px] lg:gap-6">
          {/* Form */}
          <ProductInquiryForm product={product} />

          {/* Sidebar */}
          <div className="space-y-4">
            <ProductInquirySummary product={product} />

            <ProductInquiryNextSteps />
          </div>
        </div>
      </Container>
    </section>
  );
}