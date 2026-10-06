"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Recommendation } from "@/data/site";

interface Props extends Recommendation {
  /** Clamp the quote to a few lines with a Read more / Read less toggle. */
  collapsible?: boolean;
}

export function RecommendationCard({ quote, author, context, collapsible = false }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const quoteId = useId();

  // Only offer the toggle when the clamped text is actually cut off.
  useEffect(() => {
    const el = quoteRef.current;
    if (!collapsible || expanded || !el) return;
    const measure = () => setOverflowing(el.scrollHeight > el.clientHeight + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [collapsible, expanded, quote]);

  const clamped = collapsible && !expanded;

  return (
    <figure className="flex flex-col justify-between rounded-lg border border-border bg-surface p-6">
      <div>
        <blockquote
          ref={quoteRef}
          id={quoteId}
          className={`text-lg leading-8 ${clamped ? "line-clamp-4" : ""}`}
        >
          “{quote}”
        </blockquote>
        {collapsible && (overflowing || expanded) && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={quoteId}
            className="mt-3 text-sm text-accent underline-offset-4 hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
      <figcaption className="mt-6 text-sm">
        <span className="font-medium">— {author}</span>
        {context && <span className="block text-muted">{context}</span>}
      </figcaption>
    </figure>
  );
}
