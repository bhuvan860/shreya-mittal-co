import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NoteLayout } from '@/components/notes/note-layout';
import { NOTES, getNote } from '@/lib/notes';
import { INSIGHT_BODIES } from '@/lib/insights-content';
import { FIRM } from '@/lib/firm';

interface Params { slug: string }

export async function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.lede,
    alternates: { canonical: `${FIRM.domain}/insights/${n.slug}` },
  };
}

export default async function InsightPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const note = getNote(slug);
  const body = INSIGHT_BODIES[slug];
  if (!note || !body) notFound();

  const url = `${FIRM.domain}/insights/${note.slug}`;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.lede,
    url,
    inLanguage: note.language === 'hi' ? 'hi-IN' : 'en-IN',
    datePublished: note.publishedAt,
    articleSection: note.category,
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
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Insights', item: `${FIRM.domain}/insights` },
      { '@type': 'ListItem', position: 2, name: note.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <NoteLayout note={note}>{body}</NoteLayout>
    </>
  );
}
