import { coreSkills, moreSkills } from "@/data/site";
import { Section } from "./section";

function Chip({ children }: { children: string }) {
  return (
    <li className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs leading-5 text-foreground">
      {children}
    </li>
  );
}

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools and disciplines">
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coreSkills.map((g, i) => (
          <li
            key={g.group}
            className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-medium">{g.group}</h3>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-xl border border-dashed border-border p-6">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">More tools</h3>
        <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {moreSkills.map((g) => (
            <div key={g.group}>
              <dt className="text-sm font-medium">{g.group}</dt>
              <dd>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
