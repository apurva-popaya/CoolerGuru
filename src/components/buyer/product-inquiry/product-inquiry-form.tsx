"use client";

import { type FormEvent, type ReactNode, useState } from "react";

import Link from "next/link";

import { ChevronDown, Send, ShieldCheck } from "lucide-react";

import { createProductInquiry } from "@/lib/api/buyer-inquiries-api";
import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import type { ProductDetail } from "@/types/product-detail";

interface ProductInquiryFormProps {
  product: ProductDetail;
}

const inputClass =
  "h-[44px] w-full rounded-[5px] border border-[#dedff0] bg-white px-3 text-[11px] text-[#292e50] outline-none transition placeholder:text-[#a4a7b8] focus:border-[#8c83e8] disabled:cursor-not-allowed disabled:bg-[#fafaff] disabled:opacity-70";

export function ProductInquiryForm({
  product,
}: ProductInquiryFormProps) {
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("Units");

  const [buyerName, setBuyerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cityState, setCityState] = useState("");
  const [requirementDetails, setRequirementDetails] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const maxCharacters = 1000;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
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

    if (!buyerName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (mobileNumber.length !== 10) {
      setError("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!cityState.trim()) {
      setError("Please enter your city and state.");
      return;
    }

    if (!requirementDetails.trim()) {
      setError("Please enter your requirement details.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Backend expects PRODUCT SLUG here.
       *
       * Currently product.id is used because
       * ProductDetail currently uses id for the
       * product identifier.
       */
      const response = await createProductInquiry(
        product.id,
        {
          quantity: quantityNumber,
          quantity_unit: quantityUnit,
          buyer_name: buyerName.trim(),
          buyer_phone_number: `+91${mobileNumber}`,
          buyer_email: email.trim(),
          buyer_city_state: cityState.trim(),
          requirement_details: requirementDetails.trim(),
        },
      );

      setSuccess(
        response.message ||
          "Product inquiry submitted successfully.",
      );

      // Keep buyer details but clear inquiry-specific fields.
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
      className="rounded-[10px] border border-[#e1e2ed] bg-white p-4 sm:p-5 lg:p-6"
    >
      <h2 className="font-bold text-[#171570] text-[17px] sm:text-[18px]">
        Product Inquiry Form
      </h2>

      {/* Product */}
      <div className="mt-5">
        <FormField label="Product / Requirement">
          <input
            type="text"
            value={product.name}
            readOnly
            className="h-[44px] w-full rounded-[5px] border border-[#dedff0] bg-[#fafaff] px-3 font-medium text-[#35395a] text-[11px] outline-none"
          />
        </FormField>
      </div>

      {/* Quantity */}
      <div className="mt-5">
        <FormField label="Quantity">
          <div className="grid grid-cols-[minmax(0,1fr)_105px] gap-2 sm:gap-3">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(event.target.value)
              }
              placeholder="Enter quantity required"
              className={inputClass}
              disabled={loading}
              required
            />

            <select
              value={quantityUnit}
              onChange={(event) =>
                setQuantityUnit(event.target.value)
              }
              className="h-[44px] rounded-[5px] border border-[#dedff0] bg-white px-2 text-[#454a69] text-[10px] outline-none sm:px-3"
              disabled={loading}
            >
              <option value="Units">Unit</option>
              <option value="Pieces">Pieces</option>
              <option value="Sets">Sets</option>
              <option value="Kg">Kg</option>
              <option value="Box">Box</option>
            </select>
          </div>
        </FormField>
      </div>

      {/* Buyer Name */}
      <div className="mt-5">
        <FormField label="Buyer Name">
          <input
            type="text"
            value={buyerName}
            onChange={(event) =>
              setBuyerName(event.target.value)
            }
            placeholder="Enter your full name"
            className={inputClass}
            disabled={loading}
            required
          />
        </FormField>
      </div>

      {/* Mobile + Email */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Mobile Number">
          <div className="flex h-[44px] overflow-hidden rounded-[5px] border border-[#dedff0] bg-white">
            <button
              type="button"
              className="flex w-[72px] shrink-0 items-center justify-center gap-1.5 border-[#dedff0] border-r font-medium text-[#34395e] text-[10px] sm:w-[84px] sm:gap-2"
              disabled={loading}
            >
              +91
              <ChevronDown size={11} />
            </button>

            <input
              type="tel"
              inputMode="numeric"
              value={mobileNumber}
              onChange={(event) =>
                setMobileNumber(
                  event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10),
                )
              }
              placeholder="Enter mobile number"
              className="min-w-0 flex-1 px-3 text-[#292e50] text-[11px] outline-none placeholder:text-[#a4a7b8]"
              disabled={loading}
              required
            />
          </div>
        </FormField>

        <FormField label="Email Address">
          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email address"
            className={inputClass}
            disabled={loading}
            required
          />
        </FormField>
      </div>

      {/* City / State */}
      <div className="mt-5">
        <FormField label="City / State">
          <input
            type="text"
            value={cityState}
            onChange={(event) =>
              setCityState(event.target.value)
            }
            placeholder="Enter your city and state"
            className={inputClass}
            disabled={loading}
            required
          />
        </FormField>
      </div>

      {/* Requirement Details */}
      <div className="mt-5">
        <FormField label="Requirement Details">
          <div className="relative">
            <textarea
              value={requirementDetails}
              onChange={(event) =>
                setRequirementDetails(
                  event.target.value.slice(
                    0,
                    maxCharacters,
                  ),
                )
              }
              placeholder="Describe your requirement, application, preferred specifications or any other details..."
              className="min-h-[120px] w-full resize-none rounded-[5px] border border-[#dedff0] bg-white px-3 py-3 pb-7 text-[#292e50] text-[11px] leading-[1.5] outline-none transition placeholder:text-[#a4a7b8] focus:border-[#8c83e8] disabled:cursor-not-allowed disabled:bg-[#fafaff]"
              disabled={loading}
              required
            />

            <span className="absolute right-3 bottom-2 text-[#6b70a0] text-[8px]">
              {requirementDetails.length}/{maxCharacters}
            </span>
          </div>
        </FormField>
      </div>

      {/* Error */}
      {error ? (
        <div className="mt-5 rounded-[6px] border border-red-200 bg-red-50 px-4 py-3 font-medium text-[10px] text-red-600">
          {error}
        </div>
      ) : null}

      {/* Success */}
      {success ? (
        <div className="mt-5 rounded-[6px] border border-green-200 bg-green-50 px-4 py-3 font-medium text-[10px] text-green-700">
          {success}
        </div>
      ) : null}

      {/* Actions */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:flex sm:items-center">
        <button
          type="submit"
          disabled={loading}
          className="flex h-[40px] w-full items-center justify-center gap-2 rounded-[5px] bg-[#2116a5] px-6 font-bold text-[10px] text-white transition hover:bg-[#3022c6] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[220px] sm:flex-1"
        >
          <Send size={14} />

          {loading ? "Submitting..." : "Submit Inquiry"}
        </button>

        <Link
          href={`/products/${product.id}`}
          className="!text-[#251bb4] flex h-[40px] w-full items-center justify-center rounded-[5px] border border-[#3929dd] bg-white px-5 font-bold text-[10px] transition hover:bg-[#f6f5ff] sm:min-w-[170px] sm:flex-1"
        >
          Cancel
        </Link>
      </div>

      {/* Privacy / Info */}
      <div className="mt-3 flex items-start gap-2">
        <ShieldCheck
          size={13}
          className="mt-[1px] shrink-0 text-[#3025ce]"
        />

        <p className="text-[#696e84] text-[8px] leading-[1.4]">
          The supplier will receive your inquiry by email and
          dashboard notification.
        </p>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

function FormField({
  label,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block font-bold text-[#171570] text-[10px]">
        {label}
      </label>

      {children}
    </div>
  );
}