"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useLoan } from "../../providers/LoanContext";

/* =========================
   HELPERS
   ========================= */

function formatMoney(n: number) {
  return `$${Math.round(n).toLocaleString()}`;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-xs pointer-events-none">
      <div className="opacity-70 mb-1">{payload[0].payload.label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex justify-between gap-4">
          <span className="opacity-70">{p.name}</span>
          <span className="text-white font-semibold">
            {formatMoney(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* =========================
   COMPONENT
   ========================= */

export default function TotalCostStackedBar() {
  const { model } = useLoan();

  const principal = model.vehiclePrice - model.downPayment;
  const months = model.termMonths;
  const rate = model.apr / 100 / 12;

  let balance = principal;

  const payment =
    rate === 0
      ? principal / months
      : (principal * rate * Math.pow(1 + rate, months)) /
        (Math.pow(1 + rate, months) - 1);

  // ---- 6-MONTH BUCKETS ----
  const data: {
    label: string;
    Principal: number;
    Interest: number;
  }[] = [];

  for (let m = 1; m <= months; m++) {
    const interest = balance * rate;
    const principalPaid = payment - interest;
    balance -= principalPaid;

    const i = Math.floor((m - 1) / 6);

    if (!data[i]) {
      data[i] = {
        label: `M${Math.min((i + 1) * 6, months)}`
,
        Principal: 0,
        Interest: 0,
      };
    }

    data[i].Principal += principalPaid;
    data[i].Interest += interest;
  }

  return (
    <div
      className="
        relative rounded-2xl border border-white/25
        bg-white/[0.08] backdrop-blur-2xl
        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        before:pointer-events-none
        before:absolute before:inset-0 before:rounded-2xl
        before:shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
        px-8 pt-5 pb-6
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Payment Breakdown (6-Month)
      </p>

      <div className="w-full h-[240px]">
        <ResponsiveContainer>
          <BarChart
            data={data}
            barCategoryGap={28}
            barGap={6}
          >
                    <defs>
                {/* Principal — darker glassy blue */}
                <linearGradient id="principalBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E6EEFF" stopOpacity={0.95} />
                    <stop offset="30%" stopColor="#9FBFFF" stopOpacity={0.9} />
                    <stop offset="65%" stopColor="#6F97E8" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="#3F67C6" stopOpacity={0.55} />
                </linearGradient>

                {/* Interest — slightly muted so blue dominates */}
                <linearGradient id="interestBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFDDB0" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#FFDDB0" stopOpacity={0.25} />
                </linearGradient>
                </defs>


            <CartesianGrid
              stroke="rgba(255,255,255,0.10)"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
            />

            <Tooltip content={<CustomTooltip />} cursor={false} />

            {/* IMPORTANT: explicit barSize */}
            <Bar
              dataKey="Principal"
              stackId="a"
              fill="url(#principalBar)"
              barSize={22}
              radius={[0, 0, 12, 12]}
            />

            <Bar
              dataKey="Interest"
              stackId="a"
              fill="url(#interestBar)"
              barSize={22}
              radius={[12, 12, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
