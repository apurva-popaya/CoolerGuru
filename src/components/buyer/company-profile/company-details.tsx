import type { CompanyProfile } from "@/types/company-profile";

export function CompanyDetails({
  company,
}: {
  company: CompanyProfile;
}) {
  const details = [
    {
      label: "Year of Establishment",
      value: company.establishedYear,
    },
    {
      label: "Legal Status",
      value: company.legalStatus,
    },
    {
      label: "GST Number",
      value: company.gstNumber,
    },
    {
      label: "Employee Strength",
      value: company.employeeStrength,
    },
  ].filter((detail) => detail.value);

  // Don't render the section if no details are available.
  if (details.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">
        Company Details
      </h2>

      <div className="mt-4 space-y-2.5">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="grid grid-cols-[105px_minmax(0,1fr)] gap-3 sm:grid-cols-[110px_minmax(0,1fr)]"
          >
            <span className="text-[#656a82] text-[8px]">
              {detail.label}
            </span>

            <span className="break-words font-medium text-[#3a3f60] text-[8px]">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}