'use client';

import type { ChangeEvent, ReactNode } from 'react';

interface Props {
  label: string;
  hint?: ReactNode;
  value: string;
  onChange: (next: string) => void;
  type?: 'number' | 'text';
  suffix?: string;
  prefix?: string;
  min?: number;
  max?: number;
  step?: number;
  inputMode?: 'decimal' | 'numeric' | 'text';
  error?: string;
}

export function LabeledInput({
  label,
  hint,
  value,
  onChange,
  type = 'number',
  suffix,
  prefix,
  min,
  max,
  step,
  inputMode = 'decimal',
  error,
}: Props) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="eyebrow text-foreground/70">{label}</span>
        {hint && <span className="text-xs text-foreground/60">{hint}</span>}
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-foreground/15 px-1 focus-within:border-accent/55">
        {prefix && (
          <span className="pl-3 text-sm text-foreground/55">{prefix}</span>
        )}
        <input
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          type={type}
          inputMode={inputMode}
          min={min}
          max={max}
          step={step}
          className="tabular w-full border-none bg-transparent px-2 py-3 text-base text-foreground placeholder-foreground/45 focus:outline-none"
        />
        {suffix && (
          <span className="pr-3 text-sm text-foreground/55">{suffix}</span>
        )}
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-500/80">{error}</p>
      )}
    </label>
  );
}
