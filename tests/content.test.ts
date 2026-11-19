import assert from 'node:assert/strict';
import { test } from 'node:test';
import { serviceAreas, validateAreas } from '../content/areas.ts';
import { business } from '../content/business.ts';
import { jobCategories, jobs, licensedExclusions, validateJobs } from '../content/jobs.ts';
import { quarterHourRate, rates, validateRates } from '../content/rates.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields and valid hours', () => {
  for (const key of ['name', 'shortName', 'tagline', 'introduction', 'email', 'phone', 'landmark'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.people.length >= 1, 'business.people: at least one person');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 4, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assert.doesNotThrow(() => validateHours(business.hours));
});

test('rates content passes validation and rejects bad prices with item-specific errors', () => {
  assert.doesNotThrow(() => validateRates(rates));
  assert.equal(quarterHourRate(rates), 17);

  // Hourly not divisible by 4
  assert.throws(
    () => validateRates(rates.map(r => (r.id === 'hourly' ? { ...r, price: 70 } : r))),
    /rates\.hourly.*divisible by 4/,
  );
  // Half-day not cheaper than 4x hourly
  assert.throws(
    () => validateRates(rates.map(r => (r.id === 'half-day' ? { ...r, price: 272 } : r))),
    /rates\.half-day.*less than/,
  );
  // Full-day not cheaper than 8x hourly
  assert.throws(
    () => validateRates(rates.map(r => (r.id === 'full-day' ? { ...r, price: 544 } : r))),
    /rates\.full-day.*less than/,
  );
  // Non-integer price
  assert.throws(
    () => validateRates(rates.map(r => (r.id === 'extended-trip' ? { ...r, price: 15.5 } : r))),
    /rates\.extended-trip.*integer/,
  );
});

test('jobs content passes validation and rejects invalid items with item-specific errors', () => {
  assert.doesNotThrow(() => validateJobs(jobCategories, jobs));
  assert.equal(jobs.length, 27);
  assert.equal(jobs.filter(j => j.popular).length, 8);
  assert.equal(licensedExclusions.length, 6);

  // Unknown category
  assert.throws(
    () => validateJobs(jobCategories, jobs.map(j => (j.id === 'mount-tv' ? { ...j, category: 'bogus' } : j))),
    /jobs\.mount-tv.*unknown category/,
  );
  // Bad step (not 0.25)
  assert.throws(
    () => validateJobs(jobCategories, jobs.map(j => (j.id === 'mount-tv' ? { ...j, hoursMin: 1.1 } : j))),
    /jobs\.mount-tv.*0\.25/,
  );
  // min > max
  assert.throws(
    () => validateJobs(jobCategories, jobs.map(j => (j.id === 'mount-tv' ? { ...j, hoursMin: 3, hoursMax: 2 } : j))),
    /jobs\.mount-tv.*cannot exceed/,
  );
  // Duplicate job ID
  assert.throws(
    () => validateJobs(jobCategories, [...jobs, { ...jobs[0], popular: false }]),
    /jobs\.hang-pictures.*duplicate/,
  );
  // Wrong popular count
  assert.throws(
    () => validateJobs(jobCategories, jobs.map(j => (j.id === 'mount-tv' ? { ...j, popular: false } : j))),
    /exactly 8 popular jobs/,
  );
});

test('service areas pass validation and enforce the 8-mile core/extended boundary', () => {
  assert.doesNotThrow(() => validateAreas(serviceAreas));

  // Core area > 8 miles
  assert.throws(
    () => validateAreas(serviceAreas.map(a => (a.id === 'biltmore-park' ? { ...a, miles: 8.5 } : a))),
    /areas\.biltmore-park.*8 miles or less/,
  );
  // Extended area <= 8 miles
  assert.throws(
    () => validateAreas(serviceAreas.map(a => (a.id === 'arden' ? { ...a, miles: 8.0 } : a))),
    /areas\.arden.*more than 8 miles/,
  );
  // Duplicate ID
  assert.throws(
    () => validateAreas([...serviceAreas, serviceAreas[0]]),
    /areas\.downtown.*duplicate/,
  );
});

test('structured data emits HomeAndConstructionBusiness with derived areas, hours, offers and no street address', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'HomeAndConstructionBusiness');
  assert.equal(schema.priceRange, '$$');
  assert.equal('address' in schema, false);
  assert.equal(schema.areaServed.length, serviceAreas.length);
  assert.equal(schema.openingHoursSpecification.length, 6);
  assert.equal(schema.makesOffer[0].price, '68');
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
