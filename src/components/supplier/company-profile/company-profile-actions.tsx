import Link from "next/link";

import { Eye, Info, Save, Send } from "lucide-react";

export function CompanyProfileActions() {
  return (
    <div className="mt-4 flex items-center justify-between gap-5 rounded-[8px] border border-[#e2e3ed] bg-white px-4 py-3">
      <Link
        href="/companies/1"
        className="!text-[#2d22bd] flex h-[36px] items-center gap-2 rounded-[5px] border border-[#d8d9e9] px-4 font-semibold text-[9px] transition hover:bg-[#f7f6ff]"
      >
        <Eye size={12} />
        Preview Public Profile
      </Link>

      <div className="flex items-center gap-2 text-[#777b92] text-[9px]">
        <Info size={12} className="text-[#3125c7]" />
        Verification usually takes 1-2 business days after submission.
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-[36px] items-center gap-2 rounded-[5px] border border-[#dadbea] bg-white px-4 font-semibold text-[#4e5472] text-[9px] transition hover:bg-[#f7f6ff]"
        >
          <Save size={11} />
          Save Draft
        </button>

        <button
          type="button"
          className="flex h-[36px] items-center gap-2 rounded-[5px] bg-[#281ac2] px-4 font-bold text-[9px] text-white transition hover:bg-[#3527d3]"
        >
          <Send size={11} />
          Submit for Verification
        </button>
      </div>
    </div>
  );
}
