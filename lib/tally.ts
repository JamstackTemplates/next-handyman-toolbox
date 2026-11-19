import { formatHoursRange, type JobItem } from '../content/jobs.ts';
import { formatDollars, getRate, hourlyRate, rates as defaultRates, type RateItem } from '../content/rates.ts';

export interface BlockSuggestion {
  id: 'half-day' | 'full-day';
  label: string;
  price: number;
  hours: number;
  savingsNote: string;
}

export interface TallyResult {
  count: number;
  hoursMin: number;
  hoursMax: number;
  labourMin: number;
  labourMax: number;
  minimumApplied: boolean;
  blockHint: BlockSuggestion | null;
}

/** Round hours to the nearest quarter hour (0.25). */
export function roundQuarterHour(hours: number): number {
  return Math.round(hours * 4) / 4;
}

/**
 * Compute the rough labour guide for a list of selected jobs.
 * - Totals are rounded to 0.25-hour increments.
 * - First-hour minimum equals the hourly rate (when min or max is under 1 hour).
 * - Suggests the full-day or half-day block when `hoursMax` reaches 8 or 4 hours
 *   and the block price is cheaper than the equivalent hourly labour.
 */
export function calculateTally(
  selectedJobs: readonly JobItem[],
  rateList: readonly RateItem[] = defaultRates,
): TallyResult {
  if (selectedJobs.length === 0) {
    return {
      count: 0,
      hoursMin: 0,
      hoursMax: 0,
      labourMin: 0,
      labourMax: 0,
      minimumApplied: false,
      blockHint: null,
    };
  }

  const hourly = hourlyRate(rateList);
  const rawMin = selectedJobs.reduce((sum, job) => sum + job.hoursMin, 0);
  const rawMax = selectedJobs.reduce((sum, job) => sum + job.hoursMax, 0);
  const hoursMin = roundQuarterHour(rawMin);
  const hoursMax = roundQuarterHour(rawMax);

  const minimumApplied = hoursMin < 1 || hoursMax < 1;
  const billedMinHours = Math.max(1, hoursMin);
  const billedMaxHours = Math.max(1, hoursMax);

  const labourMin = Math.round(billedMinHours * hourly);
  const labourMax = Math.round(billedMaxHours * hourly);

  const halfDay = getRate('half-day', rateList);
  const fullDay = getRate('full-day', rateList);

  let blockHint: BlockSuggestion | null = null;
  if (hoursMax >= 8 && fullDay.price < labourMax) {
    blockHint = {
      id: 'full-day',
      label: fullDay.label,
      price: fullDay.price,
      hours: fullDay.hours ?? 8,
      savingsNote: `A ${fullDay.label.toLowerCase()} (${formatDollars(fullDay.price)} for 8 hrs) beats hourly at the top end.`,
    };
  } else if (hoursMax >= 4 && halfDay.price < labourMax) {
    blockHint = {
      id: 'half-day',
      label: halfDay.label,
      price: halfDay.price,
      hours: halfDay.hours ?? 4,
      savingsNote: `A ${halfDay.label.toLowerCase()} (${formatDollars(halfDay.price)} for 4 hrs) beats hourly at the top end.`,
    };
  }

  return {
    count: selectedJobs.length,
    hoursMin,
    hoursMax,
    labourMin,
    labourMax,
    minimumApplied,
    blockHint,
  };
}

/** Plain-text job list formatted for pasting into the Contact message box. */
export function formatTallyPlainText(
  selectedJobs: readonly JobItem[],
  rateList: readonly RateItem[] = defaultRates,
): string {
  const tally = calculateTally(selectedJobs, rateList);
  if (tally.count === 0) return '';
  const lines = [
    'Job list for enquiry:',
    ...selectedJobs.map(job => `- ${job.title} (${formatHoursRange(job.hoursMin, job.hoursMax)})`),
    '',
    `Rough guide: ${formatHoursRange(tally.hoursMin, tally.hoursMax)} (${formatDollars(tally.labourMin)}–${formatDollars(tally.labourMax)} labour, materials extra).`,
  ];
  if (tally.blockHint) {
    lines.push(`Note: ${tally.blockHint.label} (${formatDollars(tally.blockHint.price)} / ${tally.blockHint.hours} hrs) may suit.`);
  }
  return lines.join('\n');
}
