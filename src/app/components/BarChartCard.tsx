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
import useCardHoverTilt from "../hooks/useCardHoverTilt";

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
  const { style, handleMove, handleLeave } = useCardHoverTilt(320);

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className="
        relative
        rounded-2xl
        border border-white/25
        bg-white/[0.08]
        backdrop-blur-2xl

        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        before:content-['']
        before:absolute before:inset-0 before:rounded-2xl
        before:shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]

        px-8 pt-6 pb-5

        transition-all
        duration-300
        ease-[cubic-bezier(.16,1,.3,1)]
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Monthly Spending
      </p>

      <div className="h-[240px] w-full">
        <ResponsiveContainer>
          <BarChart data={data} barSize={32}>
            <CartesianGrid
              stroke="rgba(255,255,255,0.12)"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.06)" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 10, 10]}
              fill="url(#aetherBar)"
            />

            <defs>
              <linearGradient id="aetherBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E6EDFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#9AB3FF" stopOpacity="0.95" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
