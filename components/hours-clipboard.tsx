'use client';

import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { currentWeekday, formatClock12, type Day, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';
import { SmallIcon } from './artwork';
import { PhoneStatus } from './phone-status';

/**
 * Clean trade hours card showing weekly phone & working hours.
 * Today's weekday row is highlighted only in the browser using the business time zone.
 */
export function HoursClipboard({
  hours = business.hours,
  heading = 'Phone & working hours',
  className = '',
}: {
  hours?: readonly OpeningHours[];
  heading?: string;
  className?: string;
}) {
  const [today, setToday] = useState<Day | null>(null);

  useEffect(() => {
    const update = () => setToday(currentWeekday(site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`overflow-hidden trade-card ${className}`}>
      <div className="flex items-center justify-between gap-2 border-b border-line bg-surface-alt px-5 py-3.5">
        <div className="flex items-center gap-2">
          <SmallIcon name="clock" className="h-4 w-4 text-accent-ink" />
          <h3 className="font-display text-lg font-bold text-ink">{heading}</h3>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">Asheville</span>
      </div>

      <div className="p-5">
        <PhoneStatus variant="inline" />

        <dl className="mt-4 divide-y divide-line text-sm">
          {hours.map(entry => {
            const isToday = today === entry.day;
            return (
              <div
                key={entry.day}
                className={`flex items-center justify-between gap-3 py-2.5 ${
                  isToday ? '-mx-2.5 rounded-sm bg-brand-soft px-2.5 font-bold text-ink' : ''
                }`}
              >
                <dt className="flex items-center gap-2 font-medium">
                  <span>{entry.day}</span>
                  {isToday && (
                    <span className="rounded-sm bg-brand px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-on-brand">
                      Today
                    </span>
                  )}
                </dt>
                <dd className={`tabular-nums ${entry.opens ? '' : 'text-muted'}`}>
                  {entry.opens && entry.closes
                    ? `${formatClock12(entry.opens)} – ${formatClock12(entry.closes)}`
                    : 'Closed'}
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-muted">
          {business.people.join(' & ')} answer the phone between jobs. Leave a voicemail or email anytime.
        </p>
      </div>
    </div>
  );
}
