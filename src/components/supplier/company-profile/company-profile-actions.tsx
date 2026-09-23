

"use client";

import Link from "next/link";
import { Eye, Info, Save, Send } from "lucide-react";

type CompanyProfileActionsProps = {
  onSaveDraft: () => void;
  onSubmit: () => void;
  isSaving?: boolean;
  isSubmitting?: boolean;
  // Blocks both actions, e.g. while loading or a file is uploading.
  isDisabled?: boolean;
  canSubmit?: boolean;
  publicProfileHref?: string;
};

export function CompanyProfileActions({
  onSaveDraft,
  onSubmit,
  isSaving = false,
  isSubmitting = false,
  isDisabled = false,
  canSubmit = true,
  publicProfileHref,
}: CompanyProfileActionsProps) {
  const isBusy = isDisabled || isSaving || isSubmitting;

  return (
    <div className="mt-4 flex items-center justify-between gap-5 rounded-[8px] border border-[#e2e3ed] bg-white px-4 py-3">
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

      <div className="flex items-center gap-2 text-[#777b92] text-[9px]">
        <Info size={12} className="text-[#3125c7]" />
        Verification usually takes 1-2 business days after submission.
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isBusy}
          className="flex h-[36px] items-center gap-2 rounded-[5px] border border-[#dadbea] bg-white px-4 font-semibold text-[#4e5472] text-[9px] transition hover:bg-[#f7f6ff] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={11} />

          {isSaving ? "Saving..." : "Save Draft"}
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isBusy || !canSubmit}
          className="flex h-[36px] items-center gap-2 rounded-[5px] bg-[#281ac2] px-4 font-bold text-[9px] text-white transition hover:bg-[#3527d3] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={11} />

          {isSubmitting
            ? "Submitting..."
            : "Submit for Verification"}
        </button>
      </div>
    </div>
  );
}