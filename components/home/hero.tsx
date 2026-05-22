import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { FIRM } from '@/lib/firm';
import { NOTES, formatNoteDate } from '@/lib/notes';
import { MeshBg } from '@/components/mesh-bg';
import { HERO_PHOTO } from '@/lib/photography';

/**
 * Server Component (PRF-005 iter 31). The five mount-driven entrance
 * animations the hero previously expressed via framer-motion `motion.*`
 * are now CSS @keyframes defined in app/globals.css. animation-delay
 * preserves the cascade timing exactly. The ken-burns background pan
 * was always CSS; unchanged.
 */
export function HomeHero() {
  const featured = NOTES[0];

  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      <MeshBg />

      {/* Background photo, low opacity, kenburns-style scale */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-25">
        <Image
          src={HERO_PHOTO.url}
          alt={HERO_PHOTO.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ animation: 'mesh-pan 30s ease-in-out infinite' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100vh] max-w-content flex-col justify-between container-px pt-28 pb-12 md:pt-32 md:pb-20">
        {/* Top status bar */}
        <div className="hero-anim-eyebrow flex flex-wrap items-center justify-between gap-4">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em]">
            <Sparkles size={12} className="text-accent" />
            <span>New · {FIRM.brand.eyebrow}</span>
          </div>
          <p className="eyebrow hidden md:block">
            Vol. I ·{' '}
            {new Date().toLocaleDateString('en-IN', {
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Monumental headline */}
        <div className="mt-10">
          <h1 className="heading-hero hero-anim-headline">
            <span className="block">Chartered</span>
            <span className="block">accountancy,</span>
            <span className="block gradient-text-warm">
              practiced<span className="hidden sm:inline"> </span>
              <span className="block sm:inline">personally.</span>
            </span>
          </h1>

          <div className="hero-anim-body mt-12 grid gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-7">
              <p className="max-w-2xl text-[1.125rem] leading-relaxed text-foreground/85 md:text-[1.25rem]">
                A boutique chartered accountancy practice in Lucknow. Tax,
                assurance, risk, deals, and advisory for founders, exporters,
                professionals, and family businesses across Uttar Pradesh.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link href="/connect" className="btn-primary group">
                  <span>Connect with the firm</span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                <Link href="/services" className="btn-ghost">
                  Explore services
                </Link>
              </div>
            </div>

            {/* Featured insight glass card */}
            <div className="hero-anim-card md:col-span-5">
              <Link
                href={`/insights/${featured.slug}`}
                className="glass-card group relative block h-full p-6 md:p-8"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Featured insight
                </div>
                <p className="mt-6 eyebrow text-foreground/55">
                  {featured.category} ·{' '}
                  <time dateTime={featured.publishedAt}>
                    {formatNoteDate(featured.publishedAt)}
                  </time>
                </p>
                <h2 className="mt-4 font-serif text-2xl leading-tight tracking-tight transition-colors group-hover:text-accent md:text-[1.75rem]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70 line-clamp-3">
                  {featured.lede}
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.14em] text-foreground/55">
                    {featured.readingMinutes} min read
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div className="hero-anim-foot mt-16 flex items-center justify-between border-t border-foreground/10 pt-6 text-xs uppercase tracking-[0.18em] text-foreground/55">
          <span>Scroll to explore</span>
          <span className="hidden md:inline">
            6 service lines · 12 industries · 1 named partner
          </span>
        </div>
      </div>
    </section>
  );
}
