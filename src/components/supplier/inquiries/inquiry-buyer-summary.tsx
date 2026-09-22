import { Mail, MapPin, Phone, UserRound } from "lucide-react";

import type { SellerInquiry } from "@/types/seller-inquiry-api";

interface Props {
  inquiry: SellerInquiry;
}

export function InquiryBuyerSummary({ inquiry }: Props) {
  return (
    <div className="rounded-[9px] border border-[#e1e2ed] bg-white p-5">
      <div className="grid grid-cols-[1.2fr_0.7fr_0.9fr] gap-5">
        <div className="border-[#e6e7ef] border-r pr-5">
          <h2 className="font-bold text-[#171570] text-[12px]">Buyer Details</h2>

          <div className="mt-4">
            <InfoRow icon={UserRound} text={inquiry.buyer_name} />

            <InfoRow icon={Phone} text={inquiry.buyer_phone_number} />

            <InfoRow icon={Mail} text={inquiry.buyer_email} />

            <InfoRow icon={MapPin} text={inquiry.buyer_city_state} />
          </div>
        </div>

        <div className="border-[#e6e7ef] border-r pr-5">
          <MetaBlock label="Inquiry Type">
            <span className="inline-flex rounded-[4px] bg-[#f0eeff] px-2 py-1 font-semibold text-[#3024c8] text-[9px]">
              {inquiry.inquiry_type === "REQUEST_QUOTE" ? "Request Quote" : "Contact Supplier"}
            </span>
          </MetaBlock>

          <MetaBlock label="Status">{formatStatus(inquiry.status)}</MetaBlock>

          <MetaBlock label="Submitted">{formatDate(inquiry.created_at)}</MetaBlock>
        </div>

        <div>
          <h2 className="font-bold text-[#171570] text-[12px]">Inquiry Summary</h2>

          <MetaBlock label="Product / Requirement">{inquiry.product_requirement}</MetaBlock>

          <MetaBlock label="Quantity">
            {inquiry.quantity} {inquiry.quantity_unit}
          </MetaBlock>

          {inquiry.product?.category?.name && <MetaBlock label="Category">{inquiry.product.category.name}</MetaBlock>}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <Icon size={10} className="shrink-0 text-[#3024c8]" />

      <span className="text-[#565b76] text-[9px]">{text}</span>
    </div>
  );
}

function MetaBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="font-bold text-[#3c4160] text-[9px]">{label}</p>

      <div className="mt-1 text-[#555b76] text-[8px]">{children}</div>
    </div>
  );
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
