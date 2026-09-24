"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { CheckCircle2, FileText, Loader2, Paperclip, Send, X } from "lucide-react";

import {
  getUploadAccept,
  getUploadErrorMessage,
  getUploadHint,
  type UploadCategory,
  uploadFile,
  validateUploadFile,
} from "@/lib/api/file-upload-api";
import { replyToSellerInquiry } from "@/lib/api/seller-inquiries-api";
import type { SellerInquiryReplyPayload } from "@/types/seller-inquiry-api";

// No inquiry-specific upload category exists; company_document accepts PDF and images.
const ATTACHMENT_CATEGORY: UploadCategory = "company_document";

interface InquiryReplyPanelProps {
  inquiryId: string;
  buyerName: string;
  companyName: string;
}

export function InquiryReplyPanel({ inquiryId, buyerName, companyName }: InquiryReplyPanelProps) {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [quotationReference, setQuotationReference] = useState("");
  const [validity, setValidity] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const detailHref = `/supplier/dashboard/inquiries/${encodeURIComponent(inquiryId)}`;

  const handleAttachmentChange = (file: File | undefined) => {
    if (!file) {
      return;
    }

    const validationError = validateUploadFile(file, ATTACHMENT_CATEGORY);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setAttachment(file);
  };

  const handleSendReply = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || submitting) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Empty optional fields become undefined and are dropped by JSON.stringify.
      const payload: SellerInquiryReplyPayload = {
        message: trimmedMessage,
        quotation_reference_number: optionalText(quotationReference),
        quotation_validity: optionalText(validity),
        expected_delivery: optionalText(deliveryTime),
        payment_terms: optionalText(paymentTerms),
      };

      if (attachment) {
        const uploaded = await uploadFile(attachment, ATTACHMENT_CATEGORY);

        payload.attachment_url = uploaded.url;
        payload.attachment_name = attachment.name;
        payload.attachment_mime_type = uploaded.mimeType || attachment.type;
        payload.attachment_size = uploaded.size || attachment.size;
      }

      await replyToSellerInquiry(inquiryId, payload);

      setSubmitted(true);

      setTimeout(() => {
        router.push(detailHref);
        router.refresh();
      }, 900);
    } catch (err) {
      setError(getUploadErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(detailHref);
  };

  if (submitted) {
    return (
      <div className="mt-4 flex min-h-[210px] items-center justify-center rounded-[9px] border border-[#bfe5ca] bg-[#f5fff8]">
        <div className="text-center">
          <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#e8f8ed]">
            <CheckCircle2 size={25} className="text-[#188f3e]" />
          </div>

          <h3 className="mt-3 font-bold text-[#171570] text-[15px]">Reply Sent Successfully</h3>

          <p className="mt-1 text-[#666b83] text-[10px]">
            Your response has been sent to {buyerName} from {companyName}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-[9px] border border-[#dcdcf0] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-[#e5e6ef] border-b bg-[#faf9ff] px-5 py-4">
        <div>
          <h2 className="font-bold text-[#171570] text-[16px]">Reply to Inquiry</h2>

          <p className="mt-1 text-[#666b83] text-[10px]">
            Respond to {buyerName} from {companyName}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCancel}
          aria-label="Close reply panel"
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[5px] border border-[#dedfe9] bg-white text-[#555b76] transition hover:bg-[#f5f3ff]"
        >
          <X size={13} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Information */}
        <div className="rounded-[6px] border border-[#deddf3] bg-[#f8f7ff] px-4 py-3">
          <p className="text-[#555b76] text-[10px] leading-[1.5]">
            Provide a clear response to the buyer&apos;s inquiry. You can include quotation details, delivery
            information, payment terms and supporting documents.
          </p>
        </div>

        {/* Quotation Details */}
        <div className="mt-5">
          <h3 className="font-bold text-[#171570] text-[12px]">Quotation Details</h3>

          <div className="mt-3 grid grid-cols-2 gap-4">
            <Field label="Quotation / Reference Number">
              <input
                value={quotationReference}
                onChange={(event) => setQuotationReference(event.target.value)}
                placeholder="Example: QT-2026-001"
                className={inputClass}
              />
            </Field>

            <Field label="Quotation Validity">
              <input
                value={validity}
                onChange={(event) => setValidity(event.target.value)}
                placeholder="Example: 30 Days"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <Field label="Expected Delivery">
              <input
                value={deliveryTime}
                onChange={(event) => setDeliveryTime(event.target.value)}
                placeholder="Example: 15-20 Working Days"
                className={inputClass}
              />
            </Field>

            <Field label="Payment Terms">
              <input
                value={paymentTerms}
                onChange={(event) => setPaymentTerms(event.target.value)}
                placeholder="Example: 50% Advance, 50% Before Dispatch"
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        {/* Response */}
        <div className="mt-5">
          <Field label="Your Response" required>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={1500}
              placeholder="Write your response to the buyer..."
              className="min-h-[155px] w-full resize-none rounded-[6px] border border-[#dfe0eb] bg-white px-3 py-3 text-[#3d4260] text-[9px] leading-[1.6] outline-none transition placeholder:text-[#999daf] focus:border-[#3024ca]"
            />
          </Field>

          <p className="mt-1 text-right text-[#8b8fa3] text-[8px]">{message.length} / 1500</p>
        </div>

        {/* Attachment */}
        <div className="mt-5">
          <h3 className="font-bold text-[#303558] text-[9px]">Attach Quotation / Document</h3>

          {!attachment ? (
            <label className="mt-2 flex h-[70px] cursor-pointer items-center justify-center gap-3 rounded-[6px] border border-[#c6c4ec] border-dashed bg-[#fbfaff] transition hover:bg-[#f7f6ff]">
              <Paperclip size={17} className="text-[#3024ca]" />

              <div>
                <p className="font-semibold text-[#3024ca] text-[9px]">Click to upload quotation or document</p>

                <p className="mt-1 text-[#85899f] text-[8px]">{getUploadHint(ATTACHMENT_CATEGORY)}</p>
              </div>

              <input
                type="file"
                accept={getUploadAccept(ATTACHMENT_CATEGORY)}
                disabled={submitting}
                className="hidden"
                onChange={(event) => {
                  handleAttachmentChange(event.target.files?.[0]);

                  // Allow re-selecting the same file after removing it.
                  event.target.value = "";
                }}
              />
            </label>
          ) : (
            <div className="mt-2 flex h-[50px] items-center gap-3 rounded-[6px] border border-[#e0e1eb] px-3">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[4px] bg-[#f0eeff]">
                <FileText size={14} className="text-[#3024ca]" />
              </div>

              <p className="min-w-0 flex-1 truncate font-semibold text-[#3b405e] text-[9px]">{attachment.name}</p>

              <button
                type="button"
                onClick={() => setAttachment(null)}
                disabled={submitting}
                aria-label="Remove attachment"
                className="flex h-[24px] w-[24px] items-center justify-center rounded text-[#555b76] hover:bg-[#f3f2ff]"
              >
                <X size={11} />
              </button>
            </div>
          )}
        </div>

        {error ? (
          <p role="alert" className="mt-4 rounded-[6px] border border-red-200 bg-red-50 px-3 py-2 text-[9px] text-red-600">
            {error}
          </p>
        ) : null}

        {/* Bottom Actions */}
        <div className="mt-6 flex items-center justify-between border-[#ececf3] border-t pt-4">
          <p className="text-[#777c94] text-[9px]">Your reply will be added to the inquiry conversation history.</p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="flex h-[36px] min-w-[90px] items-center justify-center rounded-[5px] border border-[#cbc8eb] bg-white font-bold text-[#3024ca] text-[10px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSendReply}
              disabled={!message.trim() || submitting}
              aria-busy={submitting}
              className="flex h-[36px] min-w-[125px] items-center justify-center gap-2 rounded-[5px] bg-[#2819bd] px-5 font-bold text-[10px] text-white transition hover:bg-[#3426d3] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
              {submitting ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-bold text-[#303558] text-[9px]">
        {label}

        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
      </label>

      {children}
    </div>
  );
}

function optionalText(value: string) {
  return value.trim() || undefined;
}

const inputClass =
  "h-[38px] w-full rounded-[5px] border border-[#dfe0eb] bg-white px-3 text-[9px] text-[#3d4260] outline-none transition placeholder:text-[#999daf] focus:border-[#3024ca]";
