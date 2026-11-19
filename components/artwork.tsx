import { business } from '../content/business';
import type { ExclusionIcon, ToolKey } from '../content/jobs';
import { firstHourMinimum, formatDollars, hourlyRate, quarterHourRate } from '../content/rates';

/** Crisp trade-red toolbox emblem for the warehouse header wordmark. */
export function BrandMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
      <rect width="36" height="36" rx="6" fill="var(--accent)" />
      <path d="M13.5 13v-2a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="7.5" y="13" width="21" height="14.5" rx="2.5" stroke="#ffffff" strokeWidth="2.2" />
      <path d="M7.5 19.5h21" stroke="#ffffff" strokeWidth="1.8" />
      <rect x="15.5" y="17.5" width="5" height="4" rx="0.8" fill="#ffffff" />
    </svg>
  );
}

/**
 * Six crisp, architectural trade icons matching the six job categories.
 * Clean 1.8px technical stroke style suited to hardware-store department tiles.
 */
export function ToolIllustration({
  tool,
  className = 'h-7 w-7',
}: {
  tool: ToolKey;
  variant?: 'solid' | 'outline';
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {tool === 'hammer' && (
        <>
          <path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" />
          <path d="M17.64 15 22 10.64" />
          <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
        </>
      )}
      {tool === 'hex-key' && (
        <>
          <path d="M7 21V7a3 3 0 0 1 3-3h9v4h-8v13H7Z" />
          <circle cx="17" cy="16" r="3" />
          <path d="M17 14.5v3M15.5 16h3" />
        </>
      )}
      {tool === 'paintbrush' && (
        <>
          <path d="M18 3H6v6h12V3Z" />
          <path d="M6 9h12v3a2 2 0 0 1-2 2h-2v5a2 2 0 0 1-4 0v-5H8a2 2 0 0 1-2-2V9Z" />
          <path d="M10 3v3M14 3v3" />
        </>
      )}
      {tool === 'screwdriver' && (
        <>
          <path d="M14.5 3.5a2.12 2.12 0 0 1 3 3L14 10l-3-3 3.5-3.5Z" />
          <path d="m11 7-6.5 6.5L3 18l4.5-1.5L14 10" />
          <path d="m13 5 3 3" />
        </>
      )}
      {tool === 'wrench' && (
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
      )}
      {tool === 'saw' && (
        <>
          <path d="M4 17 18 3l3 3-2 2-1-1-2 2-1-1-2 2-1-1-2 2-1-1-2 2-1-1-2 2-2-2Z" />
          <path d="M4 17a3 3 0 0 0 4.24 4.24L10 19.5" />
        </>
      )}
    </svg>
  );
}

/**
 * Bunnings-inspired hardware shelf-edge price ticket.
 * Reads live hourly, first-hour minimum and quarter-hour rates from content/rates.ts.
 */
export function RateTag({ className = '' }: { className?: string }) {
  const rate = hourlyRate();
  const quarter = quarterHourRate();
  const minHour = firstHourMinimum();

  return (
    <div
      className={`overflow-hidden rounded-ui border border-line bg-surface text-ink shadow-[var(--shadow-md)] ${className}`}
      aria-label={`${formatDollars(rate)} per hour, ${formatDollars(minHour)} first-hour minimum, ${formatDollars(quarter)} per quarter hour after`}
    >
      <div className="flex items-center justify-between bg-accent px-4 py-1.5 text-on-accent">
        <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.12em]">Standard Trade Rate</span>
        <span className="text-[0.7rem] font-bold opacity-90">No call-out fee</span>
      </div>
      <div className="px-4 py-3.5">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display-tight text-5xl font-extrabold leading-none tracking-tight text-ink tabular-nums">
            {formatDollars(rate)}
          </span>
          <span className="text-sm font-bold text-muted">/ hour</span>
        </div>
        <p className="mt-2 border-t border-line pt-2 text-xs font-medium text-muted">
          <strong className="text-ink">{formatDollars(quarter)}</strong> per 15 min after the first hour ({formatDollars(minHour)} min).
        </p>
      </div>
    </div>
  );
}

const VAN_BODY =
  'M156 296V166q0-16 16-16h200q12 0 19 10l33 50q4 6 12 8l26 6q12 3 12 16v46q0 10-10 10Z';

/**
 * Golden-hour street scene for the home hero: the signwritten Odd Jobs & Co. van with a
 * ladder on the roof rack, parked below layered Blue Ridge ridges with a sawhorse, cone and
 * open toolbox on the curb. Van lettering reads from content/business.ts.
 */
