import { BadgeCheck, Leaf, ShieldCheck } from "lucide-react";

import type { CompanyCertification } from "@/types/company-profile";

export function CompanyCertifications({
  certifications,
}: {
  certifications: CompanyCertification[];
}) {
  // Don't render the section if no certifications are available.
  if (!certifications.length) {
    return null;
  }

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[12px]">
        Certifications
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {certifications.map((certification, index) => (
          <div
            key={certification.id}
            className="rounded-[7px] border border-[#e3e4ed] px-2 py-3 text-center"
          >
            <div className="flex justify-center text-[#2920cb]">
              {index === 0 ? (
                <BadgeCheck size={25} />
              ) : index === 1 ? (
                <ShieldCheck size={25} />
              ) : (
                <Leaf size={25} />
              )}
            </div>

            <p className="mt-2 font-bold text-[#191571] text-[9px]">
              {certification.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}