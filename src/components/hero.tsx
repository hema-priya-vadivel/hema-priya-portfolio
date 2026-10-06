import { availability, metrics, site } from "@/data/site";
import { StatusPill } from "./section";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pt-32">
        <div>
          <h1 id="hero-title" className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl xl:text-8xl">
            {site.fullName}
          </h1>
          <p className="mt-4 text-xl font-medium text-accent sm:text-2xl">
            {site.jobTitle} <span className="text-muted">·</span> SDET II
          </p>
          <p className="mt-2 font-mono text-sm text-muted">
            {site.company} · {site.location}
          </p>
          <div className="mt-8">
            <StatusPill>{availability.hero}</StatusPill>
          </div>
          <p className="mt-8 max-w-2xl text-xl leading-8 sm:text-2xl sm:leading-9">
            I build reliable automation systems that help teams ship with confidence.
          </p>
          <p className="mt-5 font-mono text-sm text-muted">
            Playwright · Selenium · Appium · Python · Java · CI/CD · AI × QA
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#experience" className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90">
              View My Experience
            </a>
            {site.resumeDriveUrl && (
              <a
                href={site.resumeDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-surface"
              >
                Download Resume
              </a>
            )}
          </div>
        </div>
        <dl className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label + m.detail}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-4 transition-all duration-200 hover:-translate-y-1 hover:border-accent/70 sm:p-7"
            >
              <dt className="order-2 mt-3 text-xs uppercase tracking-wider text-muted">
                {m.label} <span className="block normal-case tracking-normal text-foreground/80">{m.detail}</span>
              </dt>
              <dd className="order-1 whitespace-nowrap text-3xl font-semibold tracking-tight text-accent sm:text-5xl">
                {m.value}
              </dd>
              <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-accent opacity-60 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
