import { serviceAreas } from '../content/areas.ts';
import { business } from '../content/business.ts';
import { getRate, hourlyRate, quarterHourRate } from '../content/rates.ts';
import { absoluteUrl } from './paths.ts';

/** HomeAndConstructionBusiness schema derived from content/business.ts, rates.ts and areas.ts. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const hourly = hourlyRate();
  const quarter = quarterHourRate();
  const halfDay = getRate('half-day');
  const fullDay = getRate('full-day');

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: business.name,
    description: `${business.shortName} is an Asheville handyman for the small jobs: hanging, mounting, flat-pack, patching, doors and outdoor fixes at $${hourly} an hour ($${quarter} per quarter hour after the first hour).`,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    priceRange: '$$',
    areaServed: serviceAreas.map(area => ({
      '@type': 'Place',
      name: `${area.name}, ${business.city}`,
    })),
    openingHoursSpecification: business.hours
      .filter(entry => entry.opens && entry.closes)
      .map(entry => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: entry.day,
        opens: entry.opens,
        closes: entry.closes,
      })),
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Hourly handyman labour',
        price: String(hourly),
        priceCurrency: 'USD',
        description: `$${hourly} per hour, first-hour minimum, then $${quarter} per quarter hour.`,
      },
      {
        '@type': 'Offer',
        name: halfDay.label,
        price: String(halfDay.price),
        priceCurrency: 'USD',
        description: `${halfDay.unit}. ${halfDay.rule}.`,
      },
      {
        '@type': 'Offer',
        name: fullDay.label,
        price: String(fullDay.price),
        priceCurrency: 'USD',
        description: `${fullDay.unit}. ${fullDay.rule}.`,
      },
    ],
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
