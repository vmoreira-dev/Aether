export function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-white/90">
        {label}
      </label>

      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
            {prefix}
          </span>
        )}

        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
            {suffix}
          </span>
        )}

        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`
            w-full rounded-lg
            bg-white/[0.05]
            border border-white/30
            ${prefix ? "pl-8" : "pl-4"}
            ${suffix ? "pr-8" : "pr-4"}
            py-2.5
            text-white/95
            focus:outline-none
            focus:border-white/50
          `}
        />
      </div>
    </div>
  );
}
