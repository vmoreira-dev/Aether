"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", value: 300 },
  { name: "Feb", value: 450 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 380 },
  { name: "May", value: 650 },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-xs">
      <div className="opacity-70">{payload[0].payload.name}</div>
      <div className="text-sm font-semibold text-white">
        ${payload[0].value}
      </div>
    </div>
  );
}

export default function BarChartCard() {
  return (
    <div
      className="
        relative
        rounded-3xl
        border border-white/12
        bg-white/[0.04]
        backdrop-blur-xl
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
        px-7 pt-6 pb-4
      "
      style={{ height: 320 }}
    >
      {/* Aether top highlight strip */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Monthly Spending
      </p>

      <div className="h-[240px] w-full">
        <ResponsiveContainer>
          <BarChart data={data} barSize={32}>
            <CartesianGrid
              stroke="rgba(255,255,255,0.08)"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="value"
              radius={[12, 12, 12, 12]}
              fill="url(#aetherBar)"
            />

            <defs>
              <linearGradient id="aetherBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CDD8FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#8EA0FF" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
