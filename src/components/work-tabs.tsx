"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { WorkItem } from "@/data/site";
import { Tag } from "./section";

export function WorkTabs({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number) {
    const next = (i + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent, i: number) {
    const keys: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key]);
    }
  }

  const item = items[active];

  return (
    <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
      <div
        role="tablist"
        aria-label="Selected work"
        aria-orientation="vertical"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0"
      >
        {items.map((w, i) => {
          const selected = i === active;
          return (
            <button
              key={w.index}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`work-tab-${i}`}
              aria-selected={selected}
              aria-controls={`work-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`flex shrink-0 items-baseline gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors md:shrink ${
                selected
                  ? "border-accent bg-surface text-foreground"
                  : "border-border text-muted hover:border-accent/50 hover:text-foreground"
              }`}
            >
              <span className={`font-mono text-xs ${selected ? "text-accent" : ""}`}>{w.index}</span>
              <span className="font-medium">{w.title}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`work-panel-${active}`}
        aria-labelledby={`work-tab-${active}`}
        tabIndex={0}
        className="rounded-xl border border-border bg-surface p-6 sm:p-8"
      >
        <p className="font-mono text-xs text-accent">{item.index}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.title}</h3>
        <p className="mt-3 leading-7 text-muted">{item.summary}</p>
        {item.flow && <p className="mt-4 font-mono text-xs text-foreground">{item.flow}</p>}
        <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm leading-6">
          {item.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden className="text-accent">▸</span>
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
