"use client";

import { createContext, useContext, useState } from "react";

/* ——— TYPES ——— */

export type DashboardData = {
  totalSpend: number;
  topCategory: string;
  categorySpend: number;
  projectedCashback: number;
  monthlySpending: number[];
  trend: number[];
};

type DashboardContextType = {
  data: DashboardData;
  update: <K extends keyof DashboardData>(
    key: K,
    value: DashboardData[K]
  ) => void;
  replace: (next: DashboardData) => void;
  reset: () => void;
};

/* ——— CONSTANTS ——— */

const DEFAULT_DATA: DashboardData = {
  totalSpend: 1950,
  topCategory: "Groceries",
  categorySpend: 500,
  projectedCashback: 32,
  monthlySpending: [300, 450, 500, 380, 620],
  trend: [120, 180, 140, 200, 160, 240, 190, 210, 175],
};

const STORAGE_KEY = "aether-dashboard:v1";

/* ——— CONTEXT ——— */

const DashboardContext = createContext<DashboardContextType | null>(null);

/* ——— PROVIDER ——— */

export function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<DashboardData>(() => {
    if (typeof window === "undefined") return DEFAULT_DATA;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_DATA;

      const parsed = JSON.parse(raw);
      return { ...DEFAULT_DATA, ...parsed };
    } catch {
      return DEFAULT_DATA;
    }
  });

  /* ——— PERSIST (WRITE-ONLY) ——— */
  function persist(next: DashboardData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota / private mode
    }
  }

  /* ——— API ——— */

  function update<K extends keyof DashboardData>(
    key: K,
    value: DashboardData[K]
  ) {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      persist(next);
      return next;
    });
  }

  function replace(next: DashboardData) {
    setData(next);
    persist(next);
  }

  function reset() {
    setData(DEFAULT_DATA);
    persist(DEFAULT_DATA);
  }

  return (
    <DashboardContext.Provider
      value={{ data, update, replace, reset }}
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
