import type { CompanySearchResult, ProductSearchResult, SearchResult } from "@/types/search";
import type { BackendMixedSearchResult, BackendSearchCompany, BackendSearchProduct } from "@/types/search-api";

const FALLBACK_PRODUCT_IMAGE = "/images/home/products/product-placeholder.png";

const FALLBACK_COMPANY_IMAGE = "/images/home/companies/company-placeholder.png";

function cleanUrl(value?: string | null) {
  if (!value) {
    return "";
  }

  const markdownUrl = value.match(/^\[(https?:\/\/[^\]]+)\]\([^)]+\)$/);

  const cleaned = markdownUrl ? markdownUrl[1] : value;

  try {
    const url = new URL(cleaned);

    if (url.hostname === "example.com") {
      return "";
    }

    return cleaned;
  } catch {
    /*
     * Local /images/... paths are valid.
     */
    if (cleaned.startsWith("/")) {
      return cleaned;
    }

    return "";
  }
}
function getSpecification(product: BackendSearchProduct, key: string): string | null {
  const specification = product.specifications?.find((item) => item.key === key);

  if (specification?.value === undefined || specification.value === null) {
    return null;
  }

  const value = String(specification.value);

  return specification.unit ? `${value} ${specification.unit}` : value;
}

export function mapSearchCompany(company: BackendSearchCompany): CompanySearchResult {
  const location = [company.city, company.state].filter(Boolean).join(", ");

  return {
    id: company.slug,

    title: company.name,

    image: cleanUrl(company.company_logo_url) || FALLBACK_COMPANY_IMAGE,

    location: location || "Location not available",

    description: company.description ?? "",

    businessType: company.business_types?.length ? company.business_types.join(", ") : "Supplier",

    experience: company.years_in_business ?? "Not specified",

    products: String(company.active_product_count ?? 0),

    employees: company.employee_size ?? "Not specified",

    established: company.established_year ? String(company.established_year) : "Not specified",

    type: "company",
  };
}

export function mapSearchProduct(product: BackendSearchProduct): ProductSearchResult {
  const company = product.company;

  const location = [company?.city, company?.state].filter(Boolean).join(", ");

  const airflow = getSpecification(product, "airflow") ?? product.airflow ?? "Not specified";

  const tank = getSpecification(product, "tank_capacity") ?? product.tank_capacity ?? "Not specified";

  const power = getSpecification(product, "power") ?? product.power ?? "Not specified";

  const moq =
    product.moq !== undefined && product.moq !== null
      ? `${product.moq}${product.moq_unit ? ` ${product.moq_unit}` : ""}`
      : "Not specified";

  return {
    id: product.slug,

    title: product.name,

    image: cleanUrl(product.primary_image?.image_url) || FALLBACK_PRODUCT_IMAGE,

    category: product.category?.name ?? "Product",

    airflow,

    tank,

    power,

    moq,

    description: product.short_description ?? "",

    company: company?.name ?? "Company",

    location: location || "Location not available",

    experience: company?.years_in_business ?? "Not specified",

    type: "product",
  };
}

export function mapMixedSearchResults(results: BackendMixedSearchResult[]): SearchResult[] {
  const mappedResults: SearchResult[] = [];

  for (const result of results) {
    if (result.type === "product" && result.product) {
      mappedResults.push(mapSearchProduct(result.product));

      continue;
    }

    if (result.type === "company" && result.company) {
      mappedResults.push(mapSearchCompany(result.company));
    }
  }

  return mappedResults;
}
