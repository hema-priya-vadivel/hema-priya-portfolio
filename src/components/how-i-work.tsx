"use client";

import { useState } from "react";
import { principles } from "@/data/site";
import { Section } from "./section";

const total = principles.length;
const pad = (n: number) => String(n).padStart(2, "0");

const primary =
  "rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90";
const secondary =
  "rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-background";

export function HowIWork() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const current = principles[index];
  const last = index === total - 1;

  return (
    <Section id="how-i-work" eyebrow="How I Work" title="Ten principles behind every framework I build.">
      <div className="relative overflow-hidden rounded-xl border border-accent/40 bg-surface p-6 sm:p-10">
        <div aria-hidden className="grid-bg absolute inset-0 -z-0 opacity-30" />
        <div className="relative">
          {!started ? (
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-5xl font-semibold tracking-tight text-accent sm:text-6xl">10</p>
                <p className="mt-3 max-w-md text-lg leading-7">
                  Short rules I actually work by. Curious what they are?
                </p>
              </div>
              <button type="button" onClick={() => setStarted(true)} className={primary}>
                Reveal my principles →
              </button>
            </div>
          ) : showAll ? (
            <div>
              <ol className="principle-in grid gap-x-10 gap-y-6 md:grid-cols-2">
                {principles.map((p, i) => (
                  <li key={p.title} className="flex gap-4">
                    <span className="font-mono text-xs text-accent">{pad(i + 1)}</span>
                    <span>
                      <span className="block font-medium">{p.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-muted">{p.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <button type="button" onClick={() => setShowAll(false)} className={`${secondary} mt-8`}>
                Back to one at a time
              </button>
            </div>
          ) : (
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                <span className="text-accent">{pad(index + 1)}</span> / {pad(total)}
              </p>
              <div aria-live="polite" className="min-h-[11rem] sm:min-h-[9rem]">
                <div key={index} className="principle-in">
                  <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{current.body}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-1.5" role="group" aria-label="Choose a principle">
                {principles.map((p, i) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Principle ${i + 1}`}
                    aria-current={i === index}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= index ? "bg-accent" : "bg-border hover:bg-muted"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                  className={`${secondary} disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => (last ? setIndex(0) : setIndex((i) => i + 1))}
                  className={primary}
                >
                  {last ? "Start over" : "Next principle →"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="ml-auto text-sm text-accent underline-offset-4 hover:underline"
                >
                  View all 10
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
