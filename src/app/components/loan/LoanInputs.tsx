"use client";

import { useEffect, useState } from "react";
import { useLoan } from "../../providers/LoanContext";
import { InputField } from "../ui/primitives/InputField";
import { GhostButton } from "../ui/primitives/GhostButton";

const TERM_PRESETS = [36, 48, 60, 72, 84];

export default function LoanInputs() {
  const { model, setModel, reset } = useLoan();

  // local draft state to allow free typing
  const [termDraft, setTermDraft] = useState(String(model.termMonths));

  // keep draft in sync when buttons/reset change the model
  useEffect(() => {
    setTermDraft(String(model.termMonths));
  }, [model.termMonths]);

  return (
    <div
      className="
        relative rounded-2xl border border-white/25
        bg-white/[0.08] backdrop-blur-2xl
        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        before:pointer-events-none
        before:absolute before:inset-0 before:rounded-2xl
        before:shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
        px-8 pt-5 pb-7 
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <div className="flex items-center justify-between mb-4">
        <p className="font-[DMSerifDisplay] text-[17px] tracking-tight text-white/90">
          Loan Inputs
        </p>
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
            readOnly
            onChange={() => {}}
            className="cursor-default"
          />

        <div className="flex gap-2 mt-2">
          {TERM_PRESETS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setModel({ termMonths: m })}
              className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                model.termMonths === m
                  ? "bg-white/15 border-white/35"
                  : "bg-white/5 border-white/20 hover:bg-white/10"
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
