import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RecommendationCard } from "@/components/recommendation-card";
import { ExternalLink } from "@/components/section";
import { site } from "@/data/site";
import { getRecommendations } from "@/lib/recommendations";

export const metadata: Metadata = {
  title: `Recommendations | ${site.name}`,
  description: `What teammates and mentors say about working with ${site.name}.`,
  alternates: { canonical: "/recommendations" },
};

export default async function RecommendationsPage() {
  const { items, source } = await getRecommendations();
  return (
    <>
      <Header />
      <main id="main" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <Link href="/#recommendations" className="text-sm text-muted hover:text-foreground">
          ← Back to home
        </Link>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">Recommendations</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">What teammates say</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <RecommendationCard key={r.author} {...r} />
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          {source === "live" ? "Synced from an authorized source. " : "Selected from LinkedIn recommendations. "}
          {site.linkedin && (
            <ExternalLink href={site.linkedin} className="text-accent underline-offset-4 hover:underline">
              View on LinkedIn
            </ExternalLink>
          )}
        </p>
      </main>
      <Footer />
    </>
  );
}
