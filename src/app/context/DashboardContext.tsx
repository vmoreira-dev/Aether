"use client";

import { createContext, useContext, useEffect, useState } from "react";

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

const DEFAULT_DATA: DashboardData = {
  totalSpend: 1950,
  topCategory: "Groceries",
  categorySpend: 500,
  projectedCashback: 32,
  monthlySpending: [300, 450, 500, 380, 620],
  trend: [120, 180, 140, 200, 160, 240, 190, 210, 175],
};

const STORAGE_KEY = "aether-dashboard:v1";

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<DashboardData>(DEFAULT_DATA);

  /* === HYDRATE ON MOUNT === */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData({ ...DEFAULT_DATA, ...parsed });
      }
    } catch {
      // silent fail — corrupted storage should not brick UI
    }
  }, []);

  /* === PERSIST ON CHANGE === */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage quota / private mode — ignore
    }
  }, [data]);

  /* === SAFE UPDATE API === */
  function update<K extends keyof DashboardData>(
    key: K,
    value: DashboardData[K]
  ) {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function replace(next: DashboardData) {
    setData(next);
  }

  function reset() {
    setData(DEFAULT_DATA);
  }

  return (
    <DashboardContext.Provider
      value={{ data, update, replace, reset }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return ctx;
}
