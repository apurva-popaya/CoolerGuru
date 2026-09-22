"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { userDistributionData } from "./overview-data";

const COLORS = ["#2563eb", "#7c3aed", "#0ca76b"];

export function UserDistributionChart() {
  return (
    <div className="h-full rounded-[8px] border border-[#e3e6f3] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-[#15136f] text-[15px]">User Distribution</h2>

        <button type="button" className="font-semibold text-[#2720a8] text-[11px]">
          View Details
        </button>
      </div>

      <div className="grid min-h-[250px] grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_1fr]">
        <div className="relative mx-auto h-[200px] w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userDistributionData}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={86}
                paddingAngle={0}
                stroke="none"
              >
                {userDistributionData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-bold text-[#15136f] text-[25px]">3,126</span>

            <span className="text-[#5d6280] text-[11px]">Total Users</span>
          </div>
        </div>

        <div className="space-y-5">
          {userDistributionData.map((item, index) => (
            <div key={item.name} className="grid grid-cols-[14px_1fr_auto_auto] items-center gap-3 text-[12px]">
              <span
                className="size-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="font-semibold text-[#15136f]">{item.name}</span>

              <span className="font-semibold text-[#15136f]">{item.value.toLocaleString()}</span>

              <span className="text-[#5d6280]">{item.percentage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
