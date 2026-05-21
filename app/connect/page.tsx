import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { ContactForm } from '@/components/contact/contact-form';
import { FIRM } from '@/lib/firm';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Connect',
  description:
    'Get in touch with S. Mittal & Co., Chartered Accountants, in Lucknow. Office address, named email channels, phone, and a short inquiry form.',
  alternates: { canonical: `${FIRM.domain}/connect` },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: FIRM.legalName,
  url: FIRM.domain,
  telephone: FIRM.contact.phone,
  email: FIRM.contact.email.general,
  address: {
    '@type': 'PostalAddress',
    streetAddress: FIRM.address.streetAddress,
    addressLocality: FIRM.address.locality,
    addressRegion: FIRM.address.region,
    postalCode: FIRM.address.postalCode,
    addressCountry: FIRM.address.country,
  },
  areaServed: ['Lucknow', 'Uttar Pradesh', 'India'],
};

export default function ConnectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <PageHero
        eyebrow="Connect"
        title={
          <>
            Write to the firm,
            <br />
            <span className="italic text-accent">and we’ll write back.</span>
          </>
        }
        description="A short form for new inquiries, or one of the named email channels below if you already know whom you’d like to reach. We aim to reply within two working days."
      />

      <section className="section-y">
        <div className="mx-auto max-w-content container-px">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-7">
              <p className="eyebrow-accent">A short inquiry</p>
              <h2 className="heading-section mt-4 text-[clamp(1.625rem,3vw,2.25rem)]">
                Send us a line.
              </h2>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>

            <aside className="md:col-span-5">
              <p className="eyebrow-accent">Direct channels</p>
              <h2 className="heading-section mt-4 text-[clamp(1.625rem,3vw,2.25rem)]">
                Or write directly.
              </h2>

              <ul className="mt-10 space-y-7">
                <li className="flex items-start gap-4">
                  <MapPin size={18} strokeWidth={1.6} className="mt-0.5 text-accent" />
                  <div>
                    <p className="eyebrow text-foreground/55">Office</p>
                    <p className="mt-2 text-sm text-foreground/85">
                      {FIRM.address.streetAddress}
                      <br />
                      {FIRM.address.locality}, {FIRM.address.region}{' '}
                      {FIRM.address.postalCode}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Phone size={18} strokeWidth={1.6} className="mt-0.5 text-accent" />
                  <div>
                    <p className="eyebrow text-foreground/55">Phone</p>
                    <p className="mt-2 tabular text-sm text-foreground/85">
                      {FIRM.contact.phone}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Mail size={18} strokeWidth={1.6} className="mt-0.5 text-accent" />
                  <div>
                    <p className="eyebrow text-foreground/55">Email channels</p>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li><span className="text-foreground/55">Tax:</span>{' '}
                        <a className="link-quiet" href={`mailto:${FIRM.contact.email.tax}`}>{FIRM.contact.email.tax}</a></li>
                      <li><span className="text-foreground/55">GST:</span>{' '}
                        <a className="link-quiet" href={`mailto:${FIRM.contact.email.gst}`}>{FIRM.contact.email.gst}</a></li>
                      <li><span className="text-foreground/55">Audit:</span>{' '}
                        <a className="link-quiet" href={`mailto:${FIRM.contact.email.audit}`}>{FIRM.contact.email.audit}</a></li>
                      <li><span className="text-foreground/55">General:</span>{' '}
                        <a className="link-quiet" href={`mailto:${FIRM.contact.email.general}`}>{FIRM.contact.email.general}</a></li>
                    </ul>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <MessageCircle size={18} strokeWidth={1.6} className="mt-0.5 text-accent" />
                  <div>
                    <p className="eyebrow text-foreground/55">WhatsApp</p>
                    <p className="mt-2 text-sm tabular text-foreground/85">
                      {FIRM.contact.whatsapp}
                    </p>
                    <p className="mt-1 text-xs text-foreground/55">
                      Visitor-initiated only. We don’t proactively message.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 aspect-[16/10] overflow-hidden border border-foreground/15 bg-gradient-to-br from-cosmic-1/30 via-surface to-cosmic-2/20">
                <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-eyebrow text-foreground/60">
                  TODO: embedded map after Google Business Profile setup
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
