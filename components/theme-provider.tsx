'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import type { ComponentProps } from 'react';

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {/*
        reducedMotion="user" makes every framer-motion `motion.*` component
        respect the user's `prefers-reduced-motion: reduce` setting by
        disabling transforms automatically. Without this, framer-motion
        ignores user preference (default is "never"). globals.css already
        handles CSS animations via @media — this covers JS-driven motion.
      */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
