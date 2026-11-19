import { CORE_RADIUS_MILES, serviceAreas } from '../content/areas';
import { business } from '../content/business';
import { formatDollars, getRate, hourlyRate } from '../content/rates';
import { BrandMark, SmallIcon } from './artwork';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const coreCount = serviceAreas.filter(a => a.zone === 'core').length;
  const extendedCount = serviceAreas.filter(a => a.zone === 'extended').length;
  const trip = getRate('extended-trip');

  return (
    <footer className="bg-tool-doodles border-t-4 border-accent bg-brand-deep text-white">
      <div className="wrap py-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand & direct contact */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <BrandMark className="h-9 w-9 shrink-0" />
              <div>
                <p className="font-display-tight text-xl font-extrabold leading-none">{business.name}</p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {business.people.join(' & ')} · {business.city}
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              Everyday handyman jobs billed at <strong className="text-white">{formatDollars(hourlyRate())}/hr</strong>{' '}
              by the quarter hour after the first. Mobile service only — we bring the stocked van to you.
            </p>
            <div className="flex flex-col gap-2 pt-1 text-sm sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-2 font-semibold text-white no-underline hover:underline"
              >
                <SmallIcon name="envelope" className="h-4 w-4 text-white/75" />
                <span>{business.email}</span>
              </a>
              <a
                href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-2 font-semibold text-white no-underline hover:underline"
              >
                <SmallIcon name="phone" className="h-4 w-4 text-white/75" />
                <span>{business.phone}</span>
              </a>
            </div>
          </div>

          {/* Hours & service zone */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">Phone &amp; van hours</p>
            <dl className="space-y-1.5 text-sm text-white/90">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-1.5">
                <dt className="font-medium">Mon–Fri</dt>
                <dd className="tabular-nums">7:30 am – 5:30 pm</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-1.5">
                <dt className="font-medium">Saturday</dt>
                <dd className="tabular-nums">8:00 am – 12:00 pm</dd>
              </div>
              <div className="flex justify-between gap-4 text-white/65">
                <dt className="font-medium">Sunday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
            <p className="pt-1 text-xs leading-relaxed text-white/70">
              Core zone: {coreCount} areas within {CORE_RADIUS_MILES} mi of {business.landmark}. {extendedCount} extended areas ({formatDollars(trip.price)} trip charge).
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">Quick links</p>
            <nav aria-label="Footer" className="mt-3">
              <ul className="space-y-2 text-sm font-semibold">
                <li><SiteLink href="/" className="text-white/90 no-underline hover:text-white hover:underline">Home</SiteLink></li>
                <li><SiteLink href="/jobs/" className="text-white/90 no-underline hover:text-white hover:underline">Job list &amp; tally</SiteLink></li>
                <li><SiteLink href="/rates/" className="text-white/90 no-underline hover:text-white hover:underline">Rates &amp; service area</SiteLink></li>
                <li><SiteLink href="/contact/" className="text-white/90 no-underline hover:text-white hover:underline">Send a job enquiry</SiteLink></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5 text-xs text-white/70">
          <p>{business.name} · Fictitious sample business in {business.city}</p>
          <span title="Made with love by jamstacks.net">
            Built with{' '}
            <a className="font-semibold text-white underline hover:text-white/80" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
