"use client";

import Image from "next/image";

import { FileUploadField } from "@/components/common/file-upload-field";
import {
  SupplierFormCard,
  SupplierFormField,
  supplierInputClass,
} from "@/components/supplier/common/supplier-form";
import type {
  CompanyFieldChangeHandler,
  CompanyFileRemoveHandler,
  CompanyFileSelectHandler,
} from "@/hooks/use-company-form";
import { MAX_FILES_PER_REQUEST, type UploadedFileRecord } from "@/lib/api/file-upload-api";
import type { CreateCompanyRequest } from "@/lib/api/supplier-create-profile-api";

type CompanyAdditionalDetailsProps = {
  websiteUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;

  businessHours: CreateCompanyRequest["business_hours"];

  mapAddress: string;
  latitude: number;
  longitude: number;

  yearsInBusiness: string;
  employeeSize: string;

  documents: UploadedFileRecord[];
  isUploadingDocuments: boolean;
  removingDocumentIds: string[];

  brochureUrl: string;
  brochureFileName?: string;
  isBrochureUploading: boolean;

  onChange: CompanyFieldChangeHandler;
  onFileSelect: CompanyFileSelectHandler;
  onFileRemove: CompanyFileRemoveHandler;
  onDocumentsAdd: (files: File[]) => void;
  onDocumentRemove: (fileId: string) => void;
};

