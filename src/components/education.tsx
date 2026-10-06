import { certifications, education } from "@/data/site";
import { Section } from "./section";

function Sparkle({ className }: { className: string }) {
  return (
    <svg viewBox="-8 -8 16 16" aria-hidden className={`absolute h-3 w-3 fill-accent ${className}`}>
      <path d="M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8 Z" />
    </svg>
  );
}

/** Decorative graduation cap. */
function GradCap() {
  return (
    <svg viewBox="0 0 130 100" aria-hidden className="h-full w-full">
      <path d="M30 52 V72 Q65 94 100 72 V52 L65 68 Z" className="fill-accent/40 stroke-accent/60" strokeWidth="1" />
      <path d="M65 8 L124 36 L65 64 L6 36 Z" className="fill-accent/70 stroke-accent" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M65 36 L110 44 V76" className="fill-none stroke-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="106" y="74" width="8" height="16" rx="3" className="fill-accent" />
    </svg>
  );
}

function AchievementBanner() {
  const { rank, field } = education;
  return (
    <div
      role="group"
      aria-label={`${rank.position} ${rank.title}, ${field}`}
      className="relative mt-auto overflow-hidden rounded-xl border border-accent/50 bg-gradient-to-br from-accent/25 via-accent/10 to-transparent"
    >
      {/* soft waves */}
      <svg viewBox="0 0 400 120" aria-hidden preserveAspectRatio="none" className="absolute bottom-0 right-0 h-2/3 w-2/5 opacity-40">
        <path d="M0 100 C80 30 170 125 250 70 S360 25 400 45" className="fill-none stroke-accent/50" strokeWidth="1.5" />
        <path d="M0 112 C90 55 180 128 260 85 S370 50 400 70" className="fill-none stroke-accent/30" strokeWidth="1.5" />
      </svg>
      {/* decorative cap */}
      <div aria-hidden className="pointer-events-none absolute -bottom-2 right-2 hidden h-14 w-[4.5rem] opacity-35 sm:block">
        <GradCap />
        <Sparkle className="-top-1 right-0" />
      </div>

      <div className="relative flex items-center gap-4 p-4 sm:gap-5 sm:p-5">
        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl border border-accent/60 bg-gradient-to-br from-accent/40 to-accent/10 shadow-[0_0_24px_-8px] shadow-accent">
          <svg viewBox="0 0 24 16" aria-hidden className="h-3.5 w-5 fill-accent">
            <path d="M2 14 L1 3 L7 8 L12 1 L17 8 L23 3 L22 14 Z" />
          </svg>
          <span className="text-3xl font-extrabold leading-none tracking-tight text-accent">{rank.position}</span>
        </div>

        <div className="min-w-0 sm:pr-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{rank.eyebrow}</p>
          <p className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl">
            <span className="text-accent">{rank.position}</span> {rank.title}
          </p>
          <p className="mt-1.5 text-sm leading-5 text-muted">{rank.text}</p>
        </div>
      </div>
    </div>
  );
}

export function EducationSection() {
  return (
    <Section id="education" eyebrow="Background" title="Education & certifications">
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="flex flex-col rounded-xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-start gap-5">
            <div className="shrink-0 text-center">
              <p className="font-mono text-4xl font-semibold leading-none text-accent sm:text-5xl">{education.cgpa}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">CGPA / {education.cgpaScale}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium leading-snug sm:text-xl">{education.field}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">{education.degree}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="font-medium text-accent">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-muted">
              Graduated {education.graduated} <span aria-hidden>·</span> {education.distinction}
            </p>
          </div>

          <AchievementBanner />
        </article>

        <article className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Certifications</h3>
          <ul className="mt-5 divide-y divide-border">
            {certifications.map((c) => (
              <li key={c.title} className="py-4 first:pt-0 last:pb-0">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.title} certificate (opens in a new tab)`}
                  className="group inline-flex items-baseline gap-1.5 font-medium transition-colors hover:text-accent"
                >
                  {c.title}
                  <span aria-hidden className="text-xs text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
                <p className="mt-1 text-sm text-muted">
                  {c.issuer}
                  {"note" in c && c.note ? <span className="font-mono text-xs"> · {c.note}</span> : null}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}
