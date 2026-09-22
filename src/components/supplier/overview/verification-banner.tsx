import Link from "next/link";

import { AlertTriangle, CheckCircle2, ClipboardCheck, Clock3, FileSearch, Pencil } from "lucide-react";

import type { VerificationStatus } from "./types";
import { VerificationSteps } from "./verification-steps";

interface VerificationBannerProps {
  status: VerificationStatus;
  profileCompletion: number;
  rejectionReason?: string;
}

export function VerificationBanner({ status, profileCompletion, rejectionReason }: VerificationBannerProps) {
  if (status === "VERIFIED") {
    return (
      <BannerShell borderClass="border-[#83d69a]" backgroundClass="from-[#f3fff6] via-white to-[#f1fff5]">
        <BannerContent
          icon={CheckCircle2}
          iconBackground="bg-[#e7f9eb]"
          iconColor="text-[#16983f]"
          title="Your Company Profile is Verified"
          badge={<VerificationBadge label="Verified" variant="success" />}
          description="Congratulations! Your company profile has been successfully verified. You now have full access to products, inquiries, and all dashboard features."
          actionLabel="View Company Profile"
          actionHref="/supplier/dashboard/company-profile"
        >
          <ProfileProgress percentage={100} />
        </BannerContent>

        <VerificationSteps status={status} />
      </BannerShell>
    );
  }

  if (status === "UNDER_VERIFICATION") {
    return (
      <BannerShell borderClass="border-[#edcf78]" backgroundClass="from-[#fffbed] via-white to-[#fff9e8]">
        <BannerContent
          icon={FileSearch}
          iconBackground="bg-[#fff5ce]"
          iconColor="text-[#d69b13]"
          title="Your Company Profile is Under Verification"
          badge={<VerificationBadge label="Under Verification" variant="pending" />}
          description="Your submitted company and business documents are being reviewed. You'll get access to supplier features after approval."
          actionLabel="View Submitted Profile"
          actionHref="/supplier/dashboard/company-profile"
          actionOutline
        >
          <div className="mt-4 flex items-center gap-2">
            <Clock3 size={13} className="text-[#c89216]" />

            <span className="font-semibold text-[#6c5a25] text-[11px]">Verification review in progress</span>
          </div>
        </BannerContent>

        <VerificationSteps status={status} />
      </BannerShell>
    );
  }

  if (status === "REJECTED") {
    return (
      <BannerShell borderClass="border-[#efaaaa]" backgroundClass="from-[#fff5f5] via-white to-[#fff3f3]">
        <BannerContent
          icon={AlertTriangle}
          iconBackground="bg-[#ffe8e8]"
          iconColor="text-[#dc3939]"
          title="Company Verification Rejected"
          badge={<VerificationBadge label="Rejected" variant="error" />}
          description="We could not approve your company verification. Please review the reason below, update the required information or documents, and submit your profile again."
          actionLabel="Update Company Profile"
          actionHref="/supplier/dashboard/company-profile"
          actionIcon={<Pencil size={12} />}
          actionDanger
        >
          <div className="mt-4 max-w-[650px] rounded-[6px] border border-[#f1cccc] bg-[#fff8f8] px-4 py-3">
            <p className="font-bold text-[#c33737] text-[8px] uppercase tracking-wide">Rejection Reason</p>

            <p className="mt-1 text-[#5d4f57] text-[11px] leading-[1.5]">
              {rejectionReason || "Please update your company information and resubmit your verification."}
            </p>
          </div>
        </BannerContent>

        <VerificationSteps status={status} />
      </BannerShell>
    );
  }

  return (
    <BannerShell borderClass="border-[#f2c48d]" backgroundClass="from-[#fff9f3] via-white to-[#fff8f1]">
      <BannerContent
        icon={ClipboardCheck}
        iconBackground="bg-[#fff0df]"
        iconColor="text-[#ed6b18]"
        title="Complete Your Company Profile to Get Verified"
        badge={<VerificationBadge label="Not Verified" variant="warning" />}
        description="Complete your business details and upload verification documents to unlock products, inquiries, and full dashboard access."
        actionLabel="Complete Company Profile"
        actionHref="/supplier/dashboard/company-profile"
      >
        <ProfileProgress percentage={profileCompletion} />
      </BannerContent>

      <VerificationSteps status={status} />
    </BannerShell>
  );
}

function BannerShell({
  children,
  borderClass,
  backgroundClass,
}: {
  children: React.ReactNode;
  borderClass: string;
  backgroundClass: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[10px] border bg-gradient-to-r ${borderClass} ${backgroundClass}`}>
      {children}
    </div>
  );
}

interface BannerContentProps {
  icon: React.ElementType;
  iconBackground: string;
  iconColor: string;
  title: string;
  badge: React.ReactNode;
  description: string;
  actionLabel: string;
  actionHref: string;
  actionIcon?: React.ReactNode;
  actionOutline?: boolean;
  actionDanger?: boolean;
  children?: React.ReactNode;
}

function BannerContent({
  icon: Icon,
  iconBackground,
  iconColor,
  title,
  badge,
  description,
  actionLabel,
  actionHref,
  actionIcon,
  actionOutline,
  actionDanger,
  children,
}: BannerContentProps) {
  let actionClass = "bg-[#2518bd] !text-white";

  if (actionOutline) {
    actionClass = "border border-[#d9c274] bg-white !text-[#756016]";
  }

  if (actionDanger) {
    actionClass = "bg-[#d93838] !text-white";
  }

  return (
    <div className="flex items-start gap-5 px-6 py-5">
      <div className={`flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full ${iconBackground}`}>
        <Icon size={34} className={iconColor} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-bold text-[#171570] text-[20px]">{title}</h1>

          {badge}
        </div>

        <p className="mt-2 max-w-[690px] text-[#4e5473] text-[12px] leading-[1.55]">{description}</p>

        {children}
      </div>

      <Link
        href={actionHref}
        className={`mt-6 flex h-[42px] shrink-0 items-center justify-center gap-2 rounded-[6px] px-5 font-bold text-[10px] ${actionClass}`}
      >
        {actionIcon}
        {actionLabel}
      </Link>
    </div>
  );
}

function ProfileProgress({ percentage }: { percentage: number }) {
  return (
    <div className="mt-4 max-w-[470px]">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#2a2f58] text-[11px]">Profile Completion:</span>

        <span className="font-bold text-[#251bc1] text-[11px]">{percentage}%</span>
      </div>

      <div className="mt-2 h-[8px] overflow-hidden rounded-full bg-[#e5e6ef]">
        <div className="h-full rounded-full bg-[#f07820]" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function VerificationBadge({
  label,
  variant,
}: {
  label: string;
  variant: "warning" | "pending" | "success" | "error";
}) {
  const className =
    variant === "success"
      ? "border-[#b6e4c2] bg-[#eaf8ee] text-[#158737]"
      : variant === "error"
        ? "border-[#f0bcbc] bg-[#fff0f0] text-[#cc3333]"
        : variant === "pending"
          ? "border-[#ead99f] bg-[#fff7d9] text-[#9d7410]"
          : "border-[#f4d1aa] bg-[#fff0df] text-[#df6417]";

  return <span className={`rounded-[4px] border px-2.5 py-1 font-bold text-[9px] ${className}`}>{label}</span>;
}
