'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrandMark } from '@/components/brand-mark';

const ease = [0.2, 0.65, 0.3, 1] as const;

const COLUMNS = [
  {
    k: 'Monthly',
    items: [
      'GSTR-1 & GSTR-3B',
      'TDS deposit & quarterly return',
      'Books closed by the 7th',
      'Statutory dues calendar',
      'Standard MIS deck',
    ],
  },
  {
    k: 'Quarterly',
    items: [
      'Partner-led 60-min review',
      'Books / GST / bank reconciliation',
      'Working-capital flag-list',
      'Advance-tax estimate',
      'Next-quarter calendar',
    ],
  },
  {
    k: 'Annually',
    items: [
      'GSTR-9 & 9C',
      'Tax audit (44AB)',
      'Statutory audit liaison',
      'ROC: AOC-4 & MGT-7',
      'ITR filing',
    ],
  },
];

export function HomeMsmeDesk() {
  return (
    <section className="relative overflow-hidden bg-[rgb(var(--color-cosmic-2))] text-foreground">
      <div className="cosmic-field opacity-90" aria-hidden />
      <div className="star-field opacity-80" aria-hidden />
      <div className="grain" aria-hidden />

      <div className="relative z-10 mx-auto max-w-content container-px py-24 md:py-36">
        {/* Header strip */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-foreground/20 pb-6">
          <p className="eyebrow-accent">§ 02 · Productised engagement</p>
          <p className="eyebrow text-foreground/60">A monthly retainer for MSMEs</p>
        </div>

        {/* Headline + brand mark */}
        <div className="mt-16 grid items-end gap-10 md:grid-cols-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
            className="md:col-span-9"
          >
            <h2 className="heading-monumental text-foreground">
              The MSME
              <br />
              <span className="italic text-accent">Compliance</span>
              <br />
              Desk.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
            className="md:col-span-3 md:text-right"
          >
            <BrandMark size={140} className="mx-auto opacity-80 md:ml-auto md:mr-0" />
          </motion.div>
        </div>

        {/* Lede + CTA */}
        <div className="mt-20 grid gap-12 md:grid-cols-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="md:col-span-7"
          >
            <p className="editorial-body text-foreground/90">
              A recurring monthly engagement for small and medium businesses.
              <strong className="text-accent font-medium"> GST returns, TDS, ROC filings, books, and a quarterly review</strong> — at a fixed scope, with one named partner-on-account
              at the firm. The deliverables, the cadence, the timeline, and
              what is &mdash; and is not &mdash; included are written in the
              engagement letter before work begins.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link href="/services/outsourcing" className="btn-primary">
                <span>How it works</span>
              </Link>
              <Link href="/connect?engagement=msme-desk" className="link-arrow">
                Speak with the firm
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="md:col-span-5"
          >
            <div className="border-l-2 border-accent pl-6">
              <p className="eyebrow-accent">At a glance</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between border-b border-foreground/15 pb-3">
                  <dt className="text-foreground/65">Cadence</dt>
                  <dd className="font-serif text-base">Monthly + quarterly</dd>
                </div>
                <div className="flex justify-between border-b border-foreground/15 pb-3">
                  <dt className="text-foreground/65">Scope</dt>
                  <dd className="font-serif text-base">Fixed, in writing</dd>
                </div>
                <div className="flex justify-between border-b border-foreground/15 pb-3">
                  <dt className="text-foreground/65">Contact</dt>
                  <dd className="font-serif text-base">One named partner</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-foreground/65">Commitment</dt>
                  <dd className="font-serif text-base">Quarterly review</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Three-column scope spread */}
        <div className="mt-24 grid gap-px overflow-hidden border border-foreground/15 bg-foreground/15 md:grid-cols-3">
          {COLUMNS.map((col, i) => (
            <div
              key={col.k}
              className="relative bg-[rgb(var(--color-cosmic-2))] p-8 md:p-12"
            >
              <p className="eyebrow-accent">0{i + 1} · {col.k}</p>
              <ul className="mt-8 space-y-4">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-foreground/15 pb-3 font-serif text-lg leading-snug tracking-tight"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
