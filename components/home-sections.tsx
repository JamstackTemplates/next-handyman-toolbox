import type { ReactNode } from 'react';
import { formatHoursRange, jobs } from '../content/jobs';
import { formatDollars, getRate, hourlyRate, quarterHourRate } from '../content/rates';
import { HeroWallScene, RateTag, SmallIcon } from './artwork';
import { HoursClipboard } from './hours-clipboard';
import { PegboardToolWall } from './pegboard-tool-wall';
import { PhoneStatus } from './phone-status';
import { ServiceAreaTape } from './service-area-tape';
import { SiteLink } from './site-link';
import { TimeCard } from './time-card';

type Children = { children: ReactNode };

/* -------------------------------------------------------------------------- */
/* 1. Home Hero (Deep Warehouse Green Banner)                                 */
/* -------------------------------------------------------------------------- */

function HomeHeroRoot({ children }: Children) {
  return (
    <section className="border-b border-line bg-warehouse py-10 sm:py-14 lg:py-16">
      <div className="wrap grid items-center gap-8 lg:grid-cols-[1.15fr_0.95fr] lg:gap-12">
        {children}
      </div>
    </section>
  );
}

function HeroCopy({ children }: Children) {
  return <div className="flex flex-col items-start">{children}</div>;
}

function HeroLabel({ children }: Children) {
  return <span className="aisle-tag-on-dark">{children}</span>;
}

function HeroHeading({ children }: Children) {
  return (
    <h1 className="mt-4 font-display-tight text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
      {children}
    </h1>
  );
}

function HeroTapeRule() {
  return <div className="mt-5 h-1 w-20 rounded-full bg-accent" aria-hidden="true" />;
}

function HeroLead({ children }: Children) {
  return (
    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
      {children}
    </p>
  );
}

function HeroActions({ primary, secondary }: { primary: ReactNode; secondary: ReactNode }) {
  return (
    <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
      <SiteLink href="/contact/" className="button w-full sm:w-auto sm:px-6 sm:py-3">
        {primary}
      </SiteLink>
      <SiteLink href="/jobs/" className="button button-on-dark w-full sm:w-auto">
        {secondary}
      </SiteLink>
    </div>
  );
}

function HeroStatus() {
  return (
    <div className="mt-5">
      <PhoneStatus variant="pill" />
    </div>
  );
}

function HeroScene() {
  return (
    <div className="space-y-4">
      <RateTag className="w-full" />
      <div className="overflow-hidden rounded-ui border border-white/15 shadow-[var(--shadow-md)]">
        <HeroWallScene className="block w-full h-auto" />
      </div>
    </div>
  );
}

export const HomeHero = Object.assign(HomeHeroRoot, {
  Copy: HeroCopy,
  Label: HeroLabel,
  Heading: HeroHeading,
  TapeRule: HeroTapeRule,
  Lead: HeroLead,
  Actions: HeroActions,
  Status: HeroStatus,
  Scene: HeroScene,
});

/* -------------------------------------------------------------------------- */
/* 2. Popular Jobs Board ("The fridge list")                                  */
/* -------------------------------------------------------------------------- */

function FridgeListRoot({ children }: Children) {
  return (
    <section className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="wrap grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
        {children}
      </div>
    </section>
  );
}

