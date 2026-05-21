import { CountUp } from '@/components/count-up';
import { MeshBg } from '@/components/mesh-bg';
import { FadeInOnView } from '@/components/fade-in-on-view';

const STATS = [
  { v: 6,  suffix: '',   label: 'Service lines',    sub: 'Tax · Assurance · Risk · Deals · Consulting · BPO' },
  { v: 12, suffix: '',   label: 'Industries served', sub: 'From manufacturing to agritech' },
  { v: 1,  suffix: '',   label: 'Office in Lucknow', sub: 'Pan-India representation' },
  { v: 100, suffix: '%', label: 'UDIN-compliant',    sub: 'Every certification, every time' },
] as const;

/**
 * Server Component (PRF-005 PoC iter 27). Previously used framer-motion
 * for the staggered fade-in-up entrance; that work now lives in the small
 * client-only FadeInOnView wrapper, freeing this section to render as a
 * Server Component. CountUp remains client (still uses framer for the
 * number animation), but that boundary is now a child island, not the
 * whole section.
 */
export function HomeStatsStrip() {
  return (
    <section className="relative overflow-hidden border-y border-foreground/10">
      <MeshBg variant="warm" className="mesh-soft" />
      <div className="relative z-10 mx-auto max-w-content container-px py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-4 md:gap-6">
          {STATS.map((stat, i) => (
            <FadeInOnView
              key={stat.label}
              delayMs={i * 100}
              className="glass-card group p-6 md:p-8"
            >
              <CountUp
                to={stat.v}
                suffix={stat.suffix}
                className="block font-serif text-[clamp(3rem,6vw,5rem)] leading-none tracking-tight gradient-text-warm"
              />
              <p className="mt-6 eyebrow-accent">{stat.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {stat.sub}
              </p>
            </FadeInOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
