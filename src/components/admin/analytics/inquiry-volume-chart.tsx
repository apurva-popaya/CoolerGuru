"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { inquiryVolumeData } from "./analytics-data";

export function InquiryVolumeChart() {
  return (
    <div className="h-[235px] rounded-[10px] border border-border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-[#15136f] text-[15px]">Inquiry Volume</h2>

        <span className="text-[#5d6280] text-[11px]">Total 2,184 inquiries</span>
      </div>

      <div className="h-[175px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={inquiryVolumeData}
            margin={{
              top: 5,
              right: 5,
              bottom: 0,
              left: -20,
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

            <Tooltip
              cursor={{
                fill: "rgba(39, 32, 168, 0.04)",
              }}
            />

            <Bar dataKey="inquiries" fill="#8b85f5" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
