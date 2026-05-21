/**
 * Notes editorial property — index data for the four launch pieces (brief §7.5).
 * Full article bodies live in app/notes/[slug]/page.tsx so each piece can ship
 * proper metadata, Article JSON-LD and bespoke layout.
 */

export type NoteCategory =
  | 'Direct Tax'
  | 'GST'
  | 'Audit'
  | 'Compliance'
  | 'Lucknow Business';

export type NoteLanguage = 'en' | 'hi';

export interface NoteEntry {
  slug: string;
  title: string;
  lede: string;
  category: NoteCategory;
  language: NoteLanguage;
  publishedAt: string; // ISO date
  readingMinutes: number;
  /**
   * Optional slug of the most relevant service in lib/services.ts. Surfaces
   * a "Related practice" link in NoteLayout so every Insight has at least
   * one contextual outbound link to a service page (SEO-004).
   */
  relatedServiceSlug?: string;
}

export const NOTES: NoteEntry[] = [
  {
    slug: 'gst-changes-fy-2026-27',
    title: 'What changed in GST in FY 2026-27, and what didn’t',
    lede:
      'A working summary of where compliance practice actually moves this year — and where the noise outpaces the news.',
    category: 'GST',
    language: 'en',
    publishedAt: '2026-05-02',
    readingMinutes: 8,
    relatedServiceSlug: 'tax-regulatory',
  },
  {
    slug: 'up-exporter-igst-refund',
    title: 'How a UP exporter actually claims their IGST refund',
    lede:
      'An anonymised walkthrough of one client’s refund cycle, end to end — paperwork, follow-up cadence, and the points where it usually stalls.',
    category: 'GST',
    language: 'en',
    publishedAt: '2026-04-18',
    readingMinutes: 11,
    relatedServiceSlug: 'tax-regulatory',
  },
  {
    slug: 'budget-2026-chhote-vyapaari',
    title: 'बजट 2026 — एक छोटे व्यापारी के नज़रिए से',
    lede:
      'बजट के बड़े आँकड़ों के पीछे, उत्तर भारत के एक छोटे व्यापारी के बही-खाते पर असली असर क्या है।',
    category: 'Direct Tax',
    language: 'hi',
    publishedAt: '2026-04-04',
    readingMinutes: 9,
    relatedServiceSlug: 'tax-regulatory',
  },
  {
    slug: 'lucknow-compliance-dates',
    title: 'The five compliance dates every Lucknow business should mark',
    lede:
      'A calmly-built reminder calendar for a Lucknow promoter who would rather not learn these dates from a notice.',
    category: 'Lucknow Business',
    language: 'en',
    publishedAt: '2026-03-21',
    readingMinutes: 6,
    relatedServiceSlug: 'outsourcing',
  },
];

export function getNote(slug: string): NoteEntry | undefined {
  return NOTES.find((n) => n.slug === slug);
}

export function formatNoteDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
