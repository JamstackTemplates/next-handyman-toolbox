import { CORE_RADIUS_MILES, serviceAreas } from '../content/areas';
import { business } from '../content/business';
import { formatDollars, getRate } from '../content/rates';
import { SmallIcon } from './artwork';

/**
 * Clean linear mileage scale measured from Pack Square Park showing core (<= 8 mi)
 * and extended (> 8 mi) service zones, plus scannable neighborhood lists.
 */
export function ServiceAreaTape({
  compact = false,
  className = '',
}: {
  compact?: boolean;
  className?: string;
}) {
  const trip = getRate('extended-trip');
  const core = serviceAreas.filter(a => a.zone === 'core').sort((a, b) => a.miles - b.miles);
  const extended = serviceAreas.filter(a => a.zone === 'extended').sort((a, b) => a.miles - b.miles);
  const maxMiles = 16;

  return (
    <div className={className}>
      {/* Legend header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
          <SmallIcon name="pin" className="h-4 w-4 text-accent-ink" />
          <span>Measured from {business.landmark}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-brand-soft px-2.5 py-1 text-brand dark:text-[#8ee0e6]">
            Core: 0–{CORE_RADIUS_MILES} mi · $0 trip fee
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-accent/12 px-2.5 py-1 text-accent-ink">
            Extended: {CORE_RADIUS_MILES}+ mi · {formatDollars(trip.price)} trip fee
          </span>
        </div>
      </div>

      {/* Sleek linear mileage scale (desktop / tablet) */}
      <div className="hidden sm:block trade-card p-5">
        <div className="flex items-center justify-between text-xs font-semibold text-muted mb-2">
          <span>0 mi · {business.landmark}</span>
          <span className="font-bold text-ink">{CORE_RADIUS_MILES} mi core boundary</span>
          <span>16 mi</span>
        </div>

        {/* Two-zone linear bar */}
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-surface-alt border border-line">
          <div
            className="absolute inset-y-0 left-0 bg-brand"
            style={{ width: `${(CORE_RADIUS_MILES / maxMiles) * 100}%` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-0 bg-accent/75"
            style={{ left: `${(CORE_RADIUS_MILES / maxMiles) * 100}%` }}
            aria-hidden="true"
          />
          {/* 8-mile divider tick */}
          <div
            className="absolute inset-y-0 w-0.5 bg-surface"
            style={{ left: `${(CORE_RADIUS_MILES / maxMiles) * 100}%` }}
            aria-hidden="true"
          />
        </div>

        {/* Mile markers */}
        <div className="mt-2 flex justify-between text-[0.72rem] font-semibold text-muted tabular-nums">
          <span>0 mi</span>
          <span>2 mi</span>
          <span>4 mi</span>
          <span>6 mi</span>
          <span className="font-bold text-accent-ink">8 mi</span>
          <span>10 mi</span>
          <span>12 mi</span>
          <span>14 mi</span>
          <span>16 mi</span>
        </div>
      </div>

      {/* Clean two-column neighborhood directory */}
      <div className={`mt-4 grid gap-4 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
        <div className="trade-card p-4">
          <div className="flex items-center justify-between gap-2 border-b border-line pb-2.5">
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              Core zone (0–{CORE_RADIUS_MILES} mi)
            </h3>
            <span className="text-xs font-bold text-brand dark:text-[#8ee0e6]">$0 trip</span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5 text-sm">
            {core.map(area => (
              <li
                key={area.id}
                className="rounded-sm border border-line bg-bg px-2.5 py-1 text-xs font-medium text-ink"
              >
                {area.name} <span className="text-muted tabular-nums">· {area.miles} mi</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="trade-card p-4">
          <div className="flex items-center justify-between gap-2 border-b border-line pb-2.5">
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              Extended zone ({CORE_RADIUS_MILES}+ mi)
            </h3>
            <span className="text-xs font-bold text-accent-ink">+{formatDollars(trip.price)}/visit</span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5 text-sm">
            {extended.map(area => (
              <li
                key={area.id}
                className="rounded-sm border border-line bg-bg px-2.5 py-1 text-xs font-medium text-ink"
              >
                {area.name} <span className="text-muted tabular-nums">· {area.miles} mi</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
