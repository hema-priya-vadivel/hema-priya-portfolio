import type { ExperienceItem } from "@/data/site";
import { Tag } from "./section";

export function Timeline({ items, openCount = 0 }: { items: ExperienceItem[]; openCount?: number }) {
  return (
    <ol className="relative space-y-4 border-l border-border pl-6 sm:pl-8">
      {items.map((item, i) => {
        const expandable = item.highlights.length > 0;
        const header = (
          <>
            <span className="font-mono text-xs text-muted">{item.period}</span>
            <span className="mt-1 block text-lg font-medium">
              {item.title}{" "}
              <span className="text-muted">
                · {item.company}
                {item.location ? `, ${item.location}` : ""}
              </span>
            </span>
            <span className="mt-1 block text-sm text-muted">{item.summary}</span>
          </>
        );
        return (
          <li key={`${item.period}-${item.company}`} className="relative">
            <span aria-hidden className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background sm:-left-[39px]" />
            {expandable ? (
              <details className="group rounded-lg border border-border bg-surface open:shadow-sm" open={i < openCount}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                  <span>{header}</span>
                  <span aria-hidden className="mt-1 font-mono text-muted transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="space-y-4 border-t border-border p-5">
                  <ul className="max-w-3xl space-y-2 text-sm leading-6 text-muted">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span aria-hidden className="text-accent">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </details>
            ) : (
              <div className="rounded-lg border border-border bg-surface p-5">
                {header}
                {item.tech.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
