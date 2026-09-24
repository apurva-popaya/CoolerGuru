import type { ApiProduct } from "@/lib/api/buyer-product-api";

import type { DirectoryProduct } from "@/types/product-directory";

function formatPrice(
  product: ApiProduct,
): string {
  const currency =
    product.currency === "INR"
      ? "₹"
      : product.currency;

  if (
    product.min_price &&
    product.max_price &&
    product.min_price !== product.max_price
  ) {
    return `${currency}${product.min_price} - ${currency}${product.max_price}/${product.price_unit ?? "Unit"}`;
  }

  if (product.price) {
    return `${currency}${product.price}/${product.price_unit ?? "Unit"}`;
  }

  if (product.min_price) {
    return `${currency}${product.min_price}/${product.price_unit ?? "Unit"}`;
  }

  return "Price on request";
}

function formatSpecificationValue(
  value: string,
  unit: string | null,
): string {
  return unit ? `${value} ${unit}` : value;
}

export function mapApiProductToDirectoryProduct(
  product: ApiProduct,
): DirectoryProduct {
  const specs =
    product.specifications
      ?.filter(
        (spec) => spec.value !== null && spec.value !== "",
      )
      .sort(
        (a, b) =>
          a.sort_order - b.sort_order,
      )
      .slice(0, 3)
      .map((spec) => ({
        label: spec.label,
        value: formatSpecificationValue(
          spec.value,
          spec.unit,
        ),
      })) ?? [];

  return {
    id: String(product.product_id),

    slug: product.slug,

    name: product.name,

    companyId:
      product.company.company_id !== undefined
        ? String(product.company.company_id)
        : "",

    company: product.company.name,

    location: [
      product.company.city,
      product.company.state,
    ]
      .filter(Boolean)
      .join(", ") || "-",

    image:
      product.primary_image?.image_url ??
      "/images/product-placeholder.png",

    category:
      product.category?.name ??
      product.product_type ??
      "-",

    categorySlug:
      product.category?.slug ?? "uncategorized",

    specs,

    moq:
      product.moq !== null
        ? `${product.moq} ${product.moq_unit ?? ""}`.trim()
        : "-",

    price: formatPrice(product),

    isVerified:
      product.company.verification_status ===
      "VERIFIED",

    /*
     * The current products API does not provide
     * an is_premium field.
     */
    isPremium: false,
  };
}