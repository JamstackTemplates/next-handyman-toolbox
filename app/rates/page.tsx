import type { Metadata } from 'next';
import { OpenToolboxCta } from '../../components/open-toolbox-cta';
import { PageHead } from '../../components/page-head';
import {
  BlocksSection,
  HoursSection,
  RatesTimeCardSection,
  ReceiptSection,
  ServiceAreaSection,
  StickyNotesFaq,
} from '../../components/rates-sections';
import { CORE_RADIUS_MILES } from '../../content/areas';
import { business } from '../../content/business';
import { formatDollars, getRate, hourlyRate, quarterHourRate } from '../../content/rates';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Rates & area',
  description: `Simple handyman pricing in Asheville: ${formatDollars(hourlyRate())}/hr billed by the quarter hour after the first, half-day and full-day blocks, and service area around ${business.landmark}.`,
  alternates: { canonical: absoluteUrl('/rates/') },
};

export default function RatesPage() {
  const hourly = hourlyRate();
  const quarter = quarterHourRate();
  const half = getRate('half-day');
  const full = getRate('full-day');
  const trip = getRate('extended-trip');

  return (
    <>
      <PageHead
        tapeLabel="Rates & area"
        title="One rate, by the quarter hour."
        variant="enamel"
      >
        <p>
          No mystery quotes, no material markups and no call-out fee inside core Asheville. Just{' '}
          <strong>{formatDollars(hourly)} an hour</strong> ({formatDollars(quarter)} per quarter hour
          after the first hour), plus half-day and full-day blocks for longer lists.
        </p>
      </PageHead>

      {/* 2. Full punch-clock time card on pegboard */}
      <RatesTimeCardSection />

      {/* 3. Half-day and full-day blocks on plywood */}
      <BlocksSection
        tapeLabel="Half day & full day"
        heading="Save with a block for a longer list"
        intro={`Have a whole Saturday's worth of odd jobs? Reserve a ${half.unit} (${formatDollars(half.price)}) or ${full.unit} (${formatDollars(full.price)}) block instead of paying straight hourly.`}
      />

      {/* 4. Materials & trips hardware receipt on shop paper */}
      <ReceiptSection
        tapeLabel="Materials & trips"
        heading="Hardware at cost, receipt on the counter"
        intro={`You can supply your own bracket, paint or fixture, or ask us to pick up consumables on the way. Everything is billed at the exact hardware-store receipt price with zero markup. Visits beyond ${CORE_RADIUS_MILES} miles carry a flat ${formatDollars(trip.price)} extended-zone trip charge.`}
      />

      {/* 5. Service area tape measure on pegboard */}
      <ServiceAreaSection
        tapeLabel="Where we work"
        heading={`Measured from ${business.landmark}`}
        intro={`No storefront — we bring the van to homes and rentals within about ${CORE_RADIUS_MILES} miles of downtown Asheville at no trip charge, and out to neighboring towns for a flat ${formatDollars(trip.price)} trip charge.`}
      />

      {/* 6. Hours clipboard on plywood */}
      <HoursSection
        tapeLabel="Phone & van hours"
        heading="When we answer and when we work"
      >
        <p>
          {business.people.join(' and ')} run the van and the phone together. If we&apos;re up a
          ladder or holding a shelf level when you ring, leave a voicemail or send your job list by
          message and we&apos;ll reply as soon as our hands are free.
        </p>
        <p>
          We work daytime hours Monday through Saturday morning and take Sundays off.
        </p>
      </HoursSection>

      {/* 7. Questions on sticky notes on red toolbox lid */}
      <StickyNotesFaq heading="Common questions, straight answers">
        <StickyNotesFaq.Note index={0} question="Do you need to see it first?">
          Almost never. A short list of jobs with rough sizes — plus a photo by text once we reply —
          is plenty for a rough time estimate and visit window.
        </StickyNotesFaq.Note>
        <StickyNotesFaq.Note index={1} question="Do you supply parts?">
          We carry common anchors, screws, caulk and wood glue in the van (billed at cost). For
          specific items like TV brackets, blinds or paint colours, you supply them or tell us what
          to pick up.
        </StickyNotesFaq.Note>
        <StickyNotesFaq.Note index={2} question="Is there a minimum?">
          Yes — one hour ({formatDollars(hourly)}). After the first hour we bill in 15-minute
          increments ({formatDollars(quarter)}), so a 75-minute visit costs{' '}
          {formatDollars(hourly + quarter)}, not two hours.
        </StickyNotesFaq.Note>
        <StickyNotesFaq.Note index={3} question="Do you do electrical?">
          No — we don&apos;t touch electrical wiring, circuits, panels or hard-wired fixtures (nor
          gas, permitted plumbing, roofing, structural or HVAC). We&apos;ll happily refer you to a
          licensed local electrician.
        </StickyNotesFaq.Note>
      </StickyNotesFaq>

      {/* 8. Closing call to action */}
      <OpenToolboxCta
        heading="Ready to get those odd jobs crossed off?"
        body="Send us your job list and neighborhood. We'll reply with a rough time estimate and a visit window — nothing is booked until we've confirmed a time with you."
        ctaLabel="Send us your job list"
      />
    </>
  );
}
