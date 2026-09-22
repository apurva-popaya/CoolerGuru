import { CheckCircle2, Mail, MessageCircleMore, Reply } from "lucide-react";

interface InquiryStatsProps {
  total: number;
  newCount: number;
  repliedCount: number;
  closedCount: number;
}

export function InquiryStats({ total, newCount, repliedCount, closedCount }: InquiryStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <InquiryStatCard
        icon={MessageCircleMore}
        title="Total Inquiries"
        value={total}
        description="All inquiries received to date"
        iconClass="bg-[#f0eeff] text-[#3124d4]"
      />

      <InquiryStatCard
        icon={Mail}
        title="New Inquiries"
        value={newCount}
        description="Awaiting your response"
        iconClass="bg-[#f0eeff] text-[#3124d4]"
      />

      <InquiryStatCard
        icon={Reply}
        title="Replied"
        value={repliedCount}
        description="You have replied to these inquiries"
        iconClass="bg-[#eaf8ef] text-[#21904a]"
      />

      <InquiryStatCard
        icon={CheckCircle2}
        title="Closed"
        value={closedCount}
        description="Successfully closed inquiries"
        iconClass="bg-[#eaf3ff] text-[#2774df]"
      />
    </div>
  );
}

function InquiryStatCard({
  icon: Icon,
  title,
  value,
  description,
  iconClass,
}: {
  icon: React.ElementType;
  title: string;
  value: number;
  description: string;
  iconClass: string;
}) {
  return (
    <div className="min-h-[140px] rounded-[9px] border border-[#e1e2ed] bg-white p-5">
      <div className="flex items-center gap-3">
        <div className={`flex h-[42px] w-[42px] items-center justify-center rounded-full ${iconClass}`}>
          <Icon size={19} />
        </div>

        <p className="font-semibold text-[#313656] text-[11px]">{title}</p>
      </div>

      <p className="mt-3 font-bold text-[#171570] text-[24px]">{value}</p>

      <p className="mt-2 text-[#85899f] text-[9px] leading-[1.45]">{description}</p>
    </div>
  );
}
