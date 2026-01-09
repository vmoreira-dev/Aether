"use client";
import { InputField } from "../components/ui/InputField";
import { useDashboard } from "../context/DashboardContext";
import { GhostButton } from "../components/ui/GhostButton";


export default function SettingsPage() {
  const { model, updateModel, reset } = useDashboard();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="relative max-w-4xl w-full mx-6 rounded-2xl border border-white/25 bg-[rgba(60,100,180,0.12)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.38)]">
        {/* glass chrome */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl">
          <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>

        <div className="relative z-10 px-12 py-10">
          <h1 className="text-[30px] font-semibold text-white/95 mb-2">
            Simulation Controls
          </h1>

          <p className="text-white/70 text-[14px] mb-10">
            Changes instantly propagate to the dashboard preview
          </p>

          <div className="grid grid-cols-2 gap-x-10 gap-y-7">
            <InputField
              label="Annual Spend"
              value={model.annualSpend}
              prefix="$"
              onChange={(v) => updateModel("annualSpend", v)}
            />

            <InputField
              label="Cashback Rate"
              value={model.cashbackRate * 100}
              suffix="%"
              onChange={(v) => updateModel("cashbackRate", v / 100)}
            />

            <InputField
              label="Cars Allocation"
              value={model.distribution.cars * 100}
              suffix="%"
              onChange={(v) =>
                updateModel("distribution", {
                  ...model.distribution,
                  cars: v / 100,
                })
              }
            />

            <InputField
              label="Food Allocation"
              value={model.distribution.food * 100}
              suffix="%"
              onChange={(v) =>
                updateModel("distribution", {
                  ...model.distribution,
                  food: v / 100,
                })
              }
            />
          </div>

          <div className="mt-12 flex gap-4">
            <GhostButton onClick={reset}>Reset Model</GhostButton>
          </div>
        </div>
      </div>
    </div>
  );
}
