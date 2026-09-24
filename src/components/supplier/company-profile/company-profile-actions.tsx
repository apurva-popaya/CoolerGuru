"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, Info, Save, Send } from "lucide-react";

/*
 * draft    – DRAFT / REJECTED: save per step, submit on the last step.
 * verified – VERIFIED: edits are saved directly, no resubmission.
 * readonly – PENDING: navigation only.
 */
export type CompanyProfileActionsMode = "draft" | "verified" | "readonly";

type CompanyProfileActionsProps = {
  mode: CompanyProfileActionsMode;
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  isSaving?: boolean;
  isSubmitting?: boolean;
  // Blocks saving and submitting, e.g. while a file is uploading.
  isDisabled?: boolean;
  canSubmit?: boolean;
  hasUnsavedChanges?: boolean;
  publicProfileHref?: string;
};

const secondaryButtonClass =
  "flex h-[36px] items-center gap-2 rounded-[5px] border border-[#dadbea] bg-white px-4 font-semibold text-[#4e5472] text-[9px] transition hover:bg-[#f7f6ff] disabled:cursor-not-allowed disabled:opacity-50";

const primaryButtonClass =
  "flex h-[36px] items-center gap-2 rounded-[5px] bg-[#281ac2] px-4 font-bold text-[9px] text-white transition hover:bg-[#3527d3] disabled:cursor-not-allowed disabled:opacity-50";

function getHint(mode: CompanyProfileActionsMode, canSubmit: boolean, hasUnsavedChanges: boolean) {
  if (mode === "readonly") return "Your profile is under review and can't be edited right now.";

  if (hasUnsavedChanges) return "You have unsaved changes.";

  if (mode === "verified") return "Changes to a verified profile are saved directly.";

  if (!canSubmit) return "Complete all required details to submit for verification.";

  return "Verification usually takes 1-2 business days after submission.";
}

export function CompanyProfileActions({
  mode,
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
  onSubmit,
  isSaving = false,
  isSubmitting = false,
  isDisabled = false,
  canSubmit = false,
  hasUnsavedChanges = false,
  publicProfileHref,
}: CompanyProfileActionsProps) {
  const isBusy = isDisabled || isSaving || isSubmitting;
  const isEditable = mode !== "readonly";

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[8px] border border-[#e2e3ed] bg-white px-4 py-3">
      {publicProfileHref ? (
        <Link
          href={publicProfileHref}
          target="_blank"
          className="!text-[#2d22bd] flex h-[36px] items-center gap-2 rounded-[5px] border border-[#d8d9e9] px-4 font-semibold text-[9px] transition hover:bg-[#f7f6ff]"
        >
          <Eye size={12} />
          Preview Public Profile
        </Link>
      ) : (
        <span
          title="Save your profile first"
          className="flex h-[36px] cursor-not-allowed items-center gap-2 rounded-[5px] border border-[#d8d9e9] px-4 font-semibold text-[#2d22bd] text-[9px] opacity-50"
        >
          <Eye size={12} />
          Preview Public Profile
        </span>
      )}

      <p className="flex items-center gap-2 text-[#777b92] text-[9px]" aria-live="polite">
        <Info size={12} className="shrink-0 text-[#3125c7]" />
        {getHint(mode, canSubmit, hasUnsavedChanges)}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={onBack} disabled={isFirstStep || isBusy} className={secondaryButtonClass}>
          <ArrowLeft size={11} />
          Back
        </button>

        {isEditable && (
          <button type="button" onClick={onSaveDraft} disabled={isBusy} className={secondaryButtonClass}>
            <Save size={11} />
            {isSaving ? "Saving..." : mode === "verified" ? "Save Changes" : "Save Draft"}
          </button>
        )}

        {isLastStep ? (
          mode === "draft" && (
            <button type="button" onClick={onSubmit} disabled={isBusy || !canSubmit} className={primaryButtonClass}>
              <Send size={11} />
              {isSubmitting ? "Submitting..." : "Submit for Verification"}
            </button>
          )
        ) : (
          <button type="button" onClick={onNext} disabled={isBusy} className={primaryButtonClass}>
            {isSaving ? "Saving..." : isEditable && hasUnsavedChanges ? "Save & Next" : "Next"}
            <ArrowRight size={11} />
          </button>
        )}
      </div>
    </div>
  );
}