export function HeroWallScene({ className = 'w-full h-auto' }: { className?: string }) {
  const rungs = Array.from({ length: 12 }, (_, i) => `M${176 + i * 18} 132v10`).join('');
  const teeth = Array.from({ length: 17 }, (_, i) => `l4 ${i % 2 === 0 ? 3 - i * 0.1 : -(2.7 - i * 0.1)}`).join('');

  return (
    <svg
      viewBox="0 0 560 360"
      fill="none"
      role="img"
      aria-label={`The ${business.shortName} van parked under the Blue Ridge with a ladder on the roof, a sawhorse and an open toolbox`}
      className={className}
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a4044" />
          <stop offset="0.6" stopColor="#14666b" />
          <stop offset="1" stopColor="#3f8a7f" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f6c64a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f6c64a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-van-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf9f4" />
          <stop offset="0.75" stopColor="#efebe2" />
          <stop offset="1" stopColor="#d9d3c6" />
        </linearGradient>
        <linearGradient id="hero-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bfe3e2" />
          <stop offset="1" stopColor="#5f9fa1" />
        </linearGradient>
        <clipPath id="hero-van-clip">
          <path d={VAN_BODY} />
        </clipPath>
      </defs>

      {/* Sky, low sun and a few clouds */}
      <rect width="560" height="360" fill="url(#hero-sky)" />
      <circle cx="420" cy="150" r="120" fill="url(#hero-glow)" />
      <circle cx="420" cy="150" r="44" fill="#f2bf3f" />
      <circle cx="420" cy="150" r="44" stroke="#f7d77c" strokeWidth="2" opacity="0.6" />
      <g fill="#ffffff" opacity="0.12">
        <path d="M196 78a14 14 0 0 1 26-6a11 11 0 0 1 18 8h-44Z" />
        <path d="M300 52a10 10 0 0 1 19-4a8 8 0 0 1 13 6h-32Z" />
        <path d="M470 70a12 12 0 0 1 22-5a9 9 0 0 1 15 7h-37Z" />
      </g>
      <g stroke="#08393d" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path d="M92 70q6-6 12 0q6-6 12 0" />
        <path d="M128 92q4-4 8 0q4-4 8 0" />
      </g>

      {/* Layered Blue Ridge ridgelines with pines */}
      <path d="M0 196C50 160 92 176 140 150C188 124 226 160 276 140C330 118 372 150 420 132C470 112 520 140 560 120V360H0Z" fill="#2c7a78" opacity="0.85" />
      <path d="M0 228C46 206 96 218 146 198C206 174 256 212 318 192C378 172 428 204 478 188C516 176 542 190 560 184V360H0Z" fill="#1b6264" />
      <path d="M0 258C64 242 136 254 206 238C294 220 376 250 456 236C508 228 540 238 560 232V360H0Z" fill="#0f4d51" />
      <g fill="#0b3f42">
        <path d="M22 252l9-26 9 26Z" />
        <path d="M38 254l7-20 7 20Z" />
        <path d="M58 250l10-30 10 30Z" />
        <path d="M488 240l9-26 9 26Z" />
        <path d="M506 240l7-19 7 19Z" />
        <path d="M522 238l10-30 10 30Z" />
      </g>

      {/* Street */}
      <rect y="286" width="560" height="74" fill="#1f2b2b" />
      <rect y="286" width="560" height="6" fill="#56635f" />
      <path d="M0 344H560" stroke="#e5b82e" strokeWidth="3" strokeDasharray="26 18" opacity="0.7" />
      <ellipse cx="316" cy="324" rx="178" ry="7" fill="#000000" opacity="0.35" />

      {/* Ladder on the roof rack */}
      <rect x="186" y="140" width="8" height="12" rx="1.5" fill="#3a4645" />
      <rect x="334" y="140" width="8" height="12" rx="1.5" fill="#3a4645" />
      <path d="M166 132H384M166 142H384" stroke="#c6cfce" strokeWidth="3" strokeLinecap="round" />
      <path d={rungs} stroke="#a9b4b3" strokeWidth="2" />

      {/* Van body, livery stripes and panel lines */}
      <path d={VAN_BODY} fill="url(#hero-van-body)" stroke="#1c2424" strokeWidth="2.5" />
      <g clipPath="url(#hero-van-clip)">
        <rect x="150" y="258" width="340" height="13" fill="var(--accent)" />
        <rect x="150" y="274" width="340" height="4" fill="#e5b82e" />
        <rect x="150" y="150" width="340" height="5" fill="#ffffff" opacity="0.7" />
      </g>
      <g stroke="#1c2424" strokeWidth="1.6" opacity="0.55">
        <path d="M366 156V292" />
        <path d="M170 156V292" opacity="0.5" />
      </g>

      {/* Cab window, handles, mirror, lights, bumpers */}
      <path d="M372 160h6q6 0 10 6l28 42q2 4-3 4h-41Z" fill="url(#hero-glass)" stroke="#1c2424" strokeWidth="2" />
      <path d="M380 166h14l-12 20h-6Z" fill="#ffffff" opacity="0.35" />
      <rect x="374" y="226" width="14" height="4" rx="2" fill="#1c2424" />
      <rect x="306" y="226" width="14" height="4" rx="2" fill="#1c2424" />
      <path d="M414 200h8q3 0 3 3v9q0 3-3 3h-8Z" fill="#1c2424" />
      <path d="M462 228h10q2 0 2 2v10h-12Z" fill="#f7d77c" stroke="#1c2424" strokeWidth="1.5" />
      <rect x="452" y="282" width="28" height="14" rx="4" fill="#2a3332" />
      <rect x="150" y="282" width="18" height="14" rx="4" fill="#2a3332" />
      <rect x="158" y="214" width="6" height="22" rx="2" fill="var(--accent)" stroke="#1c2424" strokeWidth="1.2" />

      {/* Signwriting */}
      <g transform="translate(180 178)">
        <rect width="34" height="34" rx="6" fill="var(--accent)" />
        <path d="M13 12v-2.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V12" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="7" y="12" width="20" height="14" rx="2.5" stroke="#ffffff" strokeWidth="2.2" />
        <path d="M7 18.5h20" stroke="#ffffff" strokeWidth="1.8" />
        <text x="44" y="15" fill="#1c2424" fontSize="17" fontWeight="800" letterSpacing="-0.3" fontFamily="var(--font-display)">
          {business.shortName.toUpperCase()}
        </text>
        <text x="44" y="30" fill="#526060" fontSize="8" fontWeight="700" letterSpacing="1" fontFamily="var(--font-sans)">
          HANDYMAN · {business.city.toUpperCase()}
        </text>
        <text x="0" y="62" fill="var(--accent)" fontSize="15" fontWeight="800" fontFamily="var(--font-sans)">
          {business.phone}
        </text>
        <text x="0" y="75" fill="#526060" fontSize="7.5" fontWeight="700" letterSpacing="1.4" fontFamily="var(--font-sans)">
          {business.tagline.replace(/\.$/, '').toUpperCase()}
        </text>
      </g>

      {/* Wheel arches and wheels */}
      <g fill="#14201f">
        <path d="M176 296a29 29 0 0 1 58 0Z" />
        <path d="M391 296a29 29 0 0 1 58 0Z" />
      </g>
      {[205, 420].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy="300" r="23" fill="#1c2424" />
          <circle cx={cx} cy="300" r="12" fill="#c9d1d0" />
          <circle cx={cx} cy="300" r="4.5" fill="#6b7676" />
        </g>
      ))}

      {/* Sawhorse with plank and hand saw */}
      <g transform="translate(-6 274) scale(0.92)">
        <path d="M22 18 10 66M22 18l12 48M110 18 98 66M110 18l12 48" stroke="#7a4b24" strokeWidth="5" strokeLinecap="round" />
        <rect x="0" y="10" width="134" height="11" rx="2" fill="#d8a35c" stroke="#7a4b24" strokeWidth="2" />
        <path d="M10 15.5h40M70 15h50" stroke="#b7813e" strokeWidth="1.2" />
        <g transform="translate(30 -4) rotate(-6) scale(0.8)">
          <path d="M22 0 98 6v8L22 18Z" fill="#dfe5e4" stroke="#1c2424" strokeWidth="1.8" strokeLinejoin="round" />
          <path d={`M26 17.5${teeth}`} stroke="#1c2424" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M0 -2h18q6 0 6 6v12q0 6-6 6H6q-6 0-6-6Z" fill="var(--accent)" stroke="#1c2424" strokeWidth="1.8" />
          <rect x="6" y="3" width="11" height="12" rx="4" fill="#1f2b2b" />
        </g>
      </g>

      {/* Open toolbox with hammer and screwdriver */}
      <g transform="translate(470 290)">
        <path d="M18 10V4a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v6" stroke="#1c2424" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M24 12 14 -18" stroke="#8a5a2b" strokeWidth="5" strokeLinecap="round" />
        <path d="M4 -24h16q6 0 9 5l-6 1-3-2v4H4Z" fill="#9aa5a4" stroke="#1c2424" strokeWidth="1.6" transform="rotate(-18 14 -18)" />
        <path d="M44 12 54 -14" stroke="#e5b82e" strokeWidth="6" strokeLinecap="round" />
        <path d="M54 -14 58 -26" stroke="#c9d1d0" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="0" y="10" width="66" height="34" rx="4" fill="var(--accent)" stroke="#1c2424" strokeWidth="2" />
        <path d="M0 22h66" stroke="#1c2424" strokeWidth="1.6" opacity="0.6" />
        <rect x="28" y="18" width="10" height="8" rx="1.5" fill="#e2e8e8" stroke="#1c2424" strokeWidth="1.2" />
      </g>

      {/* Traffic cone at the back bumper */}
      <g transform="translate(132 296)">
        <path d="M12 0h8l10 38H2Z" fill="#f08a24" stroke="#1c2424" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12h14l2 8H7Z" fill="#fbf9f4" />
        <rect x="-4" y="36" width="40" height="6" rx="2" fill="#f08a24" stroke="#1c2424" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

