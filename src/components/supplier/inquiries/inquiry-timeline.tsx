import { CheckCircle2, Clock3, Eye, MessageSquare, Reply } from "lucide-react";

import type { SellerInquiryEvent } from "@/types/seller-inquiry-api";

interface InquiryTimelineProps {
  events: SellerInquiryEvent[];
}

export function InquiryTimeline({ events }: InquiryTimelineProps) {
  return (
    <div className="mt-4 rounded-[9px] border border-[#e1e2ed] bg-white p-4">
      <h2 className="font-bold text-[#171570] text-[13px]">Inquiry Timeline</h2>

      {events.length > 0 ? (
        <div className="mt-4">
          {events.map((event, index) => (
            <TimelineRow key={event.inquiry_event_id} event={event} last={index === events.length - 1} />
          ))}
        </div>
      ) : (
        <p className="mt-3 text-[#85899f] text-[9px]">No timeline events available.</p>
      )}
    </div>
  );
}

function TimelineRow({ event, last }: { event: SellerInquiryEvent; last: boolean }) {
  const Icon =
    event.event_type === "SUBMITTED"
      ? MessageSquare
      : event.event_type === "VIEWED"
        ? Eye
        : event.event_type.includes("REPLIED")
          ? Reply
          : event.event_type === "CLOSED"
            ? CheckCircle2
            : Clock3;

  return (
    <div className="grid grid-cols-[42px_150px_1fr] gap-3">
      <div className="relative flex justify-center">
        {!last && <div className="absolute top-[24px] bottom-[-12px] w-px bg-[#dedfed]" />}

        <div className="relative z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#f0eeff]">
          <Icon size={12} className="text-[#3024c8]" />
        </div>
      </div>

      <div className="pb-4">
        <p className="font-bold text-[#303558] text-[10px]">{formatEvent(event.event_type)}</p>

        <p className="mt-0.5 text-[#7f8399] text-[8px]">
          {formatDate(event.created_at)}, {formatTime(event.created_at)}
        </p>
      </div>

      <p className="pb-4 text-[#565b76] text-[10px]">{event.description ?? "-"}</p>
    </div>
  );
}

function formatEvent(value: string) {
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

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
