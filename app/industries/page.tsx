import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { INDUSTRIES } from '@/lib/industries';
import { FIRM } from '@/lib/firm';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Twelve sectors served by S. Mittal & Co., Chartered Accountants — from manufacturing, healthcare, and real estate to technology, family business, and exporters.',
  alternates: { canonical: `${FIRM.domain}/industries` },
};

export default function IndustriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Twelve sectors.
            <br />
            <span className="italic text-accent">Each, its own conversation.</span>
          </>
        }
        description="Industry knowledge changes the questions we ask before we begin. A retail business and a real-estate developer present different books, different compliance footprints, different scrutiny risks — and the firm’s work for each starts from there."
      />

      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <ul className="grid gap-px overflow-hidden border border-foreground/15 bg-foreground/15 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <li key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex h-full flex-col justify-between bg-background p-7 transition-colors hover:bg-surface md:p-9"
                >
                  <div>
                    <span className="font-serif text-xs tabular text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-6 font-serif text-2xl leading-tight tracking-tight md:text-[1.625rem]">
                      {ind.name}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-foreground/65 line-clamp-3">
                      {ind.tagline}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-foreground/75 transition-colors group-hover:text-accent">
                    Read more
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.6}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
