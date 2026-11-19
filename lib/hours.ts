/** Weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];
export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

/** Format 24-hour HH:MM into friendly 12-hour clock (e.g. "07:30" -> "7:30 am", "17:30" -> "5:30 pm"). */
export function formatClock12(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(':');
  const h = Number(hStr);
  const period = h >= 12 ? 'pm' : 'am';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${mStr} ${period}`;
}

function localNow(timeZone: string, now: Date): { index: number; current: number } | null {
  if (!timeZone) return null;
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return null;
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return null;
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  return { index, current };
}

/** Return the current weekday in the business time zone, or null if unknown/invalid. */
export function currentWeekday(timeZone: string, now = new Date()): Day | null {
  const local = localNow(timeZone, now);
  return local ? DAYS[local.index] : null;
}

/** Generic opening status label (kept compatible with starter tests). */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const fallback = 'See opening hours';
  if (!timeZone) return fallback;
  validateHours(hours);
  const local = localNow(timeZone, now);
  if (!local) return fallback;
  const today = hours.find(entry => entry.day === DAYS[local.index])!;
  if (today.opens && today.closes && local.current >= minutes(today.opens) && local.current < minutes(today.closes)) {
    return `Open now · until ${today.closes}`;
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(local.index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || local.current < minutes(entry.opens))) {
      return `Closed · opens ${offset === 0 ? 'today' : day} at ${entry.opens}`;
    }
  }
  return 'Closed · see opening hours';
}

export interface PhoneLinesState {
  open: boolean;
  label: string;
}

/**
 * Browser-only phone-lines status in the business time zone:
 * - While open: "Phones on now · until 5:30 pm"
 * - While closed: "Back on at 7:30 am today" / "Back on at 7:30 am Monday"
 * - Without a valid time zone: neutral fallback summary.
 */
export function phoneLinesStatus(
  hours: readonly OpeningHours[],
  timeZone: string,
  now = new Date(),
  fallback = 'Phones Mon–Fri 7:30–5:30, Sat 8–12',
): PhoneLinesState {
  if (!timeZone) return { open: false, label: fallback };
  validateHours(hours);
  const local = localNow(timeZone, now);
  if (!local) return { open: false, label: fallback };
  const today = hours.find(entry => entry.day === DAYS[local.index])!;
  if (today.opens && today.closes && local.current >= minutes(today.opens) && local.current < minutes(today.closes)) {
    return { open: true, label: `Phones on now · until ${formatClock12(today.closes)}` };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(local.index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || local.current < minutes(entry.opens))) {
      const when = offset === 0 ? 'today' : day;
      return { open: false, label: `Back on at ${formatClock12(entry.opens)} ${when}` };
    }
  }
  return { open: false, label: fallback };
}
