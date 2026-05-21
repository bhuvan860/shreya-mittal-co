import Link from 'next/link';
import { FIRM } from '@/lib/firm';
import { BrandMark } from '@/components/brand-mark';
import { MeshBg } from '@/components/mesh-bg';
import { FadeInOnView } from '@/components/fade-in-on-view';
import { ArrowUpRight } from 'lucide-react';

/** Server Component (PRF-005 iter 29). FadeInOnView replaces framer. */
export function HomeConnectCta() {
  return (
    <section className="relative overflow-hidden">
      <MeshBg />

      <div className="relative z-10 mx-auto max-w-content container-px py-28 md:py-40">
        <FadeInOnView
          margin="-80px"
          className="grid items-end gap-10 md:grid-cols-12 md:gap-16"
        >
          <div className="md:col-span-9">
            <p className="eyebrow-accent">Connect</p>
            <h2 className="heading-monumental mt-8">
              A short
              <br />
              <span className="gradient-text-warm">conversation,</span>{' '}
              <span className="block">first.</span>
            </h2>
            <p className="mt-10 max-w-2xl text-[1.0625rem] leading-relaxed text-foreground/85 md:text-[1.25rem]">
              A 30-minute discovery call, free of obligation. If we are the
              right fit, an engagement letter follows — scope, timeline, fee on
              paper before work begins.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <Link href="/connect" className="btn-primary group">
                <span>Connect with the firm</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <a href={`mailto:${FIRM.contact.email.general}`} className="link-arrow">
                {FIRM.contact.email.general}
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:text-right">
            <div className="glass-card inline-flex items-center justify-center p-8">
              <BrandMark size={120} />
            </div>
          </div>
        </FadeInOnView>
      </div>
    </section>
  );
}
