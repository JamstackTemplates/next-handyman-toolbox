# Odd Jobs & Co. Handyman (`next-handyman-toolbox`)

A Jamstacks Next.js static website template for handymen and odd-job services: a "No job too small" pegboard-and-toolbox theme with a 27-job parts-bin list, an interactive rough labour tally, hourly rates on a punch-clock time card, a tape-measure service area around Pack Square Park, live phone-lines hours in `America/New_York`, and the hosted Jamstacks support form for job enquiries.

All sample business details (`Odd Jobs & Co. Handyman`, Rosa Delgado, Hank Pruitt, `hello@oddjobsandco.example`, `(828) 555-0163`) are fictitious gallery data.

## Preview locally

Requires Node 24+ and npm.

```sh
npm ci
npm run dev
```

For a static production preview:

```sh
npm run check
npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: pegboard hero with hanging rate tag, fridge list, pegboard tool wall, 3-step tape measure, rates teaser, service area & hours clipboard, licensed-trades exclusions, open toolbox CTA, and `HomeAndConstructionBusiness` JSON-LD |
| `/jobs/` | All 27 jobs grouped in six parts-bin drawers, tool-rail category filter with URL hash deep-linking (`/jobs/#assemble`), sticky job-tally clipboard (mobile bottom bar) and plain-text copy for enquiries |
| `/rates/` | Full punch-clock time card, half-day & full-day block tags, curled hardware-store receipt, service-area tape measure, hours clipboard and sticky-note FAQ |
| `/contact/` | Hosted `<jamstacks-support-form>` when configured (or visible email fallback), masking-tape email/phone, "What to put in your message" notepad checklist and hours clipboard |
| `/404.html` | "This one's gone walkabout" pegboard 404 page |

## Make it yours (file ownership)

| File | Owns |
| --- | --- |
| `content/business.ts` | Business name, tagline, email, phone, people, landmark, weekly phone hours and enquiry checklist |
| `content/rates.ts` | Single source of truth for hourly rate (`$68`), half-day (`$255`), full-day (`$490`), extended-zone trip (`$15`), billing policies and derived quarter-hour/first-hour rates |
| `content/jobs.ts` | Six job categories, 27 jobs (with `hoursMin`/`hoursMax` in 0.25 steps and 8 `popular` fridge-list jobs) and the 6 licensed-trades exclusions |
| `content/areas.ts` | Service areas, distances from the landmark and 8-mile core/extended boundary |
| `app/page.tsx`, `app/jobs/page.tsx`, `app/rates/page.tsx`, `app/contact/page.tsx` | Page-specific headings, prose, labels and calls to action |
| `site.config.json` | Public name, description, hostname, `timeZone` (`America/New_York`) and Jamstacks `siteId`/`cdnUrl` |
| `app/tailwind.input.css` | Light ("garage wall by daylight") and dark ("workshop after hours") tokens, pegboard/plywood/enamel/steel textures, print styles and `--jamstacks-*` variables |
| `components/artwork.tsx` | All inline SVG workshop illustrations (hero wall scene, 6 tools + painted outlines, rate tag, tape measure, icons, 404 art) |
| `lib/tally.ts` | Job tally quarter-hour rounding, first-hour minimum, half-day/full-day block hints and plain-text formatter |
| `lib/hours.ts` | Weekly hours validation, `America/New_York` phone-lines status and DST-safe formatting |
| `lib/structured-data.ts` | `HomeAndConstructionBusiness` JSON-LD derived from `content/` |
| `app/sitemap.ts` | Public routes (`/`, `/jobs/`, `/rates/`, `/contact/`) |

### Common owner edits

- **Change the hourly rate:** edit `hourly` in `content/rates.ts` (must be a positive whole-dollar integer divisible by 4, e.g. `72`). The hero rate tag, time card, derived quarter-hour price (`$18`), job tally totals and JSON-LD schema update automatically.
- **Add or update a job:** edit `jobs` in `content/jobs.ts` (`hoursMin`/`hoursMax` in 0.25 steps between 0.5 and 8; keep exactly 8 `popular: true` jobs for the Home fridge list). Run `npm test` to validate IDs, categories and bounds.
- **Update hours or service areas:** edit `business.hours` in `content/business.ts` (same-day `HH:MM` intervals) or `serviceAreas` in `content/areas.ts` (core <= 8 miles, extended > 8 miles).
- **Rename the business:** update `business.name`/`shortName` in `content/business.ts` and `name` in `site.config.json`.

## Fonts & licences

All fonts are self-hosted via npm (no external font requests):

- **Bricolage Grotesque Variable** (`@fontsource-variable/bricolage-grotesque`, SIL Open Font License 1.1) — display headings, wordmark, numerals and rates
- **Figtree Variable** (`@fontsource-variable/figtree`, SIL Open Font License 1.1) — body copy and UI
- **Permanent Marker** (`@fontsource/permanent-marker`, Apache License 2.0) — short masking-tape labels, fridge list and tally hours

## Public configuration & Contact contract

`site.config.json` keeps the Jamstacks provisioner shape (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`). Never put business data or credentials in `site.config.json`.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

`<jamstacks-support-form>` and `{cdn}/sites/{siteId}/embed.js` render only on `/contact/` when a site ID is configured; without one, `/contact/` shows the email fallback with no embed request. Public email is always visible. Contact navigation uses full-document loads via `SiteLink`.

## Checks, deployment & gallery assets

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

`.github/workflows/pages.yml` builds and publishes static exports to GitHub Pages while preserving the `provisioning_id` dispatch contract. `jamstacks/` is removable gallery metadata tested separately with `node --test jamstacks/config.test.mjs`. Customer sites can delete `jamstacks/`, `plan/` and `.claude/skills/`.
