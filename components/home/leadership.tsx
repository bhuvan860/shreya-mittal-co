import Link from 'next/link';
import { FIRM } from '@/lib/firm';
import { BrandMark } from '@/components/brand-mark';
import { MeshBg } from '@/components/mesh-bg';
import { FadeInOnView } from '@/components/fade-in-on-view';
import { ArrowUpRight } from 'lucide-react';

/** Server Component (PRF-005 iter 29). FadeInOnView replaces framer. */
export function HomeLeadership() {
  return (
    <section className="relative overflow-hidden section-y">
      <MeshBg variant="warm" />

      <div className="relative z-10 mx-auto max-w-content container-px">
        <p className="eyebrow-accent">§ 04 · Leadership</p>
        <h2 className="heading-display mt-6 text-[clamp(2.5rem,6vw,5rem)]">
          A name on the door,
          <br />
          <span className="gradient-text-warm">accountable to every file.</span>
        </h2>

        <FadeInOnView
          margin="-80px"
          className="glass-card mt-20 grid gap-10 p-8 md:grid-cols-12 md:gap-14 md:p-12"
        >
          {/* Portrait area */}
          <div className="md:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-foreground/15">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(260,40%,18%)] via-[hsl(290,35%,22%)] to-[hsl(35,55%,30%)]" />
              <div className="absolute inset-0 grain opacity-30" aria-hidden />
              <div className="absolute inset-0 flex items-center justify-center">
                <BrandMark size={140} className="opacity-40" />
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <p className="eyebrow text-white/60">Portrait · TODO</p>
                <p className="mt-2 font-serif text-base tracking-tight text-white/85">
                  Passport-size, neutral background
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-8">
            <p className="eyebrow-accent">Founder</p>
            <h3 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight">
              {FIRM.founder.name}
            </h3>
            <p className="mt-3 eyebrow text-foreground/55">
              {FIRM.founder.role} · {FIRM.city}
            </p>

            <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-foreground/85">
              <p>
                Shreya qualified as a Chartered Accountant in India after the
                prescribed CA Final examinations and articleship. Her early
                professional work covered direct tax, GST compliance, and
                statutory audit across small and mid-sized businesses in Uttar
                Pradesh.
              </p>
              <p>
                S. Mittal &amp; Co. exists because she wanted a practice where
                the engagement letter is honest, the work is genuinely owned by
                the person whose name is on the door, and where Lucknow is the
                centre of the map — not the periphery.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/about" className="btn-ghost">
                About the firm
              </Link>
              <Link href="/connect" className="link-arrow">
                Speak with Shreya
                <ArrowUpRight size={14} strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </FadeInOnView>
      </div>
    </section>
  );
}
