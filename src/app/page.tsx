import Sidebar from "./components/Sidebar";
import { StatCard } from "./components/StatCard";
import BarChartCard from "./components/BarChartCard";
import DonutChartCard from "./components/DonutChartCard";
import LineChartCard from "./components/LineChartCard";

export default function Page() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-10 space-y-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">
          <StatCard title="Total Spend" value="$1,950" sub="+2.1% from last month" />
          <StatCard title="Top Category" value="Groceries" sub="$500 spent" />
          <StatCard title="Projected Cashback" value="$32" sub="+12.4% this month" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <BarChartCard />
          </div>
          <DonutChartCard />
        </div>

        <LineChartCard />
      </main>
    </div>
  );
}
