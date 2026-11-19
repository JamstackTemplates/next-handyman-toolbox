import { GoneWalkaboutArt } from '../components/artwork';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="bg-bg py-16 text-ink sm:py-24">
      <div className="wrap mx-auto max-w-xl text-center">
        <GoneWalkaboutArt className="mx-auto w-full max-w-xs" />
        <span className="aisle-tag mt-8">404 · Page not found</span>
        <h1 className="mt-4 font-display-tight text-4xl font-extrabold leading-tight sm:text-5xl">
          This one&apos;s gone walkabout.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-muted">
          The page you&apos;re looking for isn&apos;t on this shelf. Head back to Home or browse the
          job list instead.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <SiteLink href="/" className="button">
            Back to Home
          </SiteLink>
          <SiteLink href="/jobs/" className="button button-outline">
            See the job list
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
