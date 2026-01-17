"use client";

import dynamic from "next/dynamic";
import { StatCard } from "./components/StatCard";

import BarChartCard from "./components/BarChartCard";
import DonutChartCard from "./components/DonutChartCard";
import LineChartCard from "./components/LineChartCard";
import { useDashboard } from "./context/DashboardContext";

// Drag & drop must be client-only
const SortableGrid = dynamic(
  () => import("./components/SortableGrid"),
  { ssr: false }
);

export default function Page() {
  const { data } = useDashboard();

  return (
    <div className="max-w-6xl w-full px-6 pt-[20vh] pb-24">
      <SortableGrid
        items={[
          {
            id: "stats",
            node: (
              <div className="grid grid-cols-3 gap-6">
                <StatCard
                  title="Total Spend"
                  value={`$${data.totalSpend.toLocaleString()}`}
                  sub="+2.1% from last month"
                />
                <StatCard
                  title="Top Category"
                  value={data.topCategory}
                  sub={`$${data.categorySpend} spent`}
                />
                <StatCard
                  title="Projected Cashback"
                  value={`$${data.projectedCashback}`}
                  sub="+12.4% this month"
                />
              </div>
            ),
          },
          {
            id: "bar-donut",
            node: (
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <BarChartCard data={data.monthlySpending} />
                </div>

                <DonutChartCard
                  categorySpend={data.categorySpend}
                  totalSpend={data.totalSpend}
                />
              </div>
            ),
          },
          {
            id: "line",
            node: <LineChartCard data={data.trend} />,
          },
        ]}
      />
    </div>
  );
}
