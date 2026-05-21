import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { FIRM, SITE_LAST_UPDATED } from '@/lib/firm';
import { SERVICES } from '@/lib/services';
import { BrandMark } from '@/components/brand-mark';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    `About ${FIRM.legalName} — the founder, the firm’s credentials, locations, and the way of working that defines the practice in Lucknow.`,
  alternates: { canonical: `${FIRM.domain}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A new chartered accountancy practice,
            <br />
            <span className="italic text-accent">built for the long view.</span>
          </>
        }
        description="Founded in 2026 by CA Shreya Mittal in Lucknow, S. Mittal & Co. is designed to grow into a small partnership over the next several years — without losing the personal accountability of a boutique."
      />

      {/* Founder */}
      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <p className="eyebrow-accent">§ 01 · Leadership</p>
          <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <div className="relative aspect-[3/4] overflow-hidden border border-foreground/15">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-cosmic-1))] via-[rgb(var(--color-deep))] to-[rgb(var(--color-cosmic-2))]">
                  <div className="star-field opacity-50" aria-hidden />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BrandMark size={120} className="opacity-30" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="eyebrow text-foreground/55">Portrait · TODO</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <h2 className="heading-section text-[clamp(2rem,4vw,3.25rem)]">
                {FIRM.founder.name}
              </h2>
              <p className="mt-3 eyebrow text-foreground/55">
                {FIRM.founder.role} · {FIRM.city}
              </p>
              <div className="mt-10 space-y-5 editorial-body">
                <p>
                  Shreya qualified as a Chartered Accountant in India after the
                  prescribed CA Final examinations and articleship.{' '}
                  <em className="text-foreground/60">
                    [TODO: articleship firm + any additional credentials — pending founder review]
                  </em>
                  . Her early professional work covered direct tax, GST
                  compliance, and statutory audit across small and mid-sized
                  businesses in Uttar Pradesh.
                </p>
                <p>
                  S. Mittal &amp; Co. exists because she wanted a practice where
                  the engagement letter is honest, the work is genuinely owned by
                  the person whose name is on the door, and where Lucknow is the
                  centre of the map — not the periphery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule-hairline mx-auto max-w-content container-px" />

      {/* What we do — services summary */}
      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <p className="eyebrow-accent">§ 02 · What we do</p>
          <h2 className="heading-section mt-4 text-[clamp(2rem,4vw,3.25rem)]">
            Tax, assurance, risk, deals, consulting, outsourcing.
          </h2>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between border border-foreground/10 p-5 transition-colors hover:border-accent/40"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} strokeWidth={1.5} className="text-accent" />
                      <span className="font-serif text-base tracking-tight">
                        {s.name}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.6}
                      className="text-foreground/55 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="rule-hairline mx-auto max-w-content container-px" />

      {/* How we work */}
      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <p className="eyebrow-accent">§ 03 · How we work</p>
          <h2 className="heading-section mt-4 text-[clamp(2rem,4vw,3.25rem)]">
            Four steps, written down.
          </h2>

          <ol className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 md:gap-x-16">
            {[
              { n: '01', title: 'Discovery call', body: 'A 30-minute conversation, free of obligation, to understand the work and the timing. We do not pitch. We listen.' },
              { n: '02', title: 'Engagement letter', body: 'Scope, deliverables, named contact, timeline, and fees — captured in writing before any work begins.' },
              { n: '03', title: 'Onboarding', body: 'Document collection, access provisioning, and a handover meeting with your existing accountant where one is in place.' },
              { n: '04', title: 'Recurring deliverables', body: 'Monthly compliance, quarterly review, annual audit — on a calendar set in advance.' },
            ].map((step) => (
              <li key={step.n}>
                <span className="numeral-monumental block">{step.n}</span>
                <h3 className="mt-4 font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-foreground/75">
                  {step.body}
                </p>
                <div className="mt-6 h-px w-16 bg-accent" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="rule-hairline mx-auto max-w-content container-px" />

      {/* Credentials & disclosures */}
      <section className="section-y bg-surface/40 border-y border-foreground/15">
        <div className="mx-auto max-w-content container-px">
          <p className="eyebrow-accent">§ 04 · Credentials &amp; disclosures</p>
          <h2 className="heading-section mt-4 text-[clamp(2rem,4vw,3.25rem)]">
            On the record.
          </h2>
          <dl className="mt-12 grid gap-x-12 gap-y-6 text-sm md:grid-cols-3">
            <div>
              <dt className="eyebrow text-foreground/55">Firm Registration Number</dt>
              <dd className="mt-2 tabular text-foreground/90">{FIRM.firmRegistrationNumber}</dd>
            </div>
            <div>
              <dt className="eyebrow text-foreground/55">Founder ICAI Membership</dt>
              <dd className="mt-2 tabular text-foreground/90">{FIRM.founder.icaiMembershipNumber}</dd>
            </div>
            <div>
              <dt className="eyebrow text-foreground/55">Established</dt>
              <dd className="mt-2 tabular text-foreground/90">{FIRM.established}</dd>
            </div>
            <div>
              <dt className="eyebrow text-foreground/55">UDIN compliance</dt>
              <dd className="mt-2 text-foreground/90">All certifications carry a valid UDIN.</dd>
            </div>
            <div>
              <dt className="eyebrow text-foreground/55">Network</dt>
              <dd className="mt-2 text-foreground/90">Independent practice.</dd>
            </div>
            <div>
              <dt className="eyebrow text-foreground/55">Last updated</dt>
              <dd className="mt-2 tabular text-foreground/90">
                <time dateTime={SITE_LAST_UPDATED}>
                  {new Date(SITE_LAST_UPDATED).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Locations */}
      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <p className="eyebrow-accent">§ 05 · Locations</p>
          <h2 className="heading-section mt-4 text-[clamp(2rem,4vw,3.25rem)]">
            Where we are.
          </h2>
          <p className="mt-5 max-w-2xl text-[0.975rem] leading-relaxed text-foreground/70">
            The firm operates from a single office in Lucknow today. Pan-India
            engagements are run from here; on-site visits are scheduled where
            the work requires them.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="card-premium p-8">
              <p className="eyebrow-accent">Head Office</p>
              <h3 className="mt-4 font-serif text-2xl tracking-tight">Lucknow</h3>
              <ul className="mt-6 space-y-3 text-sm text-foreground/75">
                <li className="flex items-start gap-3">
                  <MapPin size={15} strokeWidth={1.6} className="mt-1 text-accent" />
                  <span>{FIRM.address.streetAddress}, {FIRM.address.locality}, {FIRM.address.region} {FIRM.address.postalCode}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={15} strokeWidth={1.6} className="mt-1 text-accent" />
                  <span className="tabular">{FIRM.contact.phone}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={15} strokeWidth={1.6} className="mt-1 text-accent" />
                  <a className="link-quiet" href={`mailto:${FIRM.contact.email.general}`}>
                    {FIRM.contact.email.general}
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-premium p-8">
              <p className="eyebrow">Planned · 2027</p>
              <h3 className="mt-4 font-serif text-2xl tracking-tight text-foreground/70">Kanpur</h3>
              <p className="mt-4 text-sm text-foreground/60">
                A secondary presence to serve the industrial belt is under
                consideration. Timing depends on partner expansion.
              </p>
            </div>
            <div className="card-premium p-8">
              <p className="eyebrow">Planned · 2028</p>
              <h3 className="mt-4 font-serif text-2xl tracking-tight text-foreground/70">Delhi NCR</h3>
              <p className="mt-4 text-sm text-foreground/60">
                A representative office for north-India clients with cross-border
                trade and corporate-tax workloads.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule-hairline mx-auto max-w-content container-px" />

      {/* Newsroom */}
      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <p className="eyebrow-accent">§ 06 · Newsroom</p>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-6">
            <h2 className="heading-section text-[clamp(2rem,4vw,3.25rem)]">
              Press &amp; mentions.
            </h2>
            <Link href="/connect" className="link-arrow">Media enquiries</Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="border border-dashed border-foreground/15 p-8 text-center">
              <p className="eyebrow text-foreground/55">Coming soon</p>
              <p className="mt-4 font-serif text-xl text-foreground/70">
                The firm has just opened. Press mentions and bylines will be
                listed here as they are published.
              </p>
            </div>
            <div className="border border-dashed border-foreground/15 p-8 text-center">
              <p className="eyebrow text-foreground/55">Awards</p>
              <p className="mt-4 font-serif text-xl text-foreground/70">
                We do not list industry-rankings or awards on the website by
                policy — ICAI Website Guidelines, and our own preference.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule-hairline mx-auto max-w-content container-px" />

      {/* Careers */}
      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <p className="eyebrow-accent">§ 07 · Careers</p>
          <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <h2 className="heading-section text-[clamp(2rem,4vw,3.25rem)]">
                Articleship &amp; junior associate roles.
              </h2>
              <div className="mt-8 space-y-5 editorial-body">
                <p>
                  The firm intends to take on one or two articled assistants from
                  the 2026-27 cycle, with an emphasis on candidates who want a
                  full exposure to tax, audit, and advisory work rather than
                  specialising too early.
                </p>
                <p>
                  We do not yet have a formal recruiting page. If you are an
                  articleship-eligible CA student or a recently-qualified junior
                  associate interested in joining a new practice as it grows,
                  please write to{' '}
                  <a className="link-quiet" href="mailto:careers@smittalandco.example">
                    careers@smittalandco.example
                  </a>{' '}
                  with your CV and a one-line note on what you are looking for.
                </p>
              </div>
            </div>
            <aside className="md:col-span-5">
              <div className="card-premium p-8">
                <p className="eyebrow-accent">What you’ll work on</p>
                <ul className="mt-6 space-y-3 text-sm text-foreground/80">
                  <li>· Statutory audit and tax audit fieldwork</li>
                  <li>· GST compliance for businesses across UP</li>
                  <li>· Direct-tax computations and ITR filings</li>
                  <li>· ROC filings and corporate-secretarial work</li>
                  <li>· Client-facing partner support</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
