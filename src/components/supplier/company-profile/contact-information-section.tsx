
"use client";

import {
  SupplierFormCard,
  SupplierFormField,
  supplierInputClass,
  supplierTextareaClass,
} from "@/components/supplier/common/supplier-form";
import type { CompanyFieldChangeHandler, CompanyFieldErrors } from "@/hooks/use-company-form";

type ContactInformationSectionProps = {
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  errors: CompanyFieldErrors;
  onChange: CompanyFieldChangeHandler;
};

export function ContactInformationSection({
  phoneNumber,
  email,
  address,
  city,
  state,
  pinCode,
  errors,
  onChange,
}: ContactInformationSectionProps) {
  return (
    <SupplierFormCard title="Contact Information">
      <div className="grid grid-cols-2 gap-3">
        <SupplierFormField label="Phone Number" required error={errors.phone_number}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(event) =>
              onChange("phone_number", event.target.value)
            }
            className={supplierInputClass}
          />
        </SupplierFormField>

        <SupplierFormField label="Email Address" required error={errors.email}>
          <input
            type="email"
            value={email}
            onChange={(event) =>
              onChange("email", event.target.value)
            }
            className={supplierInputClass}
          />
        </SupplierFormField>
      </div>

      <div className="mt-4">
        <SupplierFormField label="Address" required error={errors.address}>
          <textarea
            value={address}
            onChange={(event) =>
              onChange("address", event.target.value)
            }
            className={supplierTextareaClass}
          />
        </SupplierFormField>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <SupplierFormField label="City" required error={errors.city}>
          <input
            value={city}
            onChange={(event) =>
              onChange("city", event.target.value)
            }
            className={supplierInputClass}
          />
        </SupplierFormField>

        <SupplierFormField label="State" required error={errors.state}>
          <select
            value={state}
            onChange={(event) =>
              onChange("state", event.target.value)
            }
            className={supplierInputClass}
          >
            <option value="">Select state</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Rajasthan">Rajasthan</option>
          </select>
        </SupplierFormField>

        <SupplierFormField label="PIN Code" required error={errors.pin_code}>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={pinCode}
            onChange={(event) =>
              onChange("pin_code", event.target.value.replace(/\D/g, ""))
            }
            className={supplierInputClass}
          />
        </SupplierFormField>
      </div>
    </SupplierFormCard>
  );
}