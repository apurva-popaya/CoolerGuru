import { CalendarDays, Clock3, FileText, MessageCircleMore } from "lucide-react";

interface BuyerDashboardStatsProps {
  totalInquiries: number;
  recentInquiries: number;
  loading?: boolean;
}

export function BuyerDashboardStats({ totalInquiries, recentInquiries, loading = false }: BuyerDashboardStatsProps) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-5">
      <div className="relative flex min-h-[115px] items-center overflow-hidden rounded-[9px] border border-[#e1e2ed] bg-white px-5">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[9px] bg-[#f0edff] text-[#3828db]">
          <MessageCircleMore size={27} />
        </div>

        <div className="ml-5">
          <p className="font-bold text-[#22234e] text-[11px]">Total Inquiries</p>

          <p className="mt-1 font-bold text-[#3223c8] text-[30px] leading-none">{loading ? "..." : totalInquiries}</p>

          <p className="mt-2 text-[#656a82] text-[9px]">Inquiries you have sent to suppliers</p>
        </div>

        <div className="pointer-events-none absolute top-1/2 -right-2 flex h-[100px] w-[130px] -translate-y-1/2 items-center justify-center rounded-full bg-[#f7f5ff] text-[#bcb6f5]">
          <FileText size={42} />
        </div>
      </div>

      <div className="relative flex min-h-[115px] items-center overflow-hidden rounded-[9px] border border-[#e1e2ed] bg-white px-5">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[9px] bg-[#edf9ef] text-[#169a35]">
          <Clock3 size={27} />
        </div>

        <div className="ml-5">
          <p className="font-bold text-[#22234e] text-[11px]">Recent Inquiries</p>

          <p className="mt-1 font-bold text-[#159737] text-[30px] leading-none">{loading ? "..." : recentInquiries}</p>

          <p className="mt-2 text-[#656a82] text-[9px]">Inquiries sent in the last 30 days</p>
        </div>

        <div className="pointer-events-none absolute top-1/2 -right-2 flex h-[100px] w-[130px] -translate-y-1/2 items-center justify-center rounded-full bg-[#f3fbf4] text-[#b6e6be]">
          <CalendarDays size={44} />
        </div>
      </div>
    </div>
  );
}
