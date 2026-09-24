"use client";

import { Check } from "lucide-react";

import { COMPANY_PROFILE_STEPS, type CompanyProfileStep } from "@/hooks/use-company-form";
import type { CompanyProfileCompletion } from "@/lib/api/supplier-create-profile-api";

/* Labels for `profile_completion.missing_fields`. */
const MISSING_FIELD_LABELS: Record<string, string> = {
  name: "Company name",
  description: "Description",
  business_types: "Business type",
  phone_number: "Phone number",
  email: "Email",
  address: "Address",
  city: "City",
  state: "State",
  pin_code: "PIN code",
  pan_number: "PAN number",
  pan_document_url: "PAN document",
  registration_proof: "Registration proof",
  gst_number: "GST number",
  gst_certificate_url: "GST certificate",
};

function getMissingLabel(field: string) {
  return MISSING_FIELD_LABELS[field] ?? field.replaceAll("_", " ");
}

type StepState = "complete" | "incomplete" | "optional" | "unknown";

function getStepState(step: CompanyProfileStep, completion?: CompanyProfileCompletion): StepState {
  if (step.completionFlags.length === 0) return "optional";

  if (!completion) return "unknown";

  return step.completionFlags.every((flag) => completion[flag]) ? "complete" : "incomplete";
}

type CompanyProfileStepperProps = {
  currentStep: number;
  completion?: CompanyProfileCompletion;
  showMissing: boolean;
  isDisabled?: boolean;
  onStepChange: (step: number) => void;
};

export function CompanyProfileStepper({
  currentStep,
  completion,
  showMissing,
  isDisabled = false,
  onStepChange,
}: CompanyProfileStepperProps) {
  const percentage = completion?.percentage ?? 0;

  return (
    <div className="rounded-[9px] border border-[#e1e2ed] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-bold text-[#171570] text-[11px]">Profile completion</p>

        <p className="text-[#777b92] text-[9px]">
          {completion
            ? `${completion.completed_required_items} of ${completion.total_required_items} required items · ${percentage}%`
            : "Save your first step to track progress"}
        </p>
      </div>

      <div
        role="progressbar"
        aria-label="Profile completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        className="mt-2 h-[6px] overflow-hidden rounded-full bg-[#ecebff]"
      >
        <div className="h-full rounded-full bg-[#3125c8] transition-all" style={{ width: `${percentage}%` }} />
      </div>

      <ol className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {COMPANY_PROFILE_STEPS.map((step, index) => {
          const state = getStepState(step, completion);
          const isCurrent = index === currentStep;

          const missing = showMissing
            ? (completion?.missing_fields ?? []).filter((field) => step.fields.includes(field))
            : [];

          return (
            <li key={step.title}>
              <button
                type="button"
                onClick={() => onStepChange(index)}
                disabled={isDisabled}
                aria-current={isCurrent ? "step" : undefined}
                className={`flex h-full w-full items-start gap-2.5 rounded-[7px] border px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3024c8]/40 disabled:cursor-not-allowed ${
                  isCurrent ? "border-[#3024c9] bg-[#f8f7ff]" : "border-[#e2e3ed] bg-white hover:bg-[#fbfaff]"
                }`}
              >
                <span
                  className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full font-bold text-[9px] ${
                    state === "complete"
                      ? "bg-[#1f9d55] text-white"
                      : isCurrent
                        ? "bg-[#3024c9] text-white"
                        : "bg-[#ecebff] text-[#3125c8]"
                  }`}
                >
                  {state === "complete" ? <Check size={12} aria-label="Complete" /> : index + 1}
                </span>

                <span className="min-w-0">
                  <span className="block font-bold text-[#171570] text-[10px]">{step.title}</span>

                  <span className="mt-0.5 block text-[#777b92] text-[8px]">{step.description}</span>

                  {state === "optional" && <span className="mt-1 block text-[#9295a8] text-[7.5px]">Optional</span>}

                  {missing.length > 0 && (
                    <span className="mt-1 block text-[#dd5e14] text-[7.5px]">
                      Missing: {missing.map(getMissingLabel).join(", ")}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
