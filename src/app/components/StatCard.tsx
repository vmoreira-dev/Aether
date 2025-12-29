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
    <div className="p-5 rounded-2xl bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)]">
      <div className="text-sm opacity-70">{title}</div>
      <div className="text-3xl font-semibold mt-2">{value}</div>
      {sub && <div className="text-xs opacity-60 mt-1">{sub}</div>}
    </div>
  );
}
