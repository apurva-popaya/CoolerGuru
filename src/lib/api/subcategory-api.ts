import type {
  SubcategoryApiProduct,
  SubcategoryDetail,
  SubcategoryProduct,
  SubcategoryCompany,
  SubcategoryProductsResponse,
} from "@/types/subcategory-detail";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

function getProductImage(product: SubcategoryApiProduct) {
  const imageUrl = product.primary_image?.image_url;

  if (!imageUrl) {
    return "/images/placeholders/product-placeholder.png";
  }

  if (imageUrl.includes("example.com")) {
    return "/images/placeholders/product-placeholder.png";
  }

  return imageUrl;
}

function getCompanyLogo(company: SubcategoryApiProduct["company"]) {
  if (!company?.company_logo_url) {
    return "/images/placeholders/company-placeholder.png";
  }

  if (company.company_logo_url.includes("example.com")) {
    return "/images/placeholders/company-placeholder.png";
  }

  return company.company_logo_url;
}

function getSpecificationValue(
  product: SubcategoryApiProduct,
  key: string,
) {
  const specification = product.specifications?.find(
    (item) => item.key === key,
  );

  if (!specification) {
    return "-";
  }

  return specification.unit
    ? `${specification.value} ${specification.unit}`
    : specification.value;
}

function mapProduct(
  product: SubcategoryApiProduct,
): SubcategoryProduct {
  const airflow =
    product.airflow ??
    getSpecificationValue(product, "airflow");

  const tank =
    product.tank_capacity ??
    getSpecificationValue(product, "tank_capacity");

  return {
    productId: product.product_id,
    id: product.slug,
    name: product.name,
    slug: product.slug,
    image: getProductImage(product),
    company: product.company?.name ?? "Supplier",
    companySlug: product.company?.slug,
    airflow: airflow === "-" ? "Airflow N/A" : airflow,
    tank: tank === "-" ? "Tank N/A" : tank,
  };
}

function mapCompanies(
  products: SubcategoryApiProduct[],
): SubcategoryCompany[] {
  const companyMap = new Map<number, SubcategoryCompany>();

  for (const product of products) {
    const company = product.company;

    if (!company) {
      continue;
    }

    if (companyMap.has(company.company_id)) {
      continue;
    }

    const location = [company.city, company.state]
      .filter(Boolean)
      .join(", ");

    const description = company.business_types?.length
      ? company.business_types
          .map((type) =>
            type
              .replaceAll("_", " ")
              .toLowerCase()
              .replace(/\b\w/g, (character) =>
                character.toUpperCase(),
              ),
          )
          .join(" / ")
      : "Supplier";

    companyMap.set(company.company_id, {
      id: String(company.company_id),
      name: company.name,
      slug: company.slug,
      logo: getCompanyLogo(company),
      location: location || "Location not available",
      description,
      products: "—",
      established: company.established_year
        ? String(company.established_year)
        : "—",
      isVerified:
        company.verification_status === "VERIFIED",
    });
  }

  return Array.from(companyMap.values());
}

export async function getSubcategoryProducts(
  categorySlug: string,
): Promise<SubcategoryDetail> {
  const url = new URL(
    `${API_BASE_URL}/products`,
  );

  url.searchParams.set("category_slug", categorySlug);

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch subcategory products: ${response.status}`,
    );
  }

  const result =
    (await response.json()) as SubcategoryProductsResponse;

  if (!result.success) {
    throw new Error(
      result.message || "Unable to fetch subcategory products.",
    );
  }

  const { category, products, pagination } = result.data;

  const mappedProducts = products.map(mapProduct);
  const companies = mapCompanies(products);

  return {
    categorySlug: category.slug,
    title: category.name,
    description:
      category.description ??
      `Explore products and companies in ${category.name}.`,
    productCount: String(pagination.totalItems),
    companyCount: String(companies.length),
    monthlySearches: "—",
    products: mappedProducts,
    companies,
  };
}