import { Cog, Factory, Zap } from "lucide-react";

import type { CompanyProfile } from "@/types/company-profile";

export function CompanyOverview({ company }: { company: CompanyProfile }) {
  return (
    <div className="mt-4 rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[13px] sm:text-[14px]">
        Overview
      </h2>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-[1fr_1px_1fr] md:gap-5">
        {/* About */}
        <div>
          <h3 className="font-bold text-[#25207e] text-[9px]">
            About Company
          </h3>

          <p className="mt-2 text-[#4d526e] text-[9px] leading-[1.6]">
            {company.about}
          </p>
        </div>

        {/* Divider */}
        <div className="hidden bg-[#e6e7ef] md:block" />

        {/* Categories */}
        <div>
          <h3 className="font-bold text-[#25207e] text-[9px]">
            Product Categories
          </h3>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            {company.productCategories.map((category, index) => (
              <div
                key={category}
                className="flex min-h-[55px] items-center gap-3 rounded-[7px] border border-[#e4e5ee] px-3 py-2 sm:min-h-[62px]"
              >
                <span className="shrink-0 text-[#3225db]">
                  {index === 0 ? (
                    <Factory size={20} />
                  ) : index === 1 ? (
                    <Cog size={20} />
                  ) : (
                    <Zap size={20} />
                  )}
                </span>

                <span className="font-semibold text-[#2b2781] text-[8px]">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}