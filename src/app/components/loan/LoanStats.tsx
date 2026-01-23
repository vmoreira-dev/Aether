"use client";

import { StatCard } from "../ui/primitives/StatCard";
import { useLoan } from "../../providers/LoanContext";

function formatMoney(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function LoanStatCards() {
  const { derived } = useLoan();

  return (
    <>
      <StatCard
        title="Monthly Payment"
        value={formatMoney(derived.monthlyPayment)}
        sub="Fixed payment"
      />

      <StatCard
        title="Total Interest"
        value={formatMoney(derived.totalInterest)}
        sub="Paid over loan term"
      />

      <StatCard
        title="Total Cost"
        value={formatMoney(derived.totalCost)}
        sub="Vehicle + interest"
      />
    </>
  );
}
