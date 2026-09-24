"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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
  type CompanyDraftPayload,
  type CompanyProfileCompletion,
  type CreateCompanyRequest,
  getMyCompany,
  type SupplierCompany,
  saveCompanyDraft,
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

/* Error message per field name, from client validation or the API. */
export type CompanyFieldErrors = Partial<Record<string, string>>;

type CompletionFlag = keyof Pick<
  CompanyProfileCompletion,
  | "company_details_complete"
  | "contact_details_complete"
  | "location_details_complete"
  | "verification_documents_complete"
>;

export interface CompanyProfileStep {
  title: string;
  description: string;
  // Form fields and `missing_fields` names that belong to this step.
  fields: readonly string[];
  // Empty when the step has no required items.
  completionFlags: readonly CompletionFlag[];
}

type PersistResult = { ok: true; company: SupplierCompany | null; didSave: boolean } | { ok: false };

/* =========================================
   CONSTANTS
========================================= */

export const COMPANY_PROFILE_STEPS: readonly CompanyProfileStep[] = [
  {
    title: "Company Details",
    description: "Overview, logo and business size",
    fields: [
      "name",
      "description",
      "business_types",
      "company_logo_url",
      "cover_image_url",
      "established_year",
      "employee_size",
    ],
    completionFlags: ["company_details_complete"],
  },
  {
    title: "Contact & Location",
    description: "How buyers can reach you",
    fields: ["phone_number", "email", "address", "city", "state", "pin_code", "map_address", "latitude", "longitude"],
    completionFlags: ["contact_details_complete", "location_details_complete"],
  },
  {
    title: "Verification Documents",
    description: "PAN, GST and registration proof",
    fields: [
      "pan_number",
      "pan_document_url",
      "has_gst",
      "gst_number",
      "gst_certificate_url",
      "registration_number",
      "incorporation_certificate_url",
      "shop_establishment_number",
      "shop_establishment_document_url",
      "registration_proof",
    ],
    completionFlags: ["verification_documents_complete"],
  },
  {
    title: "Online Presence",
    description: "Links, hours, certificates and brochure",
    fields: [
      "website_url",
      "facebook_url",
      "instagram_url",
      "youtube_url",
      "linkedin_url",
      "twitter_url",
      "business_hours",
      "certifications",
      "brochure_url",
    ],
    completionFlags: [],
  },
];

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
  established_year: "",
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

/* Fields sent to the draft endpoint. Legacy `company_type` / `years_in_business` are left out. */
const DRAFT_FIELDS = [
  "name",
  "description",
  "business_types",
  "company_logo_url",
  "cover_image_url",
  "established_year",
  "employee_size",
  "phone_number",
  "email",
  "address",
  "city",
  "state",
  "pin_code",
  "map_address",
  "latitude",
  "longitude",
  "pan_number",
  "pan_document_url",
  "has_gst",
  "gst_number",
  "gst_certificate_url",
  "registration_number",
  "incorporation_certificate_url",
  "shop_establishment_number",
  "shop_establishment_document_url",
  "website_url",
  "facebook_url",
  "instagram_url",
  "youtube_url",
  "linkedin_url",
  "twitter_url",
  "business_hours",
  "certifications",
  "brochure_url",
] as const satisfies ReadonlyArray<keyof CompanyDraftPayload & keyof CreateCompanyRequest>;

type DraftField = (typeof DRAFT_FIELDS)[number];

/* Normalized request values: trimmed text, "" → null, numbers parsed. */
type DraftValues = Record<DraftField, unknown>;

const GST_FIELDS: readonly DraftField[] = ["gst_number", "gst_certificate_url"];

const URL_FIELDS = [
  ["website_url", "Website"],
  ["facebook_url", "Facebook"],
  ["instagram_url", "Instagram"],
  ["youtube_url", "YouTube"],
  ["linkedin_url", "LinkedIn"],
  ["twitter_url", "Twitter"],
] as const satisfies ReadonlyArray<readonly [DraftField, string]>;

