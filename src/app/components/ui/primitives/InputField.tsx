"use client";

type InputFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
};

export function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step,
  min,
  max,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/70">{label}</label>

      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`
            w-full rounded-lg bg-white/5 border border-white/20
            px-3 py-2 text-sm text-white
            focus:outline-none focus:border-white/40
            ${prefix ? "pl-7" : ""}
            ${suffix ? "pr-8" : ""}
          `}
        />

        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
