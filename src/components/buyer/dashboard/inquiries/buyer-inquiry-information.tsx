import type { BuyerInquiry } from "@/types/buyer-inquiry";

export function BuyerInquiryInformation({
  inquiry,
}: {
  inquiry: BuyerInquiry;
}) {
  return (
    <div className="rounded-[8px] border border-[#e1e2ed] bg-white p-4 sm:p-5">
      <h2 className="font-bold text-[#171570] text-[12px]">
        Inquiry Information
      </h2>

      <div className="mt-4 space-y-3">
        <InfoRow
          label="Product / Requirement"
          value={inquiry.product_requirement}
        />

        <InfoRow
          label="Company Name"
          value={inquiry.company?.name ?? "-"}
        />

        <InfoRow
          label="Quantity"
          value={`${inquiry.quantity} ${inquiry.quantity_unit}`}
        />

        <InfoRow label="Buyer Name" value={inquiry.buyer_name} />

        <InfoRow
          label="Mobile Number"
          value={inquiry.buyer_phone_number}
        />

        <InfoRow label="Email Address" value={inquiry.buyer_email} />

        <InfoRow
          label="City / State"
          value={inquiry.buyer_city_state}
        />

        <div className="grid grid-cols-1 gap-1.5 border-[#f0f0f5] border-t pt-3 sm:grid-cols-[130px_1fr] sm:gap-4">
          <span className="font-medium text-[#6b7088] text-[8px]">
            Requirement Details
          </span>

          <p className="text-[#3f4562] text-[8px] leading-[1.55]">
            {inquiry.requirement_details}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 border-[#f0f0f5] border-b pb-2.5 sm:grid-cols-[130px_1fr] sm:gap-4">
      <span className="font-medium text-[#6b7088] text-[8px]">
        {label}
      </span>

      <span className="break-words font-medium text-[#353a5c] text-[8px]">
        {value}
      </span>
    </div>
  );
}