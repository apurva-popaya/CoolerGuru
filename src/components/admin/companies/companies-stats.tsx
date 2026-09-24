import {
  Building2,
  CircleCheck,
  CircleX,
  Clock3,
} from "lucide-react";

import {
  StatCard,
} from "@/components/common/stat-card";

interface CompaniesStatsProps {
  total: number;

  verified: number;

  underVerification: number;

  rejected: number;
}

export function CompaniesStats({
  total,
  verified,
  underVerification,
  rejected,
}: CompaniesStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Companies"
        value={total}
        icon={Building2}
        subtitle="All registered companies"
      />

      <StatCard
        title="Verified Companies"
        value={verified}
        icon={CircleCheck}
        subtitle="Verified and active companies"
      />

      <StatCard
        title="Under Verification"
        value={underVerification}
        icon={Clock3}
        subtitle="Pending company verification"
      />

      <StatCard
        title="Rejected Companies"
        value={rejected}
        icon={CircleX}
        subtitle="Rejected company registrations"
      />
    </div>
  );
}