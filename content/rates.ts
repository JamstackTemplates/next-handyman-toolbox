/**
 * Single source of truth for every price shown across the website:
 * hero rate tag, time card, job tally, service-area extended charge and JSON-LD schema.
 *
 * The first-hour minimum (equal to `hourly`) and the quarter-hour price after the first hour
 * (`hourly / 4`) are always derived from `hourly`, never stored separately.
 */

export type RateId = 'hourly' | 'half-day' | 'full-day' | 'extended-trip';

export interface RateItem {
  /** Stable URL-safe identifier. */
  id: RateId;
  /** Human-readable rate label. */
  label: string;
  /** Whole US dollar amount. */
  price: number;
  /** Billing unit (e.g. "per hour", "4 hours", "per visit"). */
  unit: string;
  /** Plain-English rule displayed on the time card and tags. */
  rule: string;
  /** Number of hours included for block rates. */
  hours?: number;
}

export const rates: readonly RateItem[] = [
  {
    id: 'hourly',
    label: 'Hourly rate',
    price: 68,
    unit: 'per hour',
    rule: 'Labour on site',
  },
  {
    id: 'half-day',
    label: 'Half-day block',
    price: 255,
    unit: '4 hours',
    rule: 'Unused time not refunded',
    hours: 4,
  },
  {
    id: 'full-day',
    label: 'Full-day block',
    price: 490,
    unit: '8 hours',
    rule: 'Unused time not refunded',
    hours: 8,
  },
  {
    id: 'extended-trip',
    label: 'Extended-zone trip charge',
    price: 15,
    unit: 'per visit',
    rule: 'Only for areas in the extended zone',
  },
];

export interface BillingRule {
  id: string;
  title: string;
  detail: string;
}

export const billingPolicies: readonly BillingRule[] = [
  {
    id: 'materials-at-cost',
    title: 'Materials at cost, zero markup',
    detail: 'Hardware, anchors, caulk and timber are billed at the hardware-store receipt price with a copy left on the counter.',
  },
  {
    id: 'supply-run',
    title: 'Supply runs during a visit',
    detail: 'If a job needs a specialty part we do not carry in the van, the trip to pick it up is billed as regular labour time.',
  },
  {
    id: 'free-estimates',
    title: 'Free estimates by message',
    detail: 'Send us your job list and we reply with a rough time estimate and visit window at no charge. Nothing is booked until confirmed.',
  },
  {
    id: 'payment-on-completion',
    title: 'Pay when the job is done',
    detail: 'Payment is taken on completion by card, check or cash. This website takes no payment or deposits.',
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getRate(id: RateId, list: readonly RateItem[] = rates): RateItem {
  const item = list.find(entry => entry.id === id);
  if (!item) throw new Error(`rates: missing required rate "${id}"`);
  return item;
}

/** Derived hourly rate in whole US dollars. */
export function hourlyRate(list: readonly RateItem[] = rates): number {
  return getRate('hourly', list).price;
}

/** Derived first-hour minimum (always equals the hourly rate). */
export function firstHourMinimum(list: readonly RateItem[] = rates): number {
  return hourlyRate(list);
}

/** Derived quarter-hour price after the first hour (`hourly / 4`). */
export function quarterHourRate(list: readonly RateItem[] = rates): number {
  return hourlyRate(list) / 4;
}

/** Format a whole US dollar amount (e.g. "$68"). */
export function formatDollars(amount: number): string {
  return `$${Math.round(amount)}`;
}

/** Validate rates with item-specific errors. */
export function validateRates(list: readonly RateItem[] = rates): void {
  const seen = new Set<string>();
  for (const item of list) {
    if (!URL_SAFE_ID.test(item.id)) {
      throw new Error(`rates.${item.id}: ID must be lowercase URL-safe`);
    }
    if (seen.has(item.id)) {
      throw new Error(`rates.${item.id}: duplicate rate ID`);
    }
    seen.add(item.id);
    if (!item.label.trim()) throw new Error(`rates.${item.id}: label is required`);
    if (!item.unit.trim()) throw new Error(`rates.${item.id}: unit is required`);
    if (!item.rule.trim()) throw new Error(`rates.${item.id}: rule is required`);
    if (!Number.isInteger(item.price) || item.price <= 0) {
      throw new Error(`rates.${item.id}: price must be a positive whole-dollar integer (got ${item.price})`);
    }
  }

  const hourly = getRate('hourly', list);
  if (hourly.price % 4 !== 0) {
    throw new Error(`rates.hourly: price (${hourly.price}) must be divisible by 4 so quarter-hour billing is whole dollars`);
  }

  const halfDay = getRate('half-day', list);
  if (halfDay.price >= hourly.price * 4) {
    throw new Error(`rates.half-day: price ($${halfDay.price}) must be less than 4 × hourly ($${hourly.price * 4})`);
  }

  const fullDay = getRate('full-day', list);
  if (fullDay.price >= hourly.price * 8) {
    throw new Error(`rates.full-day: price ($${fullDay.price}) must be less than 8 × hourly ($${hourly.price * 8})`);
  }

  getRate('extended-trip', list);
}
