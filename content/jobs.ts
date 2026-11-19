/**
 * Job categories, the 27 small jobs with typical hours, and the licensed-trades exclusions.
 *
 * Owner edits: add or update jobs here. Run `npm test` to verify IDs, category references,
 * quarter-hour steps (0.25), bounds (0.5–8 hours) and the eight popular fridge-list jobs.
 */

export type ToolKey = 'hammer' | 'hex-key' | 'paintbrush' | 'screwdriver' | 'wrench' | 'saw';

export interface JobCategory {
  /** Stable URL-safe identifier, also used as the /jobs/#<id> anchor. */
  id: string;
  /** Category title shown on the pegboard label and parts-bin drawer front. */
  name: string;
  /** Tool silhouette drawn on the pegboard wall and category filter. */
  tool: ToolKey;
  /** Short one-line summary for the drawer header and tool wall. */
  blurb: string;
}

export interface JobItem {
  /** Stable URL-safe unique identifier. */
  id: string;
  /** Must match a `JobCategory.id`. */
  category: string;
  /** Plain-English job description. */
  title: string;
  /** Minimum typical duration in hours (0.25 steps, 0.5–8). */
  hoursMin: number;
  /** Maximum typical duration in hours (0.25 steps, 0.5–8, >= hoursMin). */
  hoursMax: number;
  /** Popular jobs appear on the Home fridge list; there must be exactly eight. */
  popular?: boolean;
  /** Optional short qualifier shown below the title. */
  note?: string;
}

export type ExclusionIcon = 'wiring' | 'gas' | 'plumbing' | 'roofing' | 'structural' | 'hvac';

export interface LicensedExclusion {
  id: ExclusionIcon;
  label: string;
  detail: string;
}

export const jobCategories: readonly JobCategory[] = [
  {
    id: 'hang-mount',
    name: 'Hang & mount',
    tool: 'hammer',
    blurb: 'Pictures, mirrors, shelves, TVs and rods, level and anchored properly.',
  },
  {
    id: 'assemble',
    name: 'Flat-pack & assembly',
    tool: 'hex-key',
    blurb: 'Furniture out of the box and into the room, with the leftovers explained.',
  },
  {
    id: 'patch-paint',
    name: 'Patch, paint & caulk',
    tool: 'paintbrush',
    blurb: 'Holes, cracks, tired caulk and walls that need one more coat.',
  },
  {
    id: 'doors-windows',
    name: 'Doors, drawers & windows',
    tool: 'screwdriver',
    blurb: 'Sticking, sagging, draughty and squeaky, sorted.',
  },
  {
    id: 'fixtures',
    name: 'Fixtures & small swaps',
    tool: 'wrench',
    blurb: "Like-for-like swaps that don't need a licensed trade.",
  },
  {
    id: 'outdoor',
    name: 'Outdoor & seasonal',
    tool: 'saw',
    blurb: 'Fences, gates, decks, gutters and the mailbox post.',
  },
];

export const jobs: readonly JobItem[] = [
  // Hang & mount
  { id: 'hang-pictures', category: 'hang-mount', title: 'Hang pictures, mirrors or a gallery wall', hoursMin: 1, hoursMax: 2, popular: true, note: 'Up to 10 pieces' },
  { id: 'mount-tv', category: 'hang-mount', title: 'Mount a TV on drywall or brick', hoursMin: 1.5, hoursMax: 2.5, popular: true, note: 'Up to 65"; you supply the bracket' },
  { id: 'put-up-shelves', category: 'hang-mount', title: 'Put up floating or bracket shelves', hoursMin: 1, hoursMax: 2.5, popular: true },
  { id: 'curtains-blinds', category: 'hang-mount', title: 'Install curtain rods or blinds', hoursMin: 1, hoursMax: 2, note: 'Up to 4 windows' },
  { id: 'babyproofing', category: 'hang-mount', title: 'Babyproofing: latches, gates and furniture anchors', hoursMin: 1.5, hoursMax: 3 },

  // Flat-pack & assembly
  { id: 'assemble-dresser', category: 'assemble', title: 'Assemble a dresser or wardrobe', hoursMin: 1.5, hoursMax: 3, popular: true },
  { id: 'assemble-bed', category: 'assemble', title: 'Assemble a bed frame', hoursMin: 1, hoursMax: 2 },
  { id: 'assemble-desk', category: 'assemble', title: 'Assemble a desk and office chair', hoursMin: 1, hoursMax: 2 },
  { id: 'assemble-patio', category: 'assemble', title: 'Assemble a grill or patio set', hoursMin: 1.5, hoursMax: 3 },

  // Patch, paint & caulk
  { id: 'patch-drywall', category: 'patch-paint', title: 'Patch drywall holes, ready for paint', hoursMin: 1, hoursMax: 2, popular: true, note: 'Paint may need a second short visit' },
  { id: 'recaulk-tub', category: 'patch-paint', title: 'Re-caulk a tub or shower', hoursMin: 1.5, hoursMax: 2.5, popular: true },
  { id: 'feature-wall', category: 'patch-paint', title: 'Paint a feature wall or touch up trim', hoursMin: 3, hoursMax: 6, note: 'You choose the paint' },
  { id: 'regrout-backsplash', category: 'patch-paint', title: 'Regrout a small backsplash', hoursMin: 2, hoursMax: 4 },

  // Doors, drawers & windows
  { id: 'sticking-door', category: 'doors-windows', title: 'Fix a sticking or sagging door', hoursMin: 1, hoursMax: 2, popular: true },
  { id: 'door-hardware', category: 'doors-windows', title: 'Swap door handles and hinges', hoursMin: 0.5, hoursMax: 1.5, note: 'Not lock rekeying' },
  { id: 'weatherstrip', category: 'doors-windows', title: 'Weatherstrip doors and windows', hoursMin: 1, hoursMax: 2.5 },
  { id: 'window-screens', category: 'doors-windows', title: 'Repair or replace window screens', hoursMin: 1, hoursMax: 2 },
  { id: 'cabinet-adjust', category: 'doors-windows', title: 'Adjust cabinet doors and drawer runners', hoursMin: 1, hoursMax: 2 },

  // Fixtures & small swaps
  { id: 'showerhead-swap', category: 'fixtures', title: 'Swap a showerhead or faucet aerator', hoursMin: 0.5, hoursMax: 1, note: 'Like-for-like only' },
  { id: 'toilet-seat-flapper', category: 'fixtures', title: 'Replace a toilet seat or flapper', hoursMin: 0.5, hoursMax: 1 },
  { id: 'grab-bars', category: 'fixtures', title: 'Install grab bars into studs or blocking', hoursMin: 1, hoursMax: 2 },
  { id: 'cabinet-pulls', category: 'fixtures', title: 'Swap cabinet knobs and pulls', hoursMin: 1, hoursMax: 2 },
  { id: 'smoke-alarm-batteries', category: 'fixtures', title: 'Change smoke alarm batteries or battery-only alarms', hoursMin: 0.5, hoursMax: 1, note: 'Hard-wired alarms go to an electrician' },

  // Outdoor & seasonal
  { id: 'fence-gate', category: 'outdoor', title: 'Fix a loose fence board or gate latch', hoursMin: 1, hoursMax: 2, popular: true },
  { id: 'deck-boards', category: 'outdoor', title: 'Replace a few deck boards', hoursMin: 2, hoursMax: 4 },
  { id: 'gutter-clean', category: 'outdoor', title: 'Clean gutters', hoursMin: 2, hoursMax: 3, note: 'Single-story homes only' },
  { id: 'mailbox-post', category: 'outdoor', title: 'Install or replace a mailbox post', hoursMin: 1.5, hoursMax: 3 },
];

