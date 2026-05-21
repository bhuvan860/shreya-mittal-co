'use client';

import { useMemo, useState } from 'react';
import { CalcShell } from '@/components/tools/calc-shell';
import { LabeledInput } from '@/components/tools/labeled-input';
import { formatINR } from '@/lib/utils';
import { getTool } from '@/lib/tools';

const FREQUENCIES = [
  { label: 'Annually', value: 1 },
  { label: 'Semi-annually', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
] as const;

export default function CompoundInterestPage() {
  const tool = getTool('compound-interest')!;
  const [principal, setPrincipal] = useState('500000');
  const [rate, setRate] = useState('7.5');
  const [years, setYears] = useState('10');
  const [frequency, setFrequency] = useState(4);

  const result = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = frequency;
    const future = p * Math.pow(1 + r / n, n * t);
    return { future, interest: future - p };
  }, [principal, rate, years, frequency]);

  return (
    <CalcShell
      toolName={tool.name}
      shortName={tool.short}
      description="Future value and growth of a principal sum compounded at a stated frequency over a chosen tenure."
      effectiveDate={tool.effectiveDate}
      intro={
        <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-foreground/75">
          <p>
            The standard compound-interest formula <em>A = P(1 + r/n)ⁿᵗ</em>{' '}
            without any tax or inflation adjustment. Useful for fixed-deposit
            and similar product comparisons.
          </p>
          <p>
            For tax-adjusted return on long-term investments — particularly
            equities and capital-gains-bearing instruments — speak with the
            firm.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <LabeledInput
          label="Principal (₹)"
          value={principal}
          onChange={setPrincipal}
          min={0}
          prefix="₹"
        />
        <LabeledInput
          label="Annual interest rate"
          value={rate}
          onChange={setRate}
          min={0}
          step={0.1}
          suffix="%"
        />
        <LabeledInput
          label="Tenure"
          value={years}
          onChange={setYears}
          min={0}
          suffix="years"
        />

        <div>
          <p className="eyebrow text-foreground/70">Compounding frequency</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {FREQUENCIES.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFrequency(f.value)}
                className={`rounded-full border px-4 py-3 text-sm transition-colors ${
                  frequency === f.value
                    ? 'border-accent bg-accent text-background'
                    : 'border-foreground/15 text-foreground/75 hover:border-accent/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-accent/40 bg-accent/[0.05] p-6">
          <p className="eyebrow text-foreground/55">Maturity value</p>
          <p className="mt-2 font-serif text-3xl tabular text-accent">
            {formatINR(Math.round(result.future))}
          </p>
        </div>
        <div className="rounded-xl border border-foreground/10 p-6">
          <p className="eyebrow text-foreground/55">Interest earned</p>
          <p className="mt-2 font-serif text-3xl tabular">
            {formatINR(Math.round(result.interest))}
          </p>
        </div>
      </div>
    </CalcShell>
  );
}
