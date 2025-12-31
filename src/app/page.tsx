import Sidebar from "./components/Sidebar";
import { StatCard } from "./components/StatCard";
import BarChartCard from "./components/BarChartCard";
import DonutChartCard from "./components/DonutChartCard";
import LineChartCard from "./components/LineChartCard";
import SortableGrid from "./components/SortableGrid";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

     <main className="flex-1 flex justify-center items-start">
  <div className="max-w-6xl w-full px-6 pt-[20vh] pb-24">



          <SortableGrid
            items={[
              {
                id: "stats",
                node: (
                  <div className="grid grid-cols-3 gap-6">
                    <StatCard
                      title="Total Spend"
                      value="$1,950"
                      sub="+2.1% from last month"
                    />
                    <StatCard
                      title="Top Category"
                      value="Groceries"
                      sub="$500 spent"
                    />
                    <StatCard
                      title="Projected Cashback"
                      value="$32"
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
                      <BarChartCard />
                    </div>
                    <DonutChartCard />
                  </div>
                ),
              },

              {
                id: "line",
                node: <LineChartCard />,
              },
            ]}
          />

        </div>
      </main>
    </div>
  );
}
