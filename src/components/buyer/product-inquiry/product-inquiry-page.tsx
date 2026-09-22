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

export function ProductInquiryPage({ product }: ProductInquiryPageProps) {
  const categorySlug = slugify(product.category);

  return (
    <section className="bg-[#fdfdff] py-6">
      <Container>
        <div className="mb-4 flex items-center gap-1.5 font-medium text-[#555a76] text-[10px]">
          <Link href="/" className="transition hover:text-[#2118ad]">
            Home
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          <Link href="/products" className="transition hover:text-[#2118ad]">
            Products
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          <Link href={`/products?category=${categorySlug}`} className="transition hover:text-[#2118ad]">
            {product.category}
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          <Link href={`/products/${product.id}`} className="transition hover:text-[#2118ad]">
            {product.name}
          </Link>

          <ChevronRight size={12} className="text-[#777b92]" />

          <span className="font-semibold text-[#2118ad]">Send Inquiry</span>
        </div>

        <div>
          <h1 className="font-bold text-[#171570] text-[30px] leading-tight">Send Inquiry to {product.companyName}</h1>

          <p className="mt-1 text-[#4d526e] text-[11px]">
            Share your requirement for this product and the supplier will contact you with details.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_390px] items-start gap-6">
          <ProductInquiryForm product={product} />

          <div className="space-y-4">
            <ProductInquirySummary product={product} />

            <ProductInquiryNextSteps />
          </div>
        </div>
      </Container>
    </section>
  );
}
