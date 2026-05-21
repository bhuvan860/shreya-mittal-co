# S. Mittal & Co. — Project Rules

Premium Chartered Accountancy firm website for **CA Shreya Mittal**, Lucknow. Marketing + tools site: **Next.js 15 App Router + React 19 + TypeScript + Tailwind v3 + framer-motion + next-themes**, deployed on Vercel. Production domain TBC (placeholder: `smittalandco.example`) — see `lib/firm.ts`.

Scope today: editorial homepage (hero, stats strip, services grid, industries band, insights feed, leadership, connect CTA), About, `/services` (6 lines × slug pages) + `/industries` (12 sectors × slug pages), `/tools` with 5 calculators (Income Tax, GST, EMI, Compound Interest, HRA), `/insights` editorial property with 4 launch pieces (incl. 1 Hindi), `/connect`, and the four legal placeholders (Privacy, Terms, Disclaimer, Grievance Redressal). Legacy IA names from the v0.1 brief (`/practice`, `/notes`, `/contact`, `/practice/msme-compliance-desk`) are kept as 301 redirects in [next.config.js](next.config.js). Audience: founders, exporters, professionals, and family businesses across Uttar Pradesh and beyond.

**Source of truth:** the build follows `website-build-brief-shreya-mittal.md` in this directory. Where this file conflicts with the brief, the brief wins.

**IMPORTANT: The rules in this file are binding. They override default behavior. Follow them on every task in this repo unless the user explicitly overrides a specific rule in the current message.**

---

## Rule 1 — Think before coding

Don't assume. Don't hide confusion. Surface tradeoffs.

- **MUST** state assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, **MUST** present them — never pick silently.
- If a simpler approach exists, **MUST** say so. Push back when warranted.
- If something is unclear, **STOP**. Name what's confusing. Ask.

## Rule 2 — Simplicity first

Minimum code that solves the problem. Nothing speculative.

- **NO** features beyond what was asked.
- **NO** abstractions for single-use code.
- **NO** "flexibility" or "configurability" that wasn't requested.
- **NO** error handling for impossible scenarios.
- If you write 200 lines and it could be 50, **MUST** rewrite it.

Self-check: _"Would a senior engineer say this is overcomplicated?"_ If yes, simplify before responding.

## Rule 3 — Surgical changes

Touch only what you must. Clean up only your own mess.

When editing existing code:

- **MUST NOT** "improve" adjacent code, comments, or formatting.
- **MUST NOT** refactor things that aren't broken.
- **MUST** match existing style, even if you'd do it differently.
- If you notice unrelated dead code, **MUST** mention it — never delete it.

When your changes create orphans:

- **MUST** remove imports/variables/functions that _your_ changes made unused.
- **MUST NOT** remove pre-existing dead code unless asked.

**The test:** every changed line must trace directly to the user's request. If it doesn't, revert it.

## Rule 4 — Goal-driven execution

Define success criteria. Loop until verified.

Transform every task into a verifiable goal:

- "Add the EMI calculator" → "Component renders, accepts inputs, returns correct monthly payment for a known case"
- "Fix the navbar bug" → "Reproduce, fix, manually verify the failing flow"
- "Refactor X" → "Render unchanged before and after"

For multi-step tasks, **MUST** state a brief plan with verification per step:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]

**MUST NOT** mark a task complete without running the verification step.

## Rule 5 — Brand voice (S. Mittal & Co.)

S. Mittal & Co. is **editorial, restrained, trustworthy** (brief §4). Copy and UI must match.

- **MUST** match the existing voice: clear, confident, expert, calm. Premium without being flashy. Approachable without being casual. Founder voice on long-form (Insights); firm voice on short-form (service pages).
- **MUST NOT** use hype, exclamation marks, or salesy buzzwords. The banned vocabulary list (brief §4) — `best · leading · premier · top · No. 1 · trusted · world-class · cutting-edge · seamless · unparalleled · save lakhs · hassle-free · stress-free · guaranteed · fastest-growing · award-winning` — is ICAI-risky as well as cliché. Don't use any of it.
- **MUST** preserve the trust framing: chartered expertise, compliance discipline, written engagement, named accountability. We don't claim "best" anything — we describe what we do and for whom.
- When generating new copy, **MUST** read a nearby existing block (hero, about, section-heading) first and write in the same register. "Confident, never boastful. Plain language over jargon. Specific over generic. Calm over urgent. Process over outcome."
- Regional anchors: Hindi terms where natural (_bahi-khata_, _vyapaar_, _udyog_, _karobari_). Lucknow references where genuine.
- Region defaults: HQ Lucknow, Uttar Pradesh, India. Currency assumptions in calculators default to **INR** (locale `en-IN`) unless told otherwise. Regulatory references default to **ICAI** (audit), **MCA / ROC** (corporate), **Income Tax Department / CBDT** (direct tax), and **GST Council / CBIC** (indirect tax). Tax/GST logic must follow the relevant jurisdiction — never invent rates.

