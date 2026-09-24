"use client";

import { useCallback, useEffect, useState } from "react";

import { Eye, Loader2, Mail, Package, ShieldCheck } from "lucide-react";

import { ApiError } from "@/lib/api/api-client";
import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import { getSellerInquiries, getSellerInquirySummary } from "@/lib/api/seller-inquiries-api";
import { getSellerProducts, type SellerProduct } from "@/lib/api/seller-products-api";
import { getMyCompany, type SupplierCompany } from "@/lib/api/supplier-create-profile-api";
import type { SellerInquiry, SellerInquirySummaryData } from "@/types/seller-inquiry-api";

import { OverviewStatCard } from "./overview-stat-card";
import { ProductSummaryGrid } from "./product-summary-grid";
import { RecentInquiriesTable } from "./recent-inquiries-table";
import { type SupplierProductSummary, toVerificationStatus, type VerificationStatus } from "./types";
import { VerificationBanner } from "./verification-banner";

const emptySummary: SellerInquirySummaryData = {
  total: 0,
  new: 0,
  replied: 0,
  in_discussion: 0,
  closed: 0,
  spam: 0,
};

function toProductSummary(product: SellerProduct): SupplierProductSummary {
  const primaryImage = product.images.find((image) => image.is_primary) ?? product.images[0];

  const units =
    product.stock_quantity === null ? "—" : `${product.stock_quantity} ${product.stock_unit ?? "Units"}`.trim();

  return {
    slug: product.slug,
    title: product.name,
    units,
    image: primaryImage?.image_url ?? null,
  };
}

export function SupplierOverview() {
  const [company, setCompany] = useState<SupplierCompany | null>(null);

  const [loadingCompany, setLoadingCompany] = useState(true);

  const [companyError, setCompanyError] = useState("");

  const [inquirySummary, setInquirySummary] = useState<SellerInquirySummaryData>(emptySummary);

  const [recentInquiries, setRecentInquiries] = useState<SellerInquiry[]>([]);

  const [loadingInquiries, setLoadingInquiries] = useState(true);

  const [inquiryError, setInquiryError] = useState("");

  const [products, setProducts] = useState<SupplierProductSummary[]>([]);

  const [activeProductCount, setActiveProductCount] = useState(0);

  const [loadingProducts, setLoadingProducts] = useState(true);

  const [productError, setProductError] = useState("");

  const status: VerificationStatus = toVerificationStatus(company?.verification_status);

  const verified = status === "VERIFIED";

  const completion = company?.profile_completion;

  const loadCompany = useCallback(async () => {
    try {
      setLoadingCompany(true);
      setCompanyError("");

      const response = await getMyCompany();

      setCompany(response.data?.company ?? null);
    } catch (error) {
      // 404 = the supplier has not created a company profile yet.
      if (error instanceof ApiError && error.status === 404) {
        setCompany(null);
      } else {
        console.error("Supplier overview company error:", error);

        setCompanyError(getApiErrorMessage(error));
      }
    } finally {
      setLoadingCompany(false);
    }
  }, []);

  useEffect(() => {
    loadCompany();
  }, [loadCompany]);

  /*
   * Inquiry and product endpoints are only
   * available to verified companies.
   */
  useEffect(() => {
    if (loadingCompany) {
      return;
    }

    if (!verified) {
      setLoadingInquiries(false);
      setLoadingProducts(false);

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

    async function loadProductData() {
      try {
        setLoadingProducts(true);
        setProductError("");

        const response = await getSellerProducts({
          page: 1,
          limit: 4,
        });

        setProducts((response.data?.products ?? []).map(toProductSummary));

        setActiveProductCount(response.data?.summary.active ?? 0);
      } catch (error) {
        console.error("Supplier overview product error:", error);

        setProductError("Unable to load product information.");
      } finally {
        setLoadingProducts(false);
      }
    }

    loadInquiryData();
    loadProductData();
  }, [loadingCompany, verified]);

  if (loadingCompany) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center gap-2 px-7 py-6 text-[#555b76] text-[12px]">
        <Loader2 size={18} className="animate-spin text-[#3125c8]" />
        Loading overview...
      </section>
    );
  }

  if (companyError) {
    return (
      <section className="px-7 py-6">
        <h1 className="font-bold text-[#171570] text-[26px]">Overview</h1>

        <div
          role="alert"
          className="mt-5 flex items-center justify-between gap-4 rounded-[7px] border border-red-200 bg-red-50 px-4 py-3"
        >
          <p className="font-medium text-[10px] text-red-600">{companyError}</p>

          <button
            type="button"
            onClick={loadCompany}
            className="rounded-[5px] border border-red-200 bg-white px-3 py-1.5 font-bold text-[9px] text-red-600 transition hover:bg-red-100"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const sectionErrors = [inquiryError, productError].filter(Boolean);

  return (
    <section className="px-7 py-6">
      <div>
        <h1 className="font-bold text-[#171570] text-[26px]">Overview</h1>

        <p className="mt-1 text-[#646984] text-[11px]">
          {company?.name ? `Welcome back, ${company.name}.` : "Welcome! Create your company profile to get started."}
        </p>
      </div>

      <div className="mt-5">
        <VerificationBanner
          status={status}
          profileCompletion={completion?.percentage ?? 0}
          rejectionReason={company?.verification_note ?? undefined}
          progress={{
            companyDetailsComplete: Boolean(
              completion?.company_details_complete &&
                completion.contact_details_complete &&
                completion.location_details_complete,
            ),
            documentsComplete: Boolean(completion?.verification_documents_complete),
          }}
        />
      </div>

      {sectionErrors.map((message) => (
        <div
          key={message}
          role="alert"
          className="mt-5 rounded-[7px] border border-red-200 bg-red-50 px-4 py-3 font-medium text-[9px] text-red-600"
        >
          {message}
        </div>
      ))}

      <div className="mt-5 grid grid-cols-4 gap-4">
        <OverviewStatCard
          icon={Package}
          title="Total Products"
          value={verified ? (loadingProducts ? "..." : activeProductCount) : "—"}
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
          value="—"
          description={verified ? "Profile view tracking coming soon" : "Available after verification"}
          locked={!verified}
        />

        <VerificationOverviewCard status={status} />
      </div>

      <RecentInquiriesTable inquiries={recentInquiries} status={status} loading={loadingInquiries} />

      <ProductSummaryGrid products={products} status={status} loading={loadingProducts} />
    </section>
  );
}

function VerificationOverviewCard({ status }: { status: VerificationStatus }) {
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
