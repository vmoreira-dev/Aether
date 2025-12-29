"use client";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = Array.from({ length: 20 }).map((_, i) => ({
  name: i + 1,
  value: Math.random() * 100 + 50,
}));

export default function LineChartCard() {
  return (
    <div className="p-6 rounded-2xl bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)]">
      <div className="mb-3 opacity-70 text-sm">Spending Trends</div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#aaa" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#C3D4FF" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
