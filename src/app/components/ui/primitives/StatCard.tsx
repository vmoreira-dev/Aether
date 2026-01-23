"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  sub?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  sub,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`
        relative rounded-2xl border border-white/25
        bg-white/[0.08] backdrop-blur-2xl
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        transition-all duration-300
        ease-[cubic-bezier(.16,1,.3,1)]
        px-7 py-6
        ${className}
      `}
    >
      {/* top chrome */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]" />

      <div className="relative z-10 flex flex-col gap-1.5">
        <p className="text-[15px] font-semibold tracking-tight text-white/90">
          {title}
        </p>

        <p className="text-4xl font-bold tracking-[-0.01em] leading-none text-white">
          {value}
        </p>

        {sub && (
          <p className="text-sm text-white/70 pt-1">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
