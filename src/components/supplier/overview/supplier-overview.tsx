"use client";

import { useEffect, useState } from "react";

import { Eye, Mail, Package, ShieldCheck } from "lucide-react";

import { getSellerInquiries, getSellerInquirySummary } from "@/lib/api/seller-inquiries-api";
import type { SellerInquiry, SellerInquirySummaryData } from "@/types/seller-inquiry-api";

import { OverviewStatCard } from "./overview-stat-card";
import { ProductSummaryGrid } from "./product-summary-grid";
import { RecentInquiriesTable } from "./recent-inquiries-table";
import { supplierOverviewData } from "./supplier-overview-data";
import { VerificationBanner } from "./verification-banner";

const emptySummary: SellerInquirySummaryData = {
  total: 0,
  new: 0,
  replied: 0,
  in_discussion: 0,
  closed: 0,
  spam: 0,
};

export function SupplierOverview() {
  const supplier = supplierOverviewData;

  const verified = supplier.verificationStatus === "VERIFIED";

  const [inquirySummary, setInquirySummary] = useState<SellerInquirySummaryData>(emptySummary);

  const [recentInquiries, setRecentInquiries] = useState<SellerInquiry[]>([]);

  const [loadingInquiries, setLoadingInquiries] = useState(true);

  const [inquiryError, setInquiryError] = useState("");

  useEffect(() => {
    if (!verified) {
      setLoadingInquiries(false);

      return;
    }

    async function loadInquiryData() {
      try {
        setLoadingInquiries(true);
        setInquiryError("");

        const [summaryResponse, inquiriesResponse] = await Promise.all([
          getSellerInquirySummary(),
          getSellerInquiries({
            page: 1,
            limit: 5,
          }),
        ]);

        setInquirySummary(summaryResponse.data.summary);

        setRecentInquiries(inquiriesResponse.data.inquiries);
      } catch (error) {
        console.error("Supplier overview inquiry error:", error);

        setInquiryError("Unable to load inquiry information.");
      } finally {
        setLoadingInquiries(false);
      }
    }

    loadInquiryData();
  }, [verified]);

  return (
    <section className="px-7 py-6">
      <div>
        <h1 className="font-bold text-[#171570] text-[26px]">Overview</h1>

        <p className="mt-1 text-[#646984] text-[11px]">Welcome back, {supplier.companyName}.</p>
      </div>

      <div className="mt-5">
        <VerificationBanner
          status={supplier.verificationStatus}
          profileCompletion={supplier.profileCompletion}
          rejectionReason={supplier.rejectionReason}
        />
      </div>

      {inquiryError && (
        <div className="mt-5 rounded-[7px] border border-red-200 bg-red-50 px-4 py-3 font-medium text-[9px] text-red-600">
          {inquiryError}
        </div>
      )}

      <div className="mt-5 grid grid-cols-4 gap-4">
        <OverviewStatCard
          icon={Package}
          title="Total Products"
          value={verified ? supplier.totalProducts : "—"}
          description={verified ? "Active products listed" : "Available after verification"}
          locked={!verified}
        />

        <OverviewStatCard
          icon={Mail}
          title="New Inquiries"
          value={verified ? (loadingInquiries ? "..." : inquirySummary.new) : "—"}
          description={verified ? "New buyer inquiries" : "Available after verification"}
          locked={!verified}
        />

        <OverviewStatCard
          icon={Eye}
          title="Profile Views"
          value={verified ? supplier.profileViews : "—"}
          description={verified ? "Views in the last 30 days" : "Available after verification"}
          locked={!verified}
        />

        <VerificationOverviewCard status={supplier.verificationStatus} />
      </div>

      <RecentInquiriesTable
        inquiries={recentInquiries}
        status={supplier.verificationStatus}
        loading={loadingInquiries}
      />

      <ProductSummaryGrid products={supplier.products} status={supplier.verificationStatus} />
    </section>
  );
}

function VerificationOverviewCard({ status }: { status: typeof supplierOverviewData.verificationStatus }) {
  const data =
    status === "VERIFIED"
      ? {
          label: "Verified",
          description: "Profile is fully verified",
          style: "bg-[#eaf8ee] text-[#16873a]",
        }
      : status === "UNDER_VERIFICATION"
        ? {
            label: "Under Review",
            description: "Verification is in progress",
            style: "bg-[#fff7d9] text-[#96700e]",
          }
        : status === "REJECTED"
          ? {
              label: "Rejected",
              description: "Profile update required",
              style: "bg-[#fff0f0] text-[#cc3333]",
            }
          : {
              label: "Not Verified",
              description: "Complete your company profile",
              style: "bg-[#fff0df] text-[#df6417]",
            };

  return (
    <div className="relative min-h-[145px] rounded-[10px] border border-[#e1e2ed] bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#f0eeff]">
          <ShieldCheck size={21} className="text-[#3124d4]" />
        </div>

        <p className="font-semibold text-[#313656] text-[11px]">Verification Status</p>
      </div>

      <span className={`mt-4 inline-flex rounded-[4px] px-3 py-1.5 font-bold text-[10px] ${data.style}`}>
        {data.label}
      </span>

      <p className="mt-3 text-[#85899f] text-[10px] leading-[1.45]">{data.description}</p>
    </div>
  );
}
