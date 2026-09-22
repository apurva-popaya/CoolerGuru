import { CalendarDays, CheckCircle2, ClipboardList } from "lucide-react";

import type { BuyerInquiry } from "@/types/buyer-inquiry";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function BuyerInquirySummary({ inquiry }: { inquiry: BuyerInquiry }) {
  return (
    <div className="mt-5 grid grid-cols-3 rounded-[8px] border border-[#e1e2ed] bg-white px-5 py-4">
      <SummaryItem icon={<ClipboardList size={15} />} label="Inquiry ID" value={inquiry.inquiry_number} />

      <SummaryItem icon={<CalendarDays size={15} />} label="Sent Date" value={formatDate(inquiry.created_at)} border />

      <div className="flex items-center justify-center border-[#e5e6ee] border-l">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={17} className="text-[#159447]" />

          <div>
            <p className="text-[#777b90] text-[8px]">Status</p>

            <span className="mt-1 inline-flex rounded-[3px] bg-[#eaf8ee] px-2 py-[3px] font-bold text-[#178f42] text-[7px]">
              {formatStatus(inquiry.status)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({
  icon,
  label,
  value,
  border = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  border?: boolean;
}) {
  return (
    <div className={`flex items-center justify-center ${border ? "border-[#e5e6ee] border-l" : ""}`}>
      <div className="flex items-center gap-3">
        <span className="text-[#3428d6]">{icon}</span>

        <div>
          <p className="text-[#777b90] text-[8px]">{label}</p>

          <p className="mt-1 font-semibold text-[#2e3357] text-[9px]">{value}</p>
        </div>
      </div>
    </div>
  );
}
