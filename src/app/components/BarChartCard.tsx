"use client";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "1", amt: 300 },
  { name: "2", amt: 450 },
  { name: "3", amt: 500 },
  { name: "4", amt: 380 },
  { name: "5", amt: 600 },
];

export default function BarChartCard() {
  return (
    <div className="p-6 rounded-2xl bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)]">
      <div className="mb-3 opacity-70 text-sm">Monthly Spending</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#aaa" />
          <Tooltip />
          <Bar dataKey="amt" fill="#9DB2FF" radius={6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
