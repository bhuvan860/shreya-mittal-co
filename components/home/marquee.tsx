const ITEMS = [
  'Direct Tax',
  'GST Compliance',
  'Statutory Audit',
  'Internal Audit',
  'Transfer Pricing',
  'ROC Filings',
  'Tax Audit',
  'ESOP Advisory',
  'IGST Refunds',
  'Capital Gains',
  'HUF Planning',
  'Succession',
  'Virtual CFO',
  'Bookkeeping',
];

export function HomeMarquee() {
  // duplicate so the scroll loops without a visible cut
  const items = [...ITEMS, ...ITEMS];

  return (
    <section
      className="block-inverted relative overflow-hidden border-y border-foreground/10"
      aria-label="Services"
    >
      <div className="marquee-track py-6 md:py-8">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-10 px-8 font-serif text-2xl tracking-tight md:text-4xl"
          >
            <span>{item}</span>
            <span className="text-accent">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
