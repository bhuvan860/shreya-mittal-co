import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/page-hero';
import { INDUSTRIES, getIndustry } from '@/lib/industries';
import { SERVICES, getService } from '@/lib/services';
import { FIRM } from '@/lib/firm';
import { ArrowUpRight, Check } from 'lucide-react';

interface Params { slug: string }

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    title: ind.name,
    description: ind.tagline,
    alternates: { canonical: `${FIRM.domain}/industries/${ind.slug}` },
  };
}

export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const linkedServices = ind.relatedServiceSlugs
    .map(getService)
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Industries', item: `${FIRM.domain}/industries` },
      { '@type': 'ListItem', position: 2, name: ind.name, item: `${FIRM.domain}/industries/${ind.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageHero
        eyebrow={`Industries · ${ind.short}`}
        title={ind.name}
        description={ind.tagline}
      />

      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="eyebrow">About this sector</p>
            </div>
            <div className="md:col-span-8">
              <p className="editorial-body">{ind.intro}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule-hairline mx-auto max-w-content container-px" />

      {/* Themes */}
      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="eyebrow-accent">Areas of focus</p>
              <h2 className="heading-section mt-4 text-[clamp(1.875rem,3.5vw,2.75rem)]">
                Where the work concentrates.
              </h2>
            </div>
            <ul className="md:col-span-8 space-y-3">
              {ind.themes.map((theme, i) => (
                <li
                  key={theme}
                  className="flex items-start gap-4 border-b border-foreground/15 py-4"
                >
                  <span className="font-serif text-base tabular text-accent w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-lg leading-snug tracking-tight">
                    {theme}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related services */}
      {linkedServices.length > 0 && (
        <>
          <div className="rule-hairline mx-auto max-w-content container-px" />
          <section className="section-y bg-surface/40 border-y border-foreground/15">
            <div className="mx-auto max-w-content container-px">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <p className="eyebrow-accent">Services applied</p>
                  <h2 className="heading-section mt-4 text-[clamp(1.625rem,2.8vw,2.25rem)]">
                    Practice lines drawn on for this sector.
                  </h2>
                </div>
                <Link href="/services" className="link-arrow">All services</Link>
              </div>
              <ul className="mt-12 grid gap-5 md:grid-cols-3">
                {linkedServices.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="card-premium group flex h-full flex-col p-7"
                      >
                        <Icon size={22} strokeWidth={1.5} className="text-accent" />
                        <h3 className="mt-6 font-serif text-xl tracking-tight">
                          {s.name}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                          {s.tagline}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-1 text-xs uppercase tracking-eyebrow text-foreground/75 transition-colors group-hover:text-accent">
                          Explore <ArrowUpRight size={12} strokeWidth={1.8} />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </>
      )}

      <section className="border-t border-foreground/15 py-20 md:py-28">
        <div className="mx-auto max-w-content container-px text-center">
          <p className="eyebrow-accent">Next step</p>
          <h2 className="heading-section mx-auto mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)]">
            Speak with the firm.
          </h2>
          <Link
            href={`/connect?industry=${ind.slug}`}
            className="btn-primary mt-10 inline-flex"
          >
            <span>Connect with the firm</span>
          </Link>
        </div>
      </section>
    </>
  );
}
