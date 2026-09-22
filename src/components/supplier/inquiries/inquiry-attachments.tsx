import { Download, FileImage, FileText } from "lucide-react";

import type { InquiryAttachment } from "@/types/supplier-inquiry-detail";

interface InquiryAttachmentsProps {
  attachments: InquiryAttachment[];
}

export function InquiryAttachments({ attachments }: InquiryAttachmentsProps) {
  return (
    <div className="rounded-[9px] border border-[#e1e2ed] bg-white p-4">
      <h2 className="font-bold text-[#171570] text-[13px]">Attached Files</h2>

      {attachments.length > 0 ? (
        <div className="mt-3 space-y-2">
          {attachments.map((attachment) => {
            const Icon = attachment.type === "pdf" ? FileText : FileImage;

            return (
              <div
                key={attachment.id}
                className="flex h-[48px] items-center gap-3 rounded-[6px] border border-[#e1e2ed] px-3"
              >
                <div
                  className={`flex h-[28px] w-[28px] items-center justify-center rounded-[4px] ${attachment.type === "pdf" ? "bg-[#ffeded] text-red-500" : "bg-[#eaf8ef] text-[#1b9950]"}`}
                >
                  <Icon size={13} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-[#303558] text-[10px]">{attachment.name}</p>

                  <p className="mt-0.5 text-[#8c90a5] text-[9px]">{attachment.size}</p>
                </div>

                <a
                  href={attachment.url}
                  aria-label={`Download ${attachment.name}`}
                  className="flex h-[26px] w-[26px] items-center justify-center rounded-[4px] border border-[#dcddea] text-[#3024c8]"
                >
                  <Download size={11} />
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-3 text-[#85899f] text-[9px]">No attachments added to this inquiry.</p>
      )}
    </div>
  );
}
