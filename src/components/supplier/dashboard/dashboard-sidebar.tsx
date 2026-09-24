"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LockKeyhole } from "lucide-react";

import { supplierDashboardNavigation } from "./dashboard-nav";

type CompanyVerificationStatus = "NOT_VERIFIED" | "UNDER_VERIFICATION" | "VERIFIED" | "REJECTED";

export function SupplierDashboardSidebar() {
  const pathname = usePathname();

  /*
    TEMPORARY.

    Later this value should come from:
    GET /api/v1/companies/me
  */

  const verificationStatus: CompanyVerificationStatus = "VERIFIED";

  const isVerified = verificationStatus === "VERIFIED";

  return (
    <aside className="sticky top-[76px] h-[calc(100vh-76px)] w-[270px] shrink-0 self-start overflow-hidden border-[#e3e4ef] border-r bg-white px-4 py-6">
      <p className="mb-5 px-3 font-bold text-[#171570] text-[10px] uppercase tracking-[0.04em]">Supplier Panel</p>

      <nav className="flex flex-col gap-1.5">
        {supplierDashboardNavigation.map((item) => {
          const Icon = item.icon;

          const locked = item.requiresVerification && !isVerified;

          const active = item.href === "/supplier/dashboard" ? pathname === item.href : pathname.startsWith(item.href);

          if (locked) {
            return (
              <div
                key={item.label}
                className="flex min-h-[46px] cursor-not-allowed items-center gap-3 rounded-[7px] px-3 font-semibold text-[#9a9dae] text-[10px]"
              >
                <Icon size={17} className="shrink-0" />

                <span className="flex-1">{item.label}</span>

                <LockKeyhole size={13} />
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-h-[46px] items-center gap-3 rounded-[7px] px-3 font-semibold text-[10px] transition ${active ? "!text-[#251bc1] bg-[#eeeaff]" : "!text-[#292e55] hover:bg-[#f7f6ff]"}`}
            >
              <Icon size={17} className="shrink-0" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* <VerificationStatusCard status={verificationStatus} /> */}
    </aside>
  );
}

function VerificationStatusCard({ status }: { status: CompanyVerificationStatus }) {
  if (status === "VERIFIED") {
    return (
      <div className="mt-8 rounded-[8px] border border-[#ccebd8] bg-[#f3fff7] p-4">
        <p className="font-bold text-[#168547] text-[10px]">Company Verified</p>

        <p className="mt-1 text-[#66746c] text-[8px] leading-[1.45]">
          Your company is verified. Products and inquiries are available.
        </p>
      </div>
    );
  }

  if (status === "UNDER_VERIFICATION") {
    return (
      <div className="mt-8 rounded-[8px] border border-[#f3ddb1] bg-[#fffaf0] p-4">
        <p className="font-bold text-[#b87511] text-[10px]">Under Verification</p>

        <p className="mt-1 text-[#756b57] text-[8px] leading-[1.45]">
          Your profile has been submitted and is currently being reviewed.
        </p>
      </div>
    );
  }

  if (status === "REJECTED") {
    return (
      <div className="mt-8 rounded-[8px] border border-[#f2cccc] bg-[#fff5f5] p-4">
        <p className="font-bold text-[#d33636] text-[10px]">Verification Rejected</p>

        <p className="mt-1 text-[#756060] text-[8px] leading-[1.45]">
          Update your company details and submit them again for verification.
        </p>

        <Link
          href="/supplier/dashboard/company-profile"
          className="!text-[#d33636] mt-3 inline-flex font-bold text-[8px]"
        >
          Update Company Profile →
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-[8px] border border-[#dedcf4] bg-[#f8f7ff] p-4">
      <p className="font-bold text-[#3428c7] text-[10px]">Complete Your Profile</p>

      <p className="mt-1 text-[#666b82] text-[8px] leading-[1.45]">
        Complete your company information to unlock products and inquiries.
      </p>

      <Link
        href="/supplier/dashboard/company-profile"
        className="!text-[#251bc1] mt-3 inline-flex font-bold text-[8px]"
      >
        Complete Profile →
      </Link>
    </div>
  );
}
