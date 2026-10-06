import "server-only";
import { z } from "zod";
import { curatedRecommendations, type Recommendation } from "@/data/site";

const sourceSchema = z.array(
  z.object({
    quote: z.string().min(1).max(1500),
    author: z.string().min(1).max(100),
    context: z.string().max(150).default(""),
  }),
);

export interface RecommendationsResult {
  items: Recommendation[];
  /** "live" only when an authorized source actually responded. */
  source: "live" | "curated";
}

/**
 * Reads recommendations from an authorized, server-side source configured via
 * RECOMMENDATIONS_SOURCE_URL (+ optional RECOMMENDATIONS_SOURCE_TOKEN), e.g. a
 * permitted LinkedIn export/integration endpoint you control. LinkedIn is never
 * scraped. Any failure falls back to the curated list.
 */
export async function getRecommendations(): Promise<RecommendationsResult> {
  const url = process.env.RECOMMENDATIONS_SOURCE_URL;
  const fallback: RecommendationsResult = { items: curatedRecommendations, source: "curated" };
  if (!url) return fallback;

  try {
    const token = process.env.RECOMMENDATIONS_SOURCE_TOKEN;
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return fallback;
    const parsed = sourceSchema.safeParse(await res.json());
    if (!parsed.success || parsed.data.length === 0) return fallback;
    return { items: parsed.data, source: "live" };
  } catch {
    return fallback;
  }
}
