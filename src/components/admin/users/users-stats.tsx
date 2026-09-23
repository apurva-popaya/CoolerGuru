import {
  CircleCheck,
  Store,
  UserRound,
  UserX,
  Users,
} from "lucide-react";

import {
  StatCard,
} from "@/components/common/stat-card";

interface UsersStatsProps {
  total: number;
  buyers: number;
  suppliers: number;
  active: number;
  inactive: number;
}

export function UsersStats({
  total,
  buyers,
  suppliers,
  active,
  inactive,
}: UsersStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard title="Total Users" value={total} icon={Users} />

      <StatCard title="Buyers" value={buyers} icon={UserRound} />

      <StatCard title="Suppliers" value={suppliers} icon={Store} />

      <StatCard title="Active Users" value={active} icon={CircleCheck} />

      <StatCard title="Inactive Users" value={inactive} icon={UserX} />
    </div>
  );
}