export const licensedExclusions: readonly LicensedExclusion[] = [
  { id: 'wiring', label: 'Electrical wiring', detail: 'No new circuits, panels or hard-wired fixtures.' },
  { id: 'gas', label: 'Gas lines & appliances', detail: 'Leave every gas fitting to a licensed gas tech.' },
  { id: 'plumbing', label: 'Permitted plumbing', detail: 'No water heaters, new supply lines or drain rough-ins.' },
  { id: 'roofing', label: 'Roofing', detail: 'No shingle repairs, flashing or steep roof work.' },
  { id: 'structural', label: 'Structural work', detail: 'No load-bearing walls, beams or foundation repairs.' },
  { id: 'hvac', label: 'HVAC', detail: 'No furnaces, heat pumps, ductwork or refrigerant.' },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isQuarterStep = (value: number) => Number.isFinite(value) && Math.abs(Math.round(value * 4) - value * 4) < 1e-9;

/** Format a typical hours range cleanly, e.g. "1–2 hrs" or "0.5–1 hr". */
export function formatHoursRange(min: number, max: number): string {
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2))));
  if (min === max) return `${fmt(min)} ${min === 1 ? 'hr' : 'hrs'}`;
  return `${fmt(min)}–${fmt(max)} hrs`;
}

/** Validate categories and jobs with item-specific failures. */
export function validateJobs(
  categoryList: readonly JobCategory[] = jobCategories,
  jobList: readonly JobItem[] = jobs,
): void {
  const categoryIds = new Set<string>();
  for (const cat of categoryList) {
    if (!URL_SAFE_ID.test(cat.id)) {
      throw new Error(`jobCategories.${cat.id}: ID must be lowercase URL-safe`);
    }
    if (categoryIds.has(cat.id)) {
      throw new Error(`jobCategories.${cat.id}: duplicate category ID`);
    }
    categoryIds.add(cat.id);
    if (!cat.name.trim()) throw new Error(`jobCategories.${cat.id}: name is required`);
    if (!cat.blurb.trim()) throw new Error(`jobCategories.${cat.id}: blurb is required`);
  }

  const jobIds = new Set<string>();
  let popularCount = 0;

  for (const job of jobList) {
    if (!URL_SAFE_ID.test(job.id)) {
      throw new Error(`jobs.${job.id}: ID must be lowercase URL-safe`);
    }
    if (jobIds.has(job.id)) {
      throw new Error(`jobs.${job.id}: duplicate job ID`);
    }
    if (categoryIds.has(job.id)) {
      throw new Error(`jobs.${job.id}: job ID collides with a category ID`);
    }
    jobIds.add(job.id);

    if (!job.title.trim()) {
      throw new Error(`jobs.${job.id}: title is required`);
    }
    if (!categoryIds.has(job.category)) {
      throw new Error(`jobs.${job.id}: unknown category "${job.category}"`);
    }
    if (!isQuarterStep(job.hoursMin) || job.hoursMin < 0.5 || job.hoursMin > 8) {
      throw new Error(`jobs.${job.id}: hoursMin (${job.hoursMin}) must be in 0.25 steps between 0.5 and 8`);
    }
    if (!isQuarterStep(job.hoursMax) || job.hoursMax < 0.5 || job.hoursMax > 8) {
      throw new Error(`jobs.${job.id}: hoursMax (${job.hoursMax}) must be in 0.25 steps between 0.5 and 8`);
    }
    if (job.hoursMin > job.hoursMax) {
      throw new Error(`jobs.${job.id}: hoursMin (${job.hoursMin}) cannot exceed hoursMax (${job.hoursMax})`);
    }
    if (job.popular) popularCount++;
  }

  if (popularCount !== 8) {
    throw new Error(`jobs: expected exactly 8 popular jobs for the Home fridge list (found ${popularCount})`);
  }
}
