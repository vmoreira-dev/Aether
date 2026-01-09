"use client";

import { createContext, useContext, useMemo, useState } from "react";

/* ——— TYPES ——— */

export type DashboardModel = {
  annualSpend: number;
  cashbackRate: number;
  distribution: {
    cars: number;
    food: number;
    travel: number;
  };
};

export type DashboardDerived = {
  totalSpend: number;
  topCategory: string;
  categorySpend: number;
  projectedCashback: number;
  monthlySpending: number[];
  trend: number[];
};

type DashboardContextType = {
  model: DashboardModel;
  data: DashboardDerived;
  updateModel: <K extends keyof DashboardModel>(
    key: K,
    value: DashboardModel[K]
  ) => void;
  reset: () => void;
};

/* ——— CONSTANTS ——— */

const DEFAULT_MODEL: DashboardModel = {
  annualSpend: 30000,
  cashbackRate: 0.015,
  distribution: {
    cars: 0.4,
    food: 0.35,
    travel: 0.25,
  },
};

const STORAGE_KEY = "aether-dashboard:model:v2";

/* ——— DERIVE ——— */

function derive(model: DashboardModel): DashboardDerived {
  const categorySpend = Object.entries(model.distribution).map(
    ([key, pct]) => ({
      key,
      value: Math.round(model.annualSpend * pct),
    })
  );

  const top = categorySpend.sort((a, b) => b.value - a.value)[0];

  return {
    totalSpend: model.annualSpend,
    topCategory: top.key,
    categorySpend: top.value,
    projectedCashback: Math.round(
      model.annualSpend * model.cashbackRate
    ),
    monthlySpending: Array.from({ length: 5 }, (_, i) =>
      Math.round((model.annualSpend / 12) * (0.85 + i * 0.08))
    ),
    trend: Array.from({ length: 9 }, () =>
      Math.round(model.annualSpend / 160 + Math.random() * 60)
    ),
  };
}

/* ——— CONTEXT ——— */

const DashboardContext = createContext<DashboardContextType | null>(null);

/* ——— PROVIDER ——— */

export function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [model, setModel] = useState<DashboardModel>(() => {
    if (typeof window === "undefined") return DEFAULT_MODEL;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw
        ? { ...DEFAULT_MODEL, ...JSON.parse(raw) }
        : DEFAULT_MODEL;
    } catch {
      return DEFAULT_MODEL;
    }
  });

  function persist(next: DashboardModel) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  function updateModel<K extends keyof DashboardModel>(
    key: K,
    value: DashboardModel[K]
  ) {
    setModel((prev) => {
      const next = { ...prev, [key]: value };
      persist(next);
      return next;
    });
  }

  function reset() {
    setModel(DEFAULT_MODEL);
    persist(DEFAULT_MODEL);
  }

  const data = useMemo(() => derive(model), [model]);

  return (
    <DashboardContext.Provider
      value={{ model, data, updateModel, reset }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

/* ——— HOOK ——— */

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return ctx;
}
