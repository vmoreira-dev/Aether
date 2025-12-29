

import { FiGrid } from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside
      className="
        w-56
        h-screen
        bg-black/30
        backdrop-blur-2xl
        border-r border-white/10
        px-6 py-8
        flex flex-col
      "
    >
      {/* Logo */}
      <div className="text-2xl font-semibold tracking-wide select-none">
        Aether
      </div>

      {/* Divider */}
      <div className="mt-6 mb-4 h-px bg-white/10" />

      {/* Dashboard only */}
      <nav className="flex flex-col gap-2">
        <div
          className="
            flex items-center gap-3 
            px-3 py-2 
            rounded-xl text-sm
            bg-white/10 
            border border-white/10
            shadow-[0_10px_40px_rgba(0,0,0,0.15)]
            select-none
          "
        >
          <span className="text-lg opacity-80">
            <FiGrid />
          </span>
          <span className="opacity-90">Dashboard</span>
        </div>
      </nav>

      {/* Bottom fade spacer */}
      <div className="flex-1" />

      
    </aside>
  );
}
