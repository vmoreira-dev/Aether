"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: 1, amt: 120 },
  { day: 2, amt: 180 },
  { day: 3, amt: 140 },
  { day: 4, amt: 200 },
  { day: 5, amt: 160 },
  { day: 6, amt: 240 },
  { day: 7, amt: 190 },
  { day: 8, amt: 210 },
  { day: 9, amt: 170 },
  { day: 10, amt: 230 },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-xs pointer-events-none">
      <div className="opacity-70">Day {payload[0].payload.day}</div>
      <div className="text-sm font-semibold">
        ${payload[0].value}
      </div>
    </div>
  );
}

export default function LineChartCard() {
  return (
    <div
      className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6"
      style={{ height: 300 }}
    >
      <div className="text-sm opacity-70 mb-3">Spending Trends</div>

      {/* Fixed-size chart box — zero resizing chaos */}
      <div style={{ width: "100%", height: "220px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#B8C7FF" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.05)" />

            <XAxis
              dataKey="day"
              stroke="rgba(255,255,255,0.35)"
              tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip cursor={false} content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="amt"
              stroke="url(#lineGlow)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
