'use client';

import { useMemo, useState } from 'react';
import { CalcShell } from '@/components/tools/calc-shell';
import { LabeledInput } from '@/components/tools/labeled-input';
import { formatINR } from '@/lib/utils';
import { getTool } from '@/lib/tools';

/**
 * Rule 2A, Income-tax Rules, 1962 — section 10(13A) HRA exemption coefficients.
 * Effective AY 2026-27 (FY 2025-26). No notified change to these coefficients
 * in the current finance act.
 *
 * TODO: legal review before launch (brief §7.4).
 */
const HRA_METRO_RATE = 0.5;
const HRA_NON_METRO_RATE = 0.4;
const HRA_RENT_FLOOR_RATE = 0.1;

type CityType = 'metro' | 'non-metro';

export default function HraPage() {
  const tool = getTool('hra')!;
  const [annualBasic, setAnnualBasic] = useState('600000');
  const [annualDa, setAnnualDa] = useState('0');
  const [annualHra, setAnnualHra] = useState('240000');
  const [annualRent, setAnnualRent] = useState('360000');
  const [cityType, setCityType] = useState<CityType>('metro');

  const result = useMemo(() => {
    const basic = parseFloat(annualBasic) || 0;
    const da = parseFloat(annualDa) || 0;
    const hra = parseFloat(annualHra) || 0;
    const rent = parseFloat(annualRent) || 0;

    const salary = basic + da;
    // Three caps under Rule 2A:
    const capActual = hra;
    const cityRate =
      cityType === 'metro' ? HRA_METRO_RATE : HRA_NON_METRO_RATE;
    const capCity = cityRate * salary;
    const capRent = Math.max(rent - HRA_RENT_FLOOR_RATE * salary, 0);

    const exempt = Math.min(capActual, capCity, capRent);
    const taxable = Math.max(hra - exempt, 0);

    return { capActual, capCity, capRent, exempt, taxable };
  }, [annualBasic, annualDa, annualHra, annualRent, cityType]);

  return (
    <CalcShell
      toolName={tool.name}
      shortName={tool.short}
      description="House Rent Allowance exemption under section 10(13A) and Rule 2A of the Income-tax Rules, computed on annual figures."
      effectiveDate={tool.effectiveDate}
      intro={
        <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-foreground/75">
          <p>
            HRA exemption is the lowest of three amounts: the actual HRA
            received, 50% (metro) or 40% (non-metro) of (basic + DA), or rent
            paid minus 10% of (basic + DA). The tool shows all three caps so
            you can see which one binds.
          </p>
          <p>
            DA refers to dearness allowance that forms part of the salary for
            retirement benefits. If unsure, leave at zero — most private-sector
            salary structures do.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <LabeledInput
          label="Annual basic salary (₹)"
          value={annualBasic}
          onChange={setAnnualBasic}
          min={0}
          prefix="₹"
        />
        <LabeledInput
          label="Annual dearness allowance (₹)"
          hint="Part of salary, if applicable"
          value={annualDa}
          onChange={setAnnualDa}
          min={0}
          prefix="₹"
        />
        <LabeledInput
          label="Annual HRA received (₹)"
          value={annualHra}
          onChange={setAnnualHra}
          min={0}
          prefix="₹"
        />
        <LabeledInput
          label="Annual rent paid (₹)"
          value={annualRent}
          onChange={setAnnualRent}
          min={0}
          prefix="₹"
        />

        <div>
          <p className="eyebrow text-foreground/70">City type</p>
          <div className="mt-3 inline-flex rounded-full border border-foreground/15 p-1">
            {(['metro', 'non-metro'] as CityType[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCityType(c)}
                className={`rounded-full px-4 py-3 text-sm capitalize transition-colors ${
                  cityType === c
                    ? 'bg-foreground text-background'
                    : 'text-foreground/70'
                }`}
              >
                {c === 'metro'
                  ? `Metro (${HRA_METRO_RATE * 100}%)`
                  : `Non-metro (${HRA_NON_METRO_RATE * 100}%)`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-accent/40 bg-accent/[0.05] p-6">
        <p className="eyebrow text-foreground/55">Exempt HRA</p>
        <p className="mt-2 font-serif text-3xl tabular text-accent">
          {formatINR(Math.round(result.exempt))}
        </p>
        <p className="mt-2 text-sm text-foreground/65">
          Taxable HRA:{' '}
          <span className="tabular">
            {formatINR(Math.round(result.taxable))}
          </span>
        </p>
      </div>

      <dl className="mt-6 space-y-3 text-sm">
        <p className="eyebrow text-foreground/55">All three caps</p>
        <div className="flex justify-between border-b border-foreground/10 pb-2">
          <dt>Actual HRA received</dt>
          <dd className="tabular">{formatINR(Math.round(result.capActual))}</dd>
        </div>
        <div className="flex justify-between border-b border-foreground/10 pb-2">
          <dt>
            {(cityType === 'metro' ? HRA_METRO_RATE : HRA_NON_METRO_RATE) * 100}%
            of (basic + DA)
          </dt>
          <dd className="tabular">{formatINR(Math.round(result.capCity))}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Rent paid − {HRA_RENT_FLOOR_RATE * 100}% of (basic + DA)</dt>
          <dd className="tabular">{formatINR(Math.round(result.capRent))}</dd>
        </div>
      </dl>
    </CalcShell>
  );
}
