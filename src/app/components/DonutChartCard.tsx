"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Dining", value: 35, color: "#FFB84E" },
  { name: "Groceries", value: 30, color: "#A9B9FF" },
  { name: "Other", value: 35, color: "#9BA3B7" },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const d = payload[0].payload;

  return (
    <div className="px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-xs">
      <div className="opacity-70">{d.name}</div>
      <div className="text-sm font-semibold text-white">
        {d.value}%
      </div>
    </div>
  );
}

export default function DonutChartCard() {
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
        flex flex-col
      "
      style={{ height: 320 }}
    >
      {/* Top highlight strip */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Category Breakdown
      </p>

      <div className="flex-1 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
            />

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-xs text-white/60 tracking-wide">TOTAL</p>
          <p className="text-2xl font-semibold tracking-tight text-white mt-0.5">
            100%
          </p>
        </div>
      </div>
    </div>
  );
}
