"use client";

import Image from "next/image";

import { ImagePlus, Upload, X } from "lucide-react";

import { SupplierFormCard, SupplierFormField } from "@/components/supplier/common/supplier-form";

export function CompanyMediaSection() {
  return (
    <SupplierFormCard title="2. Cover Image & Company Logo">
      <div className="grid grid-cols-[135px_1fr] gap-4">
        <SupplierFormField label="Company Logo">
          <label className="flex h-[150px] cursor-pointer flex-col items-center justify-center rounded-[6px] border border-[#bfc0eb] border-dashed bg-[#fbfaff] text-center">
            <Upload size={24} className="text-[#3225ce]" />

            <p className="mt-2 font-bold text-[#3024c4] text-[9px]">Click to upload logo</p>

            <p className="mt-1 text-[#777c95] text-[8px]">PNG, JPG up to 2MB</p>

            <p className="mt-3 text-[#9295a8] text-[9px]">Recommended: 200 × 200px</p>

            <input type="file" accept=".jpg,.jpeg,.png" className="hidden" />
          </label>
        </SupplierFormField>

        <SupplierFormField label="Cover Image">
          <label className="flex h-[70px] cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-[#bfc0eb] border-dashed bg-[#fbfaff]">
            <ImagePlus size={18} className="text-[#3024c4]" />

            <div>
              <p className="font-bold text-[#3024c4] text-[9px]">Click to upload or drag and drop</p>
              <p className="mt-1 text-[#85899f] text-[8px]">PNG, JPG up to 2MB</p>
            </div>

            <input type="file" accept=".jpg,.jpeg,.png" className="hidden" />
          </label>

          <div className="relative mt-3 h-[90px] overflow-hidden rounded-[6px]">
            <Image src="/images/company-profile/company-cover.png" alt="Company cover" fill className="object-cover" />

            <button
              type="button"
              className="absolute top-2 right-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white shadow"
            >
              <X size={12} className="text-[#3226c7]" />
            </button>
          </div>

          <p className="mt-1 text-[#85899f] text-[8px]">Recommended size: 1200 × 400 px</p>
        </SupplierFormField>
      </div>
    </SupplierFormCard>
  );
}