## Rule 6 — Compliance, trust & PII guardrails

This is a regulated-services brand handling client financial data context (even on the marketing surface).

- **MUST NOT** publish placeholder regulatory text (privacy policy, terms, disclaimers) without flagging. Mark anything generated as `TODO: legal review` if not user-confirmed.
- **MUST NOT** hardcode API keys, contact emails marked private, phone numbers, or partner credentials. Use env vars (`NEXT_PUBLIC_*` only for non-secret, public values).
- **MUST NOT** invent specific tax rates, GST slabs, TDS thresholds, filing deadlines, or legal advice in copy or calculator logic. If a number is required, ask the user for the authoritative source or label clearly as illustrative.
- Contact forms / inquiry endpoints (when added) **MUST** validate at the server boundary, rate-limit, and never log raw PII.
- **MUST NOT** add tracking pixels or third-party scripts that collect PII without explicit instruction.

## Rule 7 — Visual fidelity

Premium-cosmic output depends on using the existing design system, not inventing new visuals.

- **MUST** use the design tokens defined at [app/globals.css:5-28](app/globals.css#L5-L28) (`--color-bg`, `--color-fg`, `--color-primary`, `--color-accent`, etc.) and the Tailwind theme at [tailwind.config.ts](tailwind.config.ts) (`primary`, `gold`, `cosmic`, `background`, `surface`). **MUST NOT** hardcode hex or rgba values in JSX or new CSS unless the value already exists in a token. If a needed shade isn't a token, propose adding one — don't sneak literals in.
- **MUST** use existing typography + UI classes: serif/display → `font-serif` (Playfair), body → `font-sans` (Inter), section headings → `.heading-display` or [components/section-heading.tsx](components/section-heading.tsx), CTAs → `.btn-primary` / `.btn-ghost`, surfaces → `.glass` / `.glass-strong` / `.card-premium`, gradient type → `.gradient-text` / `.gradient-text-static`. **MUST NOT** introduce new font families, button variants, or surface styles without asking.
- **MUST** mirror nearby visual rhythm. Before building a new section, read 1–2 adjacent sections in the same page and match container width (`max-w-content`), padding (`container-px`), and the eyebrow → title → body cadence. Consistency beats novelty.
- **MUST** respect light + dark mode for every change. Default theme is dark ([app/layout.tsx:170](app/layout.tsx#L170)). Test every visual change in both themes via [components/theme-toggle.tsx](components/theme-toggle.tsx).
- **MUST** verify visually for any UI change: run `npm run dev`, open the affected route, confirm the rendered output. Typecheck/lint passing ≠ feature done. If the environment can't render the page, **MUST** say so explicitly rather than claim success.

## Rule 8 — Responsive across every screen

Professional audience uses phone, tablet, and desktop. All three must feel premium.

- **MUST** design mobile-first (default styles target ~360–390px), then add `sm:`, `md:`, `lg:`, `xl:` for larger breakpoints. Never desktop-first.
- **MUST** verify any UI change at three viewports before declaring done: **375px** (mobile), **768px** (tablet), **1280px** (laptop). Note results explicitly.
- **MUST** keep tap targets ≥ 44×44px on mobile (buttons, links, icon controls, theme toggle, mobile menu).
- **MUST NOT** use horizontal scrolling, fixed pixel widths that overflow on 360px, or text that requires zooming. Avoid `whitespace-nowrap` on long service titles or calculator labels.
- Mobile navbar ([components/navbar.tsx](components/navbar.tsx)) and any future fixed elements (e.g. WhatsApp/call float) **MUST NOT** collide. Reserve safe zones.
- Forms and calculators **MUST** be usable one-handed on mobile — numeric inputs must trigger numeric keyboards (`inputMode="decimal"` / `type="number"` where appropriate).

## Rule 9 — Performance & Core Web Vitals

A premium firm site must load like a premium firm site.

- **MUST** use `next/image` for every hero, team, and editorial image — never raw `<img>`. Provide explicit `width`/`height` (or `fill` with sized container) and meaningful `alt`. Unsplash is already allowlisted at [next.config.js:6-14](next.config.js#L6-L14); add new remote hosts there, not inline.
- **MUST** prefer Server Components by default. Add `"use client"` only when the component needs state, effects, browser APIs, or framer-motion. Don't pull a whole page client-side to use one icon. Several current components (navbar, hero, scroll-progress, theme-toggle) legitimately need client; new ones should justify it.
- **MUST** keep dependencies lean. Current stack is intentionally small (`framer-motion`, `lucide-react`, `next-themes`, `clsx`, `tailwind-merge`). Before adding a new package, justify it (size, alternatives, can a small util in [lib/utils.ts](lib/utils.ts) replace it?). No moment.js, no lodash full import, no UI kits.
- **MUST** import icons individually from `lucide-react` (already optimized via `experimental.optimizePackageImports` in [next.config.js](next.config.js)). Don't barrel-import.
- **MUST** lazy-load below-the-fold heavy components with `next/dynamic` where it improves LCP — especially framer-motion-heavy or canvas-style decorative pieces (e.g. cosmic-background).
- **MUST** target Core Web Vitals on the production build: **LCP < 2.5s**, **CLS < 0.1**, **INP < 200ms** on mid-tier mobile (4G). When perf-impacting changes ship, run `npm run build` and report bundle-size delta if non-trivial.
- **MUST** respect `prefers-reduced-motion` — the global rule is already in [app/globals.css:62-71](app/globals.css#L62-L71). New animations must not bypass it.

## Rule 10 — SEO discipline

Every shippable route must be findable, crawlable, and rich-result-ready.

- **MUST** export Next.js `metadata` (or `generateMetadata` for dynamic routes) on every page: `title`, `description`, `alternates.canonical`, `openGraph`, `twitter`. Root pattern is at [app/layout.tsx:26-101](app/layout.tsx#L26-L101) — match its keys.
- **MUST** use semantic HTML — one `<h1>` per page, ordered `<h2>`/`<h3>`, `<nav>`, `<main>`, `<article>`, `<section>`. No `<div>` soup for headings.
- **MUST** keep the `AccountingService` JSON-LD in [app/layout.tsx:114-148](app/layout.tsx#L114-L148) accurate. When adding service pages, ship matching JSON-LD (`Service`, `FAQPage` for FAQs, `BreadcrumbList` for nested routes).
- **MUST** add `app/sitemap.ts` and `app/robots.ts` before going to production. New public routes → sitemap entries. _(Currently missing — flag in any production-prep task.)_
- **MUST** write descriptive, keyword-relevant alt text in brand voice (Rule 5). No `alt=""` for content images, no stuffed alt like "best CA Lucknow cheap tax filing."
- **MUST** keep URLs clean: lowercase, hyphenated, no query strings for canonical pages, stable slugs. Configure redirects in [next.config.js](next.config.js) when slugs change.
- **MUST** prefer internal linking between services, industries, insights, tools, and `/connect`. Avoid orphan pages.

## Rule 11 — Tools & calculator integrity

Calculators are a trust surface. A wrong number on a tax estimate damages the firm.

- **MUST** label every calculator as **estimate / illustrative** and link to a "talk to us" CTA. Never present output as a binding tax/GST/TDS computation.
- **MUST** make formulas explicit in code with named constants — no magic numbers. If a rate or slab is jurisdiction-dependent, source it from a single config module (don't scatter literals across files) and comment the source/effective date.
- **MUST** validate inputs at the UI boundary: positive numbers where required, sensible upper bounds, graceful handling of empty/invalid input. Show inline errors in brand voice (Rule 5), not browser default tooltips.
- **MUST NOT** persist calculator inputs anywhere (no analytics events with raw amounts, no localStorage of financial figures) unless explicitly asked.
- **MUST** keep calculators fully client-side and instant — no network calls for arithmetic. Loading spinners for math are a smell.
- For each new calculator: include at least one known-answer test case in the PR description (input → expected output) so reviewers can verify the math.
- Calculator rate constants live in the calculator module itself (e.g. [app/tools/income-tax/page.tsx](app/tools/income-tax/page.tsx)) and are marked `TODO: legal review` until founder + counsel sign off (brief §7.4).

## Rule 12 — ICAI pre-launch audit

Every changeset that touches user-facing copy, IA, contact mechanics, calculators, photography, or SEO metadata **MUST** be verified against the 25-item ICAI compliance checklist in `research/website-inspiration-research.md` §1.7. Compliance drift is the single largest long-term risk on a regulated-services site. No deploy ships without the checklist run, dated, and (in the commit message) confirmed clean.

The seven items most likely to drift in normal feature work:

1. Any "Why choose us" / superlatives language sneaking into new copy
2. Marketing-style email-capture forms added for nominally legitimate reasons
3. Live-chat widget added with proactive auto-engage
4. Stock-photo client-logo strips added as "social proof"
5. Schema markup using promotional language in `description` or `name` fields
6. SEO meta titles inflating to "Best CA in Lucknow…"
7. Photography drifting from passport-size to editorial portraiture of the founder

Companion guardrail: anything the brief lists in §12 ("What we are deliberately NOT building") is on the same automatic-no list. If a future feature request matches an item there, default to "no" and require an explicit founder + compliance review to override.

---

## Stack reference

- **Framework:** Next.js 15.1.6 App Router, React 19, TypeScript 5.7
- **Styling:** Tailwind CSS v3.4 (`darkMode: 'class'`), custom tokens in [app/globals.css](app/globals.css), theme in [tailwind.config.ts](tailwind.config.ts)
- **Theming:** `next-themes` with dark default; toggle at [components/theme-toggle.tsx](components/theme-toggle.tsx)
- **Animation:** `framer-motion` (use sparingly, respect reduced-motion)
- **Icons:** `lucide-react` (individual imports)
- **Utilities:** `clsx` + `tailwind-merge` via [lib/utils.ts](lib/utils.ts) (`cn()` helper); firm constants in [lib/firm.ts](lib/firm.ts) (single source of truth for legal name, FRN, address, contact channels)
- **Fonts:** Inter (sans, UI + body), Playfair Display (display serif, headings), Source Serif 4 (editorial body on `/insights`), Noto Serif Devanagari (Hindi insight headlines, mitigates CLS — see PRF-008) via `next/font/google`
- **Deployment:** Vercel
- **Path alias:** `@/*` resolves to project root (see [tsconfig.json](tsconfig.json))

Project layout (flat, no `src/`):

```text
app/              # App Router routes
  about/   tools/ (index + 5 calculators)
  services/ (index + [slug])   industries/ (index + [slug])
  insights/ (index + [slug] × 4 launch pieces, incl. 1 Hindi)
  connect/
  privacy/ terms/ disclaimer/ grievance/   sitemap.ts  robots.ts  not-found.tsx
components/       # Navbar, footer, theme, section-heading, page-hero
  home/           # Homepage section components (hero, stats, services-grid, industries-band, insights-feed, leadership, connect-cta)
  notes/          # NoteLayout shared by all Insights pages (folder name kept from pre-rename)
  tools/          # CalcShell + LabeledInput shared by calculators
  contact/        # ContactForm rendered on /connect (folder name kept from pre-rename)
lib/              # firm.ts (constants), notes.ts, insights-content.tsx, services.ts, industries.ts, tools.ts, photography.ts, utils.ts
```

> Note on folder naming: `components/contact/` and `components/notes/` retained their original names through the route rename (`/contact` → `/connect`, `/notes` → `/insights`). The route directories under `app/` follow the live IA; the supporting component folders keep their historical names to avoid a churn-only rename.

Verify before declaring done:

```bash
npm run lint
npm run build
```

_(No `typecheck` script is defined; `next build` runs TS checks. Add a dedicated script only if asked.)_

---

## Enforcement

If a response would violate any rule above, **STOP** and either:

1. Fix the response before sending, or
2. Ask the user to confirm the deviation.

These rules are working if: fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come _before_ implementation rather than after mistakes.

---

## Reference artefacts (read first)

Two documents in the project root take precedence over this file when there is conflict:

1. [`website-build-brief-shreya-mittal.md`](./website-build-brief-shreya-mittal.md) — the v0.1 build brief. Decisions on firm name, brand sentence, IA, palette, page-by-page spec, ICAI compliance gate, content launch plan, and Notes editorial rules live here. **Where this file and the brief disagree, the brief wins.**
2. `research/website-inspiration-research.md` (referenced from the brief; may live in a sibling folder) — the underlying analysis, including the 25-item ICAI compliance checklist invoked by Rule 12.

Newer decisions on either document supersede the older decisions captured in this file.

## Skill Inventory — when to invoke which skill

This project's surface area maps cleanly to installed skills. Reach for these before improvising. Invoke via the Skill tool when the trigger matches.

### Visual / UI / UX

| Skill | When to use |
| --- | --- |
| `ui-ux-pro-max` | Holistic page redesigns, premium polish reviews, multi-section layout decisions |
| `frontend-design:frontend-design` | Vercel-aligned design heuristics for Next.js apps; first stop for any new public page |
| `liquid-glass-design` | Anything using `.glass` / `.glass-strong` surfaces — refining blur, depth, lensing |
| `tailwind-design-system` / `tailwind-patterns` | Token additions, utility composition, dark-mode parity |
| `scroll-experience` | Adding scroll-driven parallax, sticky transitions, or progress animations |
| `magic-animator` / `magic-ui-generator` | Choreographing framer-motion sequences without violating reduced-motion |
| `mobile-design` | Verifying 375px / 768px breakpoints (Rule 8) |
| `web-design-guidelines` | High-level brand-aligned design decisions |
| `ui-a11y` / `accessibility-compliance-accessibility-audit` / `wcag-audit-patterns` | Before shipping any new page — contrast, focus order, screen-reader pass |

### Next.js / React / TypeScript

| Skill | When to use |
| --- | --- |
| `vercel:nextjs` / `nextjs-app-router-patterns` / `nextjs-best-practices` | New routes, server vs client component decisions, metadata patterns |
| `vercel:next-cache-components` | Cache strategy for service pages and tool results |
| `vercel:routing-middleware` | Geo redirects, A/B tests, or auth gates (not currently needed) |
| `react-best-practices` / `react-component-performance` / `react-ui-patterns` | Component refactors, memo decisions, perf passes (Rule 9) |
| `typescript-pro` / `typescript-advanced-types` | Generics for shared calculator types, form-state inference |

### Calculators / Tools backend

| Skill | When to use |
| --- | --- |
| `python-pro` / `python-patterns` | Calculator engines in `/api/python/` |
| `fastapi-pro` / `fastapi-router-py` / `python-fastapi-development` | Building the Python Fluid Compute endpoints |
| `pydantic-models-py` | Request/response schemas for tax/GST/EMI APIs |
| `vercel:vercel-functions` | Deploying the Python handlers to Fluid Compute |

### SEO / Content

| Skill | When to use |
| --- | --- |
| `seo-fundamentals` / `seo-technical` | Site-wide audits, robots/sitemap setup (Rule 10) |
| `seo-aeo-landing-page-writer` | Drafting service landing pages in brand voice (Rule 5) |
| `seo-aeo-meta-description-generator` | Metadata refresh on any route |
| `seo-aeo-schema-generator` / `schema-markup` | `Service`, `FAQPage`, `BreadcrumbList`, `LocalBusiness` JSON-LD |
| `site-architecture` | Information architecture for service trees |
| `ai-seo` / `geo-fundamentals` | Answer-engine optimization + local search (India / Lucknow / UP) |

### Performance & Deployment

| Skill | When to use |
| --- | --- |
| `web-performance-optimization` / `vercel:performance-optimizer` | LCP / INP regressions, image strategy |
| `chrome-devtools-mcp:debug-optimize-lcp` | Live LCP investigation against the running dev server |
| `vercel:bootstrap` / `vercel:deploy` / `vercel:env` | Initial Vercel setup, environment variables, preview deploys |
| `vercel:knowledge-update` | Current Vercel platform facts (always trust over training data) |

### Agents (delegate, don't impersonate)

| Agent | When to use |
| --- | --- |
| `frontend-developer` / `frontend-design` | Building or refactoring multi-component UI features |
| `code-reviewer` | After any code change touching ≥ 2 files (per user's global rule) |
| `security-reviewer` | Before commits touching forms, env handling, or third-party scripts |
| `accessibility-tester` | Compliance pass on new pages |
| `seo-specialist` | Larger content/structure changes |

### Project-wide tools

| Skill | When to use |
| --- | --- |
| `graphify` | Run after major milestones to get a knowledge graph of the codebase. Output lands in `graphify-out/` |
| `update-config` | Configure `.claude/settings.json` (hooks, permissions, env) |
| `verification-before-completion` | Final pass before marking a multi-step task done (pairs with Rule 4) |

**How to use this inventory:** if a task spans one of these areas, invoke the matching skill before writing code. Skills override training-data assumptions for the area they cover. When multiple skills apply, run the most specific one first (e.g. `seo-aeo-schema-generator` before `seo-fundamentals`).
