import Link from "next/link";
import { getRecommendations } from "@/lib/recommendations";
import { site } from "@/data/site";
import { RecommendationCard } from "./recommendation-card";
import { ExternalLink, Section } from "./section";

const PREVIEW_COUNT = 2;

export async function Recommendations() {
  const { items, source } = await getRecommendations();
  return (
    <Section id="recommendations" eyebrow="Recommendations" title="What teammates say">
      <div className="grid gap-4 md:grid-cols-2">
        {items.slice(0, PREVIEW_COUNT).map((r) => (
          <RecommendationCard key={r.author} {...r} collapsible />
        ))}
      </div>
      {items.length > PREVIEW_COUNT && (
        <Link
          href="/recommendations"
          className="mt-6 inline-block rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
        >
          View all recommendations ({items.length}) →
        </Link>
      )}
      <p className="mt-6 text-sm text-muted">
        {source === "live" ? "Synced from an authorized source. " : "Selected from LinkedIn recommendations. "}
        {site.linkedin && (
          <ExternalLink href={site.linkedin} className="text-accent underline-offset-4 hover:underline">
            View on LinkedIn
          </ExternalLink>
        )}
      </p>
    </Section>
  );
}
