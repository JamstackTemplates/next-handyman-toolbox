import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { BrandMark, SmallIcon } from './artwork';
import { MobileNav } from './mobile-nav';
import { PhoneStatus } from './phone-status';
import { SiteLink } from './site-link';

export function SiteHeader() {
  return (
    <header className="relative z-40 bg-brand text-on-brand">
      {/* Top trade utility strip (like hardware-store store-info bar) */}
      <div className="border-b border-white/10 bg-brand-deep text-xs text-white/85">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5">
          <div className="flex items-center gap-3">
            <PhoneStatus variant="header" />
            <span className="hidden text-white/40 sm:inline">|</span>
            <span className="hidden sm:inline">Serving {business.city} &amp; surrounds</span>
          </div>
          <a
            href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
            className="inline-flex items-center gap-1.5 font-semibold text-white no-underline hover:underline"
          >
            <SmallIcon name="phone" className="h-3.5 w-3.5" />
            <span>{business.phone}</span>
          </a>
        </div>
      </div>

      {/* Main warehouse header bar */}
      <div className="border-b-4 border-accent">
        <div className="wrap flex min-h-16 items-center justify-between gap-4 py-2.5">
          <SiteLink
            href="/"
            className="inline-flex items-center gap-2.5 text-white no-underline hover:no-underline"
          >
            <BrandMark className="h-9 w-9 shrink-0" />
            <span className="flex flex-col">
              <span className="font-display-tight text-xl font-extrabold tracking-tight leading-none sm:text-2xl">
                {business.shortName}
              </span>
              <span className="mt-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/75">
                Asheville Handyman
              </span>
            </span>
          </SiteLink>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <SiteLink href="/jobs/" markCurrent="page" className="nav-link">
              Job list
            </SiteLink>
            <SiteLink href="/rates/" markCurrent="page" className="nav-link">
              Rates &amp; area
            </SiteLink>
            <SiteLink href="/contact/" markCurrent="page" className="nav-link">
              Contact
            </SiteLink>
          </nav>

          <div className="flex items-center gap-2.5">
            <SiteLink
              href="/contact/"
              className="button hidden min-h-10 px-4 py-2 text-sm lg:inline-flex"
            >
              Send us your job list
            </SiteLink>
            <DarkModeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
