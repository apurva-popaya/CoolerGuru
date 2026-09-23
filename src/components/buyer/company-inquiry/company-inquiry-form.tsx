"use client";

import { type FormEvent, useState } from "react";

import Link from "next/link";

import { ChevronDown, Send } from "lucide-react";

import { createCompanyInquiry } from "@/lib/api/buyer-inquiries-api";
import { getApiErrorMessage } from "@/lib/api/get-api-error-message";

interface CompanyInquiryFormProps {
  companySlug: string;
}

export function CompanyInquiryForm({
  companySlug,
}: CompanyInquiryFormProps) {
  const [productRequirement, setProductRequirement] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cityState, setCityState] = useState("");
  const [requirementDetails, setRequirementDetails] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const maxCharacters = 1000;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setSuccess("");

    const quantityNumber = Number(quantity);

    if (!Number.isFinite(quantityNumber) || quantityNumber <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    if (mobileNumber.length !== 10) {
      setError("Please enter a valid 10 digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const response = await createCompanyInquiry(companySlug, {
        product_requirement: productRequirement.trim(),
        quantity: quantityNumber,
        quantity_unit: "Units",
        buyer_name: buyerName.trim(),
        buyer_phone_number: `+91${mobileNumber}`,
        buyer_email: email.trim(),
        buyer_city_state: cityState.trim(),
        requirement_details: requirementDetails.trim(),
      });

      setSuccess(response.message || "Inquiry submitted successfully.");

      setProductRequirement("");
      setQuantity("");
      setRequirementDetails("");
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[10px] border border-[#e1e2ed] bg-white p-4 sm:p-5"
    >
      {/* Product / Requirement */}
      <FormField label="Product / Requirement" required>
        <input
          type="text"
          value={productRequirement}
          onChange={(event) =>
            setProductRequirement(event.target.value)
          }
          placeholder="Enter product name or requirement"
          className={inputClass}
          disabled={loading}
          required
        />
      </FormField>

      {/* Quantity + Buyer Name */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Quantity" required>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="Enter quantity (e.g., 10, 50, 100 units)"
            className={inputClass}
            disabled={loading}
            required
          />
        </FormField>

        <FormField label="Buyer Name" required>
          <input
            type="text"
            value={buyerName}
            onChange={(event) => setBuyerName(event.target.value)}
            placeholder="Enter your full name"
            className={inputClass}
            disabled={loading}
            required
          />
        </FormField>
      </div>

      {/* Mobile + Email */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Mobile Number" required>
          <div className="flex h-[44px] overflow-hidden rounded-[5px] border border-[#dedff0] bg-white">
            <button
              type="button"
              className="flex w-[58px] shrink-0 items-center justify-center gap-1 border-[#dedff0] border-r font-medium text-[#30355c] text-[11px] sm:w-[68px]"
              disabled={loading}
            >
              <span className="text-[16px]">🇮🇳</span>

              <ChevronDown size={11} />
            </button>

            <div className="flex w-[50px] shrink-0 items-center justify-center border-[#dedff0] border-r font-medium text-[#34395f] text-[11px] sm:w-[55px]">
              +91
            </div>

            <input
              type="tel"
              value={mobileNumber}
              onChange={(event) =>
                setMobileNumber(
                  event.target.value.replace(/\D/g, "").slice(0, 10),
                )
              }
              placeholder="Enter mobile number"
              className="min-w-0 flex-1 px-2.5 text-[#292e50] text-[11px] outline-none placeholder:text-[#a4a7b8] sm:px-3"
              disabled={loading}
              required
            />
          </div>
        </FormField>

        <FormField label="Email Address" required>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            className={inputClass}
            disabled={loading}
            required
          />
        </FormField>
      </div>

      {/* City */}
      <div className="mt-5">
        <FormField label="City / State" required>
          <input
            type="text"
            value={cityState}
            onChange={(event) => setCityState(event.target.value)}
            placeholder="Enter city and state"
            className={inputClass}
            disabled={loading}
            required
          />
        </FormField>
      </div>

      {/* Requirement Details */}
      <div className="mt-5">
        <FormField label="Requirement Details" required>
          <div className="relative">
            <textarea
              value={requirementDetails}
              onChange={(event) =>
                setRequirementDetails(
                  event.target.value.slice(0, maxCharacters),
                )
              }
              placeholder="Describe your requirement, specifications, purpose, delivery timeline, or any other details..."
              className="min-h-[120px] w-full resize-none rounded-[5px] border border-[#dedff0] bg-white px-3 py-3 pb-7 text-[#292e50] text-[11px] leading-[1.5] outline-none transition placeholder:text-[#a4a7b8] focus:border-[#8c83e8]"
              disabled={loading}
              required
            />

            <span className="absolute right-3 bottom-2 text-[#6b70a0] text-[8px]">
              {requirementDetails.length}/{maxCharacters}
            </span>
          </div>
        </FormField>
      </div>

      {/* Messages */}
      {error && (
        <div className="mt-5 rounded-[6px] border border-red-200 bg-red-50 px-4 py-3 font-medium text-[10px] text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-5 rounded-[6px] border border-green-200 bg-green-50 px-4 py-3 font-medium text-[10px] text-green-700">
          {success}
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex h-[42px] items-center justify-center gap-2 rounded-[5px] bg-gradient-to-r from-[#2423b4] to-[#2412a1] font-bold text-[11px] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={15} />

          {loading ? "Submitting..." : "Submit Inquiry"}
        </button>

        <Link
          href={`/companies/${companySlug}`}
          className="!text-[#2118ad] flex h-[42px] items-center justify-center rounded-[5px] border border-[#dfe0eb] bg-white font-bold text-[11px] transition hover:bg-[#f7f6ff]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({
  label,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block font-bold text-[#171570] text-[10px]">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {children}
    </div>
  );
}

const inputClass =
  "h-[44px] w-full rounded-[5px] border border-[#dedff0] bg-white px-3 text-[11px] text-[#292e50] outline-none transition placeholder:text-[#a4a7b8] focus:border-[#8c83e8]";