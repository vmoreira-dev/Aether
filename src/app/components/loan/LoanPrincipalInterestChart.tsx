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
      <div className="text-white">
        Principal:{" "}
        <span className="font-semibold">
          {formatMoney(d.principal)}
        </span>
      </div>
      <div className="text-white/80">
        Interest:{" "}
        <span className="font-semibold">
          {formatMoney(d.interest)}
        </span>
      </div>
    </div>
  );
}

/* =========================
   COMPONENT
   ========================= */

export default function LoanPrincipalInterestChart() {
  const { model } = useLoan();
  const { style, handleMove, handleLeave } = useCardHoverTilt(300);

  const chartData = useMemo(() => {
    const principalTotal =
      model.vehiclePrice - model.downPayment;
    if (principalTotal <= 0) return [];

    const monthlyRate = model.apr / 100 / 12;
    const n = model.termMonths;

    const payment =
      monthlyRate === 0
        ? principalTotal / n
        : (principalTotal *
            monthlyRate *
            Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1);

    let balance = principalTotal;
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;

    const data: {
      month: number;
      principal: number;
      interest: number;
    }[] = [];

    for (let month = 0; month <= n; month++) {
      if (month === 0) {
        data.push({
          month,
          principal: 0,
          interest: 0,
        });
        continue;
      }

      const interestPaid = balance * monthlyRate;
      const principalPaid = payment - interestPaid;

      balance -= principalPaid;
      cumulativePrincipal += principalPaid;
      cumulativeInterest += interestPaid;

      data.push({
        month,
        principal: Math.round(cumulativePrincipal),
        interest: Math.round(cumulativeInterest),
      });
    }

    return data;
  }, [model]);

  const totalMonths = chartData.length - 1;

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
        transition-all duration-300
        ease-[cubic-bezier(.16,1,.3,1)]
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90 mb-3">
        Principal vs Interest Over Time
      </p>

      <div className="w-full h-[260px]">
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="principalFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#9FBFFF"
                  stopOpacity={0.85}
                />
                <stop
                  offset="100%"
                  stopColor="#9FBFFF"
                  stopOpacity={0.05}
                />
              </linearGradient>

              <linearGradient
                id="interestFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#FFD6A5"
                  stopOpacity={0.75}
                />
                <stop
                  offset="100%"
                  stopColor="#FFD6A5"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.10)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              interval={0}
              padding={{ left: 24, right: 24 }}
              tickFormatter={(m) =>
                formatMonthTick(m, totalMonths)
              }
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.75)",
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
              tick={{
                fill: "rgba(255,255,255,0.75)",
                fontSize: 12,
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              stackId="1"
              type="monotone"
              dataKey="interest"
              stroke="#FFD6A5"
              fill="url(#interestFill)"
              strokeWidth={2}
            />

            <Area
              stackId="1"
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
