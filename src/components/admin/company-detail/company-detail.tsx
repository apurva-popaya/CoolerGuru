"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Building2,
  Download,
  Eye,
  FileText,
  Heart,
  MapPin,
  MessageSquare,
  Package,
  Reply,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";

import { AdminDecisionPanel } from "./admin-decision-panel";
import type { CompanyDetailData } from "./company-detail-data";
import { CompanyHeader } from "./company-header";
import { DetailSection } from "./detail-section";

export function CompanyDetail({ company }: { company: CompanyDetailData }) {
  const isVerified = company.verificationStatus === "Verified";

  const isRejected = company.verificationStatus === "Rejected";

  return (
    <div className="space-y-5">
      <div>
        <Link href="/admin/companies" className="inline-flex items-center gap-2 font-medium text-[#2720a8] text-[12px]">
          <ArrowLeft className="size-4" />
          Back to Companies
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
        <CompanyHeader company={company} />

        <AdminDecisionPanel company={company} />
      </div>

      {isVerified && (
        <div className="flex flex-wrap justify-end gap-3">
          <Button className="gap-2 bg-[#2720a8] hover:bg-[#15136f]">
            <Star className="size-4" />

            {company.featured ? "Remove Featured" : "Mark as Featured"}
          </Button>

          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-600">
            Suspend Company
          </Button>
        </div>
      )}

      {isRejected && (
        <div className="rounded-[9px] border border-red-200 bg-red-50 p-4">
          <h2 className="font-bold text-[14px] text-red-700">Company Verification Rejected</h2>

          <div className="mt-3 grid gap-3 text-[12px] md:grid-cols-3">
            <Info label="Reason" value={company.rejectionReason ?? "-"} />

            <Info label="Rejected By" value={company.rejectedBy ?? "-"} />

            <Info label="Rejected Date" value={company.rejectedDate ?? "-"} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Metric icon={Package} label="Products" value={company.productsCount} />

        <Metric icon={MessageSquare} label="Inquiries" value={company.inquiriesReceived} />

        <Metric icon={Reply} label="Seller Responses" value={company.sellerResponses} />

        <Metric icon={Eye} label="Profile Views" value={company.profileViews} />

        <Metric icon={Heart} label="Saved by Buyers" value={company.savedByBuyers} />

        <Metric icon={Package} label="Active Products" value={company.activeProducts} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DetailSection title="Company Profile" icon={<Building2 className="size-4 text-[#2720a8]" />}>
          <div className="space-y-5">
            <div>
              <h3 className="font-bold text-[#15136f] text-[18px]">{company.name}</h3>

              <div className="mt-2 flex items-center gap-2 text-[#5d6280] text-[12px]">
                <MapPin className="size-4 text-[#2720a8]" />

                {company.location}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <StatusBadge variant="info">{company.businessType}</StatusBadge>

                {company.featured && <StatusBadge variant="purple">Featured</StatusBadge>}
              </div>
            </div>

            <div className="border-border border-t pt-4">
              <h4 className="mb-3 font-bold text-[#15136f] text-[13px]">Supplier Account</h4>

              <div className="grid gap-3 text-[12px] md:grid-cols-2">
                <Info label="Account Name" value={company.supplierName} />

                <Info label="Mobile" value={company.supplierPhone} />

                <Info label="Email" value={company.supplierEmail} />

                <Info label="Account Status" value="Active" />
              </div>
            </div>

            <div className="border-border border-t pt-4">
              <Info label="About Company" value={company.about} />
            </div>
          </div>
        </DetailSection>

        <DetailSection
          title="Verification Information"
          icon={<ShieldCheck className="size-4 text-[#2720a8]" />}
          action={
            <StatusBadge
              variant={isVerified ? "success" : company.verificationStatus === "Rejected" ? "danger" : "warning"}
            >
              {company.verificationStatus}
            </StatusBadge>
          }
        >
          <div className="grid gap-4 text-[12px] md:grid-cols-2">
            <Info label="Company Type" value={company.companyType} />

            <Info label="GST" value={company.gstNumber} />

            <Info label="PAN" value={company.panNumber} />

            <Info label="Registration" value={company.registrationNumber} />

            <Info label="Verification Submitted" value={company.verificationSubmitted} />

            <Info label="Verified By" value={company.verifiedBy ?? "-"} />

            <Info label="Last Reviewed" value={company.lastReviewed ?? "-"} />
          </div>
        </DetailSection>

        <DetailSection title="Business & Address Details" icon={<MapPin className="size-4 text-[#2720a8]" />}>
          <div className="grid gap-4 text-[12px] md:grid-cols-2">
            <Info label="Registered Address" value={company.registeredAddress} />

            <Info label="City" value={company.city} />

            <Info label="State" value={company.state} />

            <Info label="Pincode" value={company.pincode} />

            <Info label="Business Hours" value={company.businessHours} />

            <Info label="Contact Email" value={company.contactEmail} />

            <Info label="Contact Phone" value={company.contactPhone} />

            <Info label="Website" value={company.website} />
          </div>
        </DetailSection>

        <DetailSection title="Verification Documents" icon={<FileText className="size-4 text-[#2720a8]" />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {company.documents.map((document) => (
              <div key={document.id} className="rounded-[8px] border border-border bg-[#fcfcff] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#15136f] text-[12px]">{document.name}</p>

                    <p className="mt-1 text-[#5d6280] text-[11px]">{document.fileName}</p>

                    <p className="text-[#8a8ea5] text-[10px]">{document.size}</p>
                  </div>

                  <Button size="icon-sm" variant="outline">
                    <Download className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DetailSection>
      </div>

      <DetailSection title="Products & Categories" icon={<Package className="size-4 text-[#2720a8]" />}>
        <div>
          <p className="mb-3 font-semibold text-[#15136f] text-[12px]">Categories</p>

          <div className="flex flex-wrap gap-2">
            {company.categories.map((category) => (
              <StatusBadge key={category} variant="info">
                {category}
              </StatusBadge>
            ))}
          </div>
        </div>
      </DetailSection>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DetailSection title="Recent Products" icon={<Package className="size-4 text-[#2720a8]" />}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-border border-b text-left text-[#5d6280] text-[11px]">
                  <th className="pb-3">Product</th>

                  <th className="pb-3">Category</th>

                  <th className="pb-3">Status</th>

                  <th className="pb-3">Price</th>
                </tr>
              </thead>

              <tbody>
                {company.products.map((product) => (
                  <tr key={product.id} className="border-border/60 border-b text-[11px]">
                    <td className="py-3 font-semibold text-[#15136f]">{product.name}</td>

                    <td className="py-3 text-[#5d6280]">{product.category}</td>

                    <td className="py-3">
                      <StatusBadge variant={product.status === "Active" ? "success" : "danger"}>
                        {product.status}
                      </StatusBadge>
                    </td>

                    <td className="py-3 text-[#15136f]">{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DetailSection>

        <DetailSection
          title="Recent Inquiry & Response Activity"
          icon={<MessageSquare className="size-4 text-[#2720a8]" />}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-border border-b text-left text-[#5d6280] text-[11px]">
                  <th className="pb-3">Buyer</th>

                  <th className="pb-3">Inquiry</th>

                  <th className="pb-3">Response</th>

                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {company.inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-border/60 border-b text-[11px]">
                    <td className="py-3 font-semibold text-[#15136f]">{inquiry.buyer}</td>

                    <td className="py-3 text-[#5d6280]">{inquiry.inquiry}</td>

                    <td className="py-3 text-[#5d6280]">{inquiry.response}</td>

                    <td className="py-3">
                      <StatusBadge
                        variant={
                          inquiry.status === "Replied" ? "success" : inquiry.status === "New" ? "info" : "neutral"
                        }
                      >
                        {inquiry.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DetailSection>
      </div>

      {!isVerified && !isRejected && (
        <DetailSection title="Admin Notes & Remarks" icon={<Users className="size-4 text-[#2720a8]" />}>
          <textarea
            placeholder="Add your review notes, comments or rejection reason here..."
            className="min-h-[100px] w-full resize-none rounded-[8px] border border-border p-3 text-[12px] outline-none focus:border-[#2720a8]"
          />
        </DetailSection>
      )}
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number }) {
  return (
    <div className="rounded-[9px] border border-border bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-[#f3f2ff]">
          <Icon className="size-5 text-[#2720a8]" />
        </div>

        <div>
          <p className="text-[#5d6280] text-[11px]">{label}</p>

          <p className="font-bold text-[#15136f] text-[22px]">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-medium text-[#5d6280] text-[11px]">{label}</p>

      <p className="mt-1 font-medium text-[#15136f] text-[12px]">{value}</p>
    </div>
  );
}
