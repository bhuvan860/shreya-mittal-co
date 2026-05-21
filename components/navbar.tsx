'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, FIRM } from '@/lib/firm';
import { SERVICES } from '@/lib/services';
import { INDUSTRIES } from '@/lib/industries';
import { ThemeToggle } from './theme-toggle';
import { BrandMark } from './brand-mark';
import { cn } from '@/lib/utils';

const HAS_MEGA: Record<string, 'services' | 'industries' | undefined> = {
  '/services': 'services',
  '/industries': 'industries',
};

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<'services' | 'industries' | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || mega ? 'backdrop-blur-md' : '',
      )}
      onMouseLeave={() => setMega(null)}
    >
      <div
        className={cn(
          'border-b transition-colors duration-500',
          scrolled || mega
            ? 'border-foreground/15 bg-background/95'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex max-w-content items-center justify-between container-px py-4 md:py-5">
          {/* Wordmark + Mark */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${FIRM.name} home`}
          >
            <BrandMark size={32} className="shrink-0 transition-transform duration-500 group-hover:rotate-12 md:h-9 md:w-9" />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-[1.0625rem] tracking-tight md:text-[1.25rem]">
                S. Mittal <span className="text-accent">&amp;</span> Co.
              </span>
              <span className="mt-1 hidden text-[0.625rem] uppercase tracking-[0.18em] text-muted sm:inline">
                Chartered Accountants · Lucknow
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href);
              const megaKey = HAS_MEGA[item.href];
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMega(megaKey ?? null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative inline-flex items-center gap-1 px-3.5 py-2 text-[0.8125rem] uppercase tracking-[0.14em] transition-colors xl:px-4',
                      active || mega === megaKey
                        ? 'text-accent'
                        : 'text-foreground/70 hover:text-foreground',
                    )}
                  >
                    {item.label}
                    {megaKey && (
                      <ChevronDown
                        size={12}
                        strokeWidth={2}
                        className={cn(
                          'transition-transform duration-300',
                          mega === megaKey && 'rotate-180',
                        )}
                      />
                    )}
                    {active && (
                      <span
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent xl:inset-x-4"
                        aria-hidden
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/connect" className="hidden btn-ghost lg:inline-flex">
              <span>Connect</span>
            </Link>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center border border-foreground/15 text-foreground/80 lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega menu — desktop */}
      <AnimatePresence>
        {mega === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="hidden border-b border-foreground/15 bg-background/95 backdrop-blur-md lg:block"
          >
            <div className="mx-auto max-w-content container-px py-10">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-3">
                  <p className="eyebrow-accent">Services</p>
                  <p className="mt-5 font-serif text-2xl leading-tight tracking-tight">
                    Six lines of work, with one named partner per file.
                  </p>
                  <Link href="/services" className="link-arrow mt-6 inline-flex">
                    All services
                  </Link>
                </div>
                <div className="col-span-9 grid grid-cols-3 gap-x-8 gap-y-6">
                  {SERVICES.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex gap-4 border-t border-foreground/15 pt-4 transition-colors hover:border-accent"
                      >
                        <Icon size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-accent" />
                        <div>
                          <p className="font-serif text-base leading-tight tracking-tight transition-colors group-hover:text-accent">
                            {s.short}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-foreground/55 line-clamp-2">
                            {s.lines.slice(0, 3).map((l) => l.name).join(' · ')}
                          </p>
                        </div>
                        <span className="ml-auto self-start font-serif text-xs tabular text-foreground/40">
                          0{i + 1}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {mega === 'industries' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="hidden border-b border-foreground/15 bg-background/95 backdrop-blur-md lg:block"
          >
            <div className="mx-auto max-w-content container-px py-10">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-3">
                  <p className="eyebrow-accent">Industries</p>
                  <p className="mt-5 font-serif text-2xl leading-tight tracking-tight">
                    Twelve sectors. Each treated as its own conversation.
                  </p>
                  <Link href="/industries" className="link-arrow mt-6 inline-flex">
                    All industries
                  </Link>
                </div>
                <div className="col-span-9 grid grid-cols-3 gap-x-8 gap-y-3">
                  {INDUSTRIES.map((ind) => (
                    <Link
                      key={ind.slug}
                      href={`/industries/${ind.slug}`}
                      className="group flex items-center justify-between border-b border-foreground/10 py-2 transition-colors hover:border-accent"
                    >
                      <span className="text-sm transition-colors group-hover:text-accent">
                        {ind.name}
                      </span>
                      <span className="text-xs text-foreground/40 transition-colors group-hover:text-accent">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.2, 0.65, 0.3, 1] }}
            className="lg:hidden"
          >
            <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-foreground/15 bg-background/95 backdrop-blur-md">
              <nav
                aria-label="Mobile"
                className="mx-auto flex max-w-content flex-col container-px py-6"
              >
                {NAV_ITEMS.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-baseline gap-4 border-t border-foreground/10 py-3"
                  >
                    <span className="font-serif text-base tabular text-accent">
                      0{i + 1}
                    </span>
                    <span className="font-serif text-2xl tracking-tight transition-colors group-hover:text-accent">
                      {item.label}
                    </span>
                  </Link>
                ))}
                <Link href="/connect" className="mt-6 btn-primary self-start">
                  <span>Connect</span>
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
