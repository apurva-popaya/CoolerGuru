"use client";

import { SupplierFormCard } from "@/components/supplier/common/supplier-form";
import type { CompanyFieldChangeHandler, CompanyFieldErrors } from "@/hooks/use-company-form";
import type { BusinessHours } from "@/lib/api/supplier-create-profile-api";

const BUSINESS_DAYS: ReadonlyArray<{ day: keyof BusinessHours; label: string }> = [
  { day: "monday_to_friday", label: "Mon - Fri" },
  { day: "saturday", label: "Saturday" },
  { day: "sunday", label: "Sunday" },
];

type CompanyBusinessHoursSectionProps = {
  businessHours: BusinessHours;
  errors: CompanyFieldErrors;
  onChange: CompanyFieldChangeHandler;
};

export function CompanyBusinessHoursSection({ businessHours, errors, onChange }: CompanyBusinessHoursSectionProps) {
  const updateTime = (day: keyof BusinessHours, field: "open" | "close", value: string) => {
    onChange("business_hours", {
      ...businessHours,
      [day]: {
        ...businessHours[day],
        [field]: value || null,
      },
    });
  };

  const toggleClosed = (day: keyof BusinessHours, isClosed: boolean) => {
    onChange("business_hours", {
      ...businessHours,
      [day]: {
        ...businessHours[day],
        is_closed: isClosed,
        open: isClosed ? null : (businessHours[day].open ?? "09:00"),
        close: isClosed ? null : (businessHours[day].close ?? "18:00"),
      },
    });
  };

  return (
    <SupplierFormCard title="Business Hours">
      <p className="mb-3 text-[#777b92] text-[8px]">Set your typical business hours</p>

      {BUSINESS_DAYS.map(({ day, label }) => {
        const hours = businessHours[day];

        return (
          <div key={day} className="mb-3 grid grid-cols-[55px_1fr_1fr_45px] items-center gap-2">
            <span className="font-semibold text-[#4b506d] text-[9px]">{label}</span>

            <input
              type="time"
              value={hours.open ?? ""}
              disabled={hours.is_closed}
              aria-label={`${label} opening time`}
              onChange={(event) => updateTime(day, "open", event.target.value)}
              className="h-[28px] rounded border border-[#dfe0eb] px-2 text-[8px] disabled:bg-[#f4f4f8]"
            />

            <input
              type="time"
              value={hours.close ?? ""}
              disabled={hours.is_closed}
              aria-label={`${label} closing time`}
              onChange={(event) => updateTime(day, "close", event.target.value)}
              className="h-[28px] rounded border border-[#dfe0eb] px-2 text-[8px] disabled:bg-[#f4f4f8]"
            />

            <label className="flex cursor-pointer items-center gap-1 text-[#777b92] text-[8px]">
              <input
                type="checkbox"
                checked={hours.is_closed}
                onChange={(event) => toggleClosed(day, event.target.checked)}
              />
              Closed
            </label>
          </div>
        );
      })}

      {errors.business_hours && (
        <p role="alert" className="text-[7.5px] text-red-500">
          {errors.business_hours}
        </p>
      )}
    </SupplierFormCard>
  );
}
