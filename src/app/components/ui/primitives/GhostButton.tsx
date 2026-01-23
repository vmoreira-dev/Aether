"use client";

export function GhostButton({
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
