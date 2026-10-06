import { work } from "@/data/site";
import { Section } from "./section";
import { WorkTabs } from "./work-tabs";

export function SelectedWork() {
  return (
    <Section id="work" eyebrow="Selected Work" title="Engineering highlights">
      <p className="-mt-4 mb-10 max-w-2xl text-muted">
        Professional work shown at a high level — no proprietary code, internal URLs or customer data.
      </p>
      <WorkTabs items={work} />
    </Section>
  );
}
