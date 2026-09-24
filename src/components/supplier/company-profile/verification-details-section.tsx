"use client";

import { Info } from "lucide-react";

import { FileUploadField } from "@/components/common/file-upload-field";
import {
  SupplierFormCard,
  SupplierFormField,
  SupplierSectionHeading,
  supplierInputClass,
} from "@/components/supplier/common/supplier-form";
import {
  COMPANY_FILE_CATEGORIES,
  type CompanyFieldChangeHandler,
  type CompanyFieldErrors,
  type CompanyFileField,
  type CompanyFileInfo,
  type CompanyFileRemoveHandler,
  type CompanyFileSelectHandler,
} from "@/hooks/use-company-form";

type VerificationDetailsSectionProps = {
  hasGst: boolean;
  gstNumber: string;
  gstCertificateUrl: string;
  panNumber: string;
  panDocumentUrl: string;
  registrationNumber: string;
  incorporationCertificateUrl: string;
  shopEstablishmentNumber: string;
  shopEstablishmentDocumentUrl: string;
  fileInfo: Partial<Record<CompanyFileField, CompanyFileInfo>>;
  uploadingFields: CompanyFileField[];
  errors: CompanyFieldErrors;
  onChange: CompanyFieldChangeHandler;
  onFileSelect: CompanyFileSelectHandler;
  onFileRemove: CompanyFileRemoveHandler;
};

export function VerificationDetailsSection({
  hasGst,
  gstNumber,
  gstCertificateUrl,
  panNumber,
  panDocumentUrl,
  registrationNumber,
  incorporationCertificateUrl,
  shopEstablishmentNumber,
  shopEstablishmentDocumentUrl,
  fileInfo,
  uploadingFields,
  errors,
  onChange,
  onFileSelect,
  onFileRemove,
}: VerificationDetailsSectionProps) {
  const renderDocumentUpload = (field: CompanyFileField, label: string, fileUrl: string) => {
    const isBusy = uploadingFields.includes(field);

    return (
      <FileUploadField
        category={COMPANY_FILE_CATEGORIES[field]}
        label={label}
        items={fileUrl ? [{ key: field, url: fileUrl, name: fileInfo[field]?.name }] : []}
        isUploading={isBusy && !fileUrl}
        busyKeys={isBusy ? [field] : []}
        onSelect={([file]) => onFileSelect(field, file)}
        onReplace={(_item, file) => onFileSelect(field, file)}
        onRemove={() => onFileRemove(field)}
      />
    );
  };

  return (
    <SupplierFormCard title="Verification Details">
      <div>
        <p className="font-bold text-[#292e55] text-[10px]">
          Do you have a GST Registration?
          <span className="ml-0.5 text-red-500">*</span>
        </p>

        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => onChange("has_gst", true)}
            className={`flex h-[32px] min-w-[74px] items-center justify-center gap-2 rounded-[5px] border font-semibold text-[9px] transition ${
              hasGst ? "border-[#3024c9] bg-[#3024c9] text-white" : "border-[#dcdde8] bg-white text-[#555a76]"
            }`}
          >
            <span
              className={`h-[10px] w-[10px] rounded-full border ${
                hasGst ? "border-white bg-white" : "border-[#999db2]"
              }`}
            />
            Yes
          </button>

          <button
            type="button"
            onClick={() => onChange("has_gst", false)}
            className={`flex h-[32px] min-w-[74px] items-center justify-center gap-2 rounded-[5px] border font-semibold text-[9px] transition ${
              !hasGst ? "border-[#3024c9] bg-[#3024c9] text-white" : "border-[#dcdde8] bg-white text-[#555a76]"
            }`}
          >
            <span
              className={`h-[10px] w-[10px] rounded-full border ${
                !hasGst ? "border-white bg-white" : "border-[#999db2]"
              }`}
            />
            No
          </button>
        </div>
      </div>

      {hasGst ? (
        <div className="mt-4">
          <SupplierSectionHeading>GST Details</SupplierSectionHeading>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <SupplierFormField label="GST Number" required error={errors.gst_number}>
              <input
                type="text"
                value={gstNumber}
                onChange={(event) => onChange("gst_number", event.target.value.toUpperCase())}
                placeholder="Enter GST number"
                maxLength={15}
                className={supplierInputClass}
              />
            </SupplierFormField>

            <SupplierFormField label="GST Certificate" required error={errors.gst_certificate_url}>
              {renderDocumentUpload("gst_certificate_url", "Upload GST Certificate", gstCertificateUrl)}
            </SupplierFormField>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <SupplierSectionHeading>Shop & Establishment Details</SupplierSectionHeading>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <SupplierFormField
              label="Shop & Establishment Registration Number"
              required
              error={errors.shop_establishment_number}
            >
              <input
                type="text"
                value={shopEstablishmentNumber}
                onChange={(event) => onChange("shop_establishment_number", event.target.value)}
                placeholder="Enter registration number"
                className={supplierInputClass}
              />
            </SupplierFormField>

            <SupplierFormField
              label="Shop & Establishment Certificate"
              required
              error={errors.shop_establishment_document_url}
            >
              {renderDocumentUpload("shop_establishment_document_url", "Upload Document", shopEstablishmentDocumentUrl)}
            </SupplierFormField>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-[5px] border border-[#dedff0] bg-[#f8f8ff] px-3 py-2.5">
            <Info size={11} className="mt-[1px] shrink-0 text-[#3125c8]" />

            <p className="text-[#656a83] text-[7px] leading-[1.45]">
              Since GST registration is unavailable, please provide a valid Shop & Establishment registration number
              and supporting certificate, or your Incorporation details below.
            </p>
          </div>
        </div>
      )}

      <div className="mt-5">
        <SupplierSectionHeading>PAN Details</SupplierSectionHeading>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <SupplierFormField label="PAN Number" required error={errors.pan_number}>
            <input
              type="text"
              value={panNumber}
              onChange={(event) => onChange("pan_number", event.target.value.toUpperCase())}
              placeholder="Enter PAN number"
              maxLength={10}
              className={supplierInputClass}
            />
          </SupplierFormField>

          <SupplierFormField label="PAN Document" required error={errors.pan_document_url}>
            {renderDocumentUpload("pan_document_url", "Upload PAN Document", panDocumentUrl)}
          </SupplierFormField>
        </div>
      </div>

      <div className="mt-5">
        <SupplierSectionHeading>Incorporation Details</SupplierSectionHeading>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <SupplierFormField label="Incorporation / Registration Number" error={errors.registration_number}>
            <input
              type="text"
              value={registrationNumber}
              onChange={(event) => onChange("registration_number", event.target.value)}
              placeholder="Enter number"
              className={supplierInputClass}
            />
          </SupplierFormField>

          <SupplierFormField label="Incorporation Certificate" error={errors.incorporation_certificate_url}>
            {renderDocumentUpload("incorporation_certificate_url", "Upload Certificate", incorporationCertificateUrl)}
          </SupplierFormField>
        </div>
      </div>
    </SupplierFormCard>
  );
}
