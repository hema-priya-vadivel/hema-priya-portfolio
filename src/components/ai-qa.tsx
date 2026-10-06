import { aiTopics } from "@/data/site";
import { Section } from "./section";

export function AiQa() {
  return (
    <Section id="ai-qa" eyebrow="AI × QA" title="AI × Quality Engineering">
      <p className="-mt-4 mb-10 max-w-2xl text-muted">
        AI-assisted capabilities I built into the Playwright + Python automation framework at Juspay.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {aiTopics.map((t) => (
          <article key={t.title} className="rounded-lg border border-border bg-surface p-6">
            <h3 className="text-xl font-medium">{t.title}</h3>
            <p className="mt-3 font-mono text-xs leading-6 text-accent">{t.flow.join(" → ")}</p>
            <p className="mt-5 text-sm leading-6">{t.detail}</p>
            <p className="mt-4 font-mono text-xs text-muted">{t.tech}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
