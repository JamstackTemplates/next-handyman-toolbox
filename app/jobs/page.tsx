import type { Metadata } from 'next';
import { JobsWorkbench } from '../../components/jobs-workbench';
import { LicensedExclusionsStrip } from '../../components/licensed-exclusions';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { business } from '../../content/business';
import { jobs } from '../../content/jobs';
import { formatDollars, hourlyRate, quarterHourRate } from '../../content/rates';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Job list',
  description: `All ${jobs.length} small jobs Odd Jobs & Co. tackles around Asheville with typical hours and a rough labour tally at ${formatDollars(hourlyRate())}/hr.`,
  alternates: { canonical: absoluteUrl('/jobs/') },
};

export default function JobsPage() {
  const hourly = hourlyRate();
  const quarter = quarterHourRate();

  return (
    <>
      <PageHead
        tapeLabel="Job list"
        title="No job too small. Here's the proof."
        showRateTag
      >
        <p>
          Browse all {jobs.length} everyday jobs across six categories. Tick the ones on your list
          to add up a rough labour guide at <strong className="text-white">{formatDollars(hourly)}/hr</strong> (
          {formatDollars(quarter)} per quarter hour after the first).
        </p>
      </PageHead>

      <JobsWorkbench />

      {/* Not on the list? */}
      <section className="border-t border-line bg-surface py-12">
        <div className="wrap">
          <div className="mx-auto max-w-3xl trade-card p-6 sm:p-8">
            <span className="aisle-tag">Not on the list?</span>
            <h2 className="mt-3 font-display-tight text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
              Ask anyway. If it takes a toolbox and not a licence, we probably do it.
            </h2>
            <p className="mt-2.5 text-base leading-relaxed text-muted">
              From squeaky stair treads to loose towel bars and closet rods that dropped at midnight,
              send us a quick description on the Contact page and we&apos;ll tell you straight away if
              it&apos;s in our wheelhouse.
            </p>
          </div>
        </div>
      </section>

      <LicensedExclusionsStrip compact />

      {/* Closing CTA band */}
      <section className="bg-warehouse pt-12 pb-24 text-white sm:pt-14 lg:pb-14">
        <div className="wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display-tight text-3xl font-extrabold leading-tight sm:text-4xl">
              Ready to send your list?
            </h2>
            <p className="mt-2 text-base text-white/85">
              Send an enquiry with your jobs one per line. We&apos;ll reply with a rough time estimate
              and a visit window — nothing is booked until we confirm.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <SiteLink href="/contact/" className="button">
              Send us your job list
            </SiteLink>
            <a
              href={`mailto:${business.email}`}
              className="text-sm font-semibold text-white underline hover:text-white/80"
            >
              {business.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
