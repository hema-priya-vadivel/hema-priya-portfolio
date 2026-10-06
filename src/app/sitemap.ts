import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/recommendations`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/internships`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
