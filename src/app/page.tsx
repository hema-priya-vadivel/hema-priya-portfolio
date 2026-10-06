import { About } from "@/components/about";
import { AiQa } from "@/components/ai-qa";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HowIWork } from "@/components/how-i-work";
import { Hero } from "@/components/hero";
import { Recommendations } from "@/components/recommendations";
import { EducationSection } from "@/components/education";
import { SelectedWork } from "@/components/selected-work";
import { Skills } from "@/components/skills";
import { site } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Quality Engineer II",
  description: site.description,
  url: site.url,
  worksFor: { "@type": "Organization", name: "Juspay" },
  knowsAbout: ["Test automation", "Playwright", "Selenium", "Appium", "Pytest", "Test automation frameworks", "Mobile test automation", "CI/CD", "AI-assisted testing"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Chennai Institute of Technology" },
  ...(site.linkedin || site.github || site.twitter
    ? { sameAs: [site.linkedin, site.github, site.twitter].filter(Boolean) }
    : {}),
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <HowIWork />
        <Experience />
        <SelectedWork />
        <Skills />
        <AiQa />
        <Recommendations />
        <EducationSection />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
