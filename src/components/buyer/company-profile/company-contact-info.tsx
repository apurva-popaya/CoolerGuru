import {
  Clock3,
  Globe,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import type { CompanyProfile } from "@/types/company-profile";

export function CompanyContactInfo({
  company,
}: {
  company: CompanyProfile;
}) {
  return (
    <InfoBox title="Contact Information">
      <InfoRow
        icon={<UserRound size={13} />}
        label="Contact Person"
        value={company.contactPerson}
      />

      <InfoRow
        icon={<Phone size={13} />}
        label="Phone"
        value={company.phone}
      />

      <InfoRow
        icon={<Mail size={13} />}
        label="Email"
        value={company.email}
      />

      <InfoRow
        icon={<Globe size={13} />}
        label="Website"
        value={company.website}
      />

      <InfoRow
        icon={<Clock3 size={13} />}
        label="Business Hours"
        value={company.businessHours}
      />
    </InfoBox>
  );
}

function InfoBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">
        {title}
      </h2>

      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[20px_85px_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[20px_95px_minmax(0,1fr)]">
      <span className="text-[#2b20c8]">{icon}</span>

      <span className="text-[#656a82] text-[8px]">{label}</span>

      <span className="break-words font-medium text-[#34395b] text-[8px]">
        {value}
      </span>
    </div>
  );
}