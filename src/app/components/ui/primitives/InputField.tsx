"use client";

import React from "react";

interface InputFieldProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;

  prefix?: string;
  suffix?: string;
  step?: number;

  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

export function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step,
  className = "",
  readOnly = false,
  disabled = false,
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="block mb-1 text-xs text-white/70">{label}</span>

      <div
        className={`relative flex items-center rounded-xl border border-white/20 bg-white/[0.06] backdrop-blur-xl px-3 py-2 ${
          readOnly || disabled ? "opacity-70" : ""
        }`}
      >
        {prefix && (
          <span className="mr-1 text-sm text-white/60 select-none">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          step={step}
          readOnly={readOnly}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`
            w-full bg-transparent text-sm text-white outline-none
            ${readOnly ? "cursor-default" : ""}
            ${className}
          `}
        />

        {suffix && (
          <span className="ml-1 text-sm text-white/60 select-none">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}
