"use client";

export function StatCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      className="
        rounded-2xl 
        bg-white/5 
        backdrop-blur-xl 
        border border-white/10 
        px-5 py-4
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        transition
        hover:bg-white/7
      "
    >
      {/* Title */}
      <div className="text-xs tracking-wide uppercase opacity-70">
        {title}
      </div>

      {/* Value */}
      <div className="text-3xl font-semibold mt-1 leading-tight">
        {value}
      </div>

      {/* Subtext */}
      {sub && (
        <div className="text-xs opacity-60 mt-1">
          {sub}
        </div>
      )}
    </div>
  );
}
