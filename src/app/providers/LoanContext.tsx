"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

/* =========================
   TYPES
   ========================= */

export type LoanModel = {
  vehiclePrice: number;
  downPayment: number;
  apr: number; // %
  termMonths: number;
};

export type BalancePoint = {
  month: number;
  balance: number;
};

export type LoanDerived = {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  balanceOverTime: BalancePoint[];
};

type LoanContextValue = {
  model: LoanModel;
  derived: LoanDerived;
  setModel: (patch: Partial<LoanModel>) => void;
  reset: () => void;
};

/* =========================
   SMART DEFAULTS
   ========================= */

const SMART_DEFAULTS = {
  vehiclePrice: 45_000,
  downPercent: 0.2,
  apr: 6.5,
  termMonths: 60,
};

function createDefaultModel(): LoanModel {
  const downPayment = Math.round(
    SMART_DEFAULTS.vehiclePrice * SMART_DEFAULTS.downPercent
  );

  return {
    vehiclePrice: SMART_DEFAULTS.vehiclePrice,
    downPayment,
    apr: SMART_DEFAULTS.apr,
    termMonths: SMART_DEFAULTS.termMonths,
  };
}

/* =========================
   HELPERS
   ========================= */

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function normalizeModel(model: LoanModel): LoanModel {
  const vehiclePrice = clamp(model.vehiclePrice, 1_000, 1_000_000);
  const downPayment = clamp(model.downPayment, 0, vehiclePrice);
  const apr = clamp(model.apr, 0, 25);
  const termMonths = clamp(model.termMonths, 12, 84);

  return {
    vehiclePrice,
    downPayment,
    apr,
    termMonths,
  };
}

function calculateLoan(model: LoanModel): LoanDerived {
  const principal = model.vehiclePrice - model.downPayment;
  const n = model.termMonths;
  const monthlyRate = model.apr / 100 / 12;

  if (principal <= 0) {
    return {
      loanAmount: 0,
      monthlyPayment: 0,
      totalInterest: 0,
      totalCost: model.vehiclePrice,
      balanceOverTime: [],
    };
  }

  const monthlyPayment =
    monthlyRate === 0
      ? principal / n
      : (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1);

  let balance = principal;
  const balanceOverTime: BalancePoint[] = [];

  for (let month = 0; month <= n; month++) {
    balanceOverTime.push({
      month,
      balance: Math.round(Math.max(balance, 0)),
    });

    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    balance -= principalPaid;
  }

  const totalPaid = monthlyPayment * n;
  const totalInterest = totalPaid - principal;

  return {
    loanAmount: Math.round(principal),
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(model.vehiclePrice + totalInterest),
    balanceOverTime,
  };
}

/* =========================
   CONTEXT
   ========================= */

const LoanContext = createContext<LoanContextValue | null>(null);

export function LoanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [model, setInternalModel] = useState<LoanModel>(
    createDefaultModel()
  );

  const derived = useMemo(
    () => calculateLoan(model),
    [model]
  );

  function setModel(patch: Partial<LoanModel>) {
    setInternalModel((prev) =>
      normalizeModel({ ...prev, ...patch })
    );
  }

  function reset() {
    setInternalModel(createDefaultModel());
  }

  return (
    <LoanContext.Provider
      value={{
        model,
        derived,
        setModel,
        reset,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
}

export function useLoan() {
  const ctx = useContext(LoanContext);
  if (!ctx) {
    throw new Error(
      "useLoan must be used inside LoanProvider"
    );
  }
  return ctx;
}
