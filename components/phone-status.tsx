'use client';

import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { phoneLinesStatus } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Browser-only phone-lines status in America/New_York, refreshed every minute.
 * Static / no-JS markup stays neutral ("Phones Mon–Fri 7:30–5:30, Sat 8–12").
 */
export function PhoneStatus({
  variant = 'pill',
  className = '',
}: {
  variant?: 'pill' | 'header' | 'inline';
  className?: string;
}) {
  const [state, setState] = useState<{ hydrated: boolean; open: boolean; label: string }>({
    hydrated: false,
    open: false,
    label: business.hoursSummary,
  });

  useEffect(() => {
    const update = () => {
      const next = phoneLinesStatus(business.hours, site.timeZone, new Date(), business.hoursSummary);
      setState({ hydrated: true, open: next.open, label: next.label });
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  const dotClass = !state.hydrated
    ? 'bg-amber-400'
    : state.open
      ? 'bg-[#2fb35a]'
      : 'bg-[#94a3a3]';

  if (variant === 'header') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-medium text-white/90 ${className}`}
        aria-live="polite"
      >
        <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
        <span>{state.label}</span>
      </span>
    );
  }

  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-2 text-sm font-semibold text-ink ${className}`} aria-live="polite">
        <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
        <span>{state.label}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-ui border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ${className}`}
      aria-live="polite"
    >
      <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
      <span>{state.label}</span>
    </span>
  );
}
