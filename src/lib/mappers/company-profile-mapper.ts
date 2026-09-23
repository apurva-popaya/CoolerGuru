import type {
  ApiCompanyProfile,
  ApiCompanyProduct,
  ApiSimilarCompany,
} from "../api/companies-api";

import type {
  CompanyCertification,
  CompanyProfile,
  CompanyProfileProduct,
  SimilarCompany,
} from "@/types/company-profile";

function getLocation(
  city: string | null,
  state: string | null,
): string {
  return [city, state].filter(Boolean).join(", ");
}

function formatBusinessHours(
  company: ApiCompanyProfile,
): string | undefined {
  const { monday_to_friday, saturday, sunday } =
    company.business_hours;

  const parts: string[] = [];

  if (!monday_to_friday.is_closed) {
    parts.push(
      `Mon-Fri: ${monday_to_friday.open ?? ""} - ${monday_to_friday.close ?? ""}`,
    );
  }

  if (!saturday.is_closed) {
    parts.push(
      `Saturday: ${saturday.open ?? ""} - ${saturday.close ?? ""}`,
    );
  }

  if (sunday.is_closed) {
    parts.push("Sunday: Closed");
  } else {
    parts.push(
      `Sunday: ${sunday.open ?? ""} - ${sunday.close ?? ""}`,
    );
  }

  return parts.length > 0
    ? parts.join(" | ")
    : undefined;
}

function mapProduct(
  product: ApiCompanyProduct,
): CompanyProfileProduct {
  const airflow = product.specifications.find(
    (specification) =>
      specification.key === "airflow" ||
      specification.label.toLowerCase() === "airflow",
  );

  const tank = product.specifications.find(
    (specification) =>
      specification.key === "tank_capacity" ||
      specification.label.toLowerCase() === "tank capacity",
  );

  const power = product.specifications.find(
    (specification) =>
      specification.key === "power" ||
      specification.label.toLowerCase() === "power",
  );

  return {
    id: String(product.product_id),
    slug: product.slug,
    name: product.name,

    image:
      product.primary_image ??
      "/images/placeholders/image-placeholder.png",

    airflow: airflow
      ? `${airflow.value}${airflow.unit ? ` ${airflow.unit}` : ""}`
      : undefined,

    tank: tank
      ? `${tank.value}${tank.unit ? ` ${tank.unit}` : ""}`
      : undefined,

    power: power
      ? `${power.value}${power.unit ? ` ${power.unit}` : ""}`
      : undefined,

    moq:
      product.moq !== null
        ? `${product.moq}${product.moq_unit ? ` ${product.moq_unit}` : ""}`
        : undefined,
  };
}

function mapSimilarCompany(
  company: ApiSimilarCompany,
): SimilarCompany {
  return {
    id: String(company.company_id),
    slug: company.slug,
    name: company.name,

    logo:
      company.company_logo_url ??
      "/images/placeholders/image-placeholder.png",

    location: getLocation(
      company.city,
      company.state,
    ),

    description:
      company.description ?? "",

    businessTypes: company.business_types,

    isVerified:
      company.verification_status === "VERIFIED",

    // Current API does not provide premium status.
    isPremium: false,
  };
}

function mapCertification(
  certification: string,
  index: number,
): CompanyCertification {
  return {
    id: `${index}-${certification}`,
    title: certification,
  };
}

export function mapCompanyProfile(
  company: ApiCompanyProfile,
): CompanyProfile {
  return {
    id: String(company.company_id),
    slug: company.slug,

    name: company.name,

    logo:
      company.company_logo_url ??
      "/images/placeholders/image-placeholder.png",

    coverImage:
      company.cover_image_url ??
      "/images/placeholders/image-placeholder.png",

    location: getLocation(
      company.city,
      company.state,
    ),

    businessTypes: company.business_types,

    isVerified:
      company.verification_status === "VERIFIED",

    // API currently doesn't provide premium status.
    isPremium: false,

    shortDescription:
      company.description ?? "",

    about:
      company.description ?? "",

    yearsInBusiness:
      company.years_in_business ?? undefined,

    employees:
      company.employee_size ?? undefined,

    productCount:
      String(company.active_product_count),

    // API doesn't currently provide response time.
    responseTime: undefined,

    productCategories:
      company.product_categories.map(
        (category) => category.name,
      ),

    products:
      company.products.map(mapProduct),

    // API doesn't currently provide contact person.
    contactPerson: undefined,

    phone:
      company.phone_number ?? undefined,

    email:
      company.email ?? undefined,

    website:
      company.website_url ?? undefined,

    businessHours:
      formatBusinessHours(company),

    linkedin:
      company.linkedin_url ?? undefined,

    facebook:
      company.facebook_url ?? undefined,

    instagram:
      company.instagram_url ?? undefined,

    youtube:
      company.youtube_url ?? undefined,

    twitter:
      company.twitter_url ?? undefined,

    establishedYear:
      company.established_year !== null
        ? String(company.established_year)
        : undefined,

    legalStatus:
      company.company_type ?? undefined,

    gstNumber:
      company.has_gst
        ? company.gst_number ?? undefined
        : undefined,

    // API doesn't provide these fields.
    panNumber: undefined,
    exportMarkets: undefined,
    serviceAreas: undefined,

    employeeStrength:
      company.employee_size ?? undefined,

    certifications:
      company.certifications.map(
        mapCertification,
      ),

    mapAddress:
      company.map_address ??
      [company.address, company.city, company.state, company.pin_code]
        .filter(Boolean)
        .join(", "),

    latitude:
      company.latitude ?? undefined,

    longitude:
      company.longitude ?? undefined,

    brochureUrl:
      company.brochure_url ?? undefined,

    similarCompanies:
      company.similar_companies.map(
        mapSimilarCompany,
      ),
  };
}