import Image from "next/image";

import { SupplierFormCard, SupplierFormField, supplierInputClass } from "@/components/supplier/common/supplier-form";

export function CompanyAdditionalDetails() {
  return (
    <>
      <div className="mt-4 grid grid-cols-[1fr_1fr_1.4fr] gap-4">
        <SupplierFormCard title="5. Website & Social Media Links">
          <SocialInput label="Website" value="https://www.abccooling.com" />
          <SocialInput label="Facebook" value="https://www.facebook.com/abccooling" />
          <SocialInput label="Instagram" value="https://www.instagram.com/abccooling" />
          <SocialInput label="YouTube" value="https://www.youtube.com/@abccooling" />
          <SocialInput label="LinkedIn" value="https://www.linkedin.com/company/abccooling" />
        </SupplierFormCard>

        <SupplierFormCard title="6. Business Hours">
          <p className="mb-3 text-[#777b92] text-[8px]">Set your typical business hours</p>

          <BusinessHourRow day="Mon - Fri" open="09:00 AM" close="06:00 PM" />
          <BusinessHourRow day="Saturday" open="09:00 AM" close="02:00 PM" />
          <BusinessHourRow day="Sunday" open="" close="" closed />
        </SupplierFormCard>

        <SupplierFormCard title="7. Location Map">
          <SupplierFormField label="Address" required>
            <input
              defaultValue="123, Industrial Estate, Phase 2, Ahmedabad, Gujarat 380015"
              className={supplierInputClass}
            />
          </SupplierFormField>

          <div className="relative mt-3 h-[135px] overflow-hidden rounded-[6px]">
            <Image
              src="/images/company-profile/ahmedabad-map.png"
              alt="Company location"
              fill
              className="object-cover"
            />
          </div>

          <p className="mt-1 text-[#888ca1] text-[8px]">Drag the pin to adjust your exact location.</p>
        </SupplierFormCard>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <SupplierFormCard title="8. Years in Business">
          <SupplierFormField label="Years in Business">
            <select defaultValue="10+ Years" className={supplierInputClass}>
              <option>1 - 5 Years</option>
              <option>5 - 10 Years</option>
              <option>10+ Years</option>
            </select>
          </SupplierFormField>
        </SupplierFormCard>

        <SupplierFormCard title="9. Employee Size">
          <SupplierFormField label="Employee Size">
            <select defaultValue="51 - 200 Employees" className={supplierInputClass}>
              <option>1 - 10 Employees</option>
              <option>11 - 50 Employees</option>
              <option>51 - 200 Employees</option>
              <option>201 - 500 Employees</option>
              <option>500+ Employees</option>
            </select>
          </SupplierFormField>
        </SupplierFormCard>

        <SupplierFormCard title="10. Certifications">
          <p className="mb-2 text-[#777b92] text-[8px]">Add your company certifications</p>

          <div className="flex flex-wrap gap-2">
            <CertificationBadge text="ISO 9001:2015" />
            <CertificationBadge text="CE Certified" />
            <CertificationBadge text="ISI Mark" />
          </div>
        </SupplierFormCard>
      </div>

      <div className="mt-4">
        <SupplierFormCard title="11. Company Brochure (PDF)">
          <div className="grid grid-cols-[1fr_1.2fr] gap-4">
            <div className="flex h-[54px] items-center gap-3 rounded-[6px] border border-[#dfe0eb] px-3">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded bg-[#ffeded] font-bold text-[8px] text-red-500">
                PDF
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[#30355c] text-[9px]">ABC_Cooling_Industries_Brochure.pdf</p>

                <p className="mt-1 text-[#8b8fa3] text-[8px]">1.35 MB</p>
              </div>

              <button type="button" className="font-semibold text-[8px] text-red-500">
                Remove
              </button>
            </div>

            <label className="flex h-[54px] cursor-pointer items-center justify-center rounded-[6px] border border-[#bfc0eb] border-dashed bg-[#fbfaff] font-semibold text-[#3024c4] text-[9px]">
              Click to upload or drag and drop
              <input type="file" accept=".pdf" className="hidden" />
            </label>
          </div>
        </SupplierFormCard>
      </div>
    </>
  );
}

function SocialInput({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 grid grid-cols-[60px_1fr] items-center gap-2">
      <span className="font-semibold text-[#4b506d] text-[9px]">{label}</span>

      <input
        defaultValue={value}
        className="h-[30px] rounded-[4px] border border-[#dfe0eb] px-2 text-[#555b76] text-[8px] outline-none focus:border-[#3829d6]"
      />
    </div>
  );
}

function BusinessHourRow({
  day,
  open,
  close,
  closed = false,
}: {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}) {
  return (
    <div className="mb-3 grid grid-cols-[55px_1fr_1fr_45px] items-center gap-2">
      <span className="font-semibold text-[#4b506d] text-[9px]">{day}</span>

      <input
        defaultValue={open}
        disabled={closed}
        className="h-[28px] rounded border border-[#dfe0eb] px-2 text-[8px] disabled:bg-[#f4f4f8]"
      />

      <input
        defaultValue={close}
        disabled={closed}
        className="h-[28px] rounded border border-[#dfe0eb] px-2 text-[8px] disabled:bg-[#f4f4f8]"
      />

      <span className="text-[#777b92] text-[8px]">{closed ? "Closed" : ""}</span>
    </div>
  );
}

function CertificationBadge({ text }: { text: string }) {
  return <span className="rounded-[4px] bg-[#f0eeff] px-2 py-1.5 font-semibold text-[#2d22bf] text-[7px]">{text}</span>;
}
