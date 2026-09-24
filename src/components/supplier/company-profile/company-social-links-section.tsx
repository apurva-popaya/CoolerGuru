"use client";

import { SupplierFormCard } from "@/components/supplier/common/supplier-form";
import type { CompanyFieldChangeHandler, CompanyFieldErrors } from "@/hooks/use-company-form";
import type { CreateCompanyRequest } from "@/lib/api/supplier-create-profile-api";

type SocialLinkField = keyof Pick<
  CreateCompanyRequest,
  "website_url" | "facebook_url" | "instagram_url" | "youtube_url" | "linkedin_url"
>;

const SOCIAL_LINKS: ReadonlyArray<{ field: SocialLinkField; label: string }> = [
  { field: "website_url", label: "Website" },
  { field: "facebook_url", label: "Facebook" },
  { field: "instagram_url", label: "Instagram" },
  { field: "youtube_url", label: "YouTube" },
  { field: "linkedin_url", label: "LinkedIn" },
];

type CompanySocialLinksSectionProps = {
  values: Record<SocialLinkField, string>;
  errors: CompanyFieldErrors;
  onChange: CompanyFieldChangeHandler;
};

export function CompanySocialLinksSection({ values, errors, onChange }: CompanySocialLinksSectionProps) {
  return (
    <SupplierFormCard title="Website & Social Media Links">
      {SOCIAL_LINKS.map(({ field, label }) => {
        const error = errors[field];
        const inputId = `company-${field}`;

        return (
          <div key={field} className="mb-2">
            <div className="grid grid-cols-[60px_1fr] items-center gap-2">
              <label htmlFor={inputId} className="font-semibold text-[#4b506d] text-[9px]">
                {label}
              </label>

              <input
                id={inputId}
                type="url"
                value={values[field]}
                onChange={(event) => onChange(field, event.target.value)}
                placeholder="https://"
                aria-invalid={Boolean(error)}
                className={`h-[30px] rounded-[4px] border px-2 text-[#555b76] text-[8px] outline-none focus:border-[#3829d6] ${
                  error ? "border-red-400" : "border-[#dfe0eb]"
                }`}
              />
            </div>

            {error && (
              <p role="alert" className="mt-1 pl-[68px] text-[7.5px] text-red-500">
                {error}
              </p>
            )}
          </div>
        );
      })}
    </SupplierFormCard>
  );
}
