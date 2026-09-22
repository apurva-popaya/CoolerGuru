"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { userGrowthData } from "./analytics-data";

export function UserGrowthChart() {
  return (
    <div className="h-[235px] rounded-[10px] border border-border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-[#15136f] text-[15px]">User Growth</h2>

        <div className="flex items-center gap-4 text-[#5d6280] text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#2720a8]" />
            Buyers
          </div>

          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#928df3]" />
            Suppliers
          </div>
        </div>
      </div>

      <div className="h-[175px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={userGrowthData}
            margin={{
              top: 5,
              right: 5,
              bottom: 0,
              left: -10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="buyers"
              stroke="#2720a8"
              strokeWidth={2}
              dot={{
                r: 3,
                fill: "#2720a8",
              }}
            />

            <Line
              type="monotone"
              dataKey="suppliers"
              stroke="#928df3"
              strokeWidth={2}
              dot={{
                r: 3,
                fill: "#928df3",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
