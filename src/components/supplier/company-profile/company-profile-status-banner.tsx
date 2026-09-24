import { AlertCircle, BadgeCheck, ClipboardCheck, Clock, XCircle } from "lucide-react";

import type { CompanyVerificationStatus } from "@/lib/api/supplier-create-profile-api";

// Progress and missing fields are shown per step in CompanyProfileStepper.
type CompanyProfileStatusBannerProps = {
  status?: CompanyVerificationStatus;
  verificationNote?: string | null;
};

const STATUS_CONTENT = {
  DRAFT: {
    title: "Your Profile is Not Verified",
    badge: "Draft",
    description:
      "Please complete all required details and upload the necessary documents to submit your profile for verification.",
    action: "Action Required",
    icon: ClipboardCheck,
    container: "border-[#f2c694] bg-[#fffaf5]",
    iconWrapper: "bg-[#fff0df] text-[#ea6a17]",
    badgeClass: "bg-[#fff0df] text-[#e46317]",
    actionClass: "border-[#efb98b] text-[#dd5e14]",
  },
  PENDING: {
    title: "Your Profile is Under Review",
    badge: "Pending",
    description: "Our team is reviewing your documents. Verification usually takes 1-2 business days.",
    action: "In Review",
    icon: Clock,
    container: "border-[#c9c6f2] bg-[#f8f7ff]",
    iconWrapper: "bg-[#ecebff] text-[#3125c8]",
    badgeClass: "bg-[#ecebff] text-[#3125c8]",
    actionClass: "border-[#c9c6f2] text-[#3125c8]",
  },
  VERIFIED: {
    title: "Your Profile is Verified",
    badge: "Verified",
    description: "Your company profile is verified and visible to buyers.",
    action: "Verified",
    icon: BadgeCheck,
    container: "border-[#b7e4c7] bg-[#f4fcf7]",
    iconWrapper: "bg-[#e3f7ea] text-[#1f9d55]",
    badgeClass: "bg-[#e3f7ea] text-[#1f9d55]",
    actionClass: "border-[#b7e4c7] text-[#1f9d55]",
  },
  REJECTED: {
    title: "Your Profile Verification was Rejected",
    badge: "Rejected",
    description: "Please update the details below and submit your profile for verification again.",
    action: "Action Required",
    icon: XCircle,
    container: "border-[#f5c2c2] bg-[#fff7f7]",
    iconWrapper: "bg-[#ffe9e9] text-[#dc2626]",
    badgeClass: "bg-[#ffe9e9] text-[#dc2626]",
    actionClass: "border-[#f5c2c2] text-[#dc2626]",
  },
} satisfies Record<CompanyVerificationStatus, unknown>;

export function CompanyProfileStatusBanner({
  status = "DRAFT",
  verificationNote,
}: CompanyProfileStatusBannerProps) {
  const content = STATUS_CONTENT[status];
  const Icon = content.icon;


  return (
    <div className={`flex items-center justify-between gap-5 rounded-[9px] border px-5 py-4 ${content.container}`}>
      <div className="flex items-center gap-4">
        <div className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full ${content.iconWrapper}`}>
          <Icon size={25} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-[#171570] text-[12px]">{content.title}</h2>

            <span className={`rounded-[4px] px-2 py-1 font-bold text-[8px] ${content.badgeClass}`}>{content.badge}</span>
          </div>

          <p className="mt-1 text-[#555b76] text-[9px]">
            {status === "REJECTED" && verificationNote ? `Reason: ${verificationNote}` : content.description}
          </p>
        </div>
      </div>

      <div
        className={`flex h-[32px] shrink-0 items-center gap-2 rounded-[5px] border px-3 font-bold text-[9px] ${content.actionClass}`}
      >
        <AlertCircle size={12} />
        {content.action}
      </div>
    </div>
  );
}
