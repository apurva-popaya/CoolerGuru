import { ExternalLink, Globe } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import type { CompanyProfile } from "@/types/company-profile";

export function CompanySocialLinks({
  company,
}: {
  company: CompanyProfile;
}) {
  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">
        Social Links
      </h2>

      <div className="mt-4 space-y-4">
        <SocialRow
          icon={<Globe size={14} />}
          label="Website"
          value={company.website}
        />

        {company.linkedin && (
          <SocialRow
            icon={<FaLinkedinIn size={13} />}
            label="LinkedIn"
            value={company.linkedin}
          />
        )}

        {company.facebook && (
          <SocialRow
            icon={<FaFacebookF size={13} />}
            label="Facebook"
            value={company.facebook}
          />
        )}

        {company.youtube && (
          <SocialRow
            icon={<FaYoutube size={14} />}
            label="YouTube"
            value={company.youtube}
          />
        )}
      </div>
    </div>
  );
}

function SocialRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[22px_58px_minmax(0,1fr)_14px] items-center gap-2 sm:grid-cols-[22px_65px_minmax(0,1fr)_14px]">
      <span className="text-[#1366d8]">{icon}</span>

      <span className="text-[#656a82] text-[8px]">{label}</span>

      <span className="min-w-0 truncate font-medium text-[#3b4070] text-[8px]">
        {value}
      </span>

      <ExternalLink
        size={11}
        className="shrink-0 text-[#3425db]"
      />
    </div>
  );
}