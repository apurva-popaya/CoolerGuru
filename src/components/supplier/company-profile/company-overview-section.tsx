
"use client";

import {
  SupplierFormCard,
  SupplierFormField,
  supplierInputClass,
  supplierTextareaClass,
} from "@/components/supplier/common/supplier-form";
import type { CompanyFieldChangeHandler, CompanyFieldErrors } from "@/hooks/use-company-form";
import { COMPANY_BUSINESS_TYPES, type CompanyBusinessType } from "@/lib/api/supplier-create-profile-api";

const BUSINESS_TYPE_LABELS: Record<CompanyBusinessType, string> = {
  MANUFACTURER: "Manufacturer",
  SUPPLIER: "Supplier",
  EXPORTER: "Exporter",
  OEM: "OEM",
  DISTRIBUTOR: "Distributor",
};

type CompanyOverviewSectionProps = {
  name: string;
  description: string;
  businessTypes: CompanyBusinessType[];
  errors: CompanyFieldErrors;
  onChange: CompanyFieldChangeHandler;
};

export function CompanyOverviewSection({
  name,
  description,
  businessTypes,
  errors,
  onChange,
}: CompanyOverviewSectionProps) {
  const toggleBusinessType = (businessType: CompanyBusinessType) => {
    onChange(
      "business_types",
      businessTypes.includes(businessType)
        ? businessTypes.filter((item) => item !== businessType)
        : [...businessTypes, businessType],
    );
  };

  return (
    <SupplierFormCard title="Company Overview">
      <SupplierFormField label="Company Name" required error={errors.name}>
        <input
          value={name}
          onChange={(event) => onChange("name", event.target.value)}
          className={supplierInputClass}
        />
      </SupplierFormField>

      <div className="mt-4">
        <SupplierFormField label="Company Description / Overview" required error={errors.description}>
          <textarea
            value={description}
            onChange={(event) =>
              onChange("description", event.target.value)
            }
            maxLength={500}
            className={supplierTextareaClass}
          />
        </SupplierFormField>

        <div className="mt-1 flex justify-between text-[#86899d] text-[7px]">
          <span>
            You can describe your company, mission, products, and strengths.
          </span>

          <span>{description.length} / 500</span>
        </div>
      </div>

      <div className="mt-4">
        <SupplierFormField
          label="Business Type"
          required
          description="Select all that apply."
          error={errors.business_types}
        >
          <div className="flex flex-wrap gap-2">
            {COMPANY_BUSINESS_TYPES.map((businessType) => {
              const isSelected = businessTypes.includes(businessType);

              return (
                <button
                  key={businessType}
                  type="button"
                  onClick={() => toggleBusinessType(businessType)}
                  className={`h-[28px] rounded-[5px] border px-3 font-semibold text-[8px] transition ${
                    isSelected
                      ? "border-[#3024c9] bg-[#3024c9] text-white"
                      : "border-[#dcdde8] bg-white text-[#555a76] hover:bg-[#f7f6ff]"
                  }`}
                >
                  {BUSINESS_TYPE_LABELS[businessType]}
                </button>
              );
            })}
          </div>
        </SupplierFormField>
      </div>
    </SupplierFormCard>
  );
}