const LENGTH_RULES = [
  ["description", "Description", 500],
  ["employee_size", "Employee size", 255],
  ["city", "City", 255],
  ["state", "State", 255],
  ["address", "Address", 500],
  ["map_address", "Map address", 500],
  ["registration_number", "Registration number", 255],
  ["shop_establishment_number", "Shop & Establishment number", 255],
] as const satisfies ReadonlyArray<readonly [DraftField, string, number]>;

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const PIN_CODE_REGEX = /^[1-9][0-9]{5}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* API validation messages look like "pan_number: PAN number must be valid." */
const FIELD_ERROR_REGEX = /^([a-z_]+): (.+)$/;

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

function normalizeBusinessHours(hours: BusinessHours) {
  const normalizeDay = (day: BusinessHours[keyof BusinessHours]) => ({
    open: day.is_closed || !day.open ? null : day.open,
    close: day.is_closed || !day.close ? null : day.close,
    is_closed: day.is_closed,
  });

  return {
    monday_to_friday: normalizeDay(hours.monday_to_friday),
    saturday: normalizeDay(hours.saturday),
    sunday: normalizeDay(hours.sunday),
  };
}

function toDraftValues(form: CreateCompanyRequest): DraftValues {
  const values = {} as DraftValues;

  for (const field of DRAFT_FIELDS) {
    const value = form[field];

    values[field] = typeof value === "string" ? value.trim() || null : value;
  }

  values.established_year = values.established_year === null ? null : Number(values.established_year);

  // No map picker yet, so 0 / 0 means "not set".
  const hasLocation = Boolean(form.latitude || form.longitude);

  values.latitude = hasLocation ? form.latitude : null;
  values.longitude = hasLocation ? form.longitude : null;

  values.business_hours = normalizeBusinessHours(form.business_hours);

  return values;
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
    established_year: company.established_year === null ? "" : String(company.established_year),
    latitude: Number(company.latitude ?? 0),
    longitude: Number(company.longitude ?? 0),
  };
}

/*
 * What the server currently holds, in request form.
 * Hours the server has never stored stay null (see getChanges / persistChanges).
 */
function toSavedValues(company: SupplierCompany | null): DraftValues {
  const values = toDraftValues(company ? fromCompany(company) : initialCompanyForm);

  values.business_hours = company?.business_hours ? normalizeBusinessHours(company.business_hours) : null;

  return values;
}

