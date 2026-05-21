import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/page-hero';
import { SERVICES, getService } from '@/lib/services';
import { INDUSTRIES } from '@/lib/industries';
import { FIRM } from '@/lib/firm';
import { ArrowUpRight, Check } from 'lucide-react';

interface Params { slug: string }

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.tagline,
    alternates: { canonical: `${FIRM.domain}/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  // Industries that link to this service
  const linkedIndustries = INDUSTRIES.filter((ind) =>
    ind.relatedServiceSlugs.includes(s.slug),
  );

  const url = `${FIRM.domain}/services/${s.slug}`;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Services', item: `${FIRM.domain}/services` },
      { '@type': 'ListItem', position: 2, name: s.name, item: url },
    ],
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.tagline,
    serviceType: s.short,
    url,
    areaServed: ['Lucknow', 'Uttar Pradesh', 'India'],
    provider: {
      '@type': 'AccountingService',
      name: FIRM.legalName,
      url: FIRM.domain,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />

      <PageHero
        eyebrow={`Services · ${s.short}`}
        title={s.name}
        description={s.tagline}
      />

      {/* Intro */}
      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="eyebrow">About this practice</p>
            </div>
            <div className="md:col-span-8">
              <p className="editorial-body">{s.intro}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule-hairline mx-auto max-w-content container-px" />

      {/* Lines (sub-services) */}
      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="eyebrow-accent">What we do</p>
              <h2 className="heading-section mt-4 text-[clamp(1.875rem,3.5vw,2.75rem)]">
                Practice lines.
              </h2>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-foreground/70">
                Each engagement is scoped from this list — and out-of-scope work is
                quoted separately, before it begins.
              </p>
            </div>
            <ul className="md:col-span-8 grid gap-3 sm:grid-cols-2">
              {s.lines.map((line) => (
                <li
                  key={line.name}
                  className="flex items-start gap-3 border border-foreground/10 bg-surface/40 p-5"
                >
                  <Check size={16} strokeWidth={1.8} className="mt-1 shrink-0 text-accent" />
                  <div>
                    <p className="font-serif text-base tracking-tight">{line.name}</p>
                    {line.description && (
                      <p className="mt-1 text-xs leading-relaxed text-foreground/65">
                        {line.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features (if any) */}
      {s.features && s.features.length > 0 && (
        <>
          <div className="rule-hairline mx-auto max-w-content container-px" />
          <section className="section-y bg-surface/40 border-y border-foreground/15">
            <div className="mx-auto max-w-content container-px">
              <p className="eyebrow-accent text-center">How we approach it</p>
              <h2 className="heading-section mx-auto mt-4 max-w-3xl text-center text-[clamp(1.875rem,3.5vw,2.75rem)]">
                The way of working.
              </h2>
              <div className="mt-16 grid gap-6 md:grid-cols-3">
                {s.features.map((f) => (
                  <div
                    key={f.title}
                    className="card-premium p-7"
                  >
                    <h3 className="font-serif text-xl tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-foreground/75">
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Linked industries */}
      {linkedIndustries.length > 0 && (
        <section className="section-y border-t border-foreground/15">
          <div className="mx-auto max-w-content container-px">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="eyebrow-accent">Across industries</p>
                <h2 className="heading-section mt-4 text-[clamp(1.625rem,2.8vw,2.25rem)]">
                  Where we apply this.
                </h2>
              </div>
              <Link href="/industries" className="link-arrow">All industries</Link>
            </div>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {linkedIndustries.map((ind) => (
                <li key={ind.slug}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="group flex items-center justify-between border border-foreground/10 p-5 transition-colors hover:border-accent/50"
                  >
                    <span className="font-serif text-base tracking-tight">
                      {ind.name}
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.6}
                      className="text-foreground/55 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-foreground/15 py-20 md:py-28">
        <div className="mx-auto max-w-content container-px text-center">
          <p className="eyebrow-accent">Next step</p>
          <h2 className="heading-section mx-auto mt-4 max-w-2xl text-[clamp(1.875rem,4vw,3rem)]">
            Speak with the firm.
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-[0.975rem] leading-relaxed text-foreground/75">
            A 30-minute discovery call. If we are the right fit, we follow with
            an engagement letter that puts scope, timeline, and fees on paper.
          </p>
          <Link
            href={`/connect?service=${s.slug}`}
            className="btn-primary mt-10 inline-flex"
          >
            <span>Connect with the firm</span>
          </Link>
        </div>
      </section>
    </>
  );
}
