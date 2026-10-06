"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <a href={`mailto:${email}`} className="hover:text-accent">{email}</a>
      <button type="button" onClick={copy} className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted hover:text-foreground">
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" className="sr-only">{copied ? "Email copied" : ""}</span>
    </span>
  );
}
