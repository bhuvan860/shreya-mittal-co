import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/lib/services';
import { MeshBg } from '@/components/mesh-bg';
import { FadeInOnView } from '@/components/fade-in-on-view';

/**
 * Server Component (PRF-005 iter 28). Migrated from framer-motion to
 * FadeInOnView; same staggered fade-in feel, zero framer dependency.
 */
export function HomeServicesGrid() {
  return (
    <section className="relative overflow-hidden section-y">
      <MeshBg variant="soft" />

      <div className="relative z-10 mx-auto max-w-content container-px">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow-accent">§ 01 · Services</p>
            <h2 className="heading-display mt-6 text-[clamp(2.5rem,6vw,5rem)]">
              Six lines of work.
            </h2>
            <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-foreground/75">
              Each engagement begins with a written letter and stays with one
              accountable partner from the first call to the audit signature.
            </p>
            <Link href="/services" className="link-arrow mt-8 inline-flex">
              All services
            </Link>
          </div>

          <div className="col-span-12 md:col-span-9">
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {SERVICES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.slug}>
                    <FadeInOnView delayMs={i * 70} margin="-80px">
                      <Link
                        href={`/services/${s.slug}`}
                        className="glass-card group relative flex h-full min-h-[280px] flex-col justify-between p-6 md:p-7"
                      >
                        <div>
                          <div className="flex items-baseline justify-between">
                            <span className="font-serif text-2xl tabular text-accent">
                              0{i + 1}
                            </span>
                            <Icon
                              size={22}
                              strokeWidth={1.5}
                              className="text-foreground/55 transition-all duration-500 group-hover:rotate-6 group-hover:text-accent"
                            />
                          </div>
                          <h3 className="mt-8 font-serif text-2xl leading-tight tracking-tight">
                            {s.name}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-foreground/65 line-clamp-2">
                            {s.tagline}
                          </p>
                        </div>
                        <span className="mt-6 inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-foreground/55 transition-colors group-hover:text-accent">
                          Explore practice
                          <ArrowUpRight
                            size={14}
                            strokeWidth={1.8}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>
                      </Link>
                    </FadeInOnView>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
