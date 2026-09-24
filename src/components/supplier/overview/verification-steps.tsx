import { Check, RefreshCw } from "lucide-react";

import type { VerificationProgress, VerificationStatus } from "./types";

interface VerificationStepsProps {
  status: VerificationStatus;
  progress?: VerificationProgress;
}

export function VerificationSteps({ status, progress }: VerificationStepsProps) {
  const submitted = status !== "NOT_VERIFIED";

  const detailsComplete = submitted || Boolean(progress?.companyDetailsComplete);

  const documentsComplete = submitted || Boolean(progress?.documentsComplete);

  return (
    <div className="border-black/[0.06] border-t px-7 py-4">
      <div className="grid grid-cols-3">
        <VerificationStep number="1" label="Company Details" completed={detailsComplete} active={!detailsComplete} />

        <VerificationStep
          number="2"
          label="Verification Documents"
          completed={documentsComplete}
          active={detailsComplete && !documentsComplete}
        />

        <VerificationStep
          number="3"
          label={status === "REJECTED" ? "Update & Resubmit" : "Submit for Review"}
          completed={status === "UNDER_VERIFICATION" || status === "VERIFIED" || status === "REJECTED"}
          active={status === "REJECTED"}
          rejected={status === "REJECTED"}
          last
        />
      </div>
    </div>
  );
}

interface VerificationStepProps {
  number: string;
  label: string;
  completed?: boolean;
  active?: boolean;
  rejected?: boolean;
  last?: boolean;
}

function VerificationStep({
  number,
  label,
  completed = false,
  active = false,
  rejected = false,
  last = false,
}: VerificationStepProps) {
  const circleClass =
    completed && !rejected
      ? "border-[#6fc789] bg-[#effbf2] text-[#17943c]"
      : rejected
        ? "border-[#e98686] bg-[#fff0f0] text-[#d33d3d]"
        : active
          ? "border-[#f28b35] bg-white text-[#e96c19]"
          : "border-[#e0e2eb] bg-[#f1f2f7] text-[#555b76]";

  return (
    <div className="flex items-center">
      <div
        className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border font-bold text-[11px] ${circleClass}`}
      >
        {completed && !rejected ? <Check size={14} /> : rejected ? <RefreshCw size={13} /> : number}
      </div>

      <span className="ml-2 whitespace-nowrap font-semibold text-[#2f345b] text-[10px]">{label}</span>

      {!last && <div className="mx-3 flex-1 border-[#cfd1de] border-t border-dashed" />}
    </div>
  );
}
