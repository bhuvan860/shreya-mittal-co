import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NoteLayout } from '@/components/notes/note-layout';
import { NOTES, getNote } from '@/lib/notes';
import { INSIGHT_BODIES } from '@/lib/insights-content';
import { FIRM } from '@/lib/firm';

// JSON-LD (Article + BreadcrumbList) is emitted by NoteLayout — don't
// duplicate it here.

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

  return <NoteLayout note={note}>{body}</NoteLayout>;
}
