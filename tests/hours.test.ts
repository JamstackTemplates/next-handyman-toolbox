import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, phoneLinesStatus, validateHours, type OpeningHours } from '../lib/hours.ts';

const sampleHours: OpeningHours[] = DAYS.map(day => (day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' }));
const atSample = (date: string, zone = 'America/New_York') => openingLabel(sampleHours, zone, new Date(date));
const atPhone = (date: string, zone = 'America/New_York') => phoneLinesStatus(business.hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(atSample('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(atSample('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('handyman phone-lines status in America/New_York handles exact boundaries, Saturday close and Sunday closed', () => {
  // Monday 2026-11-16 (EST = UTC-5)
  assert.deepEqual(atPhone('2026-11-16T12:29:00Z'), { open: false, label: 'Back on at 7:30 am today' });
  assert.deepEqual(atPhone('2026-11-16T12:30:00Z'), { open: true, label: 'Phones on now · until 5:30 pm' });
  assert.deepEqual(atPhone('2026-11-16T22:29:00Z'), { open: true, label: 'Phones on now · until 5:30 pm' });
  assert.deepEqual(atPhone('2026-11-16T22:30:00Z'), { open: false, label: 'Back on at 7:30 am Tuesday' });

  // Saturday 2026-11-21 (EST = UTC-5): 08:00-12:00
  assert.deepEqual(atPhone('2026-11-21T13:00:00Z'), { open: true, label: 'Phones on now · until 12:00 pm' });
  assert.deepEqual(atPhone('2026-11-21T17:00:00Z'), { open: false, label: 'Back on at 7:30 am Monday' });

  // Sunday 2026-11-22: closed all day
  assert.deepEqual(atPhone('2026-11-22T15:00:00Z'), { open: false, label: 'Back on at 7:30 am Monday' });
});

test('DST transitions on 2026-03-08 (spring forward) and 2026-11-01 (fall back) preserve America/New_York local times', () => {
  // Sunday 2026-03-08 (DST starts 02:00 -> 03:00 EDT = UTC-4)
  assert.deepEqual(atPhone('2026-03-08T15:00:00Z'), { open: false, label: 'Back on at 7:30 am Monday' });
  // Monday 2026-03-09 in EDT (UTC-4): 07:30 EDT = 11:30Z
  assert.deepEqual(atPhone('2026-03-09T11:29:00Z'), { open: false, label: 'Back on at 7:30 am today' });
  assert.deepEqual(atPhone('2026-03-09T11:30:00Z'), { open: true, label: 'Phones on now · until 5:30 pm' });

  // Sunday 2026-11-01 (DST ends 02:00 -> 01:00 EST = UTC-5)
  assert.deepEqual(atPhone('2026-11-01T15:00:00Z'), { open: false, label: 'Back on at 7:30 am Monday' });
  // Monday 2026-11-02 in EST (UTC-5): 07:30 EST = 12:30Z
  assert.deepEqual(atPhone('2026-11-02T12:29:00Z'), { open: false, label: 'Back on at 7:30 am today' });
  assert.deepEqual(atPhone('2026-11-02T12:30:00Z'), { open: true, label: 'Phones on now · until 5:30 pm' });

  // Missing / invalid zones stay neutral
  assert.equal(atPhone('2026-11-16T15:00:00Z', '').label, business.hoursSummary);
  assert.equal(atPhone('2026-11-16T15:00:00Z', 'Mars/Base').label, business.hoursSummary);
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(business.hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(sampleHours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
