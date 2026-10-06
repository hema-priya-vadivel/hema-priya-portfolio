import { about, exploring, leadership } from "@/data/site";
import { Section } from "./section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Quality problems, solved at the engineering level.">
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <div className="space-y-5 text-lg leading-8 text-muted">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="border-l-2 border-accent pl-4 text-foreground">
            I don’t treat automation as a collection of test scripts. I design systems that make testing scalable, maintainable, and useful to the teams that build and ship software.
          </p>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-foreground">
            <span aria-hidden className="text-accent">▸</span>
            Open to mentoring and knowledge-sharing.
          </p>
        </div>
        <aside aria-label="Currently exploring" className="self-start rounded-lg border border-border bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Currently exploring</p>
          <ul className="mt-4 space-y-3">
            {exploring.map((e) => (
              <li key={e} className="flex gap-3 text-sm">
                <span aria-hidden className="text-accent">▸</span>
                {e}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-16">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Leadership &amp; mentorship</h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((l) => (
            <li key={l.label} className="rounded-lg border border-border bg-surface p-5">
              <p className="text-3xl font-semibold tracking-tight">{l.value}</p>
              <p className="mt-1 text-sm font-medium">{l.label}</p>
              <p className="mt-3 text-xs leading-5 text-muted">{l.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
