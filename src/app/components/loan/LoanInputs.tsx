"use client";

import { useLoan } from "../../providers/LoanContext";
import { InputField } from "../ui/primitives/InputField";
import { GhostButton } from "../ui/primitives/GhostButton";

const TERM_PRESETS = [36, 48, 60, 72, 84];

export default function LoanInputs() {
  const { model, setModel, reset } = useLoan();

  return (
    <div className="rounded-2xl border border-white/25 bg-white/[0.08] px-8 pt-6 pb-7">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/90 text-lg">Loan Inputs</p>
        <GhostButton onClick={reset}>Reset</GhostButton>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <InputField
          label="Vehicle Price"
          prefix="$"
          value={model.vehiclePrice}
          onChange={(v) => setModel({ vehiclePrice: v })}
        />

        <InputField
          label="Down Payment"
          prefix="$"
          value={model.downPayment}
          onChange={(v) => setModel({ downPayment: v })}
        />

        <InputField
          label="APR"
          suffix="%"
          step={0.1}
          value={model.apr}
          onChange={(v) => setModel({ apr: v })}
        />

        <div>
          <InputField
            label="Term (months)"
            value={model.termMonths}
            onChange={(v) => setModel({ termMonths: v })}
          />

          <div className="flex gap-2 mt-2">
            {TERM_PRESETS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModel({ termMonths: m })}
                className={`px-3 py-1 text-xs rounded-md border ${
                  model.termMonths === m
                    ? "bg-white/20 border-white/40"
                    : "bg-white/5 border-white/20"
                }`}
              >
                {m} mo
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
