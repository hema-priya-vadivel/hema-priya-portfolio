import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Timeline } from "@/components/timeline";
import { internships, site } from "@/data/site";

export const metadata: Metadata = {
  title: `Internships | ${site.name}`,
  description: `Internships and early roles of ${site.name} before joining Juspay as a Quality Engineer.`,
  alternates: { canonical: "/internships" },
};

export default function InternshipsPage() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <Link href="/#experience" className="text-sm text-muted hover:text-foreground">
          ← Back to experience
        </Link>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">Experience</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Internships</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Internships and student roles from 2021 to 2023, before moving into quality engineering.
        </p>
        <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
          {[
            [String(internships.length), "Internships"],
            ["2021–23", "Period"],
            ["300+", "Students guided on Google Cloud"],
          ].map(([value, label]) => (
            <div key={label} className="bg-surface p-4 sm:p-5">
              <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">{value}</dd>
              <dt className="mt-1 text-xs text-muted">{label}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-12">
          <Timeline items={internships} openCount={2} />
        </div>
      </main>
      <Footer />
    </>
  );
}
