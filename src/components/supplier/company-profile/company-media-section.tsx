"use client";

import { ImagePlus, Loader2, Upload, X } from "lucide-react";

import { SafeImage } from "@/components/common/safe-image";
import { SupplierFormCard, SupplierFormField } from "@/components/supplier/common/supplier-form";
import type { CompanyFileRemoveHandler, CompanyFileSelectHandler } from "@/hooks/use-company-form";
import { getUploadAccept, getUploadHint } from "@/lib/api/file-upload-api";

type CompanyMediaSectionProps = {
  companyLogoUrl: string;
  coverImageUrl: string;
  isLogoUploading: boolean;
  isCoverUploading: boolean;
  onFileSelect: CompanyFileSelectHandler;
  onFileRemove: CompanyFileRemoveHandler;
};

export function CompanyMediaSection({
  companyLogoUrl,
  coverImageUrl,
  isLogoUploading,
  isCoverUploading,
  onFileSelect,
  onFileRemove,
}: CompanyMediaSectionProps) {
  return (
    <SupplierFormCard title="2. Cover Image & Company Logo">
      <div className="grid grid-cols-[135px_1fr] gap-4">
        <SupplierFormField label="Company Logo">
          <label className="relative flex h-[150px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[6px] border border-[#bfc0eb] border-dashed bg-[#fbfaff] text-center focus-within:ring-2 focus-within:ring-[#3024c8]/40">
            {isLogoUploading ? (
              <Loader2 size={22} className="animate-spin text-[#3225ce]" />
            ) : companyLogoUrl ? (
              <>
                <SafeImage src={companyLogoUrl} alt="Company logo" fill sizes="135px" className="object-contain p-4" />

                <RemoveButton label="Remove company logo" onClick={() => onFileRemove("company_logo_url")} />
              </>
            ) : (
              <>
                <Upload size={24} className="text-[#3225ce]" />

                <p className="mt-2 font-bold text-[#3024c4] text-[9px]">Click to upload logo</p>

                <p className="mt-1 px-2 text-[#777c95] text-[8px]">{getUploadHint("company_logo")}</p>

                <p className="mt-3 text-[#9295a8] text-[9px]">Recommended: 200 × 200px</p>
              </>
            )}

            <ImageInput
              accept={getUploadAccept("company_logo")}
              disabled={isLogoUploading}
              label={companyLogoUrl ? "Replace company logo" : "Upload company logo"}
              onSelect={(file) => onFileSelect("company_logo_url", file)}
            />
          </label>

          {companyLogoUrl && !isLogoUploading && (
            <p className="mt-1 text-center text-[#85899f] text-[7px]">Click the logo to replace it</p>
          )}
        </SupplierFormField>

        <SupplierFormField label="Cover Image">
          <label className="flex h-[70px] cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-[#bfc0eb] border-dashed bg-[#fbfaff] focus-within:ring-2 focus-within:ring-[#3024c8]/40">
            {isCoverUploading ? (
              <Loader2 size={18} className="animate-spin text-[#3024c4]" />
            ) : (
              <ImagePlus size={18} className="text-[#3024c4]" />
            )}

            <div>
              <p className="font-bold text-[#3024c4] text-[9px]">
                {isCoverUploading ? "Uploading..." : coverImageUrl ? "Click to replace cover image" : "Click to upload"}
              </p>

              <p className="mt-1 text-[#85899f] text-[8px]">{getUploadHint("company_cover")}</p>
            </div>

            <ImageInput
              accept={getUploadAccept("company_cover")}
              disabled={isCoverUploading}
              label={coverImageUrl ? "Replace cover image" : "Upload cover image"}
              onSelect={(file) => onFileSelect("cover_image_url", file)}
            />
          </label>

          {coverImageUrl && (
            <div className="relative mt-3 flex h-[90px] items-center justify-center overflow-hidden rounded-[6px] border border-[#e2e3ed] bg-[#fbfaff]">
              <SafeImage src={coverImageUrl} alt="Company cover" fill sizes="600px" className="object-cover" />

              {!isCoverUploading && (
                <RemoveButton label="Remove cover image" onClick={() => onFileRemove("cover_image_url")} />
              )}
            </div>
          )}

          <p className="mt-1 text-[#85899f] text-[8px]">Recommended size: 1200 × 400 px</p>
        </SupplierFormField>
      </div>
    </SupplierFormCard>
  );
}

function ImageInput({
  accept,
  disabled,
  label,
  onSelect,
}: {
  accept: string;
  disabled: boolean;
  label: string;
  onSelect: (file: File) => void;
}) {
  return (
    <input
      type="file"
      accept={accept}
      disabled={disabled}
      aria-label={label}
      className="sr-only"
      onChange={(event) => {
        const file = event.target.files?.[0];

        // Allow re-selecting the same file after removing it.
        event.target.value = "";

        if (file) {
          onSelect(file);
        }
      }}
    />
  );
}

function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        // The button sits inside the upload <label>; don't open the file picker.
        event.preventDefault();
        onClick();
      }}
      className="absolute top-2 right-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white shadow"
      aria-label={label}
    >
      <X size={12} className="text-[#3226c7]" />
    </button>
  );
}
