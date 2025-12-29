import { FiGrid, FiCreditCard, FiTrendingUp, FiSettings } from "react-icons/fi";

export default function Sidebar() {
  const items = [
    { label: "Dashboard", icon: <FiGrid /> },
    { label: "Transactions", icon: <FiCreditCard /> },
    { label: "Insights", icon: <FiTrendingUp /> },
    { label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <aside className="w-64 p-6 space-y-6 bg-[var(--glass)] backdrop-blur-xl border-r border-[var(--glass-border)]">
      <div className="text-2xl font-semibold">Aether</div>

      <nav className="space-y-3">
        {items.map(i => (
          <button
            key={i.label}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            {i.icon}
            {i.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
