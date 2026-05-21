import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { SERVICES } from '@/lib/services';
import { FIRM } from '@/lib/firm';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'The practice areas of S. Mittal & Co., Chartered Accountants — tax & regulatory, assurance, risk & forensics, deals, consulting, and outsourced finance.',
  alternates: { canonical: `${FIRM.domain}/services` },
};

export default function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Six lines of work,
            <br />
            <span className="italic text-accent">one named partner.</span>
          </>
        }
        description="The firm’s service practice — covering tax, assurance, risk, transactions, consulting, and outsourced finance. Each engagement begins with a written letter and stays with one accountable partner from the first call to the audit signature."
      />

      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <ul className="grid gap-px overflow-hidden border border-foreground/15 bg-foreground/15 md:grid-cols-2">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col justify-between bg-background p-8 transition-colors hover:bg-surface md:p-12"
                  >
                    <div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif text-2xl tabular text-accent">
                          0{i + 1}
                        </span>
                        <Icon
                          size={26}
                          strokeWidth={1.5}
                          className="text-accent transition-transform duration-500 group-hover:-rotate-6"
                        />
                      </div>
                      <h2 className="mt-10 font-serif text-[clamp(1.875rem,3vw,2.5rem)] leading-tight tracking-tight">
                        {s.name}
                      </h2>
                      <p className="mt-5 max-w-md text-[0.975rem] leading-relaxed text-foreground/70">
                        {s.tagline}
                      </p>
                      <ul className="mt-10 space-y-2 text-sm">
                        {s.lines.slice(0, 5).map((line) => (
                          <li
                            key={line.name}
                            className="border-b border-foreground/10 pb-2 text-foreground/65"
                          >
                            {line.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="mt-12 inline-flex items-center gap-2 text-sm uppercase tracking-eyebrow text-foreground/80 transition-colors group-hover:text-accent">
                      Explore practice
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.6}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
