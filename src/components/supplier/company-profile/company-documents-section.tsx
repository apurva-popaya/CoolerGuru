"use client";

import { FileUploadField } from "@/components/common/file-upload-field";
import { SupplierFormCard, SupplierFormField } from "@/components/supplier/common/supplier-form";
import type {
  CompanyFieldErrors,
  CompanyFileRemoveHandler,
  CompanyFileSelectHandler,
} from "@/hooks/use-company-form";
import { MAX_FILES_PER_REQUEST, type UploadedFileRecord } from "@/lib/api/file-upload-api";

type CompanyDocumentsSectionProps = {
  documents: UploadedFileRecord[];
  isUploadingDocuments: boolean;
  removingDocumentIds: string[];
  brochureUrl: string;
  brochureFileName?: string;
  isBrochureUploading: boolean;
  errors: CompanyFieldErrors;
  onDocumentsAdd: (files: File[]) => void;
  onDocumentRemove: (fileId: string) => void;
  onFileSelect: CompanyFileSelectHandler;
  onFileRemove: CompanyFileRemoveHandler;
};

export function CompanyDocumentsSection({
  documents,
  isUploadingDocuments,
  removingDocumentIds,
  brochureUrl,
  brochureFileName,
  isBrochureUploading,
  errors,
  onDocumentsAdd,
  onDocumentRemove,
  onFileSelect,
  onFileRemove,
}: CompanyDocumentsSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <SupplierFormCard
        title="Certifications"
        description={`Upload certificates or any other documents that help verify your business (up to ${MAX_FILES_PER_REQUEST} at a time).`}
      >
        <FileUploadField
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
      </SupplierFormCard>

      <SupplierFormCard title="Company Brochure (PDF)">
        <SupplierFormField label="Brochure" error={errors.brochure_url}>
          <FileUploadField
            category="company_brochure"
            items={brochureUrl ? [{ key: "brochure_url", url: brochureUrl, name: brochureFileName }] : []}
            isUploading={isBrochureUploading && !brochureUrl}
            busyKeys={isBrochureUploading ? ["brochure_url"] : []}
            onSelect={([file]) => onFileSelect("brochure_url", file)}
            onReplace={(_item, file) => onFileSelect("brochure_url", file)}
            onRemove={() => onFileRemove("brochure_url")}
          />
        </SupplierFormField>
      </SupplierFormCard>
    </div>
  );
}
