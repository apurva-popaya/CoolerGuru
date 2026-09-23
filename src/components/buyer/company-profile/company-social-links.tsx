import {
  ExternalLink,
  Globe,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import type { CompanyProfile } from "@/types/company-profile";

export function CompanySocialLinks({
  company,
}: {
  company: CompanyProfile;
}) {
  const website = company.website?.trim();
  const linkedin = company.linkedin?.trim();
  const facebook = company.facebook?.trim();
  const instagram = company.instagram?.trim();
  const youtube = company.youtube?.trim();
  const twitter = company.twitter?.trim();

  const hasSocialLinks =
    website ||
    linkedin ||
    facebook ||
    instagram ||
    youtube ||
    twitter;

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">
        Social Links
      </h2>

      {hasSocialLinks ? (
        <div className="mt-4 space-y-4">
          {/* Website */}
          {website && (
            <SocialRow
              icon={<Globe size={14} />}
              label="Website"
              value={website}
            />
          )}

          {/* LinkedIn */}
          {linkedin && (
            <SocialRow
              icon={<FaLinkedinIn size={13} />}
              label="LinkedIn"
              value={linkedin}
            />
          )}

          {/* Facebook */}
          {facebook && (
            <SocialRow
              icon={<FaFacebookF size={13} />}
              label="Facebook"
              value={facebook}
            />
          )}

          {/* Instagram */}
          {instagram && (
            <SocialRow
              icon={<FaInstagram size={13} />}
              label="Instagram"
              value={instagram}
            />
          )}

          {/* YouTube */}
          {youtube && (
            <SocialRow
              icon={<FaYoutube size={14} />}
              label="YouTube"
              value={youtube}
            />
          )}

          {/* Twitter */}
          {twitter && (
            <SocialRow
              icon={<FaTwitter size={13} />}
              label="Twitter"
              value={twitter}
            />
          )}
        </div>
      ) : (
        <p className="mt-4 text-[#656a82] text-[8px]">
          No social links available.
        </p>
      )}
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
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="grid grid-cols-[22px_65px_minmax(0,1fr)_14px] items-center gap-2 transition hover:opacity-80"
    >
      <span className="text-[#1366d8]">
        {icon}
      </span>

      <span className="text-[#656a82] text-[8px]">
        {label}
      </span>

      <span className="min-w-0 truncate font-medium text-[#3b4070] text-[8px]">
        {value}
      </span>

      <ExternalLink
        size={11}
        className="shrink-0 text-[#3425db]"
      />
    </a>
  );
}