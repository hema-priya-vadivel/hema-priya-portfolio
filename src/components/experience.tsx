import Link from "next/link";
import { experience, internships } from "@/data/site";
import { Section } from "./section";
import { Timeline } from "./timeline";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Career timeline">
      <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">Full-time</h3>
      <Timeline items={experience} openCount={1} />

      <div className="mt-14 rounded-xl border border-accent/40 bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Internships</h3>
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {internships.length} internships before Juspay
            </p>
            <p className="mt-2 max-w-xl text-sm text-muted">
              From full-stack development to guiding 300+ students on Google Cloud, 2021 – 2023.
            </p>
          </div>
          <Link
            href="/internships"
            className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            View all internships →
          </Link>
        </div>
        <ul className="mt-6 divide-y divide-border border-t border-border">
          {internships.map((i) => (
            <li key={`${i.company}-${i.period}`} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 text-sm">
              <span>
                <span className="font-medium">{i.title}</span>
                <span className="text-muted"> · {i.company}</span>
              </span>
              <span className="font-mono text-xs text-muted">{i.period}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
