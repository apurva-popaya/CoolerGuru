"use client";

import Image from "next/image";

import { FileCheck2, ImagePlus, Loader2, Upload, X } from "lucide-react";

import { SupplierFormCard, SupplierFormField } from "@/components/supplier/common/supplier-form";
import type { CompanyFilePreview, CompanyFileSelectHandler } from "@/hooks/use-company-form";
import { getFileNameFromUrl } from "@/lib/api/supplier-create-profile-api";

type CompanyMediaSectionProps = {
  companyLogoUrl: string;
  coverImageUrl: string;
  logoPreview?: CompanyFilePreview;
  coverPreview?: CompanyFilePreview;
  isLogoUploading: boolean;
  isCoverUploading: boolean;
  onFileSelect: CompanyFileSelectHandler;
  onFileRemove: (field: "company_logo_url" | "cover_image_url") => void;
};

export function CompanyMediaSection({
  companyLogoUrl,
  coverImageUrl,
  logoPreview,
  coverPreview,
  isLogoUploading,
  isCoverUploading,
  onFileSelect,
  onFileRemove,
}: CompanyMediaSectionProps) {
  return (
    <SupplierFormCard title="2. Cover Image & Company Logo">
      <div className="grid grid-cols-[135px_1fr] gap-4">
        <SupplierFormField label="Company Logo">
          <label className="relative flex h-[150px] cursor-pointer flex-col items-center justify-center rounded-[6px] border border-[#bfc0eb] border-dashed bg-[#fbfaff] text-center">
            {isLogoUploading ? (
              <Loader2 size={22} className="animate-spin text-[#3225ce]" />
            ) : companyLogoUrl ? (
              <>
                <UploadedImage url={companyLogoUrl} preview={logoPreview} alt="Company logo" fit="contain" />

                <RemoveButton onClick={() => onFileRemove("company_logo_url")} />
              </>
            ) : (
              <>
                <Upload size={24} className="text-[#3225ce]" />

                <p className="mt-2 font-bold text-[#3024c4] text-[9px]">
                  Click to upload logo
                </p>

                <p className="mt-1 text-[#777c95] text-[8px]">
                  PNG, JPG up to 2MB
                </p>

                <p className="mt-3 text-[#9295a8] text-[9px]">
                  Recommended: 200 × 200px
                </p>
              </>
            )}

            <ImageInput onSelect={(file) => onFileSelect("company_logo_url", file)} />
          </label>
        </SupplierFormField>

        <SupplierFormField label="Cover Image">
          <label className="flex h-[70px] cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-[#bfc0eb] border-dashed bg-[#fbfaff]">
            {isCoverUploading ? (
              <Loader2 size={18} className="animate-spin text-[#3024c4]" />
            ) : (
              <ImagePlus size={18} className="text-[#3024c4]" />
            )}

            <div>
              <p className="font-bold text-[#3024c4] text-[9px]">
                Click to upload or drag and drop
              </p>

              <p className="mt-1 text-[#85899f] text-[8px]">
                PNG, JPG up to 2MB
              </p>
            </div>

            <ImageInput onSelect={(file) => onFileSelect("cover_image_url", file)} />
          </label>

          {coverImageUrl && (
            <div className="relative mt-3 flex h-[90px] items-center justify-center overflow-hidden rounded-[6px] border border-[#e2e3ed] bg-[#fbfaff]">
              <UploadedImage url={coverImageUrl} preview={coverPreview} alt="Company cover" fit="cover" />

              <RemoveButton onClick={() => onFileRemove("cover_image_url")} />
            </div>
          )}

          <p className="mt-1 text-[#85899f] text-[8px]">
            Recommended size: 1200 × 400 px
          </p>
        </SupplierFormField>
      </div>
    </SupplierFormCard>
  );
}

function ImageInput({ onSelect }: { onSelect: (file: File) => void }) {
  return (
    <input
      type="file"
      accept=".jpg,.jpeg,.png"
      className="hidden"
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

/*
 * Uploads currently return dummy URLs (no S3 yet), which can't be rendered.
 * Show the local preview when we have one, otherwise just the file name.
 */
function UploadedImage({
  url,
  preview,
  alt,
  fit,
}: {
  url: string;
  preview?: CompanyFilePreview;
  alt: string;
  fit: "contain" | "cover";
}) {
  if (preview?.previewUrl) {
    return (
      <Image
        src={preview.previewUrl}
        alt={alt}
        fill
        className={fit === "contain" ? "object-contain p-4" : "object-cover"}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 px-2 text-center">
      <FileCheck2 size={20} className="text-[#3024c4]" />

      <p className="max-w-full truncate font-semibold text-[#30355c] text-[8px]">
        {preview?.name ?? getFileNameFromUrl(url)}
      </p>
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        // The button sits inside the upload <label>; don't open the file picker.
        event.preventDefault();
        onClick();
      }}
      className="absolute top-2 right-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white shadow"
      aria-label="Remove image"
    >
      <X size={12} className="text-[#3226c7]" />
    </button>
  );
}