"use client";

import { useCallback, useEffect, useState } from "react";

import { toast } from "sonner";

import { ApiError } from "@/lib/api/api-client";
import {
  deleteFile,
  getUploadErrorMessage,
  listAllFiles,
  replaceFile,
  toFileIdMap,
  type UploadCategory,
  type UploadedFileRecord,
  uploadFile as uploadFileToApi,
  uploadFiles,
  validateUploadFile,
} from "@/lib/api/file-upload-api";
import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import {
  type BusinessHours,
  type CompanyPayload,
  type CreateCompanyRequest,
  createCompany,
  getMyCompany,
  type SupplierCompany,
  submitCompanyForVerification,
  updateMyCompany,
} from "@/lib/api/supplier-create-profile-api";

/* =========================================
   TYPES
========================================= */

export type CompanyFieldChangeHandler = <K extends keyof CreateCompanyRequest>(
  field: K,
  value: CreateCompanyRequest[K],
) => void;

export type CompanyFileField =
  | "company_logo_url"
  | "cover_image_url"
  | "pan_document_url"
  | "gst_certificate_url"
  | "incorporation_certificate_url"
  | "shop_establishment_document_url"
  | "brochure_url";

export type CompanyFileSelectHandler = (field: CompanyFileField, file: File) => void;

export type CompanyFileRemoveHandler = (field: CompanyFileField) => void;

/* An uploaded file backing one of the company URL fields. */
export interface CompanyFileInfo {
  // Missing for saved URLs that were not uploaded through /uploads.
  fileId?: string;
  name?: string;
}

type ValidationMode = "draft" | "submit";

/* =========================================
   CONSTANTS
========================================= */

const defaultBusinessHours: BusinessHours = {
  monday_to_friday: {
    open: "09:00",
    close: "18:00",
    is_closed: false,
  },
  saturday: {
    open: "09:00",
    close: "14:00",
    is_closed: false,
  },
  sunday: {
    open: null,
    close: null,
    is_closed: true,
  },
};

const initialCompanyForm: CreateCompanyRequest = {
  name: "",
  description: "",

  company_logo_url: "",
  cover_image_url: "",

  company_type: "",
  business_types: [],
  pan_number: "",
  pan_document_url: "",

  has_gst: false,
  gst_number: "",
  gst_certificate_url: "",

  registration_number: "",
  incorporation_certificate_url: "",

  shop_establishment_number: "",
  shop_establishment_document_url: "",

  phone_number: "",
  email: "",

  address: "",
  city: "",
  state: "",
  pin_code: "",

  website_url: "",
  facebook_url: "",
  instagram_url: "",
  youtube_url: "",
  linkedin_url: "",
  twitter_url: "",

  business_hours: defaultBusinessHours,

  map_address: "",
  latitude: 0,
  longitude: 0,

  years_in_business: "",
  employee_size: "",
  certifications: [],

  brochure_url: "",
};

export const COMPANY_FILE_CATEGORIES: Record<CompanyFileField, UploadCategory> = {
  company_logo_url: "company_logo",
  cover_image_url: "company_cover",
  pan_document_url: "pan_document",
  gst_certificate_url: "gst_certificate",
  incorporation_certificate_url: "incorporation_certificate",
  shop_establishment_document_url: "shop_establishment_certificate",
  brochure_url: "company_brochure",
};

const COMPANY_FILE_FIELDS = Object.keys(COMPANY_FILE_CATEGORIES) as CompanyFileField[];

const URL_FIELDS = [
  ["website_url", "Website"],
  ["facebook_url", "Facebook"],
  ["instagram_url", "Instagram"],
  ["youtube_url", "YouTube"],
  ["linkedin_url", "LinkedIn"],
  ["twitter_url", "Twitter"],
] as const satisfies ReadonlyArray<readonly [keyof CreateCompanyRequest, string]>;

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const PIN_CODE_REGEX = /^[1-9][0-9]{5}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* =========================================
   HELPERS
========================================= */

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/*
 * Converts the form state into the request body.
 * The backend validator rejects empty strings, so blank values are dropped.
 */
function toCompanyPayload(form: CreateCompanyRequest): CompanyPayload {
  const payload: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(form)) {
    if (typeof value === "string") {
      const trimmed = value.trim();

      if (trimmed) {
        payload[key] = trimmed;
      }

      continue;
    }

    payload[key] = value;
  }

  const normalizeDay = (day: BusinessHours[keyof BusinessHours]) => ({
    is_closed: day.is_closed,
    open: day.is_closed || !day.open ? null : day.open,
    close: day.is_closed || !day.close ? null : day.close,
  });

  payload.business_hours = {
    monday_to_friday: normalizeDay(form.business_hours.monday_to_friday),
    saturday: normalizeDay(form.business_hours.saturday),
    sunday: normalizeDay(form.business_hours.sunday),
  };

  // No map picker yet, so 0 / 0 means "not set".
  if (!form.latitude && !form.longitude) {
    delete payload.latitude;
    delete payload.longitude;
  }

  if (!form.has_gst) {
    delete payload.gst_number;
    delete payload.gst_certificate_url;
  }

  return payload as CompanyPayload;
}

