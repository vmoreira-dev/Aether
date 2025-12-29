"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Entertainment", value: 40 },
  { name: "Restaurants", value: 30 },
  { name: "Other", value: 30 },
];

const colors = ["#FFBC5E", "#6C7BFF", "#3E3F4B"];

export default function DonutChartCard() {
  return (
    <div className="p-6 rounded-2xl bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)]">
      <div className="mb-3 opacity-70 text-sm">Category Breakdown</div>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
          >
            {data.map((e, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
