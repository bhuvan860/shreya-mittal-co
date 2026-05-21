'use client';

import { useMemo, useState } from 'react';
import { CalcShell } from '@/components/tools/calc-shell';
import { LabeledInput } from '@/components/tools/labeled-input';
import { formatINR } from '@/lib/utils';
import { getTool } from '@/lib/tools';

// Standard GST slabs in India (FY 2025-26).
// TODO: legal review.
const GST_SLABS = [0, 5, 12, 18, 28] as const;

type Mode = 'exclusive' | 'inclusive';

export default function GstPage() {
  const tool = getTool('gst')!;
  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState<(typeof GST_SLABS)[number]>(18);
  const [mode, setMode] = useState<Mode>('exclusive');

  const result = useMemo(() => {
    const value = parseFloat(amount) || 0;
    const r = rate / 100;
    if (mode === 'exclusive') {
      const gst = value * r;
      return {
        base: value,
        gst,
        cgst: gst / 2,
        sgst: gst / 2,
        total: value + gst,
      };
    }
    // inclusive — extract base from total
    const base = value / (1 + r);
    const gst = value - base;
    return {
      base,
      gst,
      cgst: gst / 2,
      sgst: gst / 2,
      total: value,
    };
  }, [amount, rate, mode]);

  return (
    <CalcShell
      toolName={tool.name}
      shortName={tool.short}
      description="Compute GST on a transaction — inclusive or exclusive of tax — across the standard rate slabs."
      effectiveDate={tool.effectiveDate}
      intro={
        <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-foreground/75">
          <p>
            Choose <em>exclusive</em> if the amount you have is the base value
            before tax, or <em>inclusive</em> if it already includes GST.
            CGST and SGST are split equally for intra-state supplies; for
            inter-state supplies, the same total applies as IGST.
          </p>
          <p>
            Cess on specific goods (tobacco, certain vehicles) is not
            modelled. Verify the applicable rate for your supply before
            invoicing.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <LabeledInput
          label="Amount (₹)"
          value={amount}
          onChange={setAmount}
          min={0}
          prefix="₹"
        />

        <div>
          <p className="eyebrow text-foreground/70">GST rate</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {GST_SLABS.map((slab) => (
              <button
                key={slab}
                type="button"
                onClick={() => setRate(slab)}
                className={`rounded-full border px-4 py-3 text-sm transition-colors ${
                  rate === slab
                    ? 'border-accent bg-accent text-background'
                    : 'border-foreground/15 text-foreground/75 hover:border-accent/40'
                }`}
              >
                {slab}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-foreground/70">Mode</p>
          <div className="mt-3 inline-flex rounded-full border border-foreground/15 p-1">
            {(['exclusive', 'inclusive'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-full px-4 py-3 text-sm capitalize transition-colors ${
                  mode === m
                    ? 'bg-foreground text-background'
                    : 'text-foreground/70'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-accent/40 bg-accent/[0.05] p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="eyebrow text-foreground/55">Taxable value</dt>
            <dd className="mt-2 font-serif text-2xl tabular">
              {formatINR(Math.round(result.base))}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-foreground/55">Total GST ({rate}%)</dt>
            <dd className="mt-2 font-serif text-2xl tabular text-accent">
              {formatINR(Math.round(result.gst))}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-foreground/55">CGST</dt>
            <dd className="mt-2 tabular">{formatINR(Math.round(result.cgst))}</dd>
          </div>
          <div>
            <dt className="eyebrow text-foreground/55">SGST / UTGST</dt>
            <dd className="mt-2 tabular">{formatINR(Math.round(result.sgst))}</dd>
          </div>
          <div className="sm:col-span-2 border-t border-foreground/10 pt-4">
            <dt className="eyebrow text-foreground/55">Total invoice value</dt>
            <dd className="mt-2 font-serif text-3xl tabular">
              {formatINR(Math.round(result.total))}
            </dd>
          </div>
        </dl>
      </div>
    </CalcShell>
  );
}
