'use client';

import { useState } from 'react';
import { business } from '../content/business';
import { SmallIcon } from './artwork';
import { SiteLink } from './site-link';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu-drawer"
        className="inline-flex min-h-10 items-center gap-1.5 rounded-ui border border-white/25 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
      >
        <span>{open ? 'Close' : 'Menu'}</span>
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu-drawer"
          className="absolute inset-x-0 top-full z-50 border-b border-line bg-surface px-4 py-4 text-ink shadow-[var(--shadow-md)]"
        >
          <nav aria-label="Mobile" className="wrap flex flex-col gap-2">
            <SiteLink
              href="/jobs/"
              markCurrent="page"
              onClick={() => setOpen(false)}
              className="rounded-ui border border-line bg-bg px-4 py-3 font-semibold text-ink no-underline hover:border-brand"
            >
              Job list
            </SiteLink>
            <SiteLink
              href="/rates/"
              markCurrent="page"
              onClick={() => setOpen(false)}
              className="rounded-ui border border-line bg-bg px-4 py-3 font-semibold text-ink no-underline hover:border-brand"
            >
              Rates &amp; area
            </SiteLink>
            <SiteLink
              href="/contact/"
              markCurrent="page"
              onClick={() => setOpen(false)}
              className="button mt-1 w-full justify-center"
            >
              Send us your job list
            </SiteLink>
            <a
              href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-ui border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink no-underline"
            >
              <SmallIcon name="phone" className="h-4 w-4 text-accent-ink" />
              <span>{business.phone}</span>
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
