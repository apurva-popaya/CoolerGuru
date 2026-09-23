import { CalendarDays, Clock3, FileText, MessageCircleMore } from "lucide-react";

interface BuyerDashboardStatsProps {
  totalInquiries: number;
  recentInquiries: number;
  loading?: boolean;
}

export function BuyerDashboardStats({
  totalInquiries,
  recentInquiries,
  loading = false,
}: BuyerDashboardStatsProps) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
      <div className="relative flex min-h-[115px] items-center overflow-hidden rounded-[9px] border border-[#e1e2ed] bg-white px-4 sm:px-5">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[9px] bg-[#f0edff] text-[#3828db] sm:h-[60px] sm:w-[60px]">
          <MessageCircleMore size={25} />
        </div>

        <div className="ml-4 sm:ml-5">
          <p className="font-bold text-[#22234e] text-[10px] sm:text-[11px]">
            Total Inquiries
          </p>

          <p className="mt-1 font-bold text-[#3223c8] text-[27px] leading-none sm:text-[30px]">
            {loading ? "..." : totalInquiries}
          </p>

          <p className="mt-2 text-[#656a82] text-[8px] sm:text-[9px]">
            Inquiries you have sent to suppliers
          </p>
        </div>

        <div className="pointer-events-none absolute top-1/2 -right-2 hidden h-[100px] w-[130px] -translate-y-1/2 items-center justify-center rounded-full bg-[#f7f5ff] text-[#bcb6f5] sm:flex">
          <FileText size={42} />
        </div>
      </div>

      <div className="relative flex min-h-[115px] items-center overflow-hidden rounded-[9px] border border-[#e1e2ed] bg-white px-4 sm:px-5">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[9px] bg-[#edf9ef] text-[#169a35] sm:h-[60px] sm:w-[60px]">
          <Clock3 size={25} />
        </div>

        <div className="ml-4 sm:ml-5">
          <p className="font-bold text-[#22234e] text-[10px] sm:text-[11px]">
            Recent Inquiries
          </p>

          <p className="mt-1 font-bold text-[#159737] text-[27px] leading-none sm:text-[30px]">
            {loading ? "..." : recentInquiries}
          </p>

          <p className="mt-2 text-[#656a82] text-[8px] sm:text-[9px]">
            Inquiries sent in the last 30 days
          </p>
        </div>

        <div className="pointer-events-none absolute top-1/2 -right-2 hidden h-[100px] w-[130px] -translate-y-1/2 items-center justify-center rounded-full bg-[#f3fbf4] text-[#b6e6be] sm:flex">
          <CalendarDays size={44} />
        </div>
      </div>
    </div>
  );
}