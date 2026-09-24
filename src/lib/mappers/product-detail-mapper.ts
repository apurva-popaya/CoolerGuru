import type {
  ApiProduct,
  ApiProductDetail,
  ApiProductImage,
} from "@/lib/api/buyer-product-api";

import type {
  ProductDetail,
  ProductDetailColour,
  ProductDetailRelatedProduct,
  ProductDetailSpecification,
} from "@/types/product-detail";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatPrice(
  product: ApiProduct | ApiProductDetail,
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

function formatSpecificationValue(
  value: string | null,
  unit?: string | null,
): string {
  if (!value) {
    return "-";
  }

  return unit
    ? `${value} ${unit}`
    : value;
}

function getLocation(
  city: string | null,
  state: string | null,
): string {
  return (
    [city, state]
      .filter(Boolean)
      .join(", ") || "-"
  );
}

function getCompanyYears(
  yearsInBusiness: string | null,
): string {
  return yearsInBusiness || "-";
}

/* -------------------------------------------------------------------------- */
/* Colour mapping                                                             */
/* -------------------------------------------------------------------------- */

function getColourClass(
  colour: string,
): string {
  const normalized = colour
    .toLowerCase()
    .trim();

  const colourMap: Record<string, string> = {
    white: "bg-white border-[#d9d9d9]",
    black: "bg-black border-black",
    grey: "bg-gray-500 border-gray-500",
    gray: "bg-gray-500 border-gray-500",
    red: "bg-red-500 border-red-500",
    blue: "bg-blue-500 border-blue-500",
    green: "bg-green-500 border-green-500",
    yellow: "bg-yellow-400 border-yellow-400",
    orange: "bg-orange-500 border-orange-500",
    brown: "bg-amber-800 border-amber-800",
    silver: "bg-gray-300 border-gray-300",
    golden: "bg-yellow-500 border-yellow-500",
    gold: "bg-yellow-500 border-yellow-500",
  };

  return (
    colourMap[normalized] ??
    "bg-gray-300 border-gray-300"
  );
}

function mapColours(
  colours: string[],
): ProductDetailColour[] {
  return (colours ?? []).map(
    (colour) => ({
      name: colour,
      className: getColourClass(colour),
    }),
  );
}

/* -------------------------------------------------------------------------- */
/* Specifications                                                             */
/* -------------------------------------------------------------------------- */

function mapSpecifications(
  product: ApiProductDetail,
): ProductDetailSpecification[] {
  return (product.specifications ?? [])
    .filter(
      (spec) =>
        spec.value !== null &&
        spec.value !== "",
    )
    .sort(
      (a, b) =>
        a.sort_order - b.sort_order,
    )
    .map((spec) => ({
      label: spec.label,
      value: formatSpecificationValue(
        spec.value,
        spec.unit,
      ),
    }));
}

/* -------------------------------------------------------------------------- */
/* Related Products                                                           */
/* -------------------------------------------------------------------------- */

function mapRelatedProduct(
  product: ApiProduct,
): ProductDetailRelatedProduct {
  const specs =
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
      .slice(0, 3)
      .map((spec) =>
        formatSpecificationValue(
          spec.value,
          spec.unit,
        ),
      ) ?? [];

  return {
    id: String(product.product_id),

    slug: product.slug,

    name: product.name,

    company: product.company.name,

    location: getLocation(
      product.company.city,
      product.company.state,
    ),

    image:
      product.primary_image?.image_url ??
      "/images/product-placeholder.png",

    specs,

    price: formatPrice(product),

    isVerified:
      product.company
        .verification_status ===
      "VERIFIED",

    isPremium: false,
  };
}

/* -------------------------------------------------------------------------- */
/* Main Mapper                                                                */
/* -------------------------------------------------------------------------- */

export function mapApiProductDetailToProductDetail(
  product: ApiProductDetail,
): ProductDetail {
  const specifications =
    mapSpecifications(product);

  const middleIndex = Math.ceil(
    specifications.length / 2,
  );

  const specificationsLeft =
    specifications.slice(
      0,
      middleIndex,
    );

  const specificationsRight =
    specifications.slice(
      middleIndex,
    );

  /* ------------------------------------------------------------------------ */
  /* Product Images                                                           */
  /* ------------------------------------------------------------------------ */

  const sortedImages = [
    ...(product.images ?? []),
  ].sort(
    (a, b) =>
      (a.sort_order ?? 0) -
      (b.sort_order ?? 0),
  );

  const images = sortedImages
    .map(
      (image: ApiProductImage) =>
        image.image_url,
    )
    .filter(Boolean);

  const companyLocation = getLocation(
    product.company.city,
    product.company.state,
  );

  /* ------------------------------------------------------------------------ */
  /* Result                                                                    */
  /* ------------------------------------------------------------------------ */

  return {
    id: String(product.product_id),

    slug: product.slug,

    name: product.name,

    category:
      product.category?.name ??
      product.product_type ??
      "-",

    categorySlug:
      product.category?.slug ??
      "uncategorized",

    images,

    companyId: String(
      product.company_id,
    ),

    companySlug:
      product.company.slug,

    companyName:
      product.company.name,

    companyLogo:
      product.company
        .company_logo_url ??
      "/images/company-placeholder.png",

    companyLocation,

    companyDescription:
      product.company.description ??
      "",

    companyYears:
      getCompanyYears(
        product.company
          .years_in_business,
      ),

    companyBusinessTypes:
      product.company
        .business_types ?? [],

    isVerifiedSupplier:
      product.company
        .verification_status ===
      "VERIFIED",

    description:
      product.description ??
      product.short_description ??
      "",

    price:
      formatPrice(product),

    priceUnit:
      product.price_unit ??
      "Unit",

    highlightSpecs:
      specifications.slice(0, 3),

    colours:
      mapColours(
        product.available_colors,
      ),

    overview:
      product.description ??
      product.short_description ??
      "",

    benefits:
      product.highlights ?? [],

    specificationsLeft,

    specificationsRight,

    videoThumbnail:
      images[0] ??
      "/images/product-placeholder.png",

    videoUrl:
      product.video_url ?? "",

    catalogueTitle:
      product.catalogue_url
        ? "Product Catalogue"
        : "",

    catalogueSize: "",

    catalogueUrl:
      product.catalogue_url ?? "",

    relatedProducts:
      (
        product.related_products ??
        []
      ).map(mapRelatedProduct),
  };
}