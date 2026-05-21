import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { FIRM } from '@/lib/firm';
import { formatNoteDate, type NoteEntry } from '@/lib/notes';
import { getService } from '@/lib/services';
import type { ReactNode } from 'react';

interface Props {
  note: NoteEntry;
  children: ReactNode;
}

export function NoteLayout({ note, children }: Props) {
  const isHindi = note.language === 'hi';
  const relatedService = note.relatedServiceSlug
    ? getService(note.relatedServiceSlug)
    : undefined;

  // Article JSON-LD (brief §9)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.lede,
    datePublished: note.publishedAt,
    inLanguage: isHindi ? 'hi-IN' : 'en-IN',
    author: {
      '@type': 'Person',
      name: FIRM.founder.name,
      jobTitle: FIRM.founder.role,
    },
    publisher: {
      '@type': 'Organization',
      name: FIRM.legalName,
      url: FIRM.domain,
    },
    articleSection: note.category,
    url: `${FIRM.domain}/insights/${note.slug}`,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Insights', item: `${FIRM.domain}/insights` },
      { '@type': 'ListItem', position: 2, name: note.title, item: `${FIRM.domain}/insights/${note.slug}` },
    ],
  };

  return (
    <article lang={isHindi ? 'hi' : 'en'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <header className="border-b border-foreground/10">
        <div className="cosmic-field opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-content container-px pt-10 pb-16 md:pt-16 md:pb-20">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-foreground/65 transition-colors hover:text-accent"
          >
            <ArrowLeft size={15} strokeWidth={1.8} />
            All insights
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-xs uppercase tracking-eyebrow text-foreground/55">
            <time dateTime={note.publishedAt}>
              {formatNoteDate(note.publishedAt)}
            </time>
            <span className="text-foreground/30">·</span>
            <span>{note.category}</span>
            <span className="text-foreground/30">·</span>
            <span>{note.readingMinutes} min read</span>
            {isHindi && (
              <>
                <span className="text-foreground/30">·</span>
                <span className="text-accent">Hindi</span>
              </>
            )}
          </div>

          <h1
            className="heading-display mt-6 max-w-4xl text-[clamp(2rem,5vw,4rem)]"
            style={isHindi ? { fontFamily: 'var(--font-serif)' } : undefined}
          >
            {note.title}
          </h1>

          <p className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-foreground/80">
            {note.lede}
          </p>

          <p className="mt-10 text-xs uppercase tracking-eyebrow text-foreground/55">
            Written by {FIRM.founder.name}
          </p>

          {relatedService && (
            <p className="mt-3 text-xs uppercase tracking-eyebrow text-foreground/55">
              Related practice ·{' '}
              <Link
                href={`/services/${relatedService.slug}`}
                className="text-accent transition-colors hover:text-accent/80"
              >
                {relatedService.short}
              </Link>
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-content container-px py-16 md:py-24">
        <div className="mx-auto max-w-prose space-y-6 editorial-body">
          {children}
        </div>

        <div className="mx-auto mt-20 max-w-prose rounded-2xl border border-foreground/10 p-8">
          <p className="eyebrow">A note from the firm</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/75">
            Writing of this kind is intended for general professional
            reference. It is not, and should not be relied on as, legal, tax
            or financial advice. For advice tailored to your facts, contact
            S. Mittal &amp; Co.
          </p>
          <Link
            href="/connect"
            className="mt-5 inline-flex items-center gap-2 link-quiet"
          >
            Connect with the firm
            <ArrowUpRight size={15} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </article>
  );
}
