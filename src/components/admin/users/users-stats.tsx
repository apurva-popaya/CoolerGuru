import { Store, Users } from "lucide-react";

import { StatCard } from "@/components/common/stat-card";

interface UsersStatsProps {
  total: number;

  buyers: number;

  suppliers: number;
}

export function UsersStats({ total, buyers, suppliers }: UsersStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard title="Total Users" value={total} icon={Users} />

      <StatCard title="Buyers" value={buyers} icon={Users} />

      <StatCard title="Suppliers" value={suppliers} icon={Store} />
    </div>
  );
}
