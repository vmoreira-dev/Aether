"use client";

import LoanStatCards from "./components/loan/LoanStats";
import TotalCostStackedBar from "./components/loan/TotalCostStackedBar";
import  LoanInputs  from "./components/loan/LoanInputs";
import LoanPrincipalInterestChart from "./components/loan/LoanPrincipalInterestChart";

export default function Page() {
  return (
    <div className="max-w-6xl w-full px-6 pt-[20vh] pb-24 space-y-8">
      <div className="-mt-40">
  <LoanInputs />
</div>

      {/* === STATS === */}
      <div className="grid grid-cols-3 gap-6">
        <LoanStatCards />
      </div>

      {/* === BALANCE OVER TIME === */}
      <TotalCostStackedBar />


      {/* === PRINCIPAL VS INTEREST === */}
      <LoanPrincipalInterestChart />

          
      
    </div>
  );
}
