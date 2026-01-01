"use client";
import { useState } from "react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">

      <div
        className="
          relative max-w-4xl w-full mx-6 rounded-2xl
          border border-white/25 
          bg-[rgba(60,100,180,0.22)] 
          backdrop-blur-2xl
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
            Temporary panel — this is where you’ll input data later.
          </p>

          <div className="grid grid-cols-2 gap-x-10 gap-y-7">
            <InputField label="Total Spend" placeholder="$1950" />
            <InputField label="Top Category" placeholder="Groceries" />
            <InputField label="Category Spend" placeholder="$500" />
            <InputField label="Projected Cashback" placeholder="$32" />
          </div>

          <CompactButton />
        </div>
      </div>
    </div>
  );
}

/* ——— INPUTS (compact + sharp) ——— */

function InputField({ label, placeholder }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium tracking-tight text-white/90">
        {label}
      </label>

      <input
        className="
          w-full rounded-lg
          bg-white/[0.05]
          border border-white/30

          px-4 py-2.5
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
        "
        placeholder={placeholder}
      />
    </div>
  );
}


/* ——— BUTTON (same vertical rhythm as inputs) ——— */

function CompactButton() {
  return (
    <button
      className="
        mt-12 px-6 py-2.5
        rounded-lg
        bg-white/12 border border-white/25
        text-[15px] text-white/95

        transition-all duration-200

        hover:bg-white/18
        hover:-translate-y-[0.5px]
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]

        active:translate-y-0
        active:shadow-[0_6px_15px_rgba(0,0,0,0.20)]
      "
    >
      Save
    </button>
  );
}