function isSameValue(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/* Only the fields that differ from the server are sent. */
function getChanges(form: CreateCompanyRequest, savedValues: DraftValues): CompanyDraftPayload {
  const current = toDraftValues(form);
  const changes: Partial<DraftValues> = {};

  for (const field of DRAFT_FIELDS) {
    // GST fields are hidden when "No GST" is selected.
    if (!form.has_gst && GST_FIELDS.includes(field)) continue;

    // Default hours shown for a company without saved hours are not a user change.
    const saved =
      field === "business_hours" && savedValues.business_hours === null
        ? normalizeBusinessHours(defaultBusinessHours)
        : savedValues[field];

    if (!isSameValue(current[field], saved)) {
      changes[field] = current[field];
    }
  }

  return changes as CompanyDraftPayload;
}

/* Mirrors the backend draft validator for the fields being sent. */
function validateChanges(changes: CompanyDraftPayload): CompanyFieldErrors {
  const errors: CompanyFieldErrors = {};
  const values = changes as Partial<DraftValues>;

  const text = (field: DraftField) => {
    const value = values[field];

    return typeof value === "string" ? value : null;
  };

  if ("name" in values) {
    const name = text("name") ?? "";

    if (name.length < 2 || name.length > 180) {
      errors.name = name ? "Company name must be 2 to 180 characters." : "Company name cannot be empty.";
    }
  }

  for (const [field, label, max] of LENGTH_RULES) {
    if ((text(field)?.length ?? 0) > max) {
      errors[field] = `${label} must be at most ${max} characters.`;
    }
  }

  const phone = text("phone_number");

  if (phone && (phone.length < 7 || phone.length > 20)) {
    errors.phone_number = "Phone number must be between 7 and 20 characters.";
  }

  const email = text("email");

  if (email && !EMAIL_REGEX.test(email)) {
    errors.email = "Email address must be valid.";
  }

  const pinCode = text("pin_code");

  if (pinCode && !PIN_CODE_REGEX.test(pinCode)) {
    errors.pin_code = "PIN code must be a valid 6-digit code.";
  }

  const panNumber = text("pan_number");

  if (panNumber && !PAN_REGEX.test(panNumber)) {
    errors.pan_number = "PAN number must be valid (e.g. ABCDE1234F).";
  }

  const gstNumber = text("gst_number");

  if (gstNumber && !GST_REGEX.test(gstNumber)) {
    errors.gst_number = "GST number must be valid (e.g. 24ABCDE1234F1Z5).";
  }

  const establishedYear = values.established_year;
  const currentYear = new Date().getFullYear();

  if (
    typeof establishedYear === "number" &&
    (!Number.isInteger(establishedYear) || establishedYear < 1800 || establishedYear > currentYear)
  ) {
    errors.established_year = `Established year must be between 1800 and ${currentYear}.`;
  }

  const latitude = values.latitude;
  const longitude = values.longitude;

  if (typeof latitude === "number" && (latitude < -90 || latitude > 90)) {
    errors.latitude = "Latitude must be between -90 and 90.";
  }

  if (typeof longitude === "number" && (longitude < -180 || longitude > 180)) {
    errors.longitude = "Longitude must be between -180 and 180.";
  }

  for (const [field, label] of URL_FIELDS) {
    const url = text(field);

    if (url && !isValidUrl(url)) {
      errors[field] = `${label} link must be a valid URL (starting with https://).`;
    }
  }

  if (changes.certifications?.some((certification) => certification.length > 100)) {
    errors.certifications = "Each certification must be at most 100 characters.";
  }

  return errors;
}

export function getStepForField(field: string) {
  return COMPANY_PROFILE_STEPS.findIndex((step) => step.fields.includes(field));
}

const BUSINESS_HOURS_STEP = getStepForField("business_hours");

/* Resume at the first step that still has a missing required field. */
function getResumeStep(company: SupplierCompany) {
  if (company.verification_status !== "DRAFT" && company.verification_status !== "REJECTED") {
    return 0;
  }

  for (const field of company.profile_completion?.missing_fields ?? []) {
    const step = getStepForField(field);

    if (step >= 0) return step;
  }

  return 0;
}

/* =========================================
   HOOK
========================================= */

export function useCompanyForm() {
  const [form, setForm] = useState<CreateCompanyRequest>(initialCompanyForm);

  // Last state confirmed by the server; the diff against it is what gets sent.
  const [savedValues, setSavedValues] = useState<DraftValues>(() => toSavedValues(null));

  const [company, setCompany] = useState<SupplierCompany | null>(null);

  const [fieldErrors, setFieldErrors] = useState<CompanyFieldErrors>({});

  const [currentStep, setCurrentStep] = useState(0);

  const [fileInfo, setFileInfo] = useState<Partial<Record<CompanyFileField, CompanyFileInfo>>>({});

  const [uploadingFields, setUploadingFields] = useState<CompanyFileField[]>([]);

  const [documents, setDocuments] = useState<UploadedFileRecord[]>([]);
  const [isUploadingDocuments, setIsUploadingDocuments] = useState(false);
  const [removingDocumentIds, setRemovingDocumentIds] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const verificationStatus = company?.verification_status ?? "DRAFT";

  // Under review: nothing can be edited until the admin decides.
  const isReadOnly = verificationStatus === "PENDING";

  // Verified companies are edited through PATCH /companies/me.
  const isVerified = verificationStatus === "VERIFIED";

  const canSubmit =
    (verificationStatus === "DRAFT" || verificationStatus === "REJECTED") &&
    Boolean(company?.profile_completion?.can_submit_for_verification);

  const changes = useMemo(() => getChanges(form, savedValues), [form, savedValues]);

  const hasUnsavedChanges = Object.keys(changes).length > 0;

  const lastStep = COMPANY_PROFILE_STEPS.length - 1;

  const loadDocuments = useCallback(async () => {
    const files = await listAllFiles({ category: "company_document" });

    setDocuments(files);
  }, []);

  /*
   * The server response is the source of truth. With a snapshot, fields the
   * user edited while the request was in flight are kept.
   */
  const applyCompany = useCallback((savedCompany: SupplierCompany, snapshot?: CreateCompanyRequest) => {
    const nextForm = fromCompany(savedCompany);

    setCompany(savedCompany);
    setSavedValues(toSavedValues(savedCompany));

    setForm((current) => {
      if (!snapshot) return nextForm;

      const merged: Record<string, unknown> = { ...nextForm };

      for (const key of Object.keys(nextForm) as (keyof CreateCompanyRequest)[]) {
        if (current[key] !== snapshot[key]) {
          merged[key] = current[key];
        }
      }

      return merged as unknown as CreateCompanyRequest;
    });
  }, []);

  /* Refreshes status and progress only; unsaved input is left alone. */
  const refreshCompany = useCallback(async () => {
    try {
      const response = await getMyCompany();

      if (response.data?.company) {
        setCompany(response.data.company);
      }
    } catch {
      // Progress stays stale until the next save.
    }
  }, []);

  /* Load existing company (if any) and the files behind its URLs */
  useEffect(() => {
    let isMounted = true;

    const loadCompany = async () => {
      try {
        const response = await getMyCompany();
        const existingCompany = response.data?.company;

        if (!isMounted || !existingCompany) return;

        applyCompany(existingCompany);
        setCurrentStep(getResumeStep(existingCompany));

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
  }, [applyCompany]);

  const updateField: CompanyFieldChangeHandler = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setFieldErrors((previous) => {
      if (!(field in previous)) return previous;

      const { [field]: _removed, ...rest } = previous;

      return rest;
    });
  };

  const showFieldErrors = (errors: CompanyFieldErrors) => {
    setFieldErrors((previous) => ({ ...previous, ...errors }));

    const firstField = Object.keys(errors)[0];
    const step = firstField ? getStepForField(firstField) : -1;

    if (step >= 0) {
      setCurrentStep(step);
    }
  };

  /*
   * 409 / 422 messages that start with a field name highlight that field.
   * A 409 without one means the status changed (e.g. under review), so reload it.
   */
  const handleRequestError = (error: unknown) => {
    toast.error(getApiErrorMessage(error));

    if (!(error instanceof ApiError) || (error.status !== 409 && error.status !== 422)) {
      return;
    }

    const match = FIELD_ERROR_REGEX.exec(error.message);

    if (match) {
      showFieldErrors({ [match[1]]: match[2] });
    } else if (error.status === 409) {
      void refreshCompany();
    }
  };

  /* Sends the changed fields; resolves ok when there was nothing to send. */
  const persistChanges = async (): Promise<PersistResult> => {
    // Saving the hours step stores the default hours the user accepted as shown.
    const payload: CompanyDraftPayload =
      currentStep === BUSINESS_HOURS_STEP && savedValues.business_hours === null && !changes.business_hours
        ? { ...changes, business_hours: normalizeBusinessHours(form.business_hours) }
        : changes;

    if (isReadOnly || Object.keys(payload).length === 0) {
      return { ok: true, company, didSave: false };
    }

    const errors = validateChanges(payload);
    const firstError = Object.values(errors)[0];

    if (firstError) {
      showFieldErrors(errors);
      toast.error(firstError);

      return { ok: false };
    }

    const snapshot = form;

    setIsSaving(true);

    try {
      const response = isVerified ? await updateMyCompany(payload) : await saveCompanyDraft(payload);
      const savedCompany = response.data?.company ?? null;

      if (savedCompany) {
        applyCompany(savedCompany, snapshot);
      }

      toast.success(response.message ?? "Company profile saved.");

      return { ok: true, company: savedCompany, didSave: true };
    } catch (error) {
      handleRequestError(error);

      return { ok: false };
    } finally {
      setIsSaving(false);
    }
  };

  const saveDraft = async () => {
    const result = await persistChanges();

    if (result.ok && !result.didSave) {
      toast.info("No changes to save.");
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(Math.min(Math.max(step, 0), lastStep));
  };

  const goToPreviousStep = () => goToStep(currentStep - 1);

  /* Saves the current changes before moving on; stays on the step if saving fails. */
  const goToNextStep = async () => {
    const result = await persistChanges();

    if (result.ok) {
      goToStep(currentStep + 1);
    }
  };

  const submitForVerification = async () => {
    const result = await persistChanges();

    if (!result.ok) return;

    const completion = result.company?.profile_completion;

    if (!completion?.can_submit_for_verification) {
      toast.error("Complete all required details before submitting for verification.");

      const step = getStepForField(completion?.missing_fields[0] ?? "");

      if (step >= 0) {
        setCurrentStep(step);
      }

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitCompanyForVerification();

      if (response.data?.company) {
        applyCompany(response.data.company);
      } else {
        await refreshCompany();
      }

      toast.success("Company profile submitted for verification.");
    } catch (error) {
      handleRequestError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * New file → POST /uploads; the URL is saved with the next draft PATCH.
   * When the field already has an uploaded file, replace it in place
   * (PUT keeps the fileId; the backend also updates the saved company field).
   */
  const uploadFile: CompanyFileSelectHandler = async (field, file) => {
    if (isReadOnly) return;

    const category = COMPANY_FILE_CATEGORIES[field];

    const validationError = validateUploadFile(file, category);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    const existingFileId = fileInfo[field]?.fileId;
    const previousUrl = form[field].trim() || null;
    const isSavedFile = Boolean(existingFileId && previousUrl && savedValues[field] === previousUrl);

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

      if (isSavedFile) {
        setSavedValues((previous) => ({ ...previous, [field]: uploaded.url }));
        void refreshCompany();
      }
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setUploadingFields((previous) => previous.filter((item) => item !== field));
    }
  };

  const removeFile: CompanyFileRemoveHandler = async (field) => {
    if (isReadOnly) return;

    const fileId = fileInfo[field]?.fileId;
    const previousUrl = form[field].trim() || null;
    const isSavedFile = Boolean(fileId && previousUrl && savedValues[field] === previousUrl);

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

    if (isSavedFile) {
      setSavedValues((previous) => ({ ...previous, [field]: null }));
      void refreshCompany();
    }
  };

  /* General company documents: a list, not tied to a form field */
  const addDocuments = async (files: File[]) => {
    if (isReadOnly) return;

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
    if (isReadOnly) return;

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

  return {
    form,
    company,
    verificationStatus,
    isReadOnly,
    isVerified,
    canSubmit,
    hasUnsavedChanges,
    fieldErrors,
    currentStep,
    fileInfo,
    uploadingFields,
    documents,
    isUploadingDocuments,
    removingDocumentIds,
    isLoading,
    isSaving,
    isSubmitting,
    isUploading: uploadingFields.length > 0 || isUploadingDocuments,
    updateField,
    uploadFile,
    removeFile,
    addDocuments,
    removeDocument,
    saveDraft,
    goToStep,
    goToPreviousStep,
    goToNextStep,
    submitForVerification,
  };
}
