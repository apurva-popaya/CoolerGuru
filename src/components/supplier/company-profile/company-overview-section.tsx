"use client";

import { useState } from "react";

import {
  SupplierFormCard,
  SupplierFormField,
  supplierInputClass,
  supplierTextareaClass,
} from "@/components/supplier/common/supplier-form";

export function CompanyOverviewSection() {
  const [companyName, setCompanyName] = useState("ABC Cooling Industries");

  const [description, setDescription] = useState(
    "ABC Cooling Industries is a leading manufacturer and supplier of air coolers and related cooling solutions in India. We are committed to quality, innovation, and customer satisfaction.",
  );

  return (
    <SupplierFormCard title="1. Company Overview">
      <SupplierFormField label="Company Name" required>
        <input
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          className={supplierInputClass}
        />
      </SupplierFormField>

      <div className="mt-4">
        <SupplierFormField label="Company Description / Overview" required>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={500}
            className={supplierTextareaClass}
          />
        </SupplierFormField>

        <div className="mt-1 flex justify-between text-[#86899d] text-[7px]">
          <span>You can describe your company, mission, products, and strengths.</span>
          <span>{description.length} / 500</span>
        </div>
      </div>
    </SupplierFormCard>
  );
}
