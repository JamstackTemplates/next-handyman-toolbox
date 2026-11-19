import { licensedExclusions } from '../content/jobs';
import { SmallIcon } from './artwork';

/** Clean slate trade-notice section listing the six licensed trades Odd Jobs & Co. does not perform. */
export function LicensedExclusionsStrip({
  heading = 'Leave it to the licensed pros',
  intro = "We stick to handyman work that doesn't require a trade licence or permit. For any of these, we'll point you to a licensed local pro:",
}: {
  heading?: string;
  intro?: string;
  compact?: boolean;
}) {
  return (
    <section
      aria-labelledby="licensed-exclusions-heading"
      className="border-y border-line bg-surface-alt py-12"
    >
      <div className="wrap">
        <div className="max-w-2xl">
          <span className="aisle-tag">Scope of work</span>
          <h2
            id="licensed-exclusions-heading"
            className="mt-3 font-display-tight text-3xl font-extrabold leading-tight text-ink sm:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{intro}</p>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {licensedExclusions.map(item => (
            <li
              key={item.id}
              className="flex items-start gap-3 trade-card p-4 text-ink"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-ui bg-surface-alt text-ink">
                <SmallIcon name={item.id} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-base font-bold leading-snug">{item.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