function fromCompany(company: SupplierCompany): CreateCompanyRequest {
  const form = { ...initialCompanyForm };

  for (const key of Object.keys(initialCompanyForm) as (keyof CreateCompanyRequest)[]) {
    const value = company[key];

    if (value !== null && value !== undefined) {
      (form as Record<string, unknown>)[key] = value;
    }
  }

  return {
    ...form,
    business_hours: company.business_hours ?? defaultBusinessHours,
    latitude: Number(company.latitude ?? 0),
    longitude: Number(company.longitude ?? 0),
  };
}

function validateCompanyForm(form: CreateCompanyRequest, mode: ValidationMode): string | null {
  const value = (field: keyof CreateCompanyRequest) => {
    const fieldValue = form[field];

    return typeof fieldValue === "string" ? fieldValue.trim() : "";
  };

  /* Always validated: the backend rejects invalid formats even for drafts. */

  if (value("name").length < 2) {
    return "Company name must be at least 2 characters.";
  }

  if (value("pan_number") && !PAN_REGEX.test(value("pan_number"))) {
    return "PAN number must be valid (e.g. ABCDE1234F).";
  }

  if (form.has_gst && (!value("gst_number") || !value("gst_certificate_url"))) {
    return "GST number and GST certificate are required when GST registration is Yes.";
  }

  if (form.has_gst && !GST_REGEX.test(value("gst_number"))) {
    return "GST number must be valid (e.g. 24ABCDE1234F1Z5).";
  }

  if (value("pin_code") && !PIN_CODE_REGEX.test(value("pin_code"))) {
    return "PIN code must be a valid 6-digit code.";
  }

  if (value("email") && !EMAIL_REGEX.test(value("email"))) {
    return "Email address must be valid.";
  }

  const phoneLength = value("phone_number").length;

  if (phoneLength && (phoneLength < 7 || phoneLength > 20)) {
    return "Phone number must be between 7 and 20 characters.";
  }

  for (const [field, label] of URL_FIELDS) {
    if (value(field) && !isValidUrl(value(field))) {
      return `${label} link must be a valid URL (starting with https://).`;
    }
  }

  if (mode === "draft") {
    return null;
  }

  /* Submit: mirrors the backend profile completion rules. */

  if (!value("description")) {
    return "Company description is required.";
  }

  if (form.business_types.length === 0) {
    return "Select at least one business type.";
  }

  if (!value("phone_number")) {
    return "Phone number is required.";
  }

  if (!value("email")) {
    return "Email address is required.";
  }

  if (!value("address") || !value("city") || !value("state") || !value("pin_code")) {
    return "Complete address, city, state and PIN code.";
  }

  if (!value("pan_number") || !value("pan_document_url")) {
    return "PAN number and PAN document are required.";
  }

  const hasIncorporationProof = value("registration_number") && value("incorporation_certificate_url");

  const hasShopEstablishmentProof = value("shop_establishment_number") && value("shop_establishment_document_url");

  if (!hasIncorporationProof && !hasShopEstablishmentProof) {
    return "Add either Shop & Establishment or Incorporation details with the certificate.";
  }

  return null;
}

/* =========================================
   HOOK
========================================= */

