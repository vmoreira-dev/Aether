"use client";

import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useCardHoverTilt from "../../hooks/useCardHoverTilt";
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
      <div className="text-white font-semibold">
        Principal: {formatMoney(d.principal)}
      </div>
      <div className="text-white/80">
        Interest: {formatMoney(d.interest)}
      </div>
    </div>
  );
}

/* =========================
   COMPONENT
   ========================= */

export default function LoanPrincipalInterestChart() {
  const loan = useLoan();
  const { style, handleMove, handleLeave } = useCardHoverTilt(300);

  // 🔒 HARD GUARD — prevents silent crash
  if (
    !loan ||
    !loan.model ||
    !loan.derived ||
    loan.derived.loanAmount == null ||
    loan.derived.monthlyPayment == null
  ) {
    return (
      <div className="rounded-2xl border border-white/20 bg-white/[0.05] px-8 py-6 text-white/70">
        Principal vs Interest chart waiting for loan data…
      </div>
    );
  }

  const { model, derived } = loan;

  const chartData = useMemo(() => {
    const principal = derived.loanAmount;
    const monthlyRate = model.apr / 100 / 12;
    const payment = derived.monthlyPayment;

    let remaining = principal;
    let cumulativeInterest = 0;

    return Array.from({ length: model.termMonths + 1 }).map((_, i) => {
      if (i === 0) {
        return {
          month: 0,
          principal,
          interest: 0,
        };
      }

      const interestForMonth = remaining * monthlyRate;
      const principalForMonth = payment - interestForMonth;

      remaining = Math.max(remaining - principalForMonth, 0);
      cumulativeInterest += interestForMonth;

      return {
        month: i,
        principal: Math.round(remaining),
        interest: Math.round(cumulativeInterest),
      };
    });
  }, [model, derived]);

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className="
        relative rounded-2xl border border-white/25
        bg-white/[0.08] backdrop-blur-2xl
        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        before:absolute before:inset-0 before:rounded-2xl
        before:shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
        px-8 pt-6 pb-5
      "
    >
      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Principal vs Interest Over Time
      </p>

      <div className="w-full h-[260px]">
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="principalFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9FBFFF" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#9FBFFF" stopOpacity={0.15} />
              </linearGradient>

              <linearGradient id="interestFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD6A5" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#FFD6A5" stopOpacity={0.15} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.10)" vertical={false} />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
              tickFormatter={(v) =>
                formatMonthTick(v, model.termMonths)
              }
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
              tickFormatter={(v) => `$${v / 1000}k`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="principal"
              stackId="1"
              stroke="#BFD6FF"
              fill="url(#principalFill)"
            />

            <Area
              type="monotone"
              dataKey="interest"
              stackId="1"
              stroke="#FFD6A5"
              fill="url(#interestFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
