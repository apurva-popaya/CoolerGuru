"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { platformGrowthData } from "./overview-data";

export function PlatformGrowthChart() {
  return (
    <div className="rounded-[8px] border border-[#e3e6f3] bg-white p-4">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-[#15136f] text-[15px]">Platform Growth</h2>

          <div className="mt-3 flex flex-wrap items-center gap-5 text-[#5d6280] text-[11px]">
            <Legend color="#2563eb" label="Companies" />
            <Legend color="#7c3aed" label="Products" />
            <Legend color="#0ca76b" label="Users" />
            <Legend color="#f58a00" label="Inquiries" />
          </div>
        </div>

        <Select defaultValue="30">
          <SelectTrigger className="h-9 w-[120px] text-[12px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="7">Last 7 Days</SelectItem>

            <SelectItem value="30">Last 30 Days</SelectItem>

            <SelectItem value="90">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={platformGrowthData}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#eceef5" vertical={false} />

            <XAxis
              dataKey="date"
              tick={{
                fill: "#5d6280",
                fontSize: 10,
              }}
              axisLine={{
                stroke: "#e7e8f3",
              }}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#5d6280",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="companies"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{
                r: 3,
              }}
            />

            <Line
              type="monotone"
              dataKey="products"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={{
                r: 3,
              }}
            />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#0ca76b"
              strokeWidth={2}
              dot={{
                r: 3,
              }}
            />

            <Line
              type="monotone"
              dataKey="inquiries"
              stroke="#f58a00"
              strokeWidth={2}
              dot={{
                r: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="size-2 rounded-full"
        style={{
          backgroundColor: color,
        }}
      />

      <span>{label}</span>
    </div>
  );
}