export function useCompanyForm() {
  const [form, setForm] = useState<CreateCompanyRequest>(initialCompanyForm);

  const [company, setCompany] = useState<SupplierCompany | null>(null);

  const [fileInfo, setFileInfo] = useState<Partial<Record<CompanyFileField, CompanyFileInfo>>>({});

  const [uploadingFields, setUploadingFields] = useState<CompanyFileField[]>([]);

  const [documents, setDocuments] = useState<UploadedFileRecord[]>([]);
  const [isUploadingDocuments, setIsUploadingDocuments] = useState(false);
  const [removingDocumentIds, setRemovingDocumentIds] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadDocuments = useCallback(async () => {
    const files = await listAllFiles({ category: "company_document" });

    setDocuments(files);
  }, []);

  /* Load existing company (if any) and the files behind its URLs */
  useEffect(() => {
    let isMounted = true;

    const loadCompany = async () => {
      try {
        const response = await getMyCompany();
        const existingCompany = response.data?.company;

        if (!isMounted || !existingCompany) return;

        setCompany(existingCompany);
        setForm(fromCompany(existingCompany));

        // GET /companies/me returns URLs only; look up their fileIds.
        // Filter by category so product images are not fetched as well.
        const categories: UploadCategory[] = [...Object.values(COMPANY_FILE_CATEGORIES), "company_document"];

        const files = (await Promise.all(categories.map((category) => listAllFiles({ category })))).flat();
        const filesByUrl = toFileIdMap(files);

        if (!isMounted) return;

        setDocuments(files.filter((file) => file.category === "company_document"));

        const nextFileInfo: Partial<Record<CompanyFileField, CompanyFileInfo>> = {};

        for (const field of COMPANY_FILE_FIELDS) {
          const url = existingCompany[field];
          const file = url ? filesByUrl.get(url) : undefined;

          if (file) {
            nextFileInfo[field] = {
              fileId: file.fileId,
              name: file.originalFilename ?? undefined,
            };
          }
        }

        setFileInfo(nextFileInfo);
      } catch (error) {
        // 404 = no company yet, the form stays in "create" mode.
        if (!(error instanceof ApiError && error.status === 404)) {
          toast.error(getApiErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCompany();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateField: CompanyFieldChangeHandler = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * New file → POST /uploads. When the field already has an uploaded file,
   * replace it in place (PUT keeps the fileId, returns a new url).
   */
  const uploadFile: CompanyFileSelectHandler = async (field, file) => {
    const category = COMPANY_FILE_CATEGORIES[field];

    const validationError = validateUploadFile(file, category);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    const existingFileId = fileInfo[field]?.fileId;

    setUploadingFields((previous) => [...previous, field]);

    try {
      const uploaded = existingFileId ? await replaceFile(existingFileId, file) : await uploadFileToApi(file, category);

      setFileInfo((previous) => ({
        ...previous,
        [field]: {
          fileId: uploaded.fileId,
          name: file.name,
        },
      }));

      updateField(field, uploaded.url);
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setUploadingFields((previous) => previous.filter((item) => item !== field));
    }
  };

  const removeFile: CompanyFileRemoveHandler = async (field) => {
    const fileId = fileInfo[field]?.fileId;

    if (fileId) {
      setUploadingFields((previous) => [...previous, field]);

      try {
        // The backend also clears the saved company field.
        await deleteFile(fileId);
      } catch (error) {
        // 404 = already gone; clear the field anyway.
        if (!(error instanceof ApiError && error.status === 404)) {
          toast.error(getUploadErrorMessage(error));
          return;
        }
      } finally {
        setUploadingFields((previous) => previous.filter((item) => item !== field));
      }
    }

    setFileInfo((previous) => {
      const { [field]: _removed, ...rest } = previous;

      return rest;
    });

    updateField(field, "");
  };

  /* General company documents: a list, not tied to a form field */
  const addDocuments = async (files: File[]) => {
    setIsUploadingDocuments(true);

    try {
      const uploaded = await uploadFiles(files, "company_document");

      toast.success(files.length > 1 ? "Documents uploaded." : "Document uploaded.");

      try {
        await loadDocuments();
      } catch {
        // Listing can fail before the company is saved; show the uploads anyway.
        const now = new Date().toISOString();

        setDocuments((previous) => [
          ...previous,
          ...uploaded.map((file, index) => ({
            ...file,
            originalFilename: files[index]?.name ?? null,
            companyId: null,
            productId: null,
            categoryId: null,
            createdAt: now,
            updatedAt: now,
          })),
        ]);
      }
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setIsUploadingDocuments(false);
    }
  };

  const removeDocument = async (fileId: string) => {
    setRemovingDocumentIds((previous) => [...previous, fileId]);

    try {
      await deleteFile(fileId);

      setDocuments((previous) => previous.filter((document) => document.fileId !== fileId));
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setRemovingDocumentIds((previous) => previous.filter((id) => id !== fileId));
    }
  };

  /* Create on first save, update afterwards */
  const persistCompany = async () => {
    const payload = toCompanyPayload(form);

    const response = company ? await updateMyCompany(payload) : await createCompany(payload);

    const savedCompany = response.data?.company ?? null;

    if (savedCompany) {
      setCompany(savedCompany);
    }

    return savedCompany;
  };

  const saveDraft = async () => {
    const validationError = validateCompanyForm(form, "draft");

    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setIsSaving(true);

      await persistCompany();

      toast.success("Company profile saved as draft.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const submitForVerification = async () => {
    const validationError = validateCompanyForm(form, "submit");

    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      await persistCompany();

      const response = await submitCompanyForVerification();

      if (response.data?.company) {
        setCompany(response.data.company);
      }

      toast.success("Company profile submitted for verification.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    company,
    fileInfo,
    uploadingFields,
    documents,
    isUploadingDocuments,
    removingDocumentIds,
    isLoading,
    isSaving,
    isSubmitting,
    isUploading: uploadingFields.length > 0 || isUploadingDocuments,
    setForm,
    updateField,
    uploadFile,
    removeFile,
    addDocuments,
    removeDocument,
    saveDraft,
    submitForVerification,
  };
}
