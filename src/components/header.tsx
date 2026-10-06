"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site";
import { SocialIcons } from "./social-links";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);

      // Active section = the last section whose top has passed just under the sticky header.
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      let current: string | null = atBottom ? (sections.at(-1)?.id ?? null) : null;
      if (!atBottom) {
        for (const s of sections) {
          if (s.getBoundingClientRect().top <= 120) current = s.id;
        }
      }
      setActive(current);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const links = navItems.map((item) => {
    const isActive = active === item.href.replace("/#", "");
    return (
      <a
        key={item.href}
        href={item.href}
        onClick={() => setOpen(false)}
        aria-current={isActive ? "location" : undefined}
        className={`border-b-2 py-1 text-sm transition-colors hover:text-foreground ${
          isActive ? "border-accent text-foreground" : "border-transparent text-muted"
        }`}
      >
        {item.label}
      </a>
    );
  });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {site.fullName}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links}
        </nav>
        <div className="flex items-center gap-2">
          <SocialIcons />
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 items-center rounded-md border border-border px-3 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="flex flex-col gap-4 border-t border-border bg-background px-5 py-5 md:hidden">
          {links}
        </nav>
      )}
    </header>
  );
}
