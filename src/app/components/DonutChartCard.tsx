"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Entertainment", value: 40 },
  { name: "Restaurants", value: 30 },
  { name: "Other", value: 30 },
];

const total = data.reduce((a, b) => a + b.value, 0);

const colors = ["#FFBC5E", "#8EA2FF", "#6B7280"];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;

  return (
    <div className="px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-xs pointer-events-none">
      <div className="opacity-70">{d.name}</div>
      <div className="text-sm font-semibold">{d.value}%</div>
    </div>
  );
}

export default function DonutChartCard() {
  return (
    <div
      className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6"
      style={{ height: 320 }}
    >
      <div className="text-sm opacity-70 mb-4">Category Breakdown</div>

      {/* This wrapper keeps the donut perfectly locked in place */}
      <div className="relative w-full" style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={2}
              cornerRadius={6}
              stroke="rgba(0,0,0,0)"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={colors[i]} />
              ))}
            </Pie>

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center value that NEVER moves */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-semibold">{total}%</div>
            <div className="text-[10px] opacity-60 tracking-wider">
              TOTAL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
