"use client";

import { useDashboard } from "../context/DashboardContext";

export default function SettingsPage() {
  const { data, update, reset } = useDashboard();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className="
          absolute inset-0 rounded-2xl 
          shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] 
          relative max-w-4xl w-full mx-6 rounded-2xl
          border border-white/25 
          bg-[rgba(60,100,180,0.12)]
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.38)]
          animate-glassFade
        "
      >
        {/* chrome + glass layers */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl">
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent opacity-80" />
        </div>

        <div className="relative z-10 px-12 py-10">
          <h1 className="text-[30px] font-semibold tracking-tight mb-3 text-white/95">
            Settings
          </h1>

          <p className="text-white/80 text-[15px] mb-10 leading-relaxed">
            Live control panel
          </p>

          <div className="grid grid-cols-2 gap-x-10 gap-y-7">
            <InputField
              label="Total Spend"
              value={data.totalSpend}
              onChange={(v) => update("totalSpend", v)}
              prefix="$"
            />

            <InputField
              label="Top Category"
              value={data.topCategory}
              onChange={(v) => update("topCategory", v)}
            />

            <InputField
              label="Category Spend"
              value={data.categorySpend}
              onChange={(v) => update("categorySpend", v)}
              prefix="$"
            />

            <InputField
              label="Projected Cashback"
              value={data.projectedCashback}
              onChange={(v) => update("projectedCashback", v)}
              prefix="$"
            />
          </div>

          <div className="mt-12 flex gap-4">
            <GhostButton onClick={reset}>Reset</GhostButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— INPUTS (controlled, no lies) ——— */

function InputField({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: string | number;
  onChange: (v: any) => void;
  prefix?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium tracking-tight text-white/90">
        {label}
      </label>

      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">
            {prefix}
          </span>
        )}

        <input
          value={value}
          onChange={(e) =>
            onChange(
              typeof value === "number"
                ? Number(e.target.value)
                : e.target.value
            )
          }
          className={`
            w-full rounded-lg
            bg-white/[0.05]
            border border-white/30

            ${prefix ? "pl-8" : "pl-4"} pr-4 py-2.5
            text-[15px]
            text-white/95
            placeholder-white/40

            transition-all duration-200

            hover:bg-white/[0.08]
            hover:border-white/40

            focus:bg-white/[0.10]
            focus:border-white/50
            focus:outline-none
            focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]
          `}
        />
      </div>
    </div>
  );
}

/* ——— BUTTON (intentional, not fake save) ——— */

function GhostButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-2.5
        rounded-lg
        bg-white/8 border border-white/20
        text-[15px] text-white/90

        transition-all duration-200

        hover:bg-white/14
        hover:-translate-y-[0.5px]
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]

        active:translate-y-0
        active:shadow-[0_6px_15px_rgba(0,0,0,0.20)]
      "
    >
      {children}
    </button>
  );
}
