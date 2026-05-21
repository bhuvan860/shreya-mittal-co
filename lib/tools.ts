/**
 * Tools (calculators) — shared metadata used by index + individual pages.
 *
 * Brief §7.4 + CLAUDE.md Rule 11: every calculator is labelled "estimate only",
 * uses FY 2025-26 / AY 2026-27 rates, and ships with an effective-date string.
 *
 * Rates here are pulled from publicly notified slabs. They are TODO:
 * legal review before launch (brief §7.4).
 */

import type { Metadata } from 'next';
import {
  Calculator,
  IndianRupee,
  Percent,
  TrendingUp,
  Home,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FIRM } from './firm';

export interface Tool {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  effectiveDate: string; // ISO
}

export const TOOLS: Tool[] = [
  {
    slug: 'income-tax',
    name: 'Income Tax Estimator',
    short: 'Income Tax',
    description:
      'A side-by-side estimate of your liability under the old and new regimes, for AY 2026-27.',
    icon: IndianRupee,
    effectiveDate: '2025-04-01',
  },
  {
    slug: 'gst',
    name: 'GST Calculator',
    short: 'GST',
    description:
      'Quickly compute GST on an invoice — inclusive or exclusive — across the standard slabs.',
    icon: Percent,
    effectiveDate: '2025-04-01',
  },
  {
    slug: 'emi',
    name: 'Loan EMI Calculator',
    short: 'EMI',
    description:
      'Monthly EMI, total interest, and total payable for a fixed-rate term loan.',
    icon: Calculator,
    effectiveDate: '2025-04-01',
  },
  {
    slug: 'compound-interest',
    name: 'Compound Interest',
    short: 'Compound interest',
    description:
      'Future value and growth of a principal compounded at a stated frequency.',
    icon: TrendingUp,
    effectiveDate: '2025-04-01',
  },
  {
    slug: 'hra',
    name: 'HRA Exemption',
    short: 'HRA',
    description:
      'House-rent-allowance exemption under section 10(13A), Income-tax Act.',
    icon: Home,
    effectiveDate: '2025-04-01',
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

/**
 * Per-calculator metadata. Each calculator page is `'use client'` so it can't
 * export metadata itself — its sibling `layout.tsx` calls this helper.
 */
export function toolMetadata(slug: string): Metadata {
  const tool = getTool(slug);
  if (!tool) return {};
  const description = `${tool.description} Estimate only — not a binding tax or financial computation.`;
  const url = `${FIRM.domain}/tools/${tool.slug}`;
  return {
    title: tool.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.name} · ${FIRM.name}`,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} · ${FIRM.name}`,
      description,
    },
  };
}
