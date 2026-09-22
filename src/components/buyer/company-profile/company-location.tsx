import Image from "next/image";

import type { CompanyProfile } from "@/types/company-profile";

export function CompanyLocation({ company }: { company: CompanyProfile }) {
  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">Company Location</h2>

      <div className="relative mt-3 h-[145px] overflow-hidden rounded-[6px]">
        <Image src={company.mapImage} alt={`${company.name} location`} fill sizes="500px" className="object-cover" />
      </div>
    </div>
  );
}
