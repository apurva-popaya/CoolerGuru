import type { CompanyProfile } from "@/types/company-profile";

export function CompanyDetails({ company }: { company: CompanyProfile }) {
  const details = [
    ["Year of Establishment", company.establishedYear],
    ["Legal Status", company.legalStatus],
    ["GST Number", company.gstNumber],
    ["PAN Number", company.panNumber],
    ["Employee Strength", company.employeeStrength],
    ["Export Markets", company.exportMarkets],
    ["Service Areas", company.serviceAreas],
  ];

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">Company Details</h2>

      <div className="mt-4 space-y-2.5">
        {details.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[110px_1fr] gap-3">
            <span className="text-[#656a82] text-[8px]">{label}</span>

            <span className="font-medium text-[#3a3f60] text-[8px]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