export function CompanyAdditionalDetails({
  websiteUrl,
  facebookUrl,
  instagramUrl,
  youtubeUrl,
  linkedinUrl,
  businessHours,
  mapAddress,
  latitude,
  longitude,
  yearsInBusiness,
  employeeSize,
  documents,
  isUploadingDocuments,
  removingDocumentIds,
  brochureUrl,
  brochureFileName,
  isBrochureUploading,
  onChange,
  onFileSelect,
  onFileRemove,
  onDocumentsAdd,
  onDocumentRemove,
}: CompanyAdditionalDetailsProps) {
  const updateBusinessHour = (
    day: keyof CreateCompanyRequest["business_hours"],
    field: "open" | "close",
    value: string,
  ) => {
    onChange("business_hours", {
      ...businessHours,
      [day]: {
        ...businessHours[day],
        [field]: value,
      },
    });
  };

  const toggleBusinessHourClosed = (
    day: keyof CreateCompanyRequest["business_hours"],
    isClosed: boolean,
  ) => {
    onChange("business_hours", {
      ...businessHours,
      [day]: {
        ...businessHours[day],
        is_closed: isClosed,
        open: isClosed ? null : businessHours[day].open ?? "09:00",
        close: isClosed ? null : businessHours[day].close ?? "18:00",
      },
    });
  };

  return (
    <>
      <div className="mt-4 grid grid-cols-[1fr_1fr_1.4fr] gap-4">
        {/* 5. Website & Social Media */}
        <SupplierFormCard title="5. Website & Social Media Links">
          <SocialInput
            label="Website"
            value={websiteUrl}
            onChange={(value) => onChange("website_url", value)}
          />

          <SocialInput
            label="Facebook"
            value={facebookUrl}
            onChange={(value) => onChange("facebook_url", value)}
          />

          <SocialInput
            label="Instagram"
            value={instagramUrl}
            onChange={(value) => onChange("instagram_url", value)}
          />

          <SocialInput
            label="YouTube"
            value={youtubeUrl}
            onChange={(value) => onChange("youtube_url", value)}
          />

          <SocialInput
            label="LinkedIn"
            value={linkedinUrl}
            onChange={(value) => onChange("linkedin_url", value)}
          />
        </SupplierFormCard>

        {/* 6. Business Hours */}
        <SupplierFormCard title="6. Business Hours">
          <p className="mb-3 text-[#777b92] text-[8px]">
            Set your typical business hours
          </p>

          <BusinessHourRow
            day="Mon - Fri"
            open={businessHours.monday_to_friday.open ?? ""}
            close={businessHours.monday_to_friday.close ?? ""}
            closed={businessHours.monday_to_friday.is_closed}
            onOpenChange={(value) =>
              updateBusinessHour(
                "monday_to_friday",
                "open",
                value,
              )
            }
            onCloseChange={(value) =>
              updateBusinessHour(
                "monday_to_friday",
                "close",
                value,
              )
            }
            onClosedChange={(value) =>
              toggleBusinessHourClosed(
                "monday_to_friday",
                value,
              )
            }
          />

          <BusinessHourRow
            day="Saturday"
            open={businessHours.saturday.open ?? ""}
            close={businessHours.saturday.close ?? ""}
            closed={businessHours.saturday.is_closed}
            onOpenChange={(value) =>
              updateBusinessHour(
                "saturday",
                "open",
                value,
              )
            }
            onCloseChange={(value) =>
              updateBusinessHour(
                "saturday",
                "close",
                value,
              )
            }
            onClosedChange={(value) =>
              toggleBusinessHourClosed(
                "saturday",
                value,
              )
            }
          />

          <BusinessHourRow
            day="Sunday"
            open={businessHours.sunday.open ?? ""}
            close={businessHours.sunday.close ?? ""}
            closed={businessHours.sunday.is_closed}
            onOpenChange={(value) =>
              updateBusinessHour(
                "sunday",
                "open",
                value,
              )
            }
            onCloseChange={(value) =>
              updateBusinessHour(
                "sunday",
                "close",
                value,
              )
            }
            onClosedChange={(value) =>
              toggleBusinessHourClosed(
                "sunday",
                value,
              )
            }
          />
        </SupplierFormCard>

        {/* 7. Location Map */}
        <SupplierFormCard title="7. Location Map">
          <SupplierFormField label="Address" required>
            <input
              value={mapAddress}
              onChange={(event) =>
                onChange("map_address", event.target.value)
              }
              className={supplierInputClass}
            />
          </SupplierFormField>

          <div className="relative mt-3 h-[135px] overflow-hidden rounded-[6px]">
            <Image
              src="/images/company-profile/ahmedabad-map.png"
              alt="Company location"
              fill
              className="object-cover"
            />
          </div>

          <p className="mt-1 text-[#888ca1] text-[8px]">
            Drag the pin to adjust your exact location.
          </p>

          <p className="mt-1 text-[#aaa] text-[7px]">
            Latitude: {latitude} | Longitude: {longitude}
          </p>
        </SupplierFormCard>
      </div>

      {/* 8, 9, 10 */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {/* 8. Years */}
        <SupplierFormCard title="8. Years in Business">
          <SupplierFormField label="Years in Business">
            <select
              value={yearsInBusiness}
              onChange={(event) =>
                onChange(
                  "years_in_business",
                  event.target.value,
                )
              }
              className={supplierInputClass}
            >
              <option value="">Select</option>
              <option value="1 - 5 Years">1 - 5 Years</option>
              <option value="5 - 10 Years">5 - 10 Years</option>
              <option value="10+ Years">10+ Years</option>
            </select>
          </SupplierFormField>
        </SupplierFormCard>

        {/* 9. Employee Size */}
        <SupplierFormCard title="9. Employee Size">
          <SupplierFormField label="Employee Size">
            <select
              value={employeeSize}
              onChange={(event) =>
                onChange(
                  "employee_size",
                  event.target.value,
                )
              }
              className={supplierInputClass}
            >
              <option value="">Select</option>
              <option value="1 - 10 Employees">
                1 - 10 Employees
              </option>
              <option value="11 - 50 Employees">
                11 - 50 Employees
              </option>
              <option value="51 - 200 Employees">
                51 - 200 Employees
              </option>
              <option value="201 - 500 Employees">
                201 - 500 Employees
              </option>
              <option value="500+ Employees">
                500+ Employees
              </option>
            </select>
          </SupplierFormField>
        </SupplierFormCard>

        {/* 10. Certifications */}
        <SupplierFormCard title="10. Certifications">
          <p className="mb-2 text-[#777b92] text-[8px]">
            Upload certificates or any other documents that help verify your business (up to{" "}
            {MAX_FILES_PER_REQUEST} at a time).
          </p>

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
      </div>

      {/* 11. Brochure */}
      <div className="mt-4">
        <SupplierFormCard title="11. Company Brochure (PDF)">
          <FileUploadField
            className="max-w-[520px]"
            category="company_brochure"
            items={brochureUrl ? [{ key: "brochure_url", url: brochureUrl, name: brochureFileName }] : []}
            isUploading={isBrochureUploading && !brochureUrl}
            busyKeys={isBrochureUploading ? ["brochure_url"] : []}
            onSelect={([file]) => onFileSelect("brochure_url", file)}
            onReplace={(_item, file) => onFileSelect("brochure_url", file)}
            onRemove={() => onFileRemove("brochure_url")}
          />
        </SupplierFormCard>
      </div>
    </>
  );
}

type SocialInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function SocialInput({
  label,
  value,
  onChange,
}: SocialInputProps) {
  return (
    <div className="mb-2 grid grid-cols-[60px_1fr] items-center gap-2">
      <span className="font-semibold text-[#4b506d] text-[9px]">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[30px] rounded-[4px] border border-[#dfe0eb] px-2 text-[#555b76] text-[8px] outline-none focus:border-[#3829d6]"
      />
    </div>
  );
}

type BusinessHourRowProps = {
  day: string;
  open: string;
  close: string;
  closed: boolean;
  onOpenChange: (value: string) => void;
  onCloseChange: (value: string) => void;
  onClosedChange: (value: boolean) => void;
};

function BusinessHourRow({
  day,
  open,
  close,
  closed,
  onOpenChange,
  onCloseChange,
  onClosedChange,
}: BusinessHourRowProps) {
  return (
    <div className="mb-3 grid grid-cols-[55px_1fr_1fr_45px] items-center gap-2">
      <span className="font-semibold text-[#4b506d] text-[9px]">
        {day}
      </span>

      <input
        type="time"
        value={open}
        disabled={closed}
        onChange={(event) =>
          onOpenChange(event.target.value)
        }
        className="h-[28px] rounded border border-[#dfe0eb] px-2 text-[8px] disabled:bg-[#f4f4f8]"
      />

      <input
        type="time"
        value={close}
        disabled={closed}
        onChange={(event) =>
          onCloseChange(event.target.value)
        }
        className="h-[28px] rounded border border-[#dfe0eb] px-2 text-[8px] disabled:bg-[#f4f4f8]"
      />

      <label className="flex cursor-pointer items-center gap-1 text-[#777b92] text-[8px]">
        <input
          type="checkbox"
          checked={closed}
          onChange={(event) =>
            onClosedChange(event.target.checked)
          }
        />
        Closed
      </label>
    </div>
  );
}
