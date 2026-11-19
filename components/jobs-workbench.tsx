'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { formatHoursRange, jobCategories, jobs, type JobCategory } from '../content/jobs';
import { formatDollars, hourlyRate, quarterHourRate } from '../content/rates';
import { calculateTally, formatTallyPlainText } from '../lib/tally';
import { SmallIcon, ToolIllustration } from './artwork';
import { SiteLink } from './site-link';

const CATEGORY_IDS = new Set(jobCategories.map(c => c.id));

function readCategoryFromHash(): string {
  if (typeof window === 'undefined') return 'all';
  const raw = window.location.hash.replace(/^#/, '');
  return CATEGORY_IDS.has(raw) ? raw : 'all';
}

export function JobsWorkbench() {
  const [hydrated, setHydrated] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setHydrated(true);
    setActiveCategory(readCategoryFromHash());
    const onHashChange = () => setActiveCategory(readCategoryFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      clearTimeout(copyTimer.current);
    };
  }, []);

  const hourly = hourlyRate();
  const quarter = quarterHourRate();

  const selectedJobs = useMemo(
    () => jobs.filter(job => selectedIds.includes(job.id)),
    [selectedIds],
  );

  const tally = useMemo(() => calculateTally(selectedJobs), [selectedJobs]);

  const visibleCategories: readonly JobCategory[] =
    hydrated && activeCategory !== 'all'
      ? jobCategories.filter(cat => cat.id === activeCategory)
      : jobCategories;

  function selectCategory(id: string) {
    setActiveCategory(id);
    if (typeof window !== 'undefined') {
      const nextUrl = id === 'all' ? window.location.pathname : `${window.location.pathname}#${id}`;
      window.history.replaceState(null, '', nextUrl);
    }
  }

  function toggleJob(id: string) {
    setSelectedIds(current =>
      current.includes(id) ? current.filter(item => item !== id) : [...current, id],
    );
  }

  async function copyList() {
    const text = formatTallyPlainText(selectedJobs);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState('idle'), 4000);
  }

  const tallyBody = (
    <div className="overflow-hidden trade-card-elevated text-ink">
      <div className="flex items-center justify-between gap-2 bg-brand px-5 py-3.5 text-on-brand">
        <h2 className="font-display text-lg font-bold leading-none">
          Your job tally
        </h2>
        {tally.count > 0 && (
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            className="text-xs font-semibold text-white/85 underline hover:text-white"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="p-5">
        {tally.count === 0 ? (
          <div className="py-2 text-sm text-muted">
            <p className="font-semibold text-ink">Tick jobs on the left to estimate total labour.</p>
            <p className="mt-2">
              First hour is {formatDollars(hourly)} minimum, then {formatDollars(quarter)} per quarter hour.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <ul className="max-h-56 space-y-2 overflow-y-auto pr-1 text-sm">
              {selectedJobs.map(job => (
                <li key={job.id} className="flex items-start justify-between gap-2 border-b border-line pb-2 last:border-b-0">
                  <span className="font-medium leading-snug">{job.title}</span>
                  <span className="shrink-0 text-xs font-semibold text-muted tabular-nums">
                    {formatHoursRange(job.hoursMin, job.hoursMax)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="rounded-ui border border-line bg-bg p-4">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-muted">
                  Typical time ({tally.count} {tally.count === 1 ? 'job' : 'jobs'})
                </span>
                <span className="font-bold text-ink tabular-nums">
                  {formatHoursRange(tally.hoursMin, tally.hoursMax)}
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-line pt-2.5">
                <span className="text-sm font-medium text-muted">Rough labour guide</span>
                <span className="font-display-tight text-3xl font-extrabold leading-none text-accent-ink tabular-nums">
                  {tally.labourMin === tally.labourMax
                    ? formatDollars(tally.labourMin)
                    : `${formatDollars(tally.labourMin)}–${formatDollars(tally.labourMax)}`}
                </span>
              </div>
              {tally.minimumApplied && (
                <p className="mt-1.5 text-xs font-medium text-muted">
                  Includes {formatDollars(hourly)} first-hour minimum.
                </p>
              )}
            </div>

            {tally.blockHint && (
              <div className="rounded-ui border border-brand/30 bg-brand-soft px-3.5 py-2.5 text-xs font-semibold text-ink">
                <strong className="text-brand dark:text-[#8ee0e6]">Value block tip: </strong>
                {tally.blockHint.savingsNote}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <button type="button" onClick={copyList} className="button button-outline w-full text-sm">
                <SmallIcon name="clipboard" className="h-4 w-4 shrink-0" />
                <span>Copy list for your message</span>
              </button>
              <span className="min-h-4 text-center text-xs font-medium text-muted" role="status" aria-live="polite">
                {copyState === 'copied'
                  ? 'Copied — paste it into the message box on Contact.'
                  : copyState === 'failed'
                    ? "Couldn't copy automatically — jot the list into your message."
                    : ''}
              </span>
              <SiteLink href="/contact/" className="button w-full text-sm">
                Send us your job list
              </SiteLink>
            </div>
          </div>
        )}

        <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-muted">
          A rough labour guide, not a quote. Materials extra. Nothing is booked.
        </p>
      </div>
    </div>
  );

  return (
    <div>
      {/* Clean horizontal department filter bar */}
      <section aria-label="Filter jobs by category" className="border-b border-line bg-surface py-4">
        <div className="wrap">
          <div className="flex items-stretch gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0" role="tablist" aria-label="Job categories">
            {hydrated ? (
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'all'}
                onClick={() => selectCategory('all')}
                className={`flex shrink-0 items-center gap-2 rounded-ui border px-4 py-2.5 text-sm font-bold transition-colors ${
                  activeCategory === 'all'
                    ? 'border-brand bg-brand text-on-brand'
                    : 'border-line bg-bg text-ink hover:border-brand'
                }`}
              >
                <span>All jobs</span>
                <span className="rounded-sm bg-black/15 px-1.5 py-0.5 text-xs tabular-nums">
                  {jobs.length}
                </span>
              </button>
            ) : (
              <a
                href="#jobs-drawers"
                className="flex shrink-0 items-center gap-2 rounded-ui border border-brand bg-brand px-4 py-2.5 text-sm font-bold text-on-brand no-underline"
              >
                <span>All jobs</span>
                <span className="rounded-sm bg-black/15 px-1.5 py-0.5 text-xs tabular-nums">
                  {jobs.length}
                </span>
              </a>
            )}

            {jobCategories.map(cat => {
              const count = jobs.filter(j => j.category === cat.id).length;
              const isActive = hydrated && activeCategory === cat.id;

              const inner = (
                <>
                  <ToolIllustration tool={cat.tool} className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{cat.name}</span>
                  <span className={`text-xs tabular-nums ${isActive ? 'text-white/80' : 'text-muted'}`}>
                    {count}
                  </span>
                </>
              );

              if (hydrated) {
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectCategory(cat.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-ui border px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'border-brand bg-brand text-on-brand'
                        : 'border-line bg-bg text-ink hover:border-brand'
                    }`}
                  >
                    {inner}
                  </button>
                );
              }

              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="flex shrink-0 items-center gap-2 rounded-ui border border-line bg-bg px-3.5 py-2.5 text-sm font-semibold text-ink no-underline hover:border-brand"
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main two-column catalog: Category tables + Sticky tally */}
      <section id="jobs-drawers" className="bg-bg py-10 sm:py-12">
        <div className="wrap">
          {!hydrated && (
            <p className="mb-6 trade-card px-4 py-3 text-sm font-medium text-ink">
              Add up the hours and multiply by {formatDollars(hourly)}; the first hour is the minimum. A rough labour guide, not a quote. Materials extra.
            </p>
          )}

          <div className="grid items-start gap-8 lg:grid-cols-[1fr_21rem]">
            <div className="space-y-6">
              {visibleCategories.map(cat => {
                const catJobs = jobs.filter(j => j.category === cat.id);
                return (
                  <article
                    key={cat.id}
                    id={cat.id}
                    className="scroll-mt-6 overflow-hidden trade-card"
                  >
                    {/* Clean category header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-alt px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-ui bg-brand text-on-brand">
                          <ToolIllustration tool={cat.tool} className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="font-display text-xl font-bold leading-tight text-ink">
                            {cat.name}
                          </h2>
                          <p className="mt-0.5 text-xs text-muted sm:text-sm">{cat.blurb}</p>
                        </div>
                      </div>
                      <span className="rounded-sm bg-surface px-2.5 py-1 text-xs font-bold text-muted border border-line tabular-nums">
                        {catJobs.length} {catJobs.length === 1 ? 'job' : 'jobs'}
                      </span>
                    </div>

                    {/* Clean scannable job rows */}
                    <ul className="divide-y divide-line">
                      {catJobs.map(job => {
                        const checked = selectedIds.includes(job.id);
                        return (
                          <li
                            key={job.id}
                            className={`flex items-start justify-between gap-4 px-5 py-3.5 transition-colors ${
                              checked ? 'bg-brand-soft/60' : 'bg-surface hover:bg-bg/60'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {hydrated && (
                                <input
                                  type="checkbox"
                                  id={`tally-${job.id}`}
                                  checked={checked}
                                  onChange={() => toggleJob(job.id)}
                                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-brand"
                                />
                              )}
                              <div>
                                {hydrated ? (
                                  <label
                                    htmlFor={`tally-${job.id}`}
                                    className="cursor-pointer text-sm font-semibold leading-snug text-ink sm:text-base"
                                  >
                                    {job.title}
                                  </label>
                                ) : (
                                  <p className="text-sm font-semibold leading-snug text-ink sm:text-base">
                                    {job.title}
                                  </p>
                                )}
                                {job.note && (
                                  <p className="mt-0.5 text-xs text-muted">{job.note}</p>
                                )}
                              </div>
                            </div>

                            <div className="shrink-0 text-right">
                              <span className="inline-block rounded-sm border border-line bg-bg px-2.5 py-1 text-xs font-bold text-ink tabular-nums">
                                {formatHoursRange(job.hoursMin, job.hoursMax)}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                );
              })}
            </div>

            {/* Desktop sticky job tally */}
            {hydrated && (
              <aside aria-label="Job tally" className="hidden lg:sticky lg:top-6 lg:block">
                {tallyBody}
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Mobile sticky bottom tally bar */}
      {hydrated && (
        <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-brand-deep p-3 text-white shadow-[0_-4px_12px_rgba(0,0,0,0.2)] lg:hidden">
          <div className="wrap">
            {mobileOpen && (
              <div className="mb-3 max-h-[70vh] overflow-y-auto">
                {tallyBody}
              </div>
            )}
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold leading-tight text-white tabular-nums">
                  {tally.count === 0
                    ? 'Job tally · 0 jobs'
                    : `${tally.count} ${tally.count === 1 ? 'job' : 'jobs'} · ${formatHoursRange(tally.hoursMin, tally.hoursMax)}`}
                </p>
                <p className="text-xs text-white/75 tabular-nums">
                  {tally.count === 0
                    ? `Tick jobs above (${formatDollars(hourly)}/hr)`
                    : `Rough guide: ${formatDollars(tally.labourMin)}–${formatDollars(tally.labourMax)}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(v => !v)}
                aria-expanded={mobileOpen}
                className="button min-h-9 px-3.5 py-1.5 text-sm"
              >
                {mobileOpen ? 'Hide tally' : 'Open tally'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
