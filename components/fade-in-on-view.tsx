'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  /** Delay in ms before the fade-in begins. Used for staggered grids. */
  delayMs?: number;
  /** IntersectionObserver rootMargin. Default `-60px` matches the framer
   *  `viewport.margin: '-60px'` pattern used across the home sections. */
  margin?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Lightweight CSS-driven replacement for the framer-motion fade-in-up
 * pattern used throughout the home page. Uses IntersectionObserver to
 * toggle a visible class once, then drops to a static `div` — no JS-driven
 * animation loop, no framer dependency.
 *
 * Respects `prefers-reduced-motion`: if the user prefers reduced motion,
 * the element is rendered already-visible without a transition. The
 * global `@media (prefers-reduced-motion: reduce)` rule in app/globals.css
 * also collapses the transition-duration as a backstop.
 *
 * Designed to be a Server Component's only client child, so callers can
 * drop their own `'use client'` directive.
 */
export function FadeInOnView({
  delayMs = 0,
  margin = '-60px',
  className,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      )}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
