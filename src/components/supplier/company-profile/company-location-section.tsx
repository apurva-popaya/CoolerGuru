"use client";

import Image from "next/image";

import { SupplierFormCard, SupplierFormField, supplierInputClass } from "@/components/supplier/common/supplier-form";
import type { CompanyFieldChangeHandler, CompanyFieldErrors } from "@/hooks/use-company-form";

type CompanyLocationSectionProps = {
  mapAddress: string;
  latitude: number;
  longitude: number;
  errors: CompanyFieldErrors;
  onChange: CompanyFieldChangeHandler;
};

export function CompanyLocationSection({
  mapAddress,
  latitude,
  longitude,
  errors,
  onChange,
}: CompanyLocationSectionProps) {
  return (
    <SupplierFormCard title="Location Map">
      <SupplierFormField label="Map Address" error={errors.map_address}>
        <input
          value={mapAddress}
          onChange={(event) => onChange("map_address", event.target.value)}
          maxLength={500}
          placeholder="e.g. GIDC Phase 2, Rajkot"
          className={supplierInputClass}
        />
      </SupplierFormField>

      <div className="relative mt-3 h-[135px] overflow-hidden rounded-[6px]">
        <Image src="/images/company-profile/ahmedabad-map.png" alt="Company location" fill className="object-cover" />
      </div>

      {/* 0 means "not set" (see toDraftValues in use-company-form). */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <SupplierFormField label="Latitude" error={errors.latitude}>
          <input
            type="number"
            step="any"
            min={-90}
            max={90}
            value={latitude || ""}
            onChange={(event) => onChange("latitude", Number(event.target.value) || 0)}
            placeholder="e.g. 22.3039"
            className={supplierInputClass}
          />
        </SupplierFormField>

        <SupplierFormField label="Longitude" error={errors.longitude}>
          <input
            type="number"
            step="any"
            min={-180}
            max={180}
            value={longitude || ""}
            onChange={(event) => onChange("longitude", Number(event.target.value) || 0)}
            placeholder="e.g. 70.8022"
            className={supplierInputClass}
          />
        </SupplierFormField>
      </div>
    </SupplierFormCard>
  );
}
