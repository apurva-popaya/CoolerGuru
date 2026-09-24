import { SafeImage } from "@/components/common/safe-image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { HorizontalCarousel } from "@/components/common/horizontal-carousel";
import { SectionHeader } from "@/components/common/section-header";
import {
  getProducts,
  type ApiProduct,
} from "@/lib/api/buyer-product-api";

interface ProductsByCategoryProps {
  products?: ApiProduct[];
}

export async function ProductsByCategory({
  products: initialProducts,
}: ProductsByCategoryProps) {
  let products = initialProducts ?? [];

  /*
   * Fetch real products when products are not supplied
   * by the parent.
   */
  if (products.length === 0) {
    try {
      const response = await getProducts(1, 6);

      products = response.data.products ?? [];
    } catch (error) {
      console.error("Failed to fetch homepage products:", error);
      products = [];
    }
  }

  return (
    <section className="bg-white py-4 sm:py-5">
      <Container>
        <SectionHeader
          title="Popular Products & Suppliers"
          viewAllLabel="View All Products"
          viewAllHref="/products"
          className="mb-4 sm:mb-5"
        />

        {products.length > 0 ? (
          <HorizontalCarousel scrollAmount={290} className="gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
              />
            ))}
          </HorizontalCarousel>
        ) : (
          <div className="rounded-[10px] border border-[#e5e6ef] py-10 text-center">
            <p className="text-[#555a76] text-sm">
              No products available at the moment.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: ApiProduct;
}) {
  const specifications =
    product.specifications
      ?.filter(
        (spec) =>
          spec.value !== null &&
          spec.value !== "",
      )
      .sort(
        (a, b) =>
          a.sort_order - b.sort_order,
      )
      .slice(0, 5) ?? [];

  const image =
    product.primary_image?.image_url ??
    "/images/product-placeholder.png";

  const price = getPrice(product);

  return (
    <div className="flex min-h-[330px] min-w-[255px] max-w-[255px] shrink-0 flex-col rounded-[10px] border border-[#e5e6ef] bg-white px-4 pt-4 pb-4">
      <h3 className="font-bold text-[#17159a] text-[15px] leading-[1.25]">
        {product.name}
      </h3>

      <div className="mt-3 grid grid-cols-[1fr_115px] gap-2">
        <div className="space-y-[9px] pt-2">
          {specifications.map((spec) => (
            <p
              key={`${spec.key}-${spec.label}`}
              className="text-[#292e4d] text-[10px] leading-[1.3]"
            >
              <span className="font-bold">
                {spec.label}:
              </span>{" "}
              <span className="font-semibold">
                {spec.value}
                {spec.unit ? ` ${spec.unit}` : ""}
              </span>
            </p>
          ))}
        </div>

        <div className="relative h-[190px] w-[115px] self-start">
          <SafeImage
            src={image}
            alt={product.primary_image?.alt_text ?? product.name}
            fill
            sizes="115px"
            className="object-contain object-center"
          />
        </div>
      </div>

      <p className="mt-2 font-bold text-[#2720bf] text-[10px]">
        {price}
      </p>

      <Link
        href={`/products/${product.slug}`}
        className="mt-auto flex h-[38px] w-full items-center justify-center gap-4 rounded-[5px] border border-[#4938ee] bg-white font-bold text-[#251bb4] text-[11px] transition hover:bg-[#f6f5ff]"
      >
        View Product
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function getPrice(product: ApiProduct): string {
  const currency =
    product.currency === "INR"
      ? "₹"
      : product.currency;

  if (
    product.min_price &&
    product.max_price &&
    product.min_price !== product.max_price
  ) {
    return `${currency}${product.min_price} - ${currency}${product.max_price}`;
  }

  if (product.price) {
    return `${currency}${product.price}`;
  }

  if (product.min_price) {
    return `${currency}${product.min_price}`;
  }

  return "Price on request";
}