function FridgeNotepad({ heading, linkLabel }: { heading: ReactNode; linkLabel: ReactNode }) {
  const popular = jobs.filter(j => j.popular);

  return (
    <div className="overflow-hidden trade-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-alt px-5 py-3.5">
        <h2 className="font-display text-xl font-bold text-ink">{heading}</h2>
        <span className="text-xs font-bold uppercase tracking-wider text-muted">8 most requested</span>
      </div>

      <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
        {popular.map(job => (
          <li
            key={job.id}
            className="flex items-start justify-between gap-3 border-b border-line px-5 py-3.5 sm:odd:border-r"
          >
            <div className="flex items-start gap-2.5">
              <SmallIcon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
              <span className="text-sm font-semibold leading-snug text-ink">{job.title}</span>
            </div>
            <span className="shrink-0 rounded-sm bg-bg px-2 py-0.5 text-xs font-semibold text-muted tabular-nums">
              {formatHoursRange(job.hoursMin, job.hoursMax)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-alt px-5 py-3.5">
        <span className="text-xs font-medium text-muted">
          Billed at <strong className="text-ink">{formatDollars(hourlyRate())}/hr</strong> (
          {formatDollars(quarterHourRate())}/15 min after the first hour)
        </span>
        <SiteLink href="/jobs/" className="button min-h-9 px-4 py-1.5 text-sm">
          {linkLabel}
        </SiteLink>
      </div>
    </div>
  );
}

function FridgeAside({ children }: Children) {
  return <div className="space-y-4 lg:pt-2">{children}</div>;
}

function FridgeAsideHeading({ children }: Children) {
  return (
    <h3 className="font-display-tight text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
      {children}
    </h3>
  );
}

function FridgeAsideBody({ children }: Children) {
  return <p className="text-base leading-relaxed text-muted">{children}</p>;
}

export const FridgeList = Object.assign(FridgeListRoot, {
  Notepad: FridgeNotepad,
  Aside: FridgeAside,
  AsideHeading: FridgeAsideHeading,
  AsideBody: FridgeAsideBody,
});

/* -------------------------------------------------------------------------- */
/* 3. Browse by Department (Hardware Aisle Tiles)                             */
/* -------------------------------------------------------------------------- */

function ToolWallRoot({ children }: Children) {
  return (
    <section className="border-b border-line bg-bg py-14 sm:py-16">
      <div className="wrap">{children}</div>
    </section>
  );
}

function ToolWallHeader({ tapeLabel, heading, intro }: { tapeLabel: ReactNode; heading: ReactNode; intro: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <span className="aisle-tag">{tapeLabel}</span>
        <h2 className="mt-3 font-display-tight text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-2 text-base text-muted">{intro}</p>
      </div>
      <SiteLink href="/jobs/" className="button button-outline text-sm">
        Open full job list &amp; tally
      </SiteLink>
    </div>
  );
}

export const ToolWallSection = Object.assign(ToolWallRoot, {
  Header: ToolWallHeader,
  Wall: PegboardToolWall,
});

/* -------------------------------------------------------------------------- */
/* 4. How It Works (Clean 3-Step Trade Process)                               */
/* -------------------------------------------------------------------------- */

function HowItWorksRoot({ children }: Children) {
  return (
    <section className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="wrap">{children}</div>
    </section>
  );
}

function HowItWorksHeader({ tapeLabel, heading }: { tapeLabel: ReactNode; heading: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <span className="aisle-tag">{tapeLabel}</span>
      <h2 className="mt-3 font-display-tight text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {heading}
      </h2>
    </div>
  );
}

function HowItWorksSteps({ children }: Children) {
  return <ol className="mt-8 grid gap-6 md:grid-cols-3">{children}</ol>;
}

function HowItWorksStep({ number, title, children }: { number: string; title: ReactNode; children: ReactNode }) {
  return (
    <li className="trade-card p-6">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-ui bg-brand font-display text-base font-extrabold text-on-brand tabular-nums">
        0{number}
      </span>
      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </li>
  );
}

export const HowItWorks = Object.assign(HowItWorksRoot, {
  Header: HowItWorksHeader,
  Steps: HowItWorksSteps,
  Step: HowItWorksStep,
});

/* -------------------------------------------------------------------------- */
/* 5. Rates Teaser (Labour Schedule + Value Block Cards)                      */
/* -------------------------------------------------------------------------- */

function RatesTeaserRoot({ children }: Children) {
  return (
    <section className="border-b border-line bg-bg py-14 sm:py-16">
      <div className="wrap grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        {children}
      </div>
    </section>
  );
}

function RatesTeaserCard() {
  return <TimeCard />;
}

function RatesTeaserBlocks({ heading, linkLabel }: { heading: ReactNode; linkLabel: ReactNode }) {
  const half = getRate('half-day');
  const full = getRate('full-day');

  return (
    <div className="trade-card p-6 space-y-5">
      <div>
        <span className="aisle-tag">Longer list?</span>
        <h2 className="mt-3 font-display-tight text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
          {heading}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-ui border border-line border-t-4 border-t-brand bg-bg p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">{half.label}</p>
          <p className="mt-1.5 font-display-tight text-4xl font-extrabold leading-none text-ink tabular-nums">
            {formatDollars(half.price)}
          </p>
          <p className="mt-1.5 text-xs font-semibold text-muted">{half.unit}</p>
        </div>
        <div className="rounded-ui border border-line border-t-4 border-t-accent bg-bg p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">{full.label}</p>
          <p className="mt-1.5 font-display-tight text-4xl font-extrabold leading-none text-ink tabular-nums">
            {formatDollars(full.price)}
          </p>
          <p className="mt-1.5 text-xs font-semibold text-muted">{full.unit}</p>
        </div>
      </div>
      <SiteLink href="/rates/" className="button w-full text-sm sm:w-auto">
        {linkLabel}
      </SiteLink>
    </div>
  );
}

export const RatesTeaser = Object.assign(RatesTeaserRoot, {
  Card: RatesTeaserCard,
  Blocks: RatesTeaserBlocks,
});

/* -------------------------------------------------------------------------- */
/* 6. Where and When (Service Area Scale + Hours Card)                        */
/* -------------------------------------------------------------------------- */

function WhereWhenRoot({ children }: Children) {
  return (
    <section className="bg-surface py-14 sm:py-16">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        {children}
      </div>
    </section>
  );
}

function WhereWhenArea({ tapeLabel, heading, intro }: { tapeLabel: ReactNode; heading: ReactNode; intro: ReactNode }) {
  return (
    <div>
      <span className="aisle-tag">{tapeLabel}</span>
      <h2 className="mt-3 font-display-tight text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {heading}
      </h2>
      <p className="mt-2 max-w-2xl text-base text-muted">{intro}</p>
      <ServiceAreaTape compact className="mt-6" />
    </div>
  );
}

export const WhereWhen = Object.assign(WhereWhenRoot, {
  Area: WhereWhenArea,
  Hours: HoursClipboard,
});
