import type { Metadata } from 'next';
import { HomeHero, FridgeList, ToolWallSection, HowItWorks, RatesTeaser, WhereWhen } from '../components/home-sections';
import { LicensedExclusionsStrip } from '../components/licensed-exclusions';
import { OpenToolboxCta } from '../components/open-toolbox-cta';
import { business } from '../content/business';
import { jobs } from '../content/jobs';
import { formatDollars, hourlyRate, quarterHourRate } from '../content/rates';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  title: { absolute: `${business.name} — No job too small` },
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const hourly = hourlyRate();
  const quarter = quarterHourRate();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />

      {/* 1. Hero — full-bleed pegboard wall */}
      <HomeHero>
        <HomeHero.Copy>
          <HomeHero.Label>Asheville handyman · {business.shortName}</HomeHero.Label>
          <HomeHero.Heading>
            No job<br />too small.
          </HomeHero.Heading>
          <HomeHero.TapeRule />
          <HomeHero.Lead>
            Shelves that need hanging, doors that stick, flat-pack still in the box. Send us the list
            and we&apos;ll bring the toolbox.{' '}
            <strong>{formatDollars(hourly)} an hour</strong>, billed by the quarter hour (
            {formatDollars(quarter)}) after the first.
          </HomeHero.Lead>
          <HomeHero.Actions
            primary="Send us your job list"
            secondary="See the job list"
          />
          <HomeHero.Status />
        </HomeHero.Copy>

        <HomeHero.Scene />
      </HomeHero>

      {/* 2. The fridge list — red enamel band */}
      <FridgeList>
        <FridgeList.Notepad
          heading="The fridge list"
          linkLabel={`See all ${jobs.length} jobs`}
        />
        <FridgeList.Aside>
          <span className="aisle-tag">One van, one visit</span>
          <FridgeList.AsideHeading>
            Most visits clear three or four of these in one go.
          </FridgeList.AsideHeading>
          <FridgeList.AsideBody>
            Save up the nagging jobs on the fridge door and knock them out together.{' '}
            {business.people[0]} and {business.people[1]} arrive with a stocked van, a straight
            hourly clock and no contractor runaround.
          </FridgeList.AsideBody>
        </FridgeList.Aside>
      </FridgeList>

      {/* 3. Pegboard tool wall — plywood background with framed pegboard panel */}
      <ToolWallSection>
        <ToolWallSection.Header
          tapeLabel="Six drawers, one toolbox"
          heading="Pick a tool to see what we do"
          intro="Every tool on the wall opens its drawer on the job list with typical hours and a rough labour tally."
        />
        <ToolWallSection.Wall />
      </ToolWallSection>

      {/* 4. How it works — shop paper background with tape measure */}
      <HowItWorks>
        <HowItWorks.Header
          tapeLabel="How it works"
          heading="Three steps from fridge list to finished"
        />
        <HowItWorks.Steps>
          <HowItWorks.Step number="1" title="Send us the list">
            Write each odd job on its own line with rough sizes or counts. No quote form hoops — just an enquiry message or email.
          </HowItWorks.Step>
          <HowItWorks.Step number="2" title="We reply with a rough estimate and a visit window">
            We&apos;ll let you know roughly how long it should take and suggest a time. Nothing is booked until you confirm.
          </HowItWorks.Step>
          <HowItWorks.Step number="3" title="We turn up stocked and bill by the quarter hour">
            One rate ({formatDollars(hourly)}/hr), first-hour minimum, then {formatDollars(quarter)} per 15 minutes. Hardware at receipt cost, zero markup.
          </HowItWorks.Step>
        </HowItWorks.Steps>
      </HowItWorks>

      {/* 5. Rates teaser — pegboard band with time card and block tags */}
      <RatesTeaser>
        <RatesTeaser.Card />
        <RatesTeaser.Blocks
          heading="Book a half day or full day for a big catch-up"
          linkLabel="Rates & area"
        />
      </RatesTeaser>

      {/* 6. Where and when — plywood split with tape measure & hours clipboard */}
      <WhereWhen>
        <WhereWhen.Area
          tapeLabel="Service area"
          heading="Around Asheville, measured from Pack Square Park"
          intro="We work out of the van — no shopfront to visit. Core Asheville neighborhoods within 8 miles have no trip charge; extended towns beyond 8 miles carry a flat trip charge."
        />
        <WhereWhen.Hours />
      </WhereWhen>

      {/* 7. Leave it to the licensed pros — galvanised steel tray strip */}
      <LicensedExclusionsStrip />

      {/* 8. Closing call to action — open red toolbox drawer */}
      <OpenToolboxCta
        heading="Got a list on the fridge? Send it over."
        body="Tell us what needs hanging, patching, assembling or fixing. We'll reply with a rough estimate and a visit window — nothing is booked until we confirm a time with you."
        ctaLabel="Send us your job list"
      />
    </>
  );
}
