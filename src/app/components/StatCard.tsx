"use client";
import React from "react";
import useCardHoverTilt from "../hooks/useCardHoverTilt";

interface StatCardProps {
  title: string;
  value: string;
  sub?: string;
}

export function StatCard({ title, value, sub }: StatCardProps) {
  const { style, handleMove, handleLeave } = useCardHoverTilt();

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className="
        relative
        rounded-2xl
        border border-white/25

        bg-white/[0.08]
        backdrop-blur-2xl

        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        hover:shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        shadow-black/60

        before:content-['']
        before:absolute before:inset-0 before:rounded-2xl
        before:shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]

        px-7 py-6

        transition-all
        duration-300
        ease-[cubic-bezier(.16,1,.3,1)]
      "
    >
      {/* top light edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      {/* soft gloss */}
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />

      <div className="flex flex-col gap-1.5 relative z-10">
        <p
          className="text-[15px] font-semibold tracking-tight text-white/90"
          style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
        >
          {title}
        </p>

        <p
          className="text-4xl font-bold tracking-[-0.01em] leading-none text-white"
          style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
        >
          {value}
        </p>

        {sub && (
          <p
            className="text-sm text-white/70 pt-1"
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
