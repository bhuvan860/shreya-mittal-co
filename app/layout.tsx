import type { Metadata, Viewport } from 'next';
import {
  Inter,
  Playfair_Display,
  Source_Serif_4,
  Noto_Serif_Devanagari,
} from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';
import { FIRM } from '@/lib/firm';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-editorial',
  weight: ['400', '500', '600'],
});

/**
 * Devanagari serif for Hindi article headlines. Playfair Display has no
 * Devanagari glyphs, so without this the browser swaps to a system Indic
 * font mid-render — that produced a 0.258 CLS on the Hindi insight slug
 * before this was added (see PRF-008).
 */
const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari', 'latin'],
  display: 'swap',
  variable: '--font-serif-devanagari',
  weight: ['500', '600'],
});

export const viewport: Viewport = {
  // Hex literals mirror `--color-bg` in app/globals.css so the mobile chrome
  // bar matches the page background. Update both places together if the
  // tokens change.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#06060C' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(FIRM.domain),
  title: {
    default: `${FIRM.legalName} · Lucknow`,
    template: `%s · ${FIRM.name} · Lucknow`,
  },
  description:
    'A boutique chartered accountancy practice in Lucknow. Direct tax, GST, audit, and advisory for founders, exporters, professionals, and family businesses across Uttar Pradesh and beyond.',
  applicationName: FIRM.name,
  authors: [{ name: FIRM.founder.name }],
  alternates: {
    canonical: FIRM.domain,
  },
  openGraph: {
    type: 'website',
    siteName: FIRM.name,
    title: `${FIRM.legalName} · Lucknow`,
    description:
      'A boutique chartered accountancy practice in Lucknow. Direct tax, GST, audit, and advisory.',
    url: FIRM.domain,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${FIRM.legalName} · Lucknow`,
    description:
      'A boutique chartered accountancy practice in Lucknow. Direct tax, GST, audit, and advisory.',
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'Professional services',
};

// JSON-LD: AccountingService at site root (brief §9).
// Compliance lens applied — descriptive only, no superlatives.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: FIRM.legalName,
  description:
    'Chartered accountancy practice offering direct tax, GST, audit and advisory services in Lucknow, Uttar Pradesh.',
  url: FIRM.domain,
  founder: {
    '@type': 'Person',
    name: FIRM.founder.name,
    jobTitle: FIRM.founder.role,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: FIRM.address.streetAddress,
    addressLocality: FIRM.address.locality,
    addressRegion: FIRM.address.region,
    addressCountry: FIRM.address.country,
  },
  areaServed: ['Lucknow', 'Uttar Pradesh', 'India'],
  knowsAbout: [
    'Direct tax',
    'Indirect tax (GST)',
    'Statutory audit',
    'Internal audit',
    'ROC compliance',
    'Transfer pricing',
    'Cross-border trade compliance',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${sourceSerif.variable} ${notoDevanagari.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main id="main" className="pt-20 md:pt-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
