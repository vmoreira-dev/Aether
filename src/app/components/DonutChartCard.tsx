"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ringData = [
  { name: "A", value: 40 },
  { name: "B", value: 35 },
  { name: "C", value: 25 },
];

type TooltipProps = {
  active?: boolean;
  payload?: any[];
  coordinate?: { x: number; y: number };
};

function CustomTooltip({ active, payload, coordinate }: TooltipProps) {
  if (!active || !payload?.length || !coordinate) return null;

  const { x, y } = coordinate;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

  const d = payload[0].payload;

  return (
    <div
      style={{
        position: "absolute",
        left: x + 16,
        top: y - 10,
        pointerEvents: "none",
      }}
      className="px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-xs"
    >
      <div className="opacity-70">{d.name}</div>
      <div className="text-sm font-semibold text-white">
        {d.value}%
      </div>
    </div>
  );
}

export default function DonutChartCard() {
  const [style, setStyle] = useState<React.CSSProperties>({ height: 320 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

    setStyle({
      height: 320,
      transform: `rotateX(${(0.5 - y) * 2.5}deg) rotateY(${(x - 0.5) * 2.5}deg) scale(1.01)`,
    });
  }

  function handleLeave() {
    setStyle({
      height: 320,
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
    });
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className="
        relative rounded-2xl border border-white/25
        bg-white/[0.08] backdrop-blur-2xl
        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        before:content-[''] before:absolute before:inset-0 before:rounded-2xl
        before:shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
        px-8 pt-6 pb-5 flex flex-col
        transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Category Breakdown
      </p>

      <div className="flex-1 w-full relative">
        {/* CENTER LABEL */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 text-center">
          <p className="text-[11px] tracking-[0.18em] text-white/70">
            TOTAL
          </p>
          <p className="text-3xl font-bold tracking-tight text-white mt-1">
            100%
          </p>
        </div>

        <ResponsiveContainer>
          <PieChart>
            <defs>
              <linearGradient id="icyBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9DBDFF" />
                <stop offset="55%" stopColor="#124cb1ff" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>

              <linearGradient id="frostWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a66feff" />
                <stop offset="50%" stopColor="#dfe3ea" />
                <stop offset="100%" stopColor="#D8E2F3" />
              </linearGradient>

              <linearGradient id="snowWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F3F6FB" />
              </linearGradient>
            </defs>

            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
            />

            <Pie
              data={ringData}
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={98}
              startAngle={220}
              endAngle={-140}
              paddingAngle={2}
              cornerRadius={7}
              dataKey="value"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth={2}
            >
              <Cell fill="url(#icyBlue)" />
              <Cell fill="url(#frostWhite)" />
              <Cell fill="url(#snowWhite)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
