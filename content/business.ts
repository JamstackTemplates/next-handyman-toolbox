import type { OpeningHours } from '../lib/hours.ts';

/** Shared business details for Odd Jobs & Co. Handyman (fictitious gallery sample). */
export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short wordmark displayed in the header and OG art. */
  shortName: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and schema. */
  introduction: string;
  /** Public contact email address, always visible alongside the enquiry form. */
  email: string;
  /** Public telephone number. */
  phone: string;
  /** The people who run the van and answer the phone. */
  people: string[];
  /** City and state served. */
  city: string;
  /** Public landmark used as the zero-mile origin for the service area. */
  landmark: string;
  /** Seven same-day phone and working-hours entries (Monday through Sunday). */
  hours: readonly OpeningHours[];
  /** Neutral static summary shown before JavaScript runs or without a time zone. */
  hoursSummary: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Enquiry wording — never implies a visit, price or time is confirmed by sending. */
    introduction: string;
    /** Checklist of details to include in the message body (not extra form fields). */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Odd Jobs & Co. Handyman',
  shortName: 'Odd Jobs & Co.',
  tagline: 'No job too small.',
  introduction:
    'Odd Jobs & Co. is an Asheville handyman for the small jobs: hanging, mounting, flat-pack, patching, doors and outdoor fixes at $68 an hour, billed by the quarter hour.',
  email: 'hello@oddjobsandco.example',
  phone: '(828) 555-0163',
  people: ['Rosa Delgado', 'Hank Pruitt'],
  city: 'Asheville, NC',
  landmark: 'Pack Square Park',
  hours: [
    { day: 'Monday', opens: '07:30', closes: '17:30' },
    { day: 'Tuesday', opens: '07:30', closes: '17:30' },
    { day: 'Wednesday', opens: '07:30', closes: '17:30' },
    { day: 'Thursday', opens: '07:30', closes: '17:30' },
    { day: 'Friday', opens: '07:30', closes: '17:30' },
    { day: 'Saturday', opens: '08:00', closes: '12:00' },
    { day: 'Sunday' },
  ],
  hoursSummary: 'Phones Mon–Fri 7:30–5:30, Sat 8–12',
  enquiries: {
    title: 'Send us your job list.',
    introduction:
      "We'll reply with a rough estimate and a visit window. Nothing is booked until we've confirmed a time with you.",
    usefulToInclude: [
      'Each job, one per line, with sizes or counts (for example "3 shelves, 1 mirror")',
      'Your neighborhood or nearest cross streets (no full address needed yet)',
      "Photos can't be attached here, so describe what's there or say you can text photos once we reply",
      'Who supplies the parts (TV bracket, paint, blinds)',
      "Days or times that suit, and a phone number if you'd like a call",
    ],
  },
};
