'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TOOLS } from '@/lib/tools';

const ease = [0.2, 0.65, 0.3, 1] as const;

export function HomeToolsStrip() {
  return (
    <section className="relative section-y block-inverted overflow-hidden">
      <div className="cosmic-field opacity-60" aria-hidden />
      <div className="star-field opacity-60" aria-hidden />

      <div className="relative z-10 mx-auto max-w-content container-px">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-2">
            <p
              className="eyebrow-accent md:[writing-mode:vertical-rl] md:[transform:rotate(180deg)]"
            >
              § 05 · Tools
            </p>
          </div>
          <div className="col-span-12 md:col-span-10">
            <h2 className="heading-display text-[clamp(3rem,8vw,7rem)]">
              Five calculators,
              <br />
              made for{' '}
              <span className="italic text-accent">estimating.</span>
            </h2>
            <p className="mt-10 max-w-xl text-[1.0625rem] leading-relaxed opacity-80">
              Free, fast, and clearly labelled. None of these replace a real
              conversation. They answer the back-of-the-envelope question on a
              Tuesday afternoon.
            </p>
          </div>
        </div>

        {/* Tool list — large editorial rows */}
        <ul className="mt-20 divide-y divide-current/15 border-y border-current/15">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.li
                key={tool.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease, delay: i * 0.05 }}
              >
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-4 py-8 transition-colors md:py-10"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-serif text-2xl tabular text-accent">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-[clamp(1.75rem,4vw,3rem)] leading-tight tracking-tight transition-colors group-hover:text-accent">
                      {tool.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="hidden max-w-sm text-sm opacity-65 md:block">
                      {tool.description}
                    </p>
                    <span className="inline-flex h-12 w-12 items-center justify-center border border-current/30 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-background">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <ArrowUpRight
                      size={22}
                      strokeWidth={1.6}
                      className="opacity-70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <p className="mt-12 text-xs uppercase tracking-eyebrow opacity-55">
          Every tool: estimate only · not a binding tax or financial computation.
        </p>
      </div>
    </section>
  );
}
