"use client";

import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";

import { COMPANY_PROFILE_STEPS, useCompanyForm } from "@/hooks/use-company-form";

import { CompanyBusinessHoursSection } from "./company-business-hours-section";
import { CompanyBusinessSizeSection } from "./company-business-size-section";
import { CompanyDocumentsSection } from "./company-documents-section";
import { CompanyLocationSection } from "./company-location-section";
import { CompanyMediaSection } from "./company-media-section";
import { CompanyOverviewSection } from "./company-overview-section";
import { CompanyProfileActions, type CompanyProfileActionsMode } from "./company-profile-actions";
import { CompanyProfileStatusBanner } from "./company-profile-status-banner";
import { CompanyProfileStepper } from "./company-profile-stepper";
import { CompanySocialLinksSection } from "./company-social-links-section";
import { ContactInformationSection } from "./contact-information-section";
import { VerificationDetailsSection } from "./verification-details-section";

function formatLastUpdated(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function SupplierCompanyProfilePage() {
  const {
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
    isUploading,
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
  } = useCompanyForm();

  const actionsMode: CompanyProfileActionsMode = isReadOnly ? "readonly" : isVerified ? "verified" : "draft";

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center gap-2 px-7 py-6 text-[#555b76] text-[12px]">
        <Loader2 size={18} className="animate-spin text-[#3125c8]" />
        Loading company profile...
      </section>
    );
  }

  const step = COMPANY_PROFILE_STEPS[currentStep];

  return (
    <section className="px-7 py-6">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-5">
        <div>
          <h1 className="font-bold text-[#171570] text-[28px]">Manage Company Profile</h1>

          <p className="mt-1 text-[#555b76] text-[12px]">
            Complete your public company information and upload verification documents to get verified.
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-[#777b92] text-[8px]">
            <Link href="/supplier/dashboard" className="transition hover:text-[#251bc1]">
              Dashboard
            </Link>

            <ChevronRight size={10} />

            <span className="font-semibold text-[#251bc1]">Manage Company Profile</span>
          </div>
        </div>

        {company?.updated_at && (
          <p className="mt-2 text-[#777b92] text-[9px]">Last updated: {formatLastUpdated(company.updated_at)}</p>
        )}
      </div>

      <CompanyProfileStatusBanner status={verificationStatus} verificationNote={company?.verification_note} />

      <div className="mt-4">
        <CompanyProfileStepper
          currentStep={currentStep}
          completion={company?.profile_completion}
          showMissing={verificationStatus === "DRAFT" || verificationStatus === "REJECTED"}
          isDisabled={isSaving || isSubmitting}
          onStepChange={goToStep}
        />
      </div>

      <h2 className="sr-only" aria-live="polite">
        Step {currentStep + 1} of {COMPANY_PROFILE_STEPS.length}: {step.title}
      </h2>

      {/* A disabled fieldset makes every control read-only while under review. */}
      <fieldset disabled={isReadOnly} className="m-0 mt-4 min-w-0 border-0 p-0">
        {currentStep === 0 && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <CompanyOverviewSection
              name={form.name}
              description={form.description}
              businessTypes={form.business_types}
              errors={fieldErrors}
              onChange={updateField}
            />

            <div className="flex flex-col gap-4">
              <CompanyMediaSection
                companyLogoUrl={form.company_logo_url}
                coverImageUrl={form.cover_image_url}
                isLogoUploading={uploadingFields.includes("company_logo_url")}
                isCoverUploading={uploadingFields.includes("cover_image_url")}
                errors={fieldErrors}
                onFileSelect={uploadFile}
                onFileRemove={removeFile}
              />

              <CompanyBusinessSizeSection
                establishedYear={form.established_year}
                employeeSize={form.employee_size}
                errors={fieldErrors}
                onChange={updateField}
              />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
            <ContactInformationSection
              phoneNumber={form.phone_number}
              email={form.email}
              address={form.address}
              city={form.city}
              state={form.state}
              pinCode={form.pin_code}
              errors={fieldErrors}
              onChange={updateField}
            />

            <CompanyLocationSection
              mapAddress={form.map_address}
              latitude={form.latitude}
              longitude={form.longitude}
              errors={fieldErrors}
              onChange={updateField}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-2">
            <VerificationDetailsSection
              hasGst={form.has_gst}
              gstNumber={form.gst_number}
              gstCertificateUrl={form.gst_certificate_url}
              panNumber={form.pan_number}
              panDocumentUrl={form.pan_document_url}
              registrationNumber={form.registration_number}
              incorporationCertificateUrl={form.incorporation_certificate_url}
              shopEstablishmentNumber={form.shop_establishment_number}
              shopEstablishmentDocumentUrl={form.shop_establishment_document_url}
              fileInfo={fileInfo}
              uploadingFields={uploadingFields}
              errors={fieldErrors}
              onChange={updateField}
              onFileSelect={uploadFile}
              onFileRemove={removeFile}
            />

            {(verificationStatus === "DRAFT" || verificationStatus === "REJECTED") &&
              company?.profile_completion?.missing_fields.includes("registration_proof") && (
                <p className="text-[#dd5e14] text-[8px]">
                  Registration proof is required: add the Incorporation number with its certificate, or the Shop &
                  Establishment number with its certificate.
                </p>
              )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CompanySocialLinksSection
                values={{
                  website_url: form.website_url,
                  facebook_url: form.facebook_url,
                  instagram_url: form.instagram_url,
                  youtube_url: form.youtube_url,
                  linkedin_url: form.linkedin_url,
                }}
                errors={fieldErrors}
                onChange={updateField}
              />

              <CompanyBusinessHoursSection
                businessHours={form.business_hours}
                errors={fieldErrors}
                onChange={updateField}
              />
            </div>

            <CompanyDocumentsSection
              documents={documents}
              isUploadingDocuments={isUploadingDocuments}
              removingDocumentIds={removingDocumentIds}
              brochureUrl={form.brochure_url}
              brochureFileName={fileInfo.brochure_url?.name}
              isBrochureUploading={uploadingFields.includes("brochure_url")}
              errors={fieldErrors}
              onDocumentsAdd={addDocuments}
              onDocumentRemove={removeDocument}
              onFileSelect={uploadFile}
              onFileRemove={removeFile}
            />
          </div>
        )}
      </fieldset>

      <CompanyProfileActions
        mode={actionsMode}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === COMPANY_PROFILE_STEPS.length - 1}
        onBack={goToPreviousStep}
        onNext={goToNextStep}
        onSaveDraft={saveDraft}
        onSubmit={submitForVerification}
        isSaving={isSaving}
        isSubmitting={isSubmitting}
        isDisabled={isUploading}
        canSubmit={canSubmit}
        hasUnsavedChanges={hasUnsavedChanges}
        publicProfileHref={company ? `/companies/${company.slug}` : undefined}
      />
    </section>
  );
}
