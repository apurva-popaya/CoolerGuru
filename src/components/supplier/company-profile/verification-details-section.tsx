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
  type CompanyFileField,
  type CompanyFileInfo,
  type CompanyFileRemoveHandler,
  type CompanyFileSelectHandler,
} from "@/hooks/use-company-form";
import { MAX_FILES_PER_REQUEST, type UploadedFileRecord } from "@/lib/api/file-upload-api";

type VerificationDetailsSectionProps = {
  companyType: string;
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
  documents: UploadedFileRecord[];
  isUploadingDocuments: boolean;
  removingDocumentIds: string[];
  onChange: CompanyFieldChangeHandler;
  onFileSelect: CompanyFileSelectHandler;
  onFileRemove: CompanyFileRemoveHandler;
  onDocumentsAdd: (files: File[]) => void;
  onDocumentRemove: (fileId: string) => void;
};

export function VerificationDetailsSection({
  companyType,
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
  documents,
  isUploadingDocuments,
  removingDocumentIds,
  onChange,
  onFileSelect,
  onFileRemove,
  onDocumentsAdd,
  onDocumentRemove,
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
    <SupplierFormCard title="3. Verification Details">
      <SupplierFormField label="Company Type" required description="Select the legal constitution of your business.">
        <select
          value={companyType}
          onChange={(event) => onChange("company_type", event.target.value)}
          className={supplierInputClass}
        >
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
            <SupplierFormField label="GST Number" required>
              <input
                type="text"
                value={gstNumber}
                onChange={(event) => onChange("gst_number", event.target.value.toUpperCase())}
                placeholder="Enter GST number"
                maxLength={15}
                className={supplierInputClass}
              />
            </SupplierFormField>

            <SupplierFormField label="GST Certificate" required>
              {renderDocumentUpload("gst_certificate_url", "Upload GST Certificate", gstCertificateUrl)}
            </SupplierFormField>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <SupplierSectionHeading>Shop & Establishment Details</SupplierSectionHeading>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <SupplierFormField label="Shop & Establishment Registration Number" required>
              <input
                type="text"
                value={shopEstablishmentNumber}
                onChange={(event) => onChange("shop_establishment_number", event.target.value)}
                placeholder="Enter registration number"
                className={supplierInputClass}
              />
            </SupplierFormField>

            <SupplierFormField label="Shop & Establishment Certificate" required>
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
          <SupplierFormField label="PAN Number" required>
            <input
              type="text"
              value={panNumber}
              onChange={(event) => onChange("pan_number", event.target.value.toUpperCase())}
              placeholder="Enter PAN number"
              maxLength={10}
              className={supplierInputClass}
            />
          </SupplierFormField>

          <SupplierFormField label="PAN Document" required>
            {renderDocumentUpload("pan_document_url", "Upload PAN Document", panDocumentUrl)}
          </SupplierFormField>
        </div>
      </div>

      <div className="mt-5">
        <SupplierSectionHeading>Incorporation Details</SupplierSectionHeading>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <SupplierFormField label="Incorporation / Registration Number">
            <input
              type="text"
              value={registrationNumber}
              onChange={(event) => onChange("registration_number", event.target.value)}
              placeholder="Enter number"
              className={supplierInputClass}
            />
          </SupplierFormField>

          <SupplierFormField label="Incorporation Certificate">
            {renderDocumentUpload("incorporation_certificate_url", "Upload Certificate", incorporationCertificateUrl)}
          </SupplierFormField>
        </div>
      </div>

      <div className="mt-5">
        <SupplierSectionHeading>Supporting Documents</SupplierSectionHeading>

        <p className="mt-1 text-[#656a83] text-[7px]">
          Optional. Add any other documents that help verify your business (up to {MAX_FILES_PER_REQUEST} at a time).
        </p>

        <FileUploadField
          className="mt-3"
          category="company_document"
          multiple
          label="Upload Documents"
          items={documents.map((document) => ({
            key: document.fileId,
            url: document.url,
            name: document.originalFilename,
          }))}
          isUploading={isUploadingDocuments}
          busyKeys={removingDocumentIds}
          onSelect={onDocumentsAdd}
          onRemove={(item) => onDocumentRemove(item.key)}
        />
      </div>
    </SupplierFormCard>
  );
}
