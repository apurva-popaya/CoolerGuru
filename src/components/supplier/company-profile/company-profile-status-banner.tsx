import { AlertCircle, ClipboardCheck } from "lucide-react";

export function CompanyProfileStatusBanner() {
  return (
    <div className="flex items-center justify-between gap-5 rounded-[9px] border border-[#f2c694] bg-[#fffaf5] px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#fff0df]">
          <ClipboardCheck size={25} className="text-[#ea6a17]" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-[#171570] text-[12px]">Your Profile is Not Verified</h2>

            <span className="rounded-[4px] bg-[#fff0df] px-2 py-1 font-bold text-[#e46317] text-[8px]">Pending</span>
          </div>

          <p className="mt-1 text-[#555b76] text-[9px]">
            Please complete all required details and upload the necessary documents to submit your profile for
            verification.
          </p>
        </div>
      </div>

      <div className="flex h-[32px] items-center gap-2 rounded-[5px] border border-[#efb98b] px-3 font-bold text-[#dd5e14] text-[9px]">
        <AlertCircle size={12} />
        Action Required
      </div>
    </div>
  );
}
