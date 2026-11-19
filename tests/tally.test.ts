import assert from 'node:assert/strict';
import { test } from 'node:test';
import { jobs, type JobItem } from '../content/jobs.ts';
import { quarterHourRate, rates } from '../content/rates.ts';
import { calculateTally, formatTallyPlainText, roundQuarterHour } from '../lib/tally.ts';

const byId = (id: string): JobItem => {
  const found = jobs.find(j => j.id === id);
  assert.ok(found, `missing job ${id}`);
  return found;
};

test('quarter-hour rounding rounds to nearest 0.25', () => {
  assert.equal(roundQuarterHour(1.1), 1);
  assert.equal(roundQuarterHour(1.13), 1.25);
  assert.equal(roundQuarterHour(2.5), 2.5);
  assert.equal(roundQuarterHour(3.74), 3.75);
});

test('first-hour minimum applies to small totals under 1 hour', () => {
  const smallJob = byId('showerhead-swap'); // 0.5-1 hr
  const result = calculateTally([smallJob], rates);
  assert.equal(result.hoursMin, 0.5);
  assert.equal(result.hoursMax, 1);
  assert.equal(result.minimumApplied, true);
  assert.equal(result.labourMin, 68);
  assert.equal(result.labourMax, 68);
  assert.equal(result.blockHint, null);
});

test('block hints appear at 4 hours (half-day) and 8 hours (full-day) when block is cheaper', () => {
  // 2 jobs totalling 2.5–4.5 hrs -> half-day ($255 < $306)
  const halfList = [byId('hang-pictures'), byId('mount-tv')]; // 1-2 + 1.5-2.5 = 2.5-4.5
  const halfResult = calculateTally(halfList, rates);
  assert.equal(halfResult.hoursMin, 2.5);
  assert.equal(halfResult.hoursMax, 4.5);
  assert.equal(halfResult.labourMin, 170);
  assert.equal(halfResult.labourMax, 306);
  assert.equal(halfResult.blockHint?.id, 'half-day');
  assert.equal(halfResult.blockHint?.price, 255);

  // 2 larger jobs totalling 5–10 hrs -> full-day ($490 < $680)
  const fullList = [byId('feature-wall'), byId('deck-boards')]; // 3-6 + 2-4 = 5-10
  const fullResult = calculateTally(fullList, rates);
  assert.equal(fullResult.hoursMax, 10);
  assert.equal(fullResult.blockHint?.id, 'full-day');
  assert.equal(fullResult.blockHint?.price, 490);
});

test('changing the hourly rate updates quarter-hour price and tally totals', () => {
  const updatedRates = rates.map(r => (r.id === 'hourly' ? { ...r, price: 72 } : r));
  assert.equal(quarterHourRate(updatedRates), 18);

  const result = calculateTally([byId('hang-pictures'), byId('door-hardware')], updatedRates); // 1.5-3.5 hrs
  assert.equal(result.hoursMin, 1.5);
  assert.equal(result.hoursMax, 3.5);
  assert.equal(result.labourMin, 108); // 1.5 * 72
  assert.equal(result.labourMax, 252); // 3.5 * 72
});

test('plain-text formatter lists chosen jobs, hours and rough labour guide', () => {
  const text = formatTallyPlainText([byId('hang-pictures'), byId('sticking-door')], rates);
  assert.match(text, /Hang pictures, mirrors or a gallery wall/);
  assert.match(text, /Fix a sticking or sagging door/);
  assert.match(text, /2–4 hrs/);
  assert.match(text, /\$136–\$272/);
});
