import {
  firstHourMinimum,
  formatDollars,
  hourlyRate,
  quarterHourRate,
} from '../content/rates';

/**
 * Clean hardware-store trade rate card / billing schedule.
 * All figures derive from content/rates.ts so changing hourly updates every number.
 */
export function TimeCard({
  full = false,
  className = '',
}: {
  full?: boolean;
  className?: string;
}) {
  const hourly = hourlyRate();
  const quarter = quarterHourRate();
  const minHour = firstHourMinimum();

  const rows = full
    ? [
        { code: '01', label: 'First-hour minimum', value: `${formatDollars(minHour)} (1 hr)` },
        { code: '02', label: 'After the first hour', value: `${formatDollars(quarter)} / 15 min` },
        { code: '03', label: 'Estimates by message', value: 'Free · no obligation' },
        { code: '04', label: 'Materials & hardware', value: 'At cost · receipt shown' },
        { code: '05', label: 'Payment on completion', value: 'Card, check or cash' },
      ]
    : [
        { code: '01', label: 'First-hour minimum', value: formatDollars(minHour) },
        { code: '02', label: 'Quarter-hour billing after', value: `${formatDollars(quarter)} / 15 min` },
        { code: '03', label: 'Estimates by message', value: 'Free' },
      ];

  return (
    <div className={`overflow-hidden trade-card-elevated text-ink ${className}`}>
      {/* Bunnings-style green header bar */}
      <div className="flex items-center justify-between bg-brand px-5 py-3 text-on-brand">
        <span className="text-xs font-bold uppercase tracking-[0.12em]">
          Standard Labour Schedule
        </span>
        <span className="rounded-sm bg-accent px-2 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-on-accent">
          One Flat Rate
        </span>
      </div>

      {/* Main rate shelf-ticket block */}
      <div className="grid items-center gap-5 border-b border-line p-5 sm:grid-cols-[auto_1fr] sm:p-6">
        <div className="rounded-ui border-l-4 border-accent bg-bg px-5 py-3.5">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-muted">
            Hourly Rate
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display-tight text-5xl font-extrabold leading-none text-ink tabular-nums sm:text-6xl">
              {formatDollars(hourly)}
            </span>
            <span className="text-sm font-bold text-muted">/ hr</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">
            Same hourly rate for every job on the list.
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Clock starts when we unload and stops when we sweep up. After the first hour (
            {formatDollars(minHour)} minimum), time is billed in 15-minute increments (
            {formatDollars(quarter)}).
          </p>
        </div>
      </div>

      {/* Clean tabular rows */}
      <div className="divide-y divide-line px-5 py-1 sm:px-6">
        {rows.map(row => (
          <div key={row.code} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-muted">{row.code}</span>
              <span className="font-medium text-ink">{row.label}</span>
            </div>
            <span className="font-semibold text-ink tabular-nums">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-line bg-surface-alt px-5 py-2.5 text-xs text-muted sm:px-6">
        Enquiries are not confirmed bookings or binding quotes.
      </div>
    </div>
  );
}
