


"use client";

import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";

import { useCompanyForm } from "@/hooks/use-company-form";

import { CompanyAdditionalDetails } from "./company-additional-details";
import { CompanyMediaSection } from "./company-media-section";
import { CompanyOverviewSection } from "./company-overview-section";
import { CompanyProfileActions } from "./company-profile-actions";
import { CompanyProfileStatusBanner } from "./company-profile-status-banner";
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
    submitForVerification,
  } = useCompanyForm();

  const verificationStatus = company?.verification_status ?? "DRAFT";

  const canSubmit = verificationStatus === "DRAFT" || verificationStatus === "REJECTED";

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center gap-2 px-7 py-6 text-[#555b76] text-[12px]">
        <Loader2 size={18} className="animate-spin text-[#3125c8]" />
        Loading company profile...
      </section>
    );
  }

  return (
    <section className="px-7 py-6">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-5">
        <div>
          <h1 className="font-bold text-[#171570] text-[28px]">
            Manage Company Profile
          </h1>

          <p className="mt-1 text-[#555b76] text-[12px]">
            Complete your public company information and upload
            verification documents to get verified.
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-[#777b92] text-[8px]">
            <Link
              href="/supplier/dashboard"
              className="transition hover:text-[#251bc1]"
            >
              Dashboard
            </Link>

            <ChevronRight size={10} />

            <span className="font-semibold text-[#251bc1]">
              Manage Company Profile
            </span>
          </div>
        </div>

        {company?.updated_at && (
          <p className="mt-2 text-[#777b92] text-[9px]">
            Last updated: {formatLastUpdated(company.updated_at)}
          </p>
        )}
      </div>

      {/* Profile Status */}
      <CompanyProfileStatusBanner
        status={verificationStatus}
        completion={company?.profile_completion}
        verificationNote={company?.verification_note}
      />

      {/* 1. Company Overview + 2. Media */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <CompanyOverviewSection
          name={form.name}
          description={form.description}
          businessTypes={form.business_types}
          onChange={updateField}
        />

        <CompanyMediaSection
          companyLogoUrl={form.company_logo_url}
          coverImageUrl={form.cover_image_url}
          isLogoUploading={uploadingFields.includes("company_logo_url")}
          isCoverUploading={uploadingFields.includes("cover_image_url")}
          onFileSelect={uploadFile}
          onFileRemove={removeFile}
        />
      </div>

      {/* 3. Verification + 4. Contact */}
      <div className="mt-4 grid grid-cols-[1.2fr_1fr] gap-4">
        <VerificationDetailsSection
          companyType={form.company_type}
          hasGst={form.has_gst}
          gstNumber={form.gst_number}
          gstCertificateUrl={form.gst_certificate_url}
          panNumber={form.pan_number}
          panDocumentUrl={form.pan_document_url}
          registrationNumber={form.registration_number}
          incorporationCertificateUrl={
            form.incorporation_certificate_url
          }
          shopEstablishmentNumber={form.shop_establishment_number}
          shopEstablishmentDocumentUrl={form.shop_establishment_document_url}
          fileInfo={fileInfo}
          uploadingFields={uploadingFields}
          documents={documents}
          isUploadingDocuments={isUploadingDocuments}
          removingDocumentIds={removingDocumentIds}
          onChange={updateField}
          onFileSelect={uploadFile}
          onFileRemove={removeFile}
          onDocumentsAdd={addDocuments}
          onDocumentRemove={removeDocument}
        />

        <ContactInformationSection
          phoneNumber={form.phone_number}
          email={form.email}
          address={form.address}
          city={form.city}
          state={form.state}
          pinCode={form.pin_code}
          onChange={updateField}
        />
      </div>

      {/* 5 - 11. Additional Details */}
      <CompanyAdditionalDetails
        websiteUrl={form.website_url}
        facebookUrl={form.facebook_url}
        instagramUrl={form.instagram_url}
        youtubeUrl={form.youtube_url}
        linkedinUrl={form.linkedin_url}
        businessHours={form.business_hours}
        mapAddress={form.map_address}
        latitude={form.latitude}
        longitude={form.longitude}
        yearsInBusiness={form.years_in_business}
        employeeSize={form.employee_size}
        certifications={form.certifications}
        brochureUrl={form.brochure_url}
        brochureFileName={fileInfo.brochure_url?.name}
        isBrochureUploading={uploadingFields.includes("brochure_url")}
        onChange={updateField}
        onFileSelect={uploadFile}
        onFileRemove={removeFile}
      />

      {/* Actions */}
      <CompanyProfileActions
        onSaveDraft={saveDraft}
        onSubmit={submitForVerification}
        isSaving={isSaving}
        isSubmitting={isSubmitting}
        isDisabled={isUploading}
        canSubmit={canSubmit}
        publicProfileHref={company ? `/companies/${company.slug}` : undefined}
      />
    </section>
  );
}