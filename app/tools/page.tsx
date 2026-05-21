import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { TOOLS } from '@/lib/tools';
import { FIRM } from '@/lib/firm';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tools',
  description:
    'Five free finance calculators for back-of-the-envelope estimates — Income Tax, GST, EMI, Compound Interest, and HRA exemption. Estimates only.',
  alternates: { canonical: `${FIRM.domain}/tools` },
};

export default function ToolsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        title={
          <>
            Five calculators,{' '}
            <span className="italic text-foreground/85">made for estimating.</span>
          </>
        }
        description="Free, fast, and clearly labelled. Use these for the back-of-the-envelope question on a Tuesday afternoon — and talk to the firm when you need a real answer."
      />

      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="card-premium group flex h-full flex-col p-7"
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.5}
                      className="text-accent transition-transform duration-500 group-hover:-rotate-3"
                    />
                    <p className="mt-7 font-serif text-2xl tracking-tight">
                      {tool.name}
                    </p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/65">
                      {tool.description}
                    </p>
                    <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-eyebrow text-foreground/55">
                      <span>0{i + 1}</span>
                      <span className="inline-flex items-center gap-1 transition-colors group-hover:text-accent">
                        Open
                        <ArrowUpRight size={13} strokeWidth={1.8} />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 text-xs uppercase tracking-eyebrow text-foreground/60">
            Every tool: estimate only. Not a binding tax or financial computation.
          </p>
        </div>
      </section>
    </>
  );
}
