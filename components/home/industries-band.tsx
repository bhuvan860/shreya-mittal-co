import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES } from '@/lib/industries';
import { PhotoOrMesh } from '@/components/photo-or-mesh';
import { MeshBg } from '@/components/mesh-bg';
import { FadeInOnView } from '@/components/fade-in-on-view';

/**
 * Server Component (PRF-005 iter 28). Same staggered fade-in feel as
 * the framer original via FadeInOnView wrapper; zero framer dep.
 */
export function HomeIndustriesBand() {
  return (
    <section className="relative overflow-hidden section-y">
      <MeshBg />

      <div className="relative z-10 mx-auto max-w-content container-px">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow-accent">§ 02 · Industries</p>
            <h2 className="heading-display mt-6 text-[clamp(2.5rem,6vw,5rem)]">
              Twelve sectors.
              <br />
              <span className="gradient-text-warm">Each its own conversation.</span>
            </h2>
          </div>
          <Link href="/industries" className="link-arrow">All industries</Link>
        </div>

        {/* Photographic + mesh tile grid */}
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.slug}>
              <FadeInOnView delayMs={i * 40} margin="-80px">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-foreground/10 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="aspect-[4/5] w-full">
                    <PhotoOrMesh slug={ind.slug} />
                  </div>

                  {/* Overlay text */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 md:p-6">
                    <div className="flex items-start justify-between text-white/90 mix-blend-difference">
                      <span className="font-serif text-sm tabular">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.6}
                        className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>

                    <div>
                      <h3 className="font-serif text-xl leading-tight tracking-tight text-white md:text-[1.5rem]">
                        {ind.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-white/75 line-clamp-2">
                        {ind.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeInOnView>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
