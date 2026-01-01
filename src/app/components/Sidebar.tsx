"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiSettings, FiUser } from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();

  const items = [
    { href: "/", icon: <FiGrid size={18} />, label: "Dashboard" },
    { href: "/settings", icon: <FiSettings size={18} />, label: "Settings" },
  ];

  return (
    <aside
      className="
        h-screen
        w-[72px]
        bg-black/40
        border-r border-white/10
        backdrop-blur-xl
        flex flex-col
        items-center
        py-6
      "
    >
      {/* Brand */}
      <div className="text-xs font-semibold tracking-wide mb-6 opacity-70">
        Æ
      </div>

      {/* Nav */}
      <div className="flex flex-col gap-3 mt-2">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group
                flex
                items-center
                justify-center
                w-10 h-10
                rounded-xl
                border
                transition
                ${
                  active
                    ? "bg-white/[0.08] border-white/20"
                    : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                }
              `}
              title={item.label}
            >
              <div
                className={`
                  ${
                    active
                      ? "text-white"
                      : "text-white/70 group-hover:text-white"
                  }
                `}
              >
                {item.icon}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Account — bottom */}
      <div className="mt-auto mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
          <FiUser className="text-white/70" size={18} />
        </div>
      </div>
    </aside>
  );
}
