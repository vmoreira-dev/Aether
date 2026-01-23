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
        Principal paid: {formatMoney(d.principal)}
      </div>
      <div className="text-white/80">
        Interest paid: {formatMoney(d.interest)}
      </div>
    </div>
  );
}

/* =========================
   COMPONENT
   ========================= */

export default function LoanPrincipalInterestChart() {
  const loan = useLoan();

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
    const principalTotal = derived.loanAmount;
    const monthlyRate = model.apr / 100 / 12;
    const payment = derived.monthlyPayment;

    let remaining = principalTotal;
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;

    return Array.from({ length: model.termMonths + 1 }).map((_, i) => {
      if (i === 0) {
        return {
          month: 0,
          principal: 0,
          interest: 0,
        };
      }

      const interestForMonth = remaining * monthlyRate;
      const principalForMonth = payment - interestForMonth;

      remaining = Math.max(remaining - principalForMonth, 0);
      cumulativePrincipal += principalForMonth;
      cumulativeInterest += interestForMonth;

      return {
        month: i,
        principal: Math.round(cumulativePrincipal),
        interest: Math.round(cumulativeInterest),
      };
    });
  }, [model, derived]);

  return (
    <div
      className="
        relative rounded-2xl border border-white/25
        bg-white/[0.08] backdrop-blur-2xl
        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        px-8 pt-6 pb-5
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Principal vs Interest Over Time
      </p>

      <div className="w-full h-[260px]">
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 28 }}>
            <defs>
              <linearGradient id="principalFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9FBFFF" stopOpacity={0.85} />
                <stop offset="100%" stopColor="#9FBFFF" stopOpacity={0.05} />
              </linearGradient>

              <linearGradient id="interestFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E6EEFF" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#E6EEFF" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.10)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              height={32}
              axisLine={false}
              tickLine={false}
              padding={{ left: 24, right: 24 }}
              tickFormatter={(m) =>
                formatMonthTick(m, model.termMonths)
              }
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="interest"
              stroke="#FFFFFF"
              fill="url(#interestFill)"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="principal"
              stroke="#9FBFFF"
              fill="url(#principalFill)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
