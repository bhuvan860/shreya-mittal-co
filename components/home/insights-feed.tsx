import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { NOTES, formatNoteDate } from '@/lib/notes';
import { FIRM } from '@/lib/firm';
import { MeshBg } from '@/components/mesh-bg';
import { FadeInOnView } from '@/components/fade-in-on-view';

/** Server Component (PRF-005 iter 29). FadeInOnView replaces framer. */
export function HomeInsightsFeed() {
  const recent = NOTES.slice(0, 4);

  return (
    <section className="relative overflow-hidden section-y">
      <MeshBg variant="soft" />

      <div className="relative z-10 mx-auto max-w-content container-px">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow-accent">§ 03 · Insights</p>
            <h2 className="heading-display mt-6 text-[clamp(2.5rem,6vw,5rem)]">
              Writing from
              <br />
              <span className="gradient-text-warm">practice.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-foreground/75">
              A monthly column on the questions that come up in the day-to-day
              work of the firm. Written by {FIRM.founder.name}.
            </p>
          </div>
          <Link href="/insights" className="link-arrow">All insights</Link>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {recent.map((note, i) => (
            <li key={note.slug}>
              <FadeInOnView delayMs={i * 60} margin="-80px">
                <Link
                  href={`/insights/${note.slug}`}
                  className="glass-card group flex h-full min-h-[300px] flex-col p-6 md:p-7"
                >
                  <div className="flex items-baseline justify-between">
                    <p className="eyebrow-accent">{note.category}</p>
                    <p className="eyebrow text-foreground/55">{note.readingMinutes} min</p>
                  </div>
                  <h3 className="mt-5 grow font-serif text-xl leading-tight tracking-tight md:text-[1.5rem]">
                    {note.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/65 line-clamp-3">
                    {note.lede}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-4 text-xs uppercase tracking-[0.14em] text-foreground/55">
                    <time dateTime={note.publishedAt}>
                      {formatNoteDate(note.publishedAt)}
                    </time>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                      className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
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
