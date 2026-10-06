"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { availability, site } from "@/data/site";
import { CopyEmail } from "./copy-email";
import { Section, StatusPill } from "./section";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string[]>>;

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent";

const handleOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const profiles = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "GitHub", href: site.github },
  { label: "Twitter / X", href: site.twitter },
  { label: "Linktree", href: site.linktree },
].filter((p) => p.href);

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<FieldErrors>({});
  const [filled, setFilled] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function onChange(e: FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget);
    setFilled(["name", "email", "message"].every((k) => String(data.get(k) ?? "").trim() !== ""));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError("");
    setFields({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          hp_check: data.get("hp_check") ? "on" : "",
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors };
      if (!res.ok) {
        setFields(json.fields ?? {});
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setFilled(false);
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const err = (k: keyof FieldErrors) => fields[k]?.[0];

  return (
    <Section id="contact" eyebrow="Contact" title="Let’s connect">
      <div className="-mt-4">
        <StatusPill>{availability.contact}</StatusPill>
      </div>
      <p className="mb-10 mt-6 max-w-xl text-muted">
        Have an opportunity, question, or want to discuss Quality Engineering? Email is the fastest way to reach me.
      </p>
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          {status === "success" ? (
            <div role="status">
              <p className="text-lg font-medium">Message sent.</p>
              <p className="mt-1 text-sm text-muted">Thanks for reaching out — I’ll reply soon.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm text-accent hover:underline">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} onChange={onChange} noValidate className="space-y-5">
              {/* Honeypot, hidden from people and assistive tech */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <input type="checkbox" name="hp_check" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {(
                  [
                    ["name", "Name", "text", "name"],
                    ["email", "Email", "email", "email"],
                  ] as const
                ).map(([id, label, type, auto]) => (
                  <div key={id}>
                    <label htmlFor={id} className="text-sm font-medium">{label}</label>
                    <input
                      id={id}
                      name={id}
                      type={type}
                      required
                      autoComplete={auto}
                      maxLength={200}
                      aria-invalid={!!err(id)}
                      aria-describedby={err(id) ? `${id}-err` : undefined}
                      className={inputClass}
                    />
                    {err(id) && <p id={`${id}-err`} className="mt-1 text-sm text-red-600 dark:text-red-400">{err(id)}</p>}
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  maxLength={5000}
                  aria-invalid={!!err("message")}
                  aria-describedby={err("message") ? "message-err" : undefined}
                  className={inputClass}
                />
                {err("message") && <p id="message-err" className="mt-1 text-sm text-red-600 dark:text-red-400">{err("message")}</p>}
              </div>
              <div aria-live="polite">
                {status === "error" && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={!filled || status === "loading"}
                className="w-full rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <aside aria-label="Other ways to reach me" className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 sm:p-8">
          {site.email && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Email</h3>
              <div className="mt-3 break-all">
                <CopyEmail email={site.email} />
              </div>
            </div>
          )}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Find me online</h3>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {profiles.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 py-3 text-sm"
                  >
                    <span>
                      <span className="block font-medium group-hover:text-accent">{p.label}</span>
                      <span className="block break-all font-mono text-xs text-muted">{handleOf(p.href)}</span>
                    </span>
                    <span aria-hidden className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
