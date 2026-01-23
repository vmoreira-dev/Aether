"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useLoan } from "../../providers/LoanContext";

/* =========================
   HELPERS
   ========================= */

function formatMoney(n: number) {
  return `$${n.toLocaleString()}`;
}

function formatMonthTick(month: number, totalMonths: number) {
  if (month === 0) return "Start";
  if (month === totalMonths) return "End";
  if (month % 12 === 0) return `${month / 12}y`;
  return "";
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const d = payload[0].payload;

  return (
    <div className="px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-xs pointer-events-none">
      <div className="opacity-70">Month {d.month}</div>
      <div className="text-sm font-semibold text-white">
        {formatMoney(d.balance)}
      </div>
    </div>
  );
}

/* =========================
   COMPONENT
   ========================= */

export default function LoanBalanceChart() {
  const { model } = useLoan();

  /**
   * Build amortization balance curve
   * No context mutation. No magic fields.
   */
  const chartData = useMemo(() => {
    const principal = model.vehiclePrice - model.downPayment;
    const months = model.termMonths;
    const rate = model.apr / 100 / 12;

    if (principal <= 0 || months <= 0) return [];

    let balance = principal;
    const data = [{ month: 0, balance: Math.round(balance) }];

    for (let m = 1; m <= months; m++) {
      const interest = rate === 0 ? 0 : balance * rate;
      const payment =
        rate === 0
          ? principal / months
          : (principal * rate * Math.pow(1 + rate, months)) /
            (Math.pow(1 + rate, months) - 1);

      balance = Math.max(balance + interest - payment, 0);
      data.push({ month: m, balance: Math.round(balance) });
    }

    return data;
  }, [model]);

  const totalMonths = chartData.length - 1;

  return (
    <div
     
      className="
        relative rounded-2xl border border-white/25
        bg-white/[0.08] backdrop-blur-2xl
        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        before:absolute before:inset-0 before:rounded-2xl
        before:shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
        px-8 pt-6 pb-5
        transition-all duration-300
        ease-[cubic-bezier(.16,1,.3,1)]
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Remaining Loan Balance
      </p>

      <div className="w-full h-[240px]">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="loanLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9FBFFF" />
                <stop offset="50%" stopColor="#EAF1FF" />
                <stop offset="100%" stopColor="#BFD6FF" />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.10)" vertical={false} />

            <XAxis
              dataKey="month"
              interval={0}
              padding={{ left: 24, right: 24 }}
              tickFormatter={(m) => formatMonthTick(m, totalMonths)}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
              tickFormatter={(v) => `$${v / 1000}k`}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "rgba(255,255,255,0.22)",
                strokeWidth: 1,
              }}
            />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="url(#loanLine)"
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
