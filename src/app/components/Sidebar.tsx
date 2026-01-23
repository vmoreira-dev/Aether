"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiSettings, FiUser } from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <aside className="w-[72px] h-screen bg-black/40 border-r border-white/10" />
    );
  }

  const items = [
    {
      href: "/",
      label: "Dashboard",
      icon: <FiGrid size={18} />,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <FiSettings size={18} />,
    },
  ];

  return (
    <aside
      className="
        h-screen w-[72px]
        bg-black/40
        border-r border-white/10
        backdrop-blur-xl
        flex flex-col
        items-center
        py-6
      "
    >
      {/* Brand */}
      <div className="mb-2">
        <span className="tracking-[0.18em] text-[14px] text-white/75 font-semibold">
          Æ
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 mt-2">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`
                flex items-center justify-center
                w-10 h-10
                rounded-xl
                border
                transition-colors duration-150
                ${
                  active
                    ? "bg-white/[0.08] border-white/20"
                    : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                }
              `}
            >
              <span className={active ? "text-white" : "text-white/70"}>
                {item.icon}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Account */}
      <div className="mt-auto mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
          <FiUser size={18} className="text-white/70" />
        </div>
      </div>
    </aside>
  );
}
