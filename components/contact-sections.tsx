import type { ReactNode } from 'react';
import { business } from '../content/business';
import { SmallIcon } from './artwork';
import { CopyEmail } from './copy-email';
import { HoursClipboard } from './hours-clipboard';
import { JamstacksSupportForm } from './jamstacks-support-form';

/**
 * Clean Contact layout: left column has heading, enquiry wording, direct email/phone,
 * message checklist and hours; right column holds the hosted Jamstacks support form
 * (or email fallback when unconfigured).
 */
export function ContactWorkbench({
  hosted,
  siteId,
  embedUrl,
  heading,
  introduction,
  checklistTitle,
  unconfiguredHeading,
  unconfiguredBody,
}: {
  hosted: boolean;
  siteId: string;
  embedUrl: string;
  heading: ReactNode;
  introduction: ReactNode;
  checklistTitle: ReactNode;
  unconfiguredHeading: ReactNode;
  unconfiguredBody: ReactNode;
}) {
  return (
    <div className="bg-bg py-10 sm:py-14">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        {/* Left column */}
        <div className="min-w-0 lg:col-span-5 space-y-6">
          <div>
            <span className="aisle-tag">Job enquiry</span>
            <h1 className="mt-3 font-display-tight text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              {heading}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {introduction}
            </p>
          </div>

          {/* Always-visible public email & phone */}
          <div className="trade-card p-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Direct email &amp; phone</p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${business.email}`}
                className="inline-flex items-center gap-2 font-semibold text-accent-ink hover:underline wrap-anywhere"
              >
                <SmallIcon name="envelope" className="h-4 w-4 shrink-0" />
                <span>{business.email}</span>
              </a>
              <a
                href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-2 font-semibold text-ink hover:underline"
              >
                <SmallIcon name="phone" className="h-4 w-4 shrink-0 text-muted" />
                <span>{business.phone}</span>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <CopyEmail email={business.email} />
            </div>
          </div>

          <div className="hidden lg:block">
            <ChecklistCard title={checklistTitle} />
          </div>
          <div className="hidden lg:block">
            <HoursClipboard />
          </div>
        </div>

        {/* Right column: Enquiry form */}
        <section aria-label="Enquiry form" className="min-w-0 lg:col-span-7">
          <div className="overflow-hidden trade-card-elevated">
            <div className="bg-brand px-6 py-4 text-on-brand">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                {business.shortName} · Enquiry Form
              </p>
              <p className="mt-1 text-sm text-white/95">
                Name, email and your job list in the message box. Nothing is booked until we reply and confirm a time.
              </p>
            </div>

            <div className="p-6 sm:p-7">
              {hosted ? (
                <JamstacksSupportForm siteId={siteId} embedUrl={embedUrl} email={business.email} />
              ) : (
                <div className="rounded-ui border border-line bg-bg p-6">
                  <h2 className="font-display text-xl font-bold text-ink">{unconfiguredHeading}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{unconfiguredBody}</p>
                  <p className="mt-4">
                    <a
                      className="button text-sm"
                      href={`mailto:${business.email}?subject=Handyman%20job%20list`}
                    >
                      Email {business.email}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mobile order: checklist and hours sit below the form */}
        <div className="space-y-6 lg:hidden">
          <ChecklistCard title={checklistTitle} />
          <HoursClipboard />
        </div>
      </div>
    </div>
  );
}

function ChecklistCard({ title }: { title: ReactNode }) {
  return (
    <aside aria-label="What to put in your message" className="trade-card p-5 sm:p-6">
      <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      <ul className="mt-3.5 space-y-2.5 text-sm leading-snug">
        {business.enquiries.usefulToInclude.map(tip => (
          <li key={tip} className="flex items-start gap-2.5">
            <SmallIcon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
            <span className="text-muted">{tip}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