/** Crisp 1.8px stroke icons for UI and licensed-trade exclusions. */
export function SmallIcon({
  name,
  className = 'h-5 w-5',
}: {
  name:
    | 'phone'
    | 'envelope'
    | 'clock'
    | 'pin'
    | 'van'
    | 'clipboard'
    | 'receipt'
    | 'check'
    | ExclusionIcon;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {name === 'phone' && (
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      )}
      {name === 'envelope' && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      )}
      {name === 'pin' && (
        <>
          <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
          <circle cx="12" cy="11" r="2.2" />
        </>
      )}
      {name === 'van' && (
        <>
          <path d="M3 16V7h11l4 4h3v5h-2" />
          <path d="M3 16h2m8 0h4" />
          <circle cx="7.5" cy="17" r="2" />
          <circle cx="16.5" cy="17" r="2" />
        </>
      )}
      {name === 'clipboard' && (
        <>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V2.5h6V4" />
          <path d="M9 10h6M9 14h6" />
        </>
      )}
      {name === 'receipt' && (
        <>
          <path d="M5 3v18l2.5-1.5L10 21l2-1.5L14 21l2.5-1.5L19 21V3H5Z" />
          <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
        </>
      )}
      {name === 'check' && <path d="M5 12.5 9.5 17 19 7" strokeWidth="2.2" />}
      {(name === 'wiring' ||
        name === 'gas' ||
        name === 'plumbing' ||
        name === 'roofing' ||
        name === 'structural' ||
        name === 'hvac') && (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" stroke="var(--accent)" strokeWidth="2" />
          {name === 'wiring' && <path d="M13 6.5 9 12h4l-1.5 5.5" strokeWidth="1.7" />}
          {name === 'gas' && <path d="M12 6.5c2.5 2.5 3.5 4.5 3.5 6.5a3.5 3.5 0 1 1-7 0c0-2 1-4 3.5-6.5Z" strokeWidth="1.7" />}
          {name === 'plumbing' && <path d="M8 15V9h5v4h3" strokeWidth="1.8" />}
          {name === 'roofing' && <path d="m6.5 13 5.5-5 5.5 5" strokeWidth="1.8" />}
          {name === 'structural' && <path d="M7 8h10M12 8v8M7 16h10" strokeWidth="1.8" />}
          {name === 'hvac' && <path d="M12 7v10M7 12h10" strokeWidth="1.8" />}
        </>
      )}
    </svg>
  );
}

/** Clean technical 404 graphic: empty outline slot on a warehouse grid. */
export function GoneWalkaboutArt({ className = 'w-full max-w-sm mx-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 140"
      fill="none"
      role="img"
      aria-label="Empty dashed tool outline on a trade storage board"
      className={className}
    >
      <rect x="1" y="1" width="278" height="138" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
      <g fill="var(--line-strong)" opacity="0.55">
        {Array.from({ length: 11 }).map((_, c) =>
          Array.from({ length: 5 }).map((__, r) => <circle key={`${c}-${r}`} cx={30 + c * 22} cy={26 + r * 22} r="2" />),
        )}
      </g>
      <g transform="translate(106 24)" stroke="var(--muted)" strokeWidth="2" strokeDasharray="4 4" strokeLinejoin="round">
        <path d="M8 12h36c6 0 11 3 15 9-4-2-9-3-14-2v4H19v-3H8v-8Z" />
        <rect x="29" y="23" width="10" height="66" rx="4" />
      </g>
    </svg>
  );
}
