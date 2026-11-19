import type { ReactNode } from 'react';
import { RateTag } from './artwork';

/**
 * Clean hardware-store warehouse banner page head for /jobs/ and /rates/.
 */
export function PageHead({
  tapeLabel,
  title,
  showRateTag = false,
  children,
}: {
  tapeLabel: string;
  title: string;
  variant?: 'pegboard' | 'enamel';
  showRateTag?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-warehouse py-10 sm:py-14">
      <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <span className="aisle-tag-on-dark">{tapeLabel}</span>
          <h1 className="mt-3 font-display-tight text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {children && (
            <div className="mt-3 text-base leading-relaxed text-white/85 sm:text-lg">
              {children}
            </div>
          )}
        </div>

        {showRateTag && (
          <div className="w-full max-w-xs shrink-0">
            <RateTag />
          </div>
        )}
      </div>
    </section>
  );
}
