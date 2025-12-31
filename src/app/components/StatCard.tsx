import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  sub?: string;
}

export function StatCard({ title, value, sub }: StatCardProps) {
  return (
    <div
      className="
        relative
        rounded-3xl
        border border-white/12
        bg-white/[0.04]
        backdrop-blur-xl
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
        px-7 py-6
        transition-all duration-150 ease-out
        hover:shadow-[0_0_35px_rgba(255,255,255,0.05)]
        hover:bg-white/[0.055]
        hover:scale-[1.01]
        active:scale-[0.995]
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="flex flex-col gap-1.5">
        <p className="text-[15px] font-medium tracking-tight text-white/85">
          {title}
        </p>

        <p className="text-4xl font-semibold tracking-[-0.01em] leading-none text-white">
          {value}
        </p>

        {sub && (
          <p className="text-sm text-white/60 pt-1">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
