import type { ReactNode } from 'react';
import { billingPolicies, formatDollars, getRate, hourlyRate } from '../content/rates';
import { HoursClipboard } from './hours-clipboard';
import { ServiceAreaTape } from './service-area-tape';
import { TimeCard } from './time-card';

/** Full standard labour schedule on light neutral surface. */
export function RatesTimeCardSection() {
  return (
    <section className="border-b border-line bg-bg py-12 sm:py-16">
      <div className="wrap">
        <div className="mx-auto max-w-3xl">
          <TimeCard full />
        </div>
      </div>
    </section>
  );
}

/** Half-day and full-day value block cards (clean hardware-store trade packs). */
export function BlocksSection({
  tapeLabel,
  heading,
  intro,
}: {
  tapeLabel: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
}) {
  const hourly = hourlyRate();
  const half = getRate('half-day');
  const full = getRate('full-day');
  const halfSave = hourly * 4 - half.price;
  const fullSave = hourly * 8 - full.price;

  return (
    <section className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="wrap">
        <div className="max-w-2xl">
          <span className="aisle-tag">{tapeLabel}</span>
          <h2 className="mt-3 font-display-tight text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-base text-muted">{intro}</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="trade-card border-t-4 border-t-brand p-6">
            <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">{half.label}</span>
              <span className="rounded-sm bg-brand-soft px-2.5 py-0.5 text-xs font-bold text-brand dark:text-[#8ee0e6]">
                Save {formatDollars(halfSave)} vs hourly
              </span>
            </div>
            <p className="mt-4 font-display-tight text-5xl font-extrabold leading-none text-ink tabular-nums">
              {formatDollars(half.price)}
            </p>
            <p className="mt-1.5 text-sm font-bold text-ink">{half.unit} · good for a half-page job list</p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              Ideal when you have three or four medium jobs stacked up in one visit. {half.rule}.
            </p>
          </article>

          <article className="trade-card border-t-4 border-t-accent p-6">
            <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">{full.label}</span>
              <span className="rounded-sm bg-accent/12 px-2.5 py-0.5 text-xs font-bold text-accent-ink">
                Save {formatDollars(fullSave)} vs hourly
              </span>
            </div>
            <p className="mt-4 font-display-tight text-5xl font-extrabold leading-none text-ink tabular-nums">
              {formatDollars(full.price)}
            </p>
            <p className="mt-1.5 text-sm font-bold text-ink">{full.unit} · good for a whole-house catch-up</p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              Great for move-in lists, landlord turnovers or clearing every nagging job in a single day. {full.rule}.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/** Materials & trips billing policy panel (clean itemized receipt table). */
export function ReceiptSection({
  tapeLabel,
  heading,
  intro,
}: {
  tapeLabel: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
}) {
  const trip = getRate('extended-trip');

  return (
    <section className="border-b border-line bg-bg py-14 sm:py-16">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="aisle-tag">{tapeLabel}</span>
          <h2 className="mt-3 font-display-tight text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{intro}</p>
        </div>

        <div className="overflow-hidden trade-card">
          <div className="flex items-center justify-between border-b border-line bg-surface-alt px-5 py-3.5">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink">
              Materials &amp; Billing Policy
            </p>
            <span className="text-xs font-semibold text-muted">$0 markup</span>
          </div>

          <ul className="divide-y divide-line px-5 py-2">
            {billingPolicies.map(policy => (
              <li key={policy.id} className="py-3.5">
                <p className="text-sm font-bold text-ink">{policy.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{policy.detail}</p>
              </li>
            ))}
            <li className="py-3.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-bold text-ink">{trip.label}</span>
                <span className="font-bold text-accent-ink tabular-nums">{formatDollars(trip.price)}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {trip.rule} (more than 8 miles from Pack Square Park). Core Asheville visits carry no trip charge.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Full-width service area mileage scale & neighborhood directory. */
export function ServiceAreaSection({
  tapeLabel,
  heading,
  intro,
}: {
  tapeLabel: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
}) {
  return (
    <section id="service-area" className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="wrap">
        <div className="max-w-2xl">
          <span className="aisle-tag">{tapeLabel}</span>
          <h2 className="mt-3 font-display-tight text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-muted">{intro}</p>
        </div>

        <ServiceAreaTape className="mt-8" />
      </div>
    </section>
  );
}

/** Hours section. */
export function HoursSection({
  tapeLabel,
  heading,
  children,
}: {
  tapeLabel: ReactNode;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id="hours" className="border-b border-line bg-bg py-14 sm:py-16">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="aisle-tag">{tapeLabel}</span>
          <h2 className="mt-3 font-display-tight text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-muted">{children}</div>
        </div>
        <div className="w-full max-w-md lg:justify-self-end">
          <HoursClipboard />
        </div>
      </div>
    </section>
  );
}

/** Clean 4-column FAQ grid on deep warehouse green band. */
function StickyNotesRoot({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <section className="border-b border-line bg-warehouse py-14 sm:py-16">
      <div className="wrap">
        <span className="aisle-tag-on-dark">Quick answers</span>
        <h2 className="mt-3 font-display-tight text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          {heading}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {children}
        </div>
      </div>
    </section>
  );
}

function StickyNote({
  question,
  children,
}: {
  index: 0 | 1 | 2 | 3;
  question: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="trade-card p-5 text-ink">
      <h3 className="font-display text-base font-bold leading-snug text-ink">{question}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </article>
  );
}

export const StickyNotesFaq = Object.assign(StickyNotesRoot, {
  Note: StickyNote,
});
