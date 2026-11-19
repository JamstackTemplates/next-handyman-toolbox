import { jobCategories, jobs } from '../content/jobs';
import { ToolIllustration } from './artwork';
import { SiteLink } from './site-link';

/**
 * Hardware-store department aisle tiles (inspired by Bunnings category tiles).
 * Each tile links directly to its category drawer on /jobs/#<category> and works without JS.
 */
export function PegboardToolWall() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {jobCategories.map(cat => {
        const count = jobs.filter(j => j.category === cat.id).length;
        return (
          <SiteLink
            key={cat.id}
            href={`/jobs/#${cat.id}`}
            className="aisle-tile group flex flex-col justify-between trade-card p-5 text-left no-underline"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-ui bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-on-brand dark:text-[#8ee0e6] dark:group-hover:text-white">
                <ToolIllustration tool={cat.tool} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold leading-snug text-ink group-hover:text-brand dark:group-hover:text-[#8ee0e6]">
                {cat.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-2">
                {cat.blurb}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-2.5 text-xs font-bold text-muted">
              <span>{count} {count === 1 ? 'job' : 'jobs'}</span>
              <span className="text-accent-ink transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </div>
          </SiteLink>
        );
      })}
    </div>
  );
}
