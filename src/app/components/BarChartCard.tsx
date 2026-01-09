"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import useCardHoverTilt from "../hooks/useCardHoverTilt";

type BarChartCardProps = {
  data: number[];
};

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

export default function BarChartCard({ data }: BarChartCardProps) {
  const { style, handleMove, handleLeave } = useCardHoverTilt(320);
  const [hovered, setHovered] = useState<number | null>(null);

  // transform raw numbers → recharts format
  const chartData = data.map((value, i) => ({
    name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i] ?? `M${i + 1}`,
    value,
  }));

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => {
        handleLeave();
        setHovered(null);
      }}
      style={style}
      className="
        relative rounded-2xl
        border border-white/20
        backdrop-blur-xl
        shadow-[0_25px_80px_rgba(0,0,0,0.45)]
        px-8 pt-6 pb-5
        transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Monthly Spending
      </p>

      <div className="h-[240px] w-full">
        <ResponsiveContainer>
          <BarChart data={chartData} barSize={32}>
            <CartesianGrid stroke="rgba(255,255,255,0.12)" vertical={false} />

            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.85)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "rgba(255,255,255,0.85)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 10, 10]}
              stroke="rgba(255,255,255,0.45)"
              strokeWidth={1}
              isAnimationActive={false}
              onMouseEnter={(_, i) => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {chartData.map((_, i) => (
                <Cell
                  key={i}
                  fill={i === hovered ? "url(#barHover)" : "url(#barFill)"}
                />
              ))}
            </Bar>

            <defs>
              <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CADAFF" />
                <stop offset="45%" stopColor="#6FA2FF" />
                <stop offset="100%" stopColor="#E9F0FF" />
              </linearGradient>

              <linearGradient id="barHover" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EEF3FF" />
                <stop offset="45%" stopColor="#86B4FF" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
