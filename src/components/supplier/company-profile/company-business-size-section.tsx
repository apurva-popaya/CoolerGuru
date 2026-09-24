"use client";

import { SupplierFormCard, SupplierFormField, supplierInputClass } from "@/components/supplier/common/supplier-form";
import type { CompanyFieldChangeHandler, CompanyFieldErrors } from "@/hooks/use-company-form";

const EMPLOYEE_SIZE_OPTIONS = [
  "1 - 10 Employees",
  "11 - 50 Employees",
  "51 - 200 Employees",
  "201 - 500 Employees",
  "500+ Employees",
];

type CompanyBusinessSizeSectionProps = {
  establishedYear: string;
  employeeSize: string;
  errors: CompanyFieldErrors;
  onChange: CompanyFieldChangeHandler;
};

export function CompanyBusinessSizeSection({
  establishedYear,
  employeeSize,
  errors,
  onChange,
}: CompanyBusinessSizeSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <SupplierFormCard title="Business Size">
      <div className="grid grid-cols-2 gap-3">
        <SupplierFormField label="Established Year" error={errors.established_year}>
          <input
            type="number"
            inputMode="numeric"
            min={1800}
            max={currentYear}
            step={1}
            value={establishedYear}
            onChange={(event) => onChange("established_year", event.target.value)}
            placeholder={`e.g. ${currentYear - 10}`}
            className={supplierInputClass}
          />
        </SupplierFormField>

        <SupplierFormField label="Employee Size" error={errors.employee_size}>
          <select
            value={employeeSize}
            onChange={(event) => onChange("employee_size", event.target.value)}
            className={supplierInputClass}
          >
            <option value="">Select</option>

            {/* Keep a saved value that is not in the list selectable. */}
            {employeeSize && !EMPLOYEE_SIZE_OPTIONS.includes(employeeSize) && (
              <option value={employeeSize}>{employeeSize}</option>
            )}

            {EMPLOYEE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </SupplierFormField>
      </div>
    </SupplierFormCard>
  );
}
