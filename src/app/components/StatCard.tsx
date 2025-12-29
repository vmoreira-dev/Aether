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
    <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 select-none">
      <div className="text-sm opacity-70">{title}</div>
      <div className="text-3xl font-semibold mt-2">{value}</div>
      {sub && <div className="text-xs opacity-60 mt-1">{sub}</div>}
    </div>
  );
}
