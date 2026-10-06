import { certifications, education } from "@/data/site";
import { Section } from "./section";

export function EducationSection() {
  return (
    <Section id="education" eyebrow="Background" title="Education & certifications">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Education</h3>
          <p className="mt-3 font-medium">{education.school}</p>
          <p className="text-sm text-muted">{education.degree}, {education.year}</p>
          <p className="mt-1 text-sm text-muted">{education.detail}</p>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Certifications</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
