import type { ReactNode } from 'react';
import { business } from '../content/business';
import { SmallIcon } from './artwork';
import { SiteLink } from './site-link';

/**
 * Clean hardware-store closing CTA banner in deep warehouse green with red primary action.
 */
export function OpenToolboxCta({
  heading = 'Got a list of odd jobs? Send it over.',
  body = "List the jobs one per line. We'll reply with a rough time estimate and a visit window — nothing is booked until we confirm a time with you.",
  ctaLabel = 'Send us your job list',
}: {
  heading?: ReactNode;
  body?: ReactNode;
  ctaLabel?: string;
}) {
  return (
    <section className="bg-bg py-14 sm:py-16">
      <div className="wrap">
        <div className="overflow-hidden rounded-lg bg-warehouse shadow-[var(--shadow-md)]">
          <div className="h-1.5 w-full bg-accent" aria-hidden="true" />
          <div className="grid items-center gap-6 p-7 sm:p-10 md:grid-cols-[1.35fr_auto]">
            <div>
              <span className="aisle-tag-on-dark">No job too small</span>
              <h2 className="mt-3 font-display-tight text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {heading}
              </h2>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                {body}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <SiteLink href="/contact/" className="button w-full sm:w-auto sm:px-6">
                {ctaLabel}
              </SiteLink>
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 underline hover:text-white"
              >
                <SmallIcon name="envelope" className="h-4 w-4 shrink-0" />
                <span>{business.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
