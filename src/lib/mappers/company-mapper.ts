import type { ApiCompany } from "../api/companies-api";

import type { DirectoryCompany } from "@/types/company-directory";

function formatBusinessType(
  value: string,
): string {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );
}

export function mapApiCompanyToDirectoryCompany(
  company: ApiCompany,
): DirectoryCompany {
  const location = [
    company.city,
    company.state,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    id: company.company_id,

    slug: company.slug,

    name: company.name,

    description:
      company.description || "",

    logo: company.company_logo_url,

    location: location || "-",

    businessTypes:
      company.business_types.map(
        formatBusinessType,
      ),

    isVerified:
      company.verification_status ===
      "VERIFIED",

    /*
     * The current `/companies` API does not
     * provide an `is_premium` field.
     *
     * Keep this false until backend provides
     * premium information.
     */
    isPremium: false,

    yearsInBusiness:
      company.years_in_business || "-",

    productCount:
      String(company.active_product_count ?? 0),

    employees:
      company.employee_size || "-",

    mainProducts:
      company.main_categories?.map(
        (category) => category.name,
      ) ?? [],
  };
}