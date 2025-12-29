"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", amt: 300 },
  { name: "Feb", amt: 450 },
  { name: "Mar", amt: 500 },
  { name: "Apr", amt: 380 },
  { name: "May", amt: 650 },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-xs pointer-events-none">
      <div className="opacity-70">{payload[0].payload.name}</div>
      <div className="text-sm font-semibold">
        ${payload[0].value}
      </div>
    </div>
  );
}

export default function BarChartCard() {
  return (
    <div
      className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6"
      style={{ height: 280 }}
    >
      <div className="text-sm opacity-70 mb-3">
        Monthly Spending
      </div>

      {/* 🔒 This container NEVER changes height */}
      <div style={{ width: "100%", height: "210px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={26}>
            <defs>
              <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B8C7FF" />
                <stop offset="100%" stopColor="#9BAEF9" />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />

            <XAxis
              dataKey="name"
              stroke="rgba(255,255,255,0.35)"
              tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="amt"
              fill="url(#barFill)"
              radius={[10, 10, 10, 10]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
