/**
 * Service areas plotted on the tape measure, measured from Pack Square Park in downtown Asheville.
 *
 * Core areas are 8 miles or less (no trip charge).
 * Extended areas are more than 8 miles and carry the `extended-trip` charge from content/rates.ts.
 */

export type ServiceZone = 'core' | 'extended';

export interface ServiceArea {
  /** Stable URL-safe identifier. */
  id: string;
  /** Neighborhood or town name. */
  name: string;
  /** Approximate road distance from Pack Square Park (0–20 miles, up to one decimal). */
  miles: number;
  /** 'core' (<= 8 mi) or 'extended' (> 8 mi). */
  zone: ServiceZone;
}

export const CORE_RADIUS_MILES = 8;

export const serviceAreas: readonly ServiceArea[] = [
  { id: 'downtown', name: 'Downtown', miles: 0.5, zone: 'core' },
  { id: 'montford', name: 'Montford', miles: 1.2, zone: 'core' },
  { id: 'kenilworth', name: 'Kenilworth', miles: 2.0, zone: 'core' },
  { id: 'west-asheville', name: 'West Asheville', miles: 2.5, zone: 'core' },
  { id: 'north-asheville', name: 'North Asheville', miles: 3.0, zone: 'core' },
  { id: 'oakley', name: 'Oakley', miles: 3.5, zone: 'core' },
  { id: 'east-asheville', name: 'East Asheville', miles: 4.0, zone: 'core' },
  { id: 'haw-creek', name: 'Haw Creek', miles: 4.5, zone: 'core' },
  { id: 'biltmore-park', name: 'Biltmore Park', miles: 7.0, zone: 'core' },
  { id: 'weaverville', name: 'Weaverville', miles: 9.0, zone: 'extended' },
  { id: 'candler', name: 'Candler', miles: 9.0, zone: 'extended' },
  { id: 'arden', name: 'Arden', miles: 9.5, zone: 'extended' },
  { id: 'fairview', name: 'Fairview', miles: 11.0, zone: 'extended' },
  { id: 'black-mountain', name: 'Black Mountain', miles: 15.0, zone: 'extended' },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Validate service areas with item-specific errors. */
export function validateAreas(list: readonly ServiceArea[] = serviceAreas): void {
  const seen = new Set<string>();
  for (const area of list) {
    if (!URL_SAFE_ID.test(area.id)) {
      throw new Error(`areas.${area.id}: ID must be lowercase URL-safe`);
    }
    if (seen.has(area.id)) {
      throw new Error(`areas.${area.id}: duplicate area ID`);
    }
    seen.add(area.id);
    if (!area.name.trim()) {
      throw new Error(`areas.${area.id}: name is required`);
    }
    if (!Number.isFinite(area.miles) || area.miles < 0 || area.miles > 20) {
      throw new Error(`areas.${area.id}: miles (${area.miles}) must be between 0 and 20`);
    }
    if (Math.abs(Math.round(area.miles * 10) - area.miles * 10) > 1e-9) {
      throw new Error(`areas.${area.id}: miles (${area.miles}) may have at most one decimal place`);
    }
    if (area.zone === 'core' && area.miles > CORE_RADIUS_MILES) {
      throw new Error(`areas.${area.id}: core area (${area.miles} mi) must be ${CORE_RADIUS_MILES} miles or less`);
    }
    if (area.zone === 'extended' && area.miles <= CORE_RADIUS_MILES) {
      throw new Error(`areas.${area.id}: extended area (${area.miles} mi) must be more than ${CORE_RADIUS_MILES} miles`);
    }
  }
}
