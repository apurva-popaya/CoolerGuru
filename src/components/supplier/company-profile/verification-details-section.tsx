"use client";

import { useState } from "react";

import { Info, Upload } from "lucide-react";

import {
  SupplierFormCard,
  SupplierFormField,
  SupplierSectionHeading,
  supplierInputClass,
} from "@/components/supplier/common/supplier-form";

export function VerificationDetailsSection() {
  const [hasGst, setHasGst] = useState(true);

  return (
    <SupplierFormCard title="3. Verification Details">
      <SupplierFormField label="Company Type" required description="Select the legal constitution of your business.">
        <select className={supplierInputClass} defaultValue="">
          <option value="" disabled>
            Select company type
          </option>

          <option value="sole-proprietorship">Sole Proprietorship</option>
          <option value="partnership">Partnership</option>
          <option value="llp">LLP</option>
          <option value="private-limited">Private Limited</option>
          <option value="public-limited">Public Limited</option>
        </select>
      </SupplierFormField>

      <div className="mt-5">
        <p className="font-bold text-[#292e55] text-[10px]">
          Do you have a GST Registration?
          <span className="ml-0.5 text-red-500">*</span>
        </p>

        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => setHasGst(true)}
            className={`flex h-[32px] min-w-[74px] items-center justify-center gap-2 rounded-[5px] border font-semibold text-[9px] transition ${hasGst ? "border-[#3024c9] bg-[#3024c9] text-white" : "border-[#dcdde8] bg-white text-[#555a76]"}`}
          >
            <span
              className={`h-[10px] w-[10px] rounded-full border ${hasGst ? "border-white bg-white" : "border-[#999db2]"}`}
            />
            Yes
          </button>

          <button
            type="button"
            onClick={() => setHasGst(false)}
            className={`flex h-[32px] min-w-[74px] items-center justify-center gap-2 rounded-[5px] border font-semibold text-[9px] transition ${!hasGst ? "border-[#3024c9] bg-[#3024c9] text-white" : "border-[#dcdde8] bg-white text-[#555a76]"}`}
          >
            <span
              className={`h-[10px] w-[10px] rounded-full border ${!hasGst ? "border-white bg-white" : "border-[#999db2]"}`}
            />
            No
          </button>
        </div>
      </div>

      {hasGst ? (
        <div className="mt-4">
          <SupplierSectionHeading>GST Details</SupplierSectionHeading>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <SupplierFormField label="GST Number" required>
              <input type="text" placeholder="Enter GST number" className={supplierInputClass} />
            </SupplierFormField>

            <SupplierFormField label="GST Certificate" required>
              <DocumentUpload label="Upload GST Certificate" />
            </SupplierFormField>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <SupplierSectionHeading>Shop & Establishment Details</SupplierSectionHeading>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <SupplierFormField label="Shop & Establishment Registration Number" required>
              <input type="text" placeholder="Enter registration number" className={supplierInputClass} />
            </SupplierFormField>

            <SupplierFormField label="Shop & Establishment Certificate" required>
              <DocumentUpload label="Upload Document" />
            </SupplierFormField>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-[5px] border border-[#dedff0] bg-[#f8f8ff] px-3 py-2.5">
            <Info size={11} className="mt-[1px] shrink-0 text-[#3125c8]" />

            <p className="text-[#656a83] text-[7px] leading-[1.45]">
              Since GST registration is unavailable, please provide a valid Shop & Establishment registration number and
              supporting certificate.
            </p>
          </div>
        </div>
      )}

      <div className="mt-5">
        <SupplierSectionHeading>PAN Details</SupplierSectionHeading>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <SupplierFormField label="PAN Number" required>
            <input type="text" placeholder="Enter PAN number" className={supplierInputClass} />
          </SupplierFormField>

          <SupplierFormField label="PAN Document" required>
            <DocumentUpload label="Upload PAN Document" />
          </SupplierFormField>
        </div>
      </div>

      <div className="mt-5">
        <SupplierSectionHeading>Incorporation Details</SupplierSectionHeading>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <SupplierFormField label="Incorporation / Registration Number">
            <input type="text" placeholder="Enter number" className={supplierInputClass} />
          </SupplierFormField>

          <SupplierFormField label="Incorporation Certificate">
            <DocumentUpload label="Upload Certificate" />
          </SupplierFormField>
        </div>
      </div>
    </SupplierFormCard>
  );
}

function DocumentUpload({ label }: { label: string }) {
  return (
    <label className="flex h-[40px] cursor-pointer items-center gap-2 rounded-[5px] border border-[#c6c5eb] border-dashed bg-[#fbfaff] px-3 transition hover:bg-[#f7f6ff]">
      <Upload size={13} className="shrink-0 text-[#3024c8]" />

      <span className="font-semibold text-[#3024c8] text-[7px]">{label}</span>

      <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
    </label>
  );
}
