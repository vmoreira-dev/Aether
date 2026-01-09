"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type LineChartCardProps = {
  data: number[];
};

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-xs pointer-events-none">
      <div className="opacity-70">Point {payload[0].payload.day}</div>
      <div className="text-sm font-semibold text-white">
        ${payload[0].value}
      </div>
    </div>
  );
}

export default function LineChartCard({ data }: LineChartCardProps) {
  const [style, setStyle] = useState<React.CSSProperties>({ height: 300 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setStyle({
      height: 300,
      transform: `rotateX(${(0.5 - y) * 2.5}deg) rotateY(${(x - 0.5) * 2.5}deg) scale(1.01)`,
    });
  }

  function handleLeave() {
    setStyle({
      height: 300,
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
    });
  }

  // transform raw numbers → recharts format
  const chartData = data.map((value, i) => ({
    day: i + 1,
    value,
  }));

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
        px-8 pt-6 pb-5
        transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Spending Trends
      </p>

      <div className="w-full h-[220px]">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="aetherLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9FBFFF">
                  <animate
                    attributeName="offset"
                    values="-0.2; 1.2"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                </stop>

                <stop offset="50%" stopColor="#EAF1FF">
                  <animate
                    attributeName="offset"
                    values="0; 1"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                </stop>

                <stop offset="100%" stopColor="#BFD6FF">
                  <animate
                    attributeName="offset"
                    values="0.2; 1.4"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.10)" vertical={false} />

            <XAxis
              dataKey="day"
              tick={{ fill: "rgba(255,255,255,0.80)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "rgba(255,255,255,0.80)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ stroke: "rgba(255,255,255,0.22)", strokeWidth: 1 }}
              content={<CustomTooltip />}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#aetherLine)"
              strokeWidth={3}
              strokeLinecap="round"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#FFFFFF",
                stroke: "rgba(180,205,255,0.5)",
                strokeWidth: 4,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
