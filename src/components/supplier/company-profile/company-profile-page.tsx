import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { CompanyAdditionalDetails } from "./company-additional-details";
import { CompanyMediaSection } from "./company-media-section";
import { CompanyOverviewSection } from "./company-overview-section";
import { CompanyProfileActions } from "./company-profile-actions";
import { CompanyProfileStatusBanner } from "./company-profile-status-banner";
import { ContactInformationSection } from "./contact-information-section";
import { VerificationDetailsSection } from "./verification-details-section";

export function SupplierCompanyProfilePage() {
  return (
    <section className="px-7 py-6">
      <div className="mb-5 flex items-start justify-between gap-5">
        <div>
          <h1 className="font-bold text-[#171570] text-[28px]">Manage Company Profile</h1>

          <p className="mt-1 text-[#555b76] text-[12px]">
            Complete your public company information and upload verification documents to get verified.
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-[#777b92] text-[8px]">
            <Link href="/supplier/dashboard" className="transition hover:text-[#251bc1]">
              Dashboard
            </Link>

            <ChevronRight size={10} />

            <span className="font-semibold text-[#251bc1]">Manage Company Profile</span>
          </div>
        </div>

        <p className="mt-2 text-[#777b92] text-[9px]">Last updated: 20 May 2026, 10:30 AM</p>
      </div>

      <CompanyProfileStatusBanner />

      <div className="mt-4 grid grid-cols-2 gap-4">
        <CompanyOverviewSection />
        <CompanyMediaSection />
      </div>

      <div className="mt-4 grid grid-cols-[1.2fr_1fr] gap-4">
        <VerificationDetailsSection />
        <ContactInformationSection />
      </div>

      <CompanyAdditionalDetails />

      <CompanyProfileActions />
    </section>
  );